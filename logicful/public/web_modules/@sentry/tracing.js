import { g as getCurrentHub, E as addInstrumentationHandler, l as logger, b as __assign, t as timestampWithMs, Q as dropUndefinedKeys, e as uuid4, _ as __extends, M as isInstanceOf, O as Hub, R as __values, T as isNodeEnv, U as getActiveDomain, V as dynamicRequire, W as extractNodeRequestData, A as getGlobalObject, X as getMainCarrier, Y as __rest, c as __spread, m as isMatchingPattern } from '../common/hub-e5e7c94b.js';

/** The status of an Span. */
// eslint-disable-next-line import/export
var SpanStatus;
(function (SpanStatus) {
    /** The operation completed successfully. */
    SpanStatus["Ok"] = "ok";
    /** Deadline expired before operation could complete. */
    SpanStatus["DeadlineExceeded"] = "deadline_exceeded";
    /** 401 Unauthorized (actually does mean unauthenticated according to RFC 7235) */
    SpanStatus["Unauthenticated"] = "unauthenticated";
    /** 403 Forbidden */
    SpanStatus["PermissionDenied"] = "permission_denied";
    /** 404 Not Found. Some requested entity (file or directory) was not found. */
    SpanStatus["NotFound"] = "not_found";
    /** 429 Too Many Requests */
    SpanStatus["ResourceExhausted"] = "resource_exhausted";
    /** Client specified an invalid argument. 4xx. */
    SpanStatus["InvalidArgument"] = "invalid_argument";
    /** 501 Not Implemented */
    SpanStatus["Unimplemented"] = "unimplemented";
    /** 503 Service Unavailable */
    SpanStatus["Unavailable"] = "unavailable";
    /** Other/generic 5xx. */
    SpanStatus["InternalError"] = "internal_error";
    /** Unknown. Any non-standard HTTP status code. */
    SpanStatus["UnknownError"] = "unknown_error";
    /** The operation was cancelled (typically by the user). */
    SpanStatus["Cancelled"] = "cancelled";
    /** Already exists (409) */
    SpanStatus["AlreadyExists"] = "already_exists";
    /** Operation was rejected because the system is not in a state required for the operation's */
    SpanStatus["FailedPrecondition"] = "failed_precondition";
    /** The operation was aborted, typically due to a concurrency issue. */
    SpanStatus["Aborted"] = "aborted";
    /** Operation was attempted past the valid range. */
    SpanStatus["OutOfRange"] = "out_of_range";
    /** Unrecoverable data loss or corruption */
    SpanStatus["DataLoss"] = "data_loss";
})(SpanStatus || (SpanStatus = {}));
// eslint-disable-next-line @typescript-eslint/no-namespace, import/export
(function (SpanStatus) {
    /**
     * Converts a HTTP status code into a {@link SpanStatus}.
     *
     * @param httpStatus The HTTP response status code.
     * @returns The span status or {@link SpanStatus.UnknownError}.
     */
    function fromHttpCode(httpStatus) {
        if (httpStatus < 400) {
            return SpanStatus.Ok;
        }
        if (httpStatus >= 400 && httpStatus < 500) {
            switch (httpStatus) {
                case 401:
                    return SpanStatus.Unauthenticated;
                case 403:
                    return SpanStatus.PermissionDenied;
                case 404:
                    return SpanStatus.NotFound;
                case 409:
                    return SpanStatus.AlreadyExists;
                case 413:
                    return SpanStatus.FailedPrecondition;
                case 429:
                    return SpanStatus.ResourceExhausted;
                default:
                    return SpanStatus.InvalidArgument;
            }
        }
        if (httpStatus >= 500 && httpStatus < 600) {
            switch (httpStatus) {
                case 501:
                    return SpanStatus.Unimplemented;
                case 503:
                    return SpanStatus.Unavailable;
                case 504:
                    return SpanStatus.DeadlineExceeded;
                default:
                    return SpanStatus.InternalError;
            }
        }
        return SpanStatus.UnknownError;
    }
    SpanStatus.fromHttpCode = fromHttpCode;
})(SpanStatus || (SpanStatus = {}));

var TRACEPARENT_REGEXP = new RegExp('^[ \\t]*' + // whitespace
    '([0-9a-f]{32})?' + // trace_id
    '-?([0-9a-f]{16})?' + // span_id
    '-?([01])?' + // sampled
    '[ \\t]*$');
/**
 * Determines if tracing is currently enabled.
 *
 * Tracing is enabled when at least one of `tracesSampleRate` and `tracesSampler` is defined in the SDK config.
 */
function hasTracingEnabled(options) {
    return 'tracesSampleRate' in options || 'tracesSampler' in options;
}
/**
 * Extract transaction context data from a `sentry-trace` header.
 *
 * @param traceparent Traceparent string
 *
 * @returns Object containing data from the header, or undefined if traceparent string is malformed
 */
function extractTraceparentData(traceparent) {
    var matches = traceparent.match(TRACEPARENT_REGEXP);
    if (matches) {
        var parentSampled = void 0;
        if (matches[3] === '1') {
            parentSampled = true;
        }
        else if (matches[3] === '0') {
            parentSampled = false;
        }
        return {
            traceId: matches[1],
            parentSampled: parentSampled,
            parentSpanId: matches[2],
        };
    }
    return undefined;
}
/** Grabs active transaction off scope, if any */
function getActiveTransaction(hub) {
    if (hub === void 0) { hub = getCurrentHub(); }
    var _a, _b;
    return (_b = (_a = hub) === null || _a === void 0 ? void 0 : _a.getScope()) === null || _b === void 0 ? void 0 : _b.getTransaction();
}
/**
 * Converts from milliseconds to seconds
 * @param time time in ms
 */
function msToSec(time) {
    return time / 1000;
}
/**
 * Converts from seconds to milliseconds
 * @param time time in seconds
 */
function secToMs(time) {
    return time * 1000;
}

/**
 * Configures global error listeners
 */
function registerErrorInstrumentation() {
    addInstrumentationHandler({
        callback: errorCallback,
        type: 'error',
    });
    addInstrumentationHandler({
        callback: errorCallback,
        type: 'unhandledrejection',
    });
}
/**
 * If an error or unhandled promise occurs, we mark the active transaction as failed
 */
function errorCallback() {
    var activeTransaction = getActiveTransaction();
    if (activeTransaction) {
        logger.log("[Tracing] Transaction: " + SpanStatus.InternalError + " -> Global error occured");
        activeTransaction.setStatus(SpanStatus.InternalError);
    }
}

/**
 * Keeps track of finished spans for a given transaction
 * @internal
 * @hideconstructor
 * @hidden
 */
var SpanRecorder = /** @class */ (function () {
    function SpanRecorder(maxlen) {
        if (maxlen === void 0) { maxlen = 1000; }
        this.spans = [];
        this._maxlen = maxlen;
    }
    /**
     * This is just so that we don't run out of memory while recording a lot
     * of spans. At some point we just stop and flush out the start of the
     * trace tree (i.e.the first n spans with the smallest
     * start_timestamp).
     */
    SpanRecorder.prototype.add = function (span) {
        if (this.spans.length > this._maxlen) {
            span.spanRecorder = undefined;
        }
        else {
            this.spans.push(span);
        }
    };
    return SpanRecorder;
}());
/**
 * Span contains all data about a span
 */
var Span = /** @class */ (function () {
    /**
     * You should never call the constructor manually, always use `hub.startSpan()`.
     * @internal
     * @hideconstructor
     * @hidden
     */
    function Span(spanContext) {
        /**
         * @inheritDoc
         */
        this.traceId = uuid4();
        /**
         * @inheritDoc
         */
        this.spanId = uuid4().substring(16);
        /**
         * Timestamp in seconds when the span was created.
         */
        this.startTimestamp = timestampWithMs();
        /**
         * @inheritDoc
         */
        this.tags = {};
        /**
         * @inheritDoc
         */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.data = {};
        if (!spanContext) {
            return this;
        }
        if (spanContext.traceId) {
            this.traceId = spanContext.traceId;
        }
        if (spanContext.spanId) {
            this.spanId = spanContext.spanId;
        }
        if (spanContext.parentSpanId) {
            this.parentSpanId = spanContext.parentSpanId;
        }
        // We want to include booleans as well here
        if ('sampled' in spanContext) {
            this.sampled = spanContext.sampled;
        }
        if (spanContext.op) {
            this.op = spanContext.op;
        }
        if (spanContext.description) {
            this.description = spanContext.description;
        }
        if (spanContext.data) {
            this.data = spanContext.data;
        }
        if (spanContext.tags) {
            this.tags = spanContext.tags;
        }
        if (spanContext.status) {
            this.status = spanContext.status;
        }
        if (spanContext.startTimestamp) {
            this.startTimestamp = spanContext.startTimestamp;
        }
        if (spanContext.endTimestamp) {
            this.endTimestamp = spanContext.endTimestamp;
        }
    }
    /**
     * @inheritDoc
     * @deprecated
     */
    Span.prototype.child = function (spanContext) {
        return this.startChild(spanContext);
    };
    /**
     * @inheritDoc
     */
    Span.prototype.startChild = function (spanContext) {
        var span = new Span(__assign(__assign({}, spanContext), { parentSpanId: this.spanId, sampled: this.sampled, traceId: this.traceId }));
        span.spanRecorder = this.spanRecorder;
        if (span.spanRecorder) {
            span.spanRecorder.add(span);
        }
        return span;
    };
    /**
     * @inheritDoc
     */
    Span.prototype.setTag = function (key, value) {
        var _a;
        this.tags = __assign(__assign({}, this.tags), (_a = {}, _a[key] = value, _a));
        return this;
    };
    /**
     * @inheritDoc
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
    Span.prototype.setData = function (key, value) {
        var _a;
        this.data = __assign(__assign({}, this.data), (_a = {}, _a[key] = value, _a));
        return this;
    };
    /**
     * @inheritDoc
     */
    Span.prototype.setStatus = function (value) {
        this.status = value;
        return this;
    };
    /**
     * @inheritDoc
     */
    Span.prototype.setHttpStatus = function (httpStatus) {
        this.setTag('http.status_code', String(httpStatus));
        var spanStatus = SpanStatus.fromHttpCode(httpStatus);
        if (spanStatus !== SpanStatus.UnknownError) {
            this.setStatus(spanStatus);
        }
        return this;
    };
    /**
     * @inheritDoc
     */
    Span.prototype.isSuccess = function () {
        return this.status === SpanStatus.Ok;
    };
    /**
     * @inheritDoc
     */
    Span.prototype.finish = function (endTimestamp) {
        this.endTimestamp = typeof endTimestamp === 'number' ? endTimestamp : timestampWithMs();
    };
    /**
     * @inheritDoc
     */
    Span.prototype.toTraceparent = function () {
        var sampledString = '';
        if (this.sampled !== undefined) {
            sampledString = this.sampled ? '-1' : '-0';
        }
        return this.traceId + "-" + this.spanId + sampledString;
    };
    /**
     * @inheritDoc
     */
    Span.prototype.getTraceContext = function () {
        return dropUndefinedKeys({
            data: Object.keys(this.data).length > 0 ? this.data : undefined,
            description: this.description,
            op: this.op,
            parent_span_id: this.parentSpanId,
            span_id: this.spanId,
            status: this.status,
            tags: Object.keys(this.tags).length > 0 ? this.tags : undefined,
            trace_id: this.traceId,
        });
    };
    /**
     * @inheritDoc
     */
    Span.prototype.toJSON = function () {
        return dropUndefinedKeys({
            data: Object.keys(this.data).length > 0 ? this.data : undefined,
            description: this.description,
            op: this.op,
            parent_span_id: this.parentSpanId,
            span_id: this.spanId,
            start_timestamp: this.startTimestamp,
            status: this.status,
            tags: Object.keys(this.tags).length > 0 ? this.tags : undefined,
            timestamp: this.endTimestamp,
            trace_id: this.traceId,
        });
    };
    return Span;
}());

/** JSDoc */
var Transaction = /** @class */ (function (_super) {
    __extends(Transaction, _super);
    /**
     * This constructor should never be called manually. Those instrumenting tracing should use
     * `Sentry.startTransaction()`, and internal methods should use `hub.startTransaction()`.
     * @internal
     * @hideconstructor
     * @hidden
     */
    function Transaction(transactionContext, hub) {
        var _this = _super.call(this, transactionContext) || this;
        /**
         * The reference to the current hub.
         */
        _this._hub = getCurrentHub();
        if (isInstanceOf(hub, Hub)) {
            _this._hub = hub;
        }
        if (transactionContext.name) {
            _this.name = transactionContext.name;
        }
        _this._trimEnd = transactionContext.trimEnd;
        return _this;
    }
    /**
     * JSDoc
     */
    Transaction.prototype.setName = function (name) {
        this.name = name;
    };
    /**
     * Attaches SpanRecorder to the span itself
     * @param maxlen maximum number of spans that can be recorded
     */
    Transaction.prototype.initSpanRecorder = function (maxlen) {
        if (maxlen === void 0) { maxlen = 1000; }
        if (!this.spanRecorder) {
            this.spanRecorder = new SpanRecorder(maxlen);
        }
        this.spanRecorder.add(this);
    };
    /**
     * @inheritDoc
     */
    Transaction.prototype.finish = function (endTimestamp) {
        var _this = this;
        // This transaction is already finished, so we should not flush it again.
        if (this.endTimestamp !== undefined) {
            return undefined;
        }
        if (!this.name) {
            logger.warn('Transaction has no name, falling back to `<unlabeled transaction>`.');
            this.name = '<unlabeled transaction>';
        }
        // just sets the end timestamp
        _super.prototype.finish.call(this, endTimestamp);
        if (this.sampled !== true) {
            // At this point if `sampled !== true` we want to discard the transaction.
            logger.log('[Tracing] Discarding transaction because its trace was not chosen to be sampled.');
            return undefined;
        }
        var finishedSpans = this.spanRecorder ? this.spanRecorder.spans.filter(function (s) { return s !== _this && s.endTimestamp; }) : [];
        if (this._trimEnd && finishedSpans.length > 0) {
            this.endTimestamp = finishedSpans.reduce(function (prev, current) {
                if (prev.endTimestamp && current.endTimestamp) {
                    return prev.endTimestamp > current.endTimestamp ? prev : current;
                }
                return prev;
            }).endTimestamp;
        }
        return this._hub.captureEvent({
            contexts: {
                trace: this.getTraceContext(),
            },
            spans: finishedSpans,
            start_timestamp: this.startTimestamp,
            tags: this.tags,
            timestamp: this.endTimestamp,
            transaction: this.name,
            type: 'transaction',
        });
    };
    return Transaction;
}(Span));

var DEFAULT_IDLE_TIMEOUT = 1000;
/**
 * @inheritDoc
 */
var IdleTransactionSpanRecorder = /** @class */ (function (_super) {
    __extends(IdleTransactionSpanRecorder, _super);
    function IdleTransactionSpanRecorder(_pushActivity, _popActivity, transactionSpanId, maxlen) {
        if (transactionSpanId === void 0) { transactionSpanId = ''; }
        var _this = _super.call(this, maxlen) || this;
        _this._pushActivity = _pushActivity;
        _this._popActivity = _popActivity;
        _this.transactionSpanId = transactionSpanId;
        return _this;
    }
    /**
     * @inheritDoc
     */
    IdleTransactionSpanRecorder.prototype.add = function (span) {
        var _this = this;
        // We should make sure we do not push and pop activities for
        // the transaction that this span recorder belongs to.
        if (span.spanId !== this.transactionSpanId) {
            // We patch span.finish() to pop an activity after setting an endTimestamp.
            span.finish = function (endTimestamp) {
                span.endTimestamp = typeof endTimestamp === 'number' ? endTimestamp : timestampWithMs();
                _this._popActivity(span.spanId);
            };
            // We should only push new activities if the span does not have an end timestamp.
            if (span.endTimestamp === undefined) {
                this._pushActivity(span.spanId);
            }
        }
        _super.prototype.add.call(this, span);
    };
    return IdleTransactionSpanRecorder;
}(SpanRecorder));
/**
 * An IdleTransaction is a transaction that automatically finishes. It does this by tracking child spans as activities.
 * You can have multiple IdleTransactions active, but if the `onScope` option is specified, the idle transaction will
 * put itself on the scope on creation.
 */
var IdleTransaction = /** @class */ (function (_super) {
    __extends(IdleTransaction, _super);
    function IdleTransaction(transactionContext, _idleHub, 
    // The time to wait in ms until the idle transaction will be finished. Default: 1000
    _idleTimeout, 
    // If an idle transaction should be put itself on and off the scope automatically.
    _onScope) {
        if (_idleTimeout === void 0) { _idleTimeout = DEFAULT_IDLE_TIMEOUT; }
        if (_onScope === void 0) { _onScope = false; }
        var _this = _super.call(this, transactionContext, _idleHub) || this;
        _this._idleHub = _idleHub;
        _this._idleTimeout = _idleTimeout;
        _this._onScope = _onScope;
        // Activities store a list of active spans
        _this.activities = {};
        // Stores reference to the timeout that calls _beat().
        _this._heartbeatTimer = 0;
        // Amount of times heartbeat has counted. Will cause transaction to finish after 3 beats.
        _this._heartbeatCounter = 0;
        // We should not use heartbeat if we finished a transaction
        _this._finished = false;
        _this._beforeFinishCallbacks = [];
        if (_idleHub && _onScope) {
            // There should only be one active transaction on the scope
            clearActiveTransaction(_idleHub);
            // We set the transaction here on the scope so error events pick up the trace
            // context and attach it to the error.
            logger.log("Setting idle transaction on scope. Span ID: " + _this.spanId);
            _idleHub.configureScope(function (scope) { return scope.setSpan(_this); });
        }
        return _this;
    }
    /** {@inheritDoc} */
    IdleTransaction.prototype.finish = function (endTimestamp) {
        var e_1, _a;
        var _this = this;
        if (endTimestamp === void 0) { endTimestamp = timestampWithMs(); }
        this._finished = true;
        this.activities = {};
        if (this.spanRecorder) {
            logger.log('[Tracing] finishing IdleTransaction', new Date(endTimestamp * 1000).toISOString(), this.op);
            try {
                for (var _b = __values(this._beforeFinishCallbacks), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var callback = _c.value;
                    callback(this, endTimestamp);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            this.spanRecorder.spans = this.spanRecorder.spans.filter(function (span) {
                // If we are dealing with the transaction itself, we just return it
                if (span.spanId === _this.spanId) {
                    return true;
                }
                // We cancel all pending spans with status "cancelled" to indicate the idle transaction was finished early
                if (!span.endTimestamp) {
                    span.endTimestamp = endTimestamp;
                    span.setStatus(SpanStatus.Cancelled);
                    logger.log('[Tracing] cancelling span since transaction ended early', JSON.stringify(span, undefined, 2));
                }
                var keepSpan = span.startTimestamp < endTimestamp;
                if (!keepSpan) {
                    logger.log('[Tracing] discarding Span since it happened after Transaction was finished', JSON.stringify(span, undefined, 2));
                }
                return keepSpan;
            });
            // this._onScope is true if the transaction was previously on the scope.
            if (this._onScope) {
                clearActiveTransaction(this._idleHub);
            }
            logger.log('[Tracing] flushing IdleTransaction');
        }
        else {
            logger.log('[Tracing] No active IdleTransaction');
        }
        return _super.prototype.finish.call(this, endTimestamp);
    };
    /**
     * Register a callback function that gets excecuted before the transaction finishes.
     * Useful for cleanup or if you want to add any additional spans based on current context.
     *
     * This is exposed because users have no other way of running something before an idle transaction
     * finishes.
     */
    IdleTransaction.prototype.registerBeforeFinishCallback = function (callback) {
        this._beforeFinishCallbacks.push(callback);
    };
    /**
     * @inheritDoc
     */
    IdleTransaction.prototype.initSpanRecorder = function (maxlen) {
        var _this = this;
        if (!this.spanRecorder) {
            this._initTimeout = setTimeout(function () {
                if (!_this._finished) {
                    _this.finish();
                }
            }, this._idleTimeout);
            var pushActivity = function (id) {
                if (_this._finished) {
                    return;
                }
                _this._pushActivity(id);
            };
            var popActivity = function (id) {
                if (_this._finished) {
                    return;
                }
                _this._popActivity(id);
            };
            this.spanRecorder = new IdleTransactionSpanRecorder(pushActivity, popActivity, this.spanId, maxlen);
            // Start heartbeat so that transactions do not run forever.
            logger.log('Starting heartbeat');
            this._pingHeartbeat();
        }
        this.spanRecorder.add(this);
    };
    /**
     * Start tracking a specific activity.
     * @param spanId The span id that represents the activity
     */
    IdleTransaction.prototype._pushActivity = function (spanId) {
        if (this._initTimeout) {
            clearTimeout(this._initTimeout);
            this._initTimeout = undefined;
        }
        logger.log("[Tracing] pushActivity: " + spanId);
        this.activities[spanId] = true;
        logger.log('[Tracing] new activities count', Object.keys(this.activities).length);
    };
    /**
     * Remove an activity from usage
     * @param spanId The span id that represents the activity
     */
    IdleTransaction.prototype._popActivity = function (spanId) {
        var _this = this;
        if (this.activities[spanId]) {
            logger.log("[Tracing] popActivity " + spanId);
            // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
            delete this.activities[spanId];
            logger.log('[Tracing] new activities count', Object.keys(this.activities).length);
        }
        if (Object.keys(this.activities).length === 0) {
            var timeout = this._idleTimeout;
            // We need to add the timeout here to have the real endtimestamp of the transaction
            // Remember timestampWithMs is in seconds, timeout is in ms
            var end_1 = timestampWithMs() + timeout / 1000;
            setTimeout(function () {
                if (!_this._finished) {
                    _this.finish(end_1);
                }
            }, timeout);
        }
    };
    /**
     * Checks when entries of this.activities are not changing for 3 beats.
     * If this occurs we finish the transaction.
     */
    IdleTransaction.prototype._beat = function () {
        clearTimeout(this._heartbeatTimer);
        // We should not be running heartbeat if the idle transaction is finished.
        if (this._finished) {
            return;
        }
        var keys = Object.keys(this.activities);
        var heartbeatString = keys.length ? keys.reduce(function (prev, current) { return prev + current; }) : '';
        if (heartbeatString === this._prevHeartbeatString) {
            this._heartbeatCounter += 1;
        }
        else {
            this._heartbeatCounter = 1;
        }
        this._prevHeartbeatString = heartbeatString;
        if (this._heartbeatCounter >= 3) {
            logger.log("[Tracing] Transaction finished because of no change for 3 heart beats");
            this.setStatus(SpanStatus.DeadlineExceeded);
            this.setTag('heartbeat', 'failed');
            this.finish();
        }
        else {
            this._pingHeartbeat();
        }
    };
    /**
     * Pings the heartbeat
     */
    IdleTransaction.prototype._pingHeartbeat = function () {
        var _this = this;
        logger.log("pinging Heartbeat -> current counter: " + this._heartbeatCounter);
        this._heartbeatTimer = setTimeout(function () {
            _this._beat();
        }, 5000);
    };
    return IdleTransaction;
}(Transaction));
/**
 * Reset active transaction on scope
 */
function clearActiveTransaction(hub) {
    if (hub) {
        var scope = hub.getScope();
        if (scope) {
            var transaction = scope.getTransaction();
            if (transaction) {
                scope.setSpan(undefined);
            }
        }
    }
}

/** Returns all trace headers that are currently on the top scope. */
function traceHeaders() {
    var scope = this.getScope();
    if (scope) {
        var span = scope.getSpan();
        if (span) {
            return {
                'sentry-trace': span.toTraceparent(),
            };
        }
    }
    return {};
}
/**
 * Implements sampling inheritance and falls back to user-provided static rate if no parent decision is available.
 *
 * @param parentSampled: The parent transaction's sampling decision, if any.
 * @param givenRate: The rate to use if no parental decision is available.
 *
 * @returns The parent's sampling decision (if one exists), or the provided static rate
 */
function _inheritOrUseGivenRate(parentSampled, givenRate) {
    return parentSampled !== undefined ? parentSampled : givenRate;
}
/**
 * Makes a sampling decision for the given transaction and stores it on the transaction.
 *
 * Called every time a transaction is created. Only transactions which emerge with a `sampled` value of `true` will be
 * sent to Sentry.
 *
 * @param hub: The hub off of which to read config options
 * @param transaction: The transaction needing a sampling decision
 * @param samplingContext: Default and user-provided data which may be used to help make the decision
 *
 * @returns The given transaction with its `sampled` value set
 */
function sample(hub, transaction, samplingContext) {
    var _a;
    var client = hub.getClient();
    var options = (client && client.getOptions()) || {};
    // nothing to do if there's no client or if tracing is disabled
    if (!client || !hasTracingEnabled(options)) {
        transaction.sampled = false;
        return transaction;
    }
    // we would have bailed already if neither `tracesSampler` nor `tracesSampleRate` were defined, so one of these should
    // work; prefer the hook if so
    var sampleRate = typeof options.tracesSampler === 'function'
        ? options.tracesSampler(samplingContext)
        : _inheritOrUseGivenRate(samplingContext.parentSampled, options.tracesSampleRate);
    // Since this is coming from the user (or from a function provided by the user), who knows what we might get. (The
    // only valid values are booleans or numbers between 0 and 1.)
    if (!isValidSampleRate(sampleRate)) {
        logger.warn("[Tracing] Discarding transaction because of invalid sample rate.");
        transaction.sampled = false;
        return transaction;
    }
    // if the function returned 0 (or false), or if `tracesSampleRate` is 0, it's a sign the transaction should be dropped
    if (!sampleRate) {
        logger.log("[Tracing] Discarding transaction because " + (typeof options.tracesSampler === 'function'
            ? 'tracesSampler returned 0 or false'
            : 'tracesSampleRate is set to 0'));
        transaction.sampled = false;
        return transaction;
    }
    // Now we roll the dice. Math.random is inclusive of 0, but not of 1, so strict < is safe here. In case sampleRate is
    // a boolean, the < comparison will cause it to be automatically cast to 1 if it's true and 0 if it's false.
    transaction.sampled = Math.random() < sampleRate;
    // if we're not going to keep it, we're done
    if (!transaction.sampled) {
        logger.log("[Tracing] Discarding transaction because it's not included in the random sample (sampling rate = " + Number(sampleRate) + ")");
        return transaction;
    }
    // at this point we know we're keeping the transaction, whether because of an inherited decision or because it got
    // lucky with the dice roll
    transaction.initSpanRecorder((_a = options._experiments) === null || _a === void 0 ? void 0 : _a.maxSpans);
    logger.log("[Tracing] starting " + transaction.op + " transaction - " + transaction.name);
    return transaction;
}
/**
 * Gets the correct context to pass to the tracesSampler, based on the environment (i.e., which SDK is being used)
 *
 * @returns The default sample context
 */
function getDefaultSamplingContext(transactionContext) {
    // promote parent sampling decision (if any) for easy access
    var parentSampled = transactionContext.parentSampled;
    var defaultSamplingContext = { transactionContext: transactionContext, parentSampled: parentSampled };
    if (isNodeEnv()) {
        var domain = getActiveDomain();
        if (domain) {
            // for all node servers that we currently support, we store the incoming request object (which is an instance of
            // http.IncomingMessage) on the domain
            // the domain members are stored as an array, so our only way to find the request is to iterate through the array
            // and compare types
            var nodeHttpModule = dynamicRequire(module, 'http');
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            var requestType_1 = nodeHttpModule.IncomingMessage;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var request = domain.members.find(function (member) { return isInstanceOf(member, requestType_1); });
            if (request) {
                defaultSamplingContext.request = extractNodeRequestData(request);
            }
        }
    }
    // we must be in browser-js (or some derivative thereof)
    else {
        // we use `getGlobalObject()` rather than `window` since service workers also have a `location` property on `self`
        var globalObject = getGlobalObject();
        if ('location' in globalObject) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
            defaultSamplingContext.location = __assign({}, globalObject.location);
        }
    }
    return defaultSamplingContext;
}
/**
 * Checks the given sample rate to make sure it is valid type and value (a boolean, or a number between 0 and 1).
 */
function isValidSampleRate(rate) {
    // we need to check NaN explicitly because it's of type 'number' and therefore wouldn't get caught by this typecheck
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (isNaN(rate) || !(typeof rate === 'number' || typeof rate === 'boolean')) {
        logger.warn("[Tracing] Given sample rate is invalid. Sample rate must be a boolean or a number between 0 and 1. Got " + JSON.stringify(rate) + " of type " + JSON.stringify(typeof rate) + ".");
        return false;
    }
    // in case sampleRate is a boolean, it will get automatically cast to 1 if it's true and 0 if it's false
    if (rate < 0 || rate > 1) {
        logger.warn("[Tracing] Given sample rate is invalid. Sample rate must be between 0 and 1. Got " + rate + ".");
        return false;
    }
    return true;
}
/**
 * Creates a new transaction and adds a sampling decision if it doesn't yet have one.
 *
 * The Hub.startTransaction method delegates to this method to do its work, passing the Hub instance in as `this`.
 * Exists as a separate function so that it can be injected into the class as an "extension method."
 *
 * @param this: The Hub starting the transaction
 * @param transactionContext: Data used to configure the transaction
 * @param CustomSamplingContext: Optional data to be provided to the `tracesSampler` function (if any)
 *
 * @returns The new transaction
 *
 * @see {@link Hub.startTransaction}
 */
function _startTransaction(transactionContext, customSamplingContext) {
    var transaction = new Transaction(transactionContext, this);
    return sample(this, transaction, __assign(__assign({}, getDefaultSamplingContext(transactionContext)), customSamplingContext));
}
/**
 * Create new idle transaction.
 */
function startIdleTransaction(hub, transactionContext, idleTimeout, onScope) {
    var transaction = new IdleTransaction(transactionContext, hub, idleTimeout, onScope);
    return sample(hub, transaction, getDefaultSamplingContext(transactionContext));
}
/**
 * @private
 */
function _addTracingExtensions() {
    var carrier = getMainCarrier();
    if (carrier.__SENTRY__) {
        carrier.__SENTRY__.extensions = carrier.__SENTRY__.extensions || {};
        if (!carrier.__SENTRY__.extensions.startTransaction) {
            carrier.__SENTRY__.extensions.startTransaction = _startTransaction;
        }
        if (!carrier.__SENTRY__.extensions.traceHeaders) {
            carrier.__SENTRY__.extensions.traceHeaders = traceHeaders;
        }
    }
}
/**
 * This patches the global object and injects the Tracing extensions methods
 */
function addExtensionMethods() {
    _addTracingExtensions();
    // If an error happens globally, we should make sure transaction status is set to error.
    registerErrorInstrumentation();
}

var global = getGlobalObject();
/**
 * Add a listener that cancels and finishes a transaction when the global
 * document is hidden.
 */
function registerBackgroundTabDetection() {
    if (global && global.document) {
        global.document.addEventListener('visibilitychange', function () {
            var activeTransaction = getActiveTransaction();
            if (global.document.hidden && activeTransaction) {
                logger.log("[Tracing] Transaction: " + SpanStatus.Cancelled + " -> since tab moved to the background, op: " + activeTransaction.op);
                // We should not set status if it is already set, this prevent important statuses like
                // error or data loss from being overwritten on transaction.
                if (!activeTransaction.status) {
                    activeTransaction.setStatus(SpanStatus.Cancelled);
                }
                activeTransaction.setTag('visibilitychange', 'document.hidden');
                activeTransaction.finish();
            }
        });
    }
    else {
        logger.warn('[Tracing] Could not set up background tab detection due to lack of global document');
    }
}

var global$1 = getGlobalObject();
/** Class tracking metrics  */
var MetricsInstrumentation = /** @class */ (function () {
    function MetricsInstrumentation() {
        this._lcp = {};
        this._performanceCursor = 0;
        this._forceLCP = function () {
            /* No-op, replaced later if LCP API is available. */
            return;
        };
        if (global$1 && global$1.performance) {
            if (global$1.performance.mark) {
                global$1.performance.mark('sentry-tracing-init');
            }
            this._trackLCP();
        }
    }
    /** Add performance related spans to a transaction */
    MetricsInstrumentation.prototype.addPerformanceEntries = function (transaction) {
        if (!global$1 || !global$1.performance || !global$1.performance.getEntries) {
            // Gatekeeper if performance API not available
            return;
        }
        logger.log('[Tracing] Adding & adjusting spans using Performance API');
        // TODO(fixme): depending on the 'op' directly is brittle.
        if (transaction.op === 'pageload') {
            // Force any pending records to be dispatched.
            this._forceLCP();
            if (this._lcp) {
                // Set the last observed LCP score.
                transaction.setData('_sentry_web_vitals', { LCP: this._lcp });
            }
        }
        var timeOrigin = msToSec(performance.timeOrigin);
        var entryScriptSrc;
        if (global$1.document) {
            // eslint-disable-next-line @typescript-eslint/prefer-for-of
            for (var i = 0; i < document.scripts.length; i++) {
                // We go through all scripts on the page and look for 'data-entry'
                // We remember the name and measure the time between this script finished loading and
                // our mark 'sentry-tracing-init'
                if (document.scripts[i].dataset.entry === 'true') {
                    entryScriptSrc = document.scripts[i].src;
                    break;
                }
            }
        }
        var entryScriptStartTimestamp;
        var tracingInitMarkStartTime;
        global$1.performance
            .getEntries()
            .slice(this._performanceCursor)
            .forEach(function (entry) {
            var startTime = msToSec(entry.startTime);
            var duration = msToSec(entry.duration);
            if (transaction.op === 'navigation' && timeOrigin + startTime < transaction.startTimestamp) {
                return;
            }
            switch (entry.entryType) {
                case 'navigation':
                    addNavigationSpans(transaction, entry, timeOrigin);
                    break;
                case 'mark':
                case 'paint':
                case 'measure': {
                    var startTimestamp = addMeasureSpans(transaction, entry, startTime, duration, timeOrigin);
                    if (tracingInitMarkStartTime === undefined && entry.name === 'sentry-tracing-init') {
                        tracingInitMarkStartTime = startTimestamp;
                    }
                    break;
                }
                case 'resource': {
                    var resourceName = entry.name.replace(window.location.origin, '');
                    var endTimestamp = addResourceSpans(transaction, entry, resourceName, startTime, duration, timeOrigin);
                    // We remember the entry script end time to calculate the difference to the first init mark
                    if (entryScriptStartTimestamp === undefined && (entryScriptSrc || '').indexOf(resourceName) > -1) {
                        entryScriptStartTimestamp = endTimestamp;
                    }
                    break;
                }
                // Ignore other entry types.
            }
        });
        if (entryScriptStartTimestamp !== undefined && tracingInitMarkStartTime !== undefined) {
            _startChild(transaction, {
                description: 'evaluation',
                endTimestamp: tracingInitMarkStartTime,
                op: 'script',
                startTimestamp: entryScriptStartTimestamp,
            });
        }
        this._performanceCursor = Math.max(performance.getEntries().length - 1, 0);
    };
    /** Starts tracking the Largest Contentful Paint on the current page. */
    MetricsInstrumentation.prototype._trackLCP = function () {
        var _this = this;
        // Based on reference implementation from https://web.dev/lcp/#measure-lcp-in-javascript.
        // Use a try/catch instead of feature detecting `largest-contentful-paint`
        // support, since some browsers throw when using the new `type` option.
        // https://bugs.webkit.org/show_bug.cgi?id=209216
        try {
            // Keep track of whether (and when) the page was first hidden, see:
            // https://github.com/w3c/page-visibility/issues/29
            // NOTE: ideally this check would be performed in the document <head>
            // to avoid cases where the visibility state changes before this code runs.
            var firstHiddenTime_1 = document.visibilityState === 'hidden' ? 0 : Infinity;
            document.addEventListener('visibilitychange', function (event) {
                firstHiddenTime_1 = Math.min(firstHiddenTime_1, event.timeStamp);
            }, { once: true });
            var updateLCP_1 = function (entry) {
                // Only include an LCP entry if the page wasn't hidden prior to
                // the entry being dispatched. This typically happens when a page is
                // loaded in a background tab.
                if (entry.startTime < firstHiddenTime_1) {
                    // NOTE: the `startTime` value is a getter that returns the entry's
                    // `renderTime` value, if available, or its `loadTime` value otherwise.
                    // The `renderTime` value may not be available if the element is an image
                    // that's loaded cross-origin without the `Timing-Allow-Origin` header.
                    _this._lcp = __assign(__assign(__assign({}, (entry.id && { elementId: entry.id })), (entry.size && { elementSize: entry.size })), { value: entry.startTime });
                }
            };
            // Create a PerformanceObserver that calls `updateLCP` for each entry.
            var po_1 = new PerformanceObserver(function (entryList) {
                entryList.getEntries().forEach(updateLCP_1);
            });
            // Observe entries of type `largest-contentful-paint`, including buffered entries,
            // i.e. entries that occurred before calling `observe()` below.
            po_1.observe({
                buffered: true,
                // @ts-ignore type does not exist on obj
                type: 'largest-contentful-paint',
            });
            this._forceLCP = function () {
                if (po_1.takeRecords) {
                    po_1.takeRecords().forEach(updateLCP_1);
                }
            };
        }
        catch (e) {
            // Do nothing if the browser doesn't support this API.
        }
    };
    return MetricsInstrumentation;
}());
/** Instrument navigation entries */
function addNavigationSpans(transaction, entry, timeOrigin) {
    addPerformanceNavigationTiming(transaction, entry, 'unloadEvent', timeOrigin);
    addPerformanceNavigationTiming(transaction, entry, 'domContentLoadedEvent', timeOrigin);
    addPerformanceNavigationTiming(transaction, entry, 'loadEvent', timeOrigin);
    addPerformanceNavigationTiming(transaction, entry, 'connect', timeOrigin);
    addPerformanceNavigationTiming(transaction, entry, 'domainLookup', timeOrigin);
    addRequest(transaction, entry, timeOrigin);
}
/** Create measure related spans */
function addMeasureSpans(transaction, entry, startTime, duration, timeOrigin) {
    var measureStartTimestamp = timeOrigin + startTime;
    var measureEndTimestamp = measureStartTimestamp + duration;
    _startChild(transaction, {
        description: entry.name,
        endTimestamp: measureEndTimestamp,
        op: entry.entryType,
        startTimestamp: measureStartTimestamp,
    });
    return measureStartTimestamp;
}
/** Create resource related spans */
function addResourceSpans(transaction, entry, resourceName, startTime, duration, timeOrigin) {
    // we already instrument based on fetch and xhr, so we don't need to
    // duplicate spans here.
    if (entry.initiatorType === 'xmlhttprequest' || entry.initiatorType === 'fetch') {
        return undefined;
    }
    var data = {};
    if ('transferSize' in entry) {
        data['Transfer Size'] = entry.transferSize;
    }
    if ('encodedBodySize' in entry) {
        data['Encoded Body Size'] = entry.encodedBodySize;
    }
    if ('decodedBodySize' in entry) {
        data['Decoded Body Size'] = entry.decodedBodySize;
    }
    var startTimestamp = timeOrigin + startTime;
    var endTimestamp = startTimestamp + duration;
    _startChild(transaction, {
        description: resourceName,
        endTimestamp: endTimestamp,
        op: entry.initiatorType ? "resource." + entry.initiatorType : 'resource',
        startTimestamp: startTimestamp,
        data: data,
    });
    return endTimestamp;
}
/** Create performance navigation related spans */
function addPerformanceNavigationTiming(transaction, entry, event, timeOrigin) {
    var end = entry[event + "End"];
    var start = entry[event + "Start"];
    if (!start || !end) {
        return;
    }
    _startChild(transaction, {
        description: event,
        endTimestamp: timeOrigin + msToSec(end),
        op: 'browser',
        startTimestamp: timeOrigin + msToSec(start),
    });
}
/** Create request and response related spans */
function addRequest(transaction, entry, timeOrigin) {
    _startChild(transaction, {
        description: 'request',
        endTimestamp: timeOrigin + msToSec(entry.responseEnd),
        op: 'browser',
        startTimestamp: timeOrigin + msToSec(entry.requestStart),
    });
    _startChild(transaction, {
        description: 'response',
        endTimestamp: timeOrigin + msToSec(entry.responseEnd),
        op: 'browser',
        startTimestamp: timeOrigin + msToSec(entry.responseStart),
    });
}
/**
 * Helper function to start child on transactions. This function will make sure that the transaction will
 * use the start timestamp of the created child span if it is earlier than the transactions actual
 * start timestamp.
 */
function _startChild(transaction, _a) {
    var startTimestamp = _a.startTimestamp, ctx = __rest(_a, ["startTimestamp"]);
    if (startTimestamp && transaction.startTimestamp > startTimestamp) {
        transaction.startTimestamp = startTimestamp;
    }
    return transaction.startChild(__assign({ startTimestamp: startTimestamp }, ctx));
}

var DEFAULT_TRACING_ORIGINS = ['localhost', /^\//];
var defaultRequestInstrumentionOptions = {
    traceFetch: true,
    traceXHR: true,
    tracingOrigins: DEFAULT_TRACING_ORIGINS,
};
/** Registers span creators for xhr and fetch requests  */
function registerRequestInstrumentation(_options) {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    var _a = __assign(__assign({}, defaultRequestInstrumentionOptions), _options), traceFetch = _a.traceFetch, traceXHR = _a.traceXHR, tracingOrigins = _a.tracingOrigins, shouldCreateSpanForRequest = _a.shouldCreateSpanForRequest;
    // We should cache url -> decision so that we don't have to compute
    // regexp everytime we create a request.
    var urlMap = {};
    var defaultShouldCreateSpan = function (url) {
        if (urlMap[url]) {
            return urlMap[url];
        }
        var origins = tracingOrigins;
        urlMap[url] =
            origins.some(function (origin) { return isMatchingPattern(url, origin); }) &&
                !isMatchingPattern(url, 'sentry_key');
        return urlMap[url];
    };
    // We want that our users don't have to re-implement shouldCreateSpanForRequest themselves
    // That's why we filter out already unwanted Spans from tracingOrigins
    var shouldCreateSpan = defaultShouldCreateSpan;
    if (typeof shouldCreateSpanForRequest === 'function') {
        shouldCreateSpan = function (url) {
            return defaultShouldCreateSpan(url) && shouldCreateSpanForRequest(url);
        };
    }
    var spans = {};
    if (traceFetch) {
        addInstrumentationHandler({
            callback: function (handlerData) {
                _fetchCallback(handlerData, shouldCreateSpan, spans);
            },
            type: 'fetch',
        });
    }
    if (traceXHR) {
        addInstrumentationHandler({
            callback: function (handlerData) {
                xhrCallback(handlerData, shouldCreateSpan, spans);
            },
            type: 'xhr',
        });
    }
}
/**
 * Create and track fetch request spans
 */
function _fetchCallback(handlerData, shouldCreateSpan, spans) {
    if (!handlerData.fetchData || !shouldCreateSpan(handlerData.fetchData.url)) {
        return;
    }
    if (handlerData.endTimestamp && handlerData.fetchData.__span) {
        var span = spans[handlerData.fetchData.__span];
        if (span) {
            var response = handlerData.response;
            if (response) {
                span.setHttpStatus(response.status);
            }
            span.finish();
            // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
            delete spans[handlerData.fetchData.__span];
        }
        return;
    }
    var activeTransaction = getActiveTransaction();
    if (activeTransaction) {
        var span = activeTransaction.startChild({
            data: __assign(__assign({}, handlerData.fetchData), { type: 'fetch' }),
            description: handlerData.fetchData.method + " " + handlerData.fetchData.url,
            op: 'http',
        });
        handlerData.fetchData.__span = span.spanId;
        spans[span.spanId] = span;
        var request = (handlerData.args[0] = handlerData.args[0]);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var options = (handlerData.args[1] = handlerData.args[1] || {});
        var headers = options.headers;
        if (isInstanceOf(request, Request)) {
            headers = request.headers;
        }
        if (headers) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            if (typeof headers.append === 'function') {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                headers.append('sentry-trace', span.toTraceparent());
            }
            else if (Array.isArray(headers)) {
                headers = __spread(headers, [['sentry-trace', span.toTraceparent()]]);
            }
            else {
                headers = __assign(__assign({}, headers), { 'sentry-trace': span.toTraceparent() });
            }
        }
        else {
            headers = { 'sentry-trace': span.toTraceparent() };
        }
        options.headers = headers;
    }
}
/**
 * Create and track xhr request spans
 */
function xhrCallback(handlerData, shouldCreateSpan, spans) {
    if (!handlerData || !handlerData.xhr || !handlerData.xhr.__sentry_xhr__) {
        return;
    }
    var xhr = handlerData.xhr.__sentry_xhr__;
    if (!shouldCreateSpan(xhr.url)) {
        return;
    }
    // We only capture complete, non-sentry requests
    if (handlerData.xhr.__sentry_own_request__) {
        return;
    }
    if (handlerData.endTimestamp && handlerData.xhr.__sentry_xhr_span_id__) {
        var span = spans[handlerData.xhr.__sentry_xhr_span_id__];
        if (span) {
            span.setData('url', xhr.url);
            span.setData('method', xhr.method);
            span.setHttpStatus(xhr.status_code);
            span.finish();
            // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
            delete spans[handlerData.xhr.__sentry_xhr_span_id__];
        }
        return;
    }
    var activeTransaction = getActiveTransaction();
    if (activeTransaction) {
        var span = activeTransaction.startChild({
            data: __assign(__assign({}, xhr.data), { type: 'xhr' }),
            description: xhr.method + " " + xhr.url,
            op: 'http',
        });
        handlerData.xhr.__sentry_xhr_span_id__ = span.spanId;
        spans[handlerData.xhr.__sentry_xhr_span_id__] = span;
        if (handlerData.xhr.setRequestHeader) {
            try {
                handlerData.xhr.setRequestHeader('sentry-trace', span.toTraceparent());
            }
            catch (_) {
                // Error: InvalidStateError: Failed to execute 'setRequestHeader' on 'XMLHttpRequest': The object's state must be OPENED.
            }
        }
    }
}

var global$2 = getGlobalObject();
/**
 * Default function implementing pageload and navigation transactions
 */
function defaultRoutingInstrumentation(startTransaction, startTransactionOnPageLoad, startTransactionOnLocationChange) {
    if (startTransactionOnPageLoad === void 0) { startTransactionOnPageLoad = true; }
    if (startTransactionOnLocationChange === void 0) { startTransactionOnLocationChange = true; }
    if (!global$2 || !global$2.location) {
        logger.warn('Could not initialize routing instrumentation due to invalid location');
        return;
    }
    var startingUrl = global$2.location.href;
    var activeTransaction;
    if (startTransactionOnPageLoad) {
        activeTransaction = startTransaction({ name: global$2.location.pathname, op: 'pageload' });
    }
    if (startTransactionOnLocationChange) {
        addInstrumentationHandler({
            callback: function (_a) {
                var to = _a.to, from = _a.from;
                /**
                 * This early return is there to account for some cases where a navigation transaction starts right after
                 * long-running pageload. We make sure that if `from` is undefined and a valid `startingURL` exists, we don't
                 * create an uneccessary navigation transaction.
                 *
                 * This was hard to duplicate, but this behavior stopped as soon as this fix was applied. This issue might also
                 * only be caused in certain development environments where the usage of a hot module reloader is causing
                 * errors.
                 */
                if (from === undefined && startingUrl && startingUrl.indexOf(to) !== -1) {
                    startingUrl = undefined;
                    return;
                }
                if (from !== to) {
                    startingUrl = undefined;
                    if (activeTransaction) {
                        logger.log("[Tracing] Finishing current transaction with op: " + activeTransaction.op);
                        // If there's an open transaction on the scope, we need to finish it before creating an new one.
                        activeTransaction.finish();
                    }
                    activeTransaction = startTransaction({ name: global$2.location.pathname, op: 'navigation' });
                }
            },
            type: 'history',
        });
    }
}
/** default implementation of Browser Tracing before navigate */
function defaultBeforeNavigate(context) {
    return context;
}

var DEFAULT_MAX_TRANSACTION_DURATION_SECONDS = 600;
var DEFAULT_BROWSER_TRACING_OPTIONS = __assign({ beforeNavigate: defaultBeforeNavigate, idleTimeout: DEFAULT_IDLE_TIMEOUT, markBackgroundTransactions: true, maxTransactionDuration: DEFAULT_MAX_TRANSACTION_DURATION_SECONDS, routingInstrumentation: defaultRoutingInstrumentation, startTransactionOnLocationChange: true, startTransactionOnPageLoad: true }, defaultRequestInstrumentionOptions);
/**
 * The Browser Tracing integration automatically instruments browser pageload/navigation
 * actions as transactions, and captures requests, metrics and errors as spans.
 *
 * The integration can be configured with a variety of options, and can be extended to use
 * any routing library. This integration uses {@see IdleTransaction} to create transactions.
 */
var BrowserTracing = /** @class */ (function () {
    function BrowserTracing(_options) {
        /**
         * @inheritDoc
         */
        this.name = BrowserTracing.id;
        this._metrics = new MetricsInstrumentation();
        this._emitOptionsWarning = false;
        var tracingOrigins = defaultRequestInstrumentionOptions.tracingOrigins;
        // NOTE: Logger doesn't work in constructors, as it's initialized after integrations instances
        if (_options &&
            _options.tracingOrigins &&
            Array.isArray(_options.tracingOrigins) &&
            _options.tracingOrigins.length !== 0) {
            tracingOrigins = _options.tracingOrigins;
        }
        else {
            this._emitOptionsWarning = true;
        }
        this.options = __assign(__assign(__assign({}, DEFAULT_BROWSER_TRACING_OPTIONS), _options), { tracingOrigins: tracingOrigins });
    }
    /**
     * @inheritDoc
     */
    BrowserTracing.prototype.setupOnce = function (_, getCurrentHub) {
        var _this = this;
        this._getCurrentHub = getCurrentHub;
        if (this._emitOptionsWarning) {
            logger.warn('[Tracing] You need to define `tracingOrigins` in the options. Set an array of urls or patterns to trace.');
            logger.warn("[Tracing] We added a reasonable default for you: " + defaultRequestInstrumentionOptions.tracingOrigins);
        }
        // eslint-disable-next-line @typescript-eslint/unbound-method
        var _a = this.options, routingInstrumentation = _a.routingInstrumentation, startTransactionOnLocationChange = _a.startTransactionOnLocationChange, startTransactionOnPageLoad = _a.startTransactionOnPageLoad, markBackgroundTransactions = _a.markBackgroundTransactions, traceFetch = _a.traceFetch, traceXHR = _a.traceXHR, tracingOrigins = _a.tracingOrigins, shouldCreateSpanForRequest = _a.shouldCreateSpanForRequest;
        routingInstrumentation(function (context) { return _this._createRouteTransaction(context); }, startTransactionOnPageLoad, startTransactionOnLocationChange);
        if (markBackgroundTransactions) {
            registerBackgroundTabDetection();
        }
        registerRequestInstrumentation({ traceFetch: traceFetch, traceXHR: traceXHR, tracingOrigins: tracingOrigins, shouldCreateSpanForRequest: shouldCreateSpanForRequest });
    };
    /** Create routing idle transaction. */
    BrowserTracing.prototype._createRouteTransaction = function (context) {
        var _this = this;
        if (!this._getCurrentHub) {
            logger.warn("[Tracing] Did not create " + context.op + " transaction because _getCurrentHub is invalid.");
            return undefined;
        }
        // eslint-disable-next-line @typescript-eslint/unbound-method
        var _a = this.options, beforeNavigate = _a.beforeNavigate, idleTimeout = _a.idleTimeout, maxTransactionDuration = _a.maxTransactionDuration;
        // if beforeNavigate returns undefined, we should not start a transaction.
        var ctx = beforeNavigate(__assign(__assign(__assign({}, context), getHeaderContext()), { trimEnd: true }));
        if (ctx === undefined) {
            logger.log("[Tracing] Did not create " + context.op + " idleTransaction due to beforeNavigate");
            return undefined;
        }
        var hub = this._getCurrentHub();
        logger.log("[Tracing] starting " + ctx.op + " idleTransaction on scope");
        var idleTransaction = startIdleTransaction(hub, ctx, idleTimeout, true);
        idleTransaction.registerBeforeFinishCallback(function (transaction, endTimestamp) {
            _this._metrics.addPerformanceEntries(transaction);
            adjustTransactionDuration(secToMs(maxTransactionDuration), transaction, endTimestamp);
        });
        return idleTransaction;
    };
    /**
     * @inheritDoc
     */
    BrowserTracing.id = 'BrowserTracing';
    return BrowserTracing;
}());
/**
 * Gets transaction context from a sentry-trace meta.
 *
 * @returns Transaction context data from the header or undefined if there's no header or the header is malformed
 */
function getHeaderContext() {
    var header = getMetaContent('sentry-trace');
    if (header) {
        return extractTraceparentData(header);
    }
    return undefined;
}
/** Returns the value of a meta tag */
function getMetaContent(metaName) {
    var el = document.querySelector("meta[name=" + metaName + "]");
    return el ? el.getAttribute('content') : null;
}
/** Adjusts transaction value based on max transaction duration */
function adjustTransactionDuration(maxDuration, transaction, endTimestamp) {
    var diff = endTimestamp - transaction.startTimestamp;
    var isOutdatedTransaction = endTimestamp && (diff > maxDuration || diff < 0);
    if (isOutdatedTransaction) {
        transaction.setStatus(SpanStatus.DeadlineExceeded);
        transaction.setTag('maxTransactionDurationExceeded', 'true');
    }
}

/**
 * Express integration
 *
 * Provides an request and error handler for Express framework
 * as well as tracing capabilities
 */
var Express = /** @class */ (function () {
    /**
     * @inheritDoc
     */
    function Express(options) {
        if (options === void 0) { options = {}; }
        /**
         * @inheritDoc
         */
        this.name = Express.id;
        this._app = options.app;
    }
    /**
     * @inheritDoc
     */
    Express.prototype.setupOnce = function () {
        if (!this._app) {
            logger.error('ExpressIntegration is missing an Express instance');
            return;
        }
        instrumentMiddlewares(this._app);
    };
    /**
     * @inheritDoc
     */
    Express.id = 'Express';
    return Express;
}());
/**
 * Wraps original middleware function in a tracing call, which stores the info about the call as a span,
 * and finishes it once the middleware is done invoking.
 *
 * Express middlewares have 3 various forms, thus we have to take care of all of them:
 * // sync
 * app.use(function (req, res) { ... })
 * // async
 * app.use(function (req, res, next) { ... })
 * // error handler
 * app.use(function (err, req, res, next) { ... })
 */
// eslint-disable-next-line @typescript-eslint/ban-types
function wrap(fn) {
    var arity = fn.length;
    switch (arity) {
        case 2: {
            return function (_req, res) {
                var transaction = res.__sentry_transaction;
                if (transaction) {
                    var span_1 = transaction.startChild({
                        description: fn.name,
                        op: 'middleware',
                    });
                    res.once('finish', function () {
                        span_1.finish();
                    });
                }
                // eslint-disable-next-line prefer-rest-params
                return fn.apply(this, arguments);
            };
        }
        case 3: {
            return function (req, res, next) {
                var transaction = res.__sentry_transaction;
                var span = transaction &&
                    transaction.startChild({
                        description: fn.name,
                        op: 'middleware',
                    });
                fn.call(this, req, res, function () {
                    if (span) {
                        span.finish();
                    }
                    // eslint-disable-next-line prefer-rest-params
                    return next.apply(this, arguments);
                });
            };
        }
        case 4: {
            return function (err, req, res, next) {
                var transaction = res.__sentry_transaction;
                var span = transaction &&
                    transaction.startChild({
                        description: fn.name,
                        op: 'middleware',
                    });
                fn.call(this, err, req, res, function () {
                    if (span) {
                        span.finish();
                    }
                    // eslint-disable-next-line prefer-rest-params
                    return next.apply(this, arguments);
                });
            };
        }
        default: {
            throw new Error("Express middleware takes 2-4 arguments. Got: " + arity);
        }
    }
}
/**
 * Takes all the function arguments passed to the original `app.use` call
 * and wraps every function, as well as array of functions with a call to our `wrap` method.
 * We have to take care of the arrays as well as iterate over all of the arguments,
 * as `app.use` can accept middlewares in few various forms.
 *
 * app.use([<path>], <fn>)
 * app.use([<path>], <fn>, ...<fn>)
 * app.use([<path>], ...<fn>[])
 */
function wrapUseArgs(args) {
    return Array.from(args).map(function (arg) {
        if (typeof arg === 'function') {
            return wrap(arg);
        }
        if (Array.isArray(arg)) {
            return arg.map(function (a) {
                if (typeof a === 'function') {
                    return wrap(a);
                }
                return a;
            });
        }
        return arg;
    });
}
/**
 * Patches original app.use to utilize our tracing functionality
 */
function instrumentMiddlewares(app) {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    var originalAppUse = app.use;
    app.use = function () {
        // eslint-disable-next-line prefer-rest-params
        return originalAppUse.apply(this, wrapUseArgs(arguments));
    };
    return app;
}

var ApmIntegrations = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Express: Express
});

var Integrations = __assign(__assign({}, ApmIntegrations), { BrowserTracing: BrowserTracing });
// We are patching the global object with our hub extension methods
addExtensionMethods();

export { Integrations };
