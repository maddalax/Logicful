'use strict';

var fs = require('fs');
var path = require('path');
var uuid = require('uuid');
var get$1 = require('lodash.get');
var _set = require('lodash.set');
require('lodash.has');
var Fuse = require('fuse.js');
var Select = require('svelte-select');
require('bowser');
require('traverse');
var Stream = require('stream');
var http = require('http');
var Url = require('url');
var https = require('https');
var zlib = require('zlib');
var compression = require('compression');
var express = require('express');
var sirv = require('sirv');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
    if (e && e.__esModule) { return e; } else {
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () {
                            return e[k];
                        }
                    });
                }
            });
        }
        n['default'] = e;
        return Object.freeze(n);
    }
}

var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs);
var path__default = /*#__PURE__*/_interopDefaultLegacy(path);
var get__default = /*#__PURE__*/_interopDefaultLegacy(get$1);
var _set__default = /*#__PURE__*/_interopDefaultLegacy(_set);
var Fuse__default = /*#__PURE__*/_interopDefaultLegacy(Fuse);
var Select__default = /*#__PURE__*/_interopDefaultLegacy(Select);
var Stream__default = /*#__PURE__*/_interopDefaultLegacy(Stream);
var http__default = /*#__PURE__*/_interopDefaultLegacy(http);
var Url__default = /*#__PURE__*/_interopDefaultLegacy(Url);
var https__default = /*#__PURE__*/_interopDefaultLegacy(https);
var zlib__default = /*#__PURE__*/_interopDefaultLegacy(zlib);
var compression__default = /*#__PURE__*/_interopDefaultLegacy(compression);
var express__default = /*#__PURE__*/_interopDefaultLegacy(express);
var sirv__default = /*#__PURE__*/_interopDefaultLegacy(sirv);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

const get = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.end("you made a get request");
});
const post = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.end("you made a post request");
});

var route_0 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get: get,
    post: post
});

function noop() { }
function run(fn) {
    return fn();
}
function blank_object() {
    return Object.create(null);
}
function run_all(fns) {
    fns.forEach(run);
}
function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
}
function subscribe(store, ...callbacks) {
    if (store == null) {
        return noop;
    }
    const unsub = store.subscribe(...callbacks);
    return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function get_store_value(store) {
    let value;
    subscribe(store, _ => value = _)();
    return value;
}

let current_component;
function set_current_component(component) {
    current_component = component;
}
function get_current_component() {
    if (!current_component)
        throw new Error(`Function called outside component initialization`);
    return current_component;
}
function onMount(fn) {
    get_current_component().$$.on_mount.push(fn);
}
function afterUpdate(fn) {
    get_current_component().$$.after_update.push(fn);
}
function onDestroy(fn) {
    get_current_component().$$.on_destroy.push(fn);
}
function setContext(key, context) {
    get_current_component().$$.context.set(key, context);
}
function getContext(key) {
    return get_current_component().$$.context.get(key);
}

const dirty_components = [];
const binding_callbacks = [];
const render_callbacks = [];
const flush_callbacks = [];
const resolved_promise = Promise.resolve();
let update_scheduled = false;
function schedule_update() {
    if (!update_scheduled) {
        update_scheduled = true;
        resolved_promise.then(flush);
    }
}
function tick() {
    schedule_update();
    return resolved_promise;
}
function add_render_callback(fn) {
    render_callbacks.push(fn);
}
let flushing = false;
const seen_callbacks = new Set();
function flush() {
    if (flushing)
        return;
    flushing = true;
    do {
        // first, call beforeUpdate functions
        // and update components
        for (let i = 0; i < dirty_components.length; i += 1) {
            const component = dirty_components[i];
            set_current_component(component);
            update(component.$$);
        }
        dirty_components.length = 0;
        while (binding_callbacks.length)
            binding_callbacks.pop()();
        // then, once components are updated, call
        // afterUpdate functions. This may cause
        // subsequent updates...
        for (let i = 0; i < render_callbacks.length; i += 1) {
            const callback = render_callbacks[i];
            if (!seen_callbacks.has(callback)) {
                // ...so guard against infinite loops
                seen_callbacks.add(callback);
                callback();
            }
        }
        render_callbacks.length = 0;
    } while (dirty_components.length);
    while (flush_callbacks.length) {
        flush_callbacks.pop()();
    }
    update_scheduled = false;
    flushing = false;
    seen_callbacks.clear();
}
function update($$) {
    if ($$.fragment !== null) {
        $$.update();
        run_all($$.before_update);
        const dirty = $$.dirty;
        $$.dirty = [-1];
        $$.fragment && $$.fragment.p($$.ctx, dirty);
        $$.after_update.forEach(add_render_callback);
    }
}

const globals = (typeof window !== 'undefined'
    ? window
    : typeof globalThis !== 'undefined'
        ? globalThis
        : global);
const escaped = {
    '"': '&quot;',
    "'": '&#39;',
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;'
};
function escape(html) {
    return String(html).replace(/["'&<>]/g, match => escaped[match]);
}
function each(items, fn) {
    let str = '';
    for (let i = 0; i < items.length; i += 1) {
        str += fn(items[i], i);
    }
    return str;
}
const missing_component = {
    $$render: () => ''
};
function validate_component(component, name) {
    if (!component || !component.$$render) {
        if (name === 'svelte:component')
            name += ' this={...}';
        throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`);
    }
    return component;
}
let on_destroy;
function create_ssr_component(fn) {
    function $$render(result, props, bindings, slots) {
        const parent_component = current_component;
        const $$ = {
            on_destroy,
            context: new Map(parent_component ? parent_component.$$.context : []),
            // these will be immediately discarded
            on_mount: [],
            before_update: [],
            after_update: [],
            callbacks: blank_object()
        };
        set_current_component({ $$ });
        const html = fn(result, props, bindings, slots);
        set_current_component(parent_component);
        return html;
    }
    return {
        render: (props = {}, options = {}) => {
            on_destroy = [];
            const result = { title: '', head: '', css: new Set() };
            const html = $$render(result, props, {}, options);
            run_all(on_destroy);
            return {
                html,
                css: {
                    code: Array.from(result.css).map(css => css.code).join('\n'),
                    map: null // TODO
                },
                head: result.title + result.head
            };
        },
        $$render
    };
}
function add_attribute(name, value, boolean) {
    if (value == null || (boolean && !value))
        return '';
    return ` ${name}${value === true ? '' : `=${typeof value === 'string' ? JSON.stringify(escape(value)) : `"${value}"`}`}`;
}

const subscriber_queue = [];
/**
 * Create a `Writable` store that allows both updating and reading by subscription.
 * @param {*=}value initial value
 * @param {StartStopNotifier=}start start and stop notifications for subscriptions
 */
function writable(value, start = noop) {
    let stop;
    const subscribers = [];
    function set(new_value) {
        if (safe_not_equal(value, new_value)) {
            value = new_value;
            if (stop) { // store is ready
                const run_queue = !subscriber_queue.length;
                for (let i = 0; i < subscribers.length; i += 1) {
                    const s = subscribers[i];
                    s[1]();
                    subscriber_queue.push(s, value);
                }
                if (run_queue) {
                    for (let i = 0; i < subscriber_queue.length; i += 2) {
                        subscriber_queue[i][0](subscriber_queue[i + 1]);
                    }
                    subscriber_queue.length = 0;
                }
            }
        }
    }
    function update(fn) {
        set(fn(value));
    }
    function subscribe(run, invalidate = noop) {
        const subscriber = [run, invalidate];
        subscribers.push(subscriber);
        if (subscribers.length === 1) {
            stop = start(set) || noop;
        }
        run(value);
        return () => {
            const index = subscribers.indexOf(subscriber);
            if (index !== -1) {
                subscribers.splice(index, 1);
            }
            if (subscribers.length === 0) {
                stop();
                stop = null;
            }
        };
    }
    return { set, update, subscribe };
}

const CONTEXT_KEY = {};

const config = {};
function setConfig(key, value) {
    config[key] = value;
}

/* src\components\layout\Navbar.svelte generated by Svelte v3.24.1 */

const css = {
	code: ".navbar-dark.svelte-1b0593o{background-color:#252f4c}.btn.svelte-1b0593o{border-radius:0.3em !important}",
	map: "{\"version\":3,\"file\":\"Navbar.svelte\",\"sources\":[\"Navbar.svelte\"],\"sourcesContent\":[\"<header class=\\\"header-global\\\">\\r\\n  <nav id=\\\"navbar-main\\\" aria-label=\\\"Primary navigation\\\" class=\\\"navbar navbar-main navbar-expand-lg navbar-theme-primary headroom navbar-dark\\\">\\r\\n    <div class=\\\"container position-relative\\\" style=\\\"max-width: none; padding-right: 5em; padding-left: 5em;\\\">\\r\\n      <a class=\\\"navbar-brand mr-lg-5\\\" href=\\\"/\\\">\\r\\n        <img class=\\\"navbar-brand-dark\\\" src=\\\"/assets/img/brand/light.svg\\\" alt=\\\"Logo light\\\" />\\r\\n        <img class=\\\"navbar-brand-light\\\" src=\\\"/assets/img/brand/dark.svg\\\" alt=\\\"Logo dark\\\" />\\r\\n      </a>\\r\\n      <div class=\\\"navbar-collapse collapse mr-auto\\\" id=\\\"navbar_global\\\">\\r\\n        <div class=\\\"navbar-collapse-header\\\">\\r\\n          <div class=\\\"row\\\">\\r\\n            <div class=\\\"col-6 collapse-brand\\\">\\r\\n              <a href=\\\"../../index.html\\\">\\r\\n                <img src=\\\"/assets/img/brand/dark.svg\\\" alt=\\\"Themesberg logo\\\" />\\r\\n              </a>\\r\\n            </div>\\r\\n            <div class=\\\"col-6 collapse-close\\\">\\r\\n              <a\\r\\n                href=\\\"#navbar_global\\\"\\r\\n                class=\\\"fas fa-times\\\"\\r\\n                data-toggle=\\\"collapse\\\"\\r\\n                data-target=\\\"#navbar_global\\\"\\r\\n                aria-controls=\\\"navbar_global\\\"\\r\\n                aria-expanded=\\\"false\\\"\\r\\n                title=\\\"close\\\"\\r\\n                aria-label=\\\"Toggle navigation\\\" />\\r\\n            </div>\\r\\n          </div>\\r\\n        </div>\\r\\n        <ul class=\\\"navbar-nav navbar-nav-hover align-items-lg-center\\\">\\r\\n          <li class=\\\"nav-item\\\">\\r\\n            <a href=\\\"/\\\" class=\\\"nav-link\\\">\\r\\n              <span class=\\\"fas fa-columns\\\" style=\\\"color: white; font-size: 1.1em; width: none; padding-right: 0.1em;\\\"/>\\r\\n              Dashboard\\r\\n            </a>\\r\\n          </li>\\r\\n          <li class=\\\"nav-item\\\">\\r\\n            <div style=\\\"display: flex; vertical-align: middle;\\\">\\r\\n            <a href=\\\"/folder\\\" class=\\\"nav-link\\\">\\r\\n              <span class=\\\"fas fa-bars\\\" style=\\\"color: white; font-size: 1.1em; width: none; padding-right: 0.1em;\\\"/>\\r\\n              My Forms\\r\\n            </a>\\r\\n          </li>\\r\\n          <li class=\\\"nav-item\\\">\\r\\n            <a href=\\\"/builder\\\" class=\\\"nav-link\\\">\\r\\n              <span class=\\\"fas fa-hammer\\\" style=\\\"color: white; font-size: 1.1em; width: none; padding-right: 0.2em;\\\"/>\\r\\n              Builder\\r\\n            </a>\\r\\n          </li>\\r\\n\\r\\n          <!-- <li class=\\\"nav-item dropdown\\\">\\r\\n            <a href=\\\"#\\\" class=\\\"nav-link dropdown-toggle\\\" id=\\\"dashboardDropdown\\\" aria-expanded=\\\"false\\\" data-toggle=\\\"dropdown\\\">\\r\\n              Dashboard\\r\\n              <span class=\\\"fas fa-angle-down nav-link-arrow ml-1\\\" />\\r\\n            </a>\\r\\n            <div class=\\\"dropdown-menu dropdown-megamenu-sm px-0 py-2 p-lg-4\\\" aria-labelledby=\\\"dashboardDropdown\\\">\\r\\n              <div class=\\\"row\\\">\\r\\n                <div class=\\\"col-6\\\">\\r\\n                  <h6 class=\\\"d-block mb-3 text-primary\\\">User dashboard</h6>\\r\\n                  <ul class=\\\"list-style-none mb-4\\\">\\r\\n                    <li class=\\\"mb-2 megamenu-item\\\">\\r\\n                      <a class=\\\"megamenu-link\\\" href=\\\"../../html/dashboard/account.html\\\">My account</a>\\r\\n                    </li>\\r\\n                    <li class=\\\"mb-2 megamenu-item\\\">\\r\\n                      <a class=\\\"megamenu-link\\\" href=\\\"../../html/dashboard/settings.html\\\">Settings</a>\\r\\n                    </li>\\r\\n                    <li class=\\\"mb-2 megamenu-item\\\">\\r\\n                      <a class=\\\"megamenu-link\\\" href=\\\"../../html/dashboard/security.html\\\">Security</a>\\r\\n                    </li>\\r\\n                  </ul>\\r\\n                  <h6 class=\\\"d-block mb-3 text-primary\\\">Items</h6>\\r\\n                  <ul class=\\\"list-style-none\\\">\\r\\n                    <li class=\\\"mb-2 megamenu-item\\\">\\r\\n                      <a class=\\\"megamenu-link\\\" href=\\\"../../html/dashboard/my-items.html\\\">My items</a>\\r\\n                    </li>\\r\\n                    <li class=\\\"mb-2 megamenu-item\\\">\\r\\n                      <a class=\\\"megamenu-link\\\" href=\\\"../../html/dashboard/edit-item.html\\\">Edit item</a>\\r\\n                    </li>\\r\\n                  </ul>\\r\\n                </div>\\r\\n                <div class=\\\"col-6\\\">\\r\\n                  <h6 class=\\\"d-block mb-3 text-primary\\\">Messaging</h6>\\r\\n                  <ul class=\\\"list-style-none mb-4\\\">\\r\\n                    <li class=\\\"mb-2 megamenu-item\\\">\\r\\n                      <a class=\\\"megamenu-link\\\" href=\\\"../../html/dashboard/messages.html\\\">Messages</a>\\r\\n                    </li>\\r\\n                    <li class=\\\"mb-2 megamenu-item\\\">\\r\\n                      <a class=\\\"megamenu-link\\\" href=\\\"../../html/dashboard/single-message.html\\\">Chat</a>\\r\\n                    </li>\\r\\n                  </ul>\\r\\n                  <h6 class=\\\"d-block mb-3 text-primary\\\">Billing</h6>\\r\\n                  <ul class=\\\"list-style-none mb-4\\\">\\r\\n                    <li class=\\\"mb-2 megamenu-item\\\">\\r\\n                      <a class=\\\"megamenu-link\\\" href=\\\"../../html/dashboard/billing.html\\\">Billing details</a>\\r\\n                    </li>\\r\\n                    <li class=\\\"mb-2 megamenu-item\\\">\\r\\n                      <a class=\\\"megamenu-link\\\" href=\\\"../../html/dashboard/invoice.html\\\">Invoice</a>\\r\\n                    </li>\\r\\n                  </ul>\\r\\n                </div>\\r\\n              </div>\\r\\n            </div>\\r\\n          </li> -->\\r\\n        </ul>\\r\\n      </div>\\r\\n      <div class=\\\"d-flex align-items-center\\\">\\r\\n        <a href=\\\"/account-settings\\\" class=\\\"btn btn-sm btn-outline-soft animate-up-2\\\">\\r\\n          My Account\\r\\n        </a>\\r\\n        \\r\\n        <button class=\\\"navbar-toggler ml-2\\\" type=\\\"button\\\" data-toggle=\\\"collapse\\\" data-target=\\\"#navbar_global\\\" aria-controls=\\\"navbar_global\\\" aria-expanded=\\\"false\\\" aria-label=\\\"Toggle navigation\\\">\\r\\n          <span class=\\\"navbar-toggler-icon\\\" />\\r\\n        </button>\\r\\n      </div>\\r\\n    </div>\\r\\n  </nav>\\r\\n</header>\\r\\n\\r\\n<style>\\r\\n  .navbar-dark {\\r\\n    background-color: #252f4c;\\r\\n  }\\r\\n\\r\\n  .btn{\\r\\n    border-radius: 0.3em !important;\\r\\n  }\\r\\n</style>\\r\\n\"],\"names\":[],\"mappings\":\"AAsHE,YAAY,eAAC,CAAC,AACZ,gBAAgB,CAAE,OAAO,AAC3B,CAAC,AAED,mBAAI,CAAC,AACH,aAAa,CAAE,KAAK,CAAC,UAAU,AACjC,CAAC\"}"
};

const Navbar = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	$$result.css.add(css);

	return `<header class="${"header-global"}"><nav id="${"navbar-main"}" aria-label="${"Primary navigation"}" class="${"navbar navbar-main navbar-expand-lg navbar-theme-primary headroom navbar-dark svelte-1b0593o"}"><div class="${"container position-relative"}" style="${"max-width: none; padding-right: 5em; padding-left: 5em;"}"><a class="${"navbar-brand mr-lg-5"}" href="${"/"}"><img class="${"navbar-brand-dark"}" src="${"/assets/img/brand/light.svg"}" alt="${"Logo light"}">
        <img class="${"navbar-brand-light"}" src="${"/assets/img/brand/dark.svg"}" alt="${"Logo dark"}"></a>
      <div class="${"navbar-collapse collapse mr-auto"}" id="${"navbar_global"}"><div class="${"navbar-collapse-header"}"><div class="${"row"}"><div class="${"col-6 collapse-brand"}"><a href="${"../../index.html"}"><img src="${"/assets/img/brand/dark.svg"}" alt="${"Themesberg logo"}"></a></div>
            <div class="${"col-6 collapse-close"}"><a href="${"#navbar_global"}" class="${"fas fa-times"}" data-toggle="${"collapse"}" data-target="${"#navbar_global"}" aria-controls="${"navbar_global"}" aria-expanded="${"false"}" title="${"close"}" aria-label="${"Toggle navigation"}"></a></div></div></div>
        <ul class="${"navbar-nav navbar-nav-hover align-items-lg-center"}"><li class="${"nav-item"}"><a href="${"/"}" class="${"nav-link"}"><span class="${"fas fa-columns"}" style="${"color: white; font-size: 1.1em; width: none; padding-right: 0.1em;"}"></span>
              Dashboard
            </a></li>
          <li class="${"nav-item"}"><div style="${"display: flex; vertical-align: middle;"}"><a href="${"/folder"}" class="${"nav-link"}"><span class="${"fas fa-bars"}" style="${"color: white; font-size: 1.1em; width: none; padding-right: 0.1em;"}"></span>
              My Forms
            </a></div></li>
          <li class="${"nav-item"}"><a href="${"/builder"}" class="${"nav-link"}"><span class="${"fas fa-hammer"}" style="${"color: white; font-size: 1.1em; width: none; padding-right: 0.2em;"}"></span>
              Builder
            </a></li>

          </ul></div>
      <div class="${"d-flex align-items-center"}"><a href="${"/account-settings"}" class="${"btn btn-sm btn-outline-soft animate-up-2 svelte-1b0593o"}">My Account
        </a>
        
        <button class="${"navbar-toggler ml-2"}" type="${"button"}" data-toggle="${"collapse"}" data-target="${"#navbar_global"}" aria-controls="${"navbar_global"}" aria-expanded="${"false"}" aria-label="${"Toggle navigation"}"><span class="${"navbar-toggler-icon"}"></span></button></div></div></nav>
</header>`;
});

/* src\components\layout\Preloader.svelte generated by Svelte v3.24.1 */

const Preloader = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let show = true;

	onMount(() => {
		setTimeout(
			() => {
				show = false;
			},
			150
		);
	});

	return `${show
	? `<div class="${"preloader bg-dark flex-column justify-content-center align-items-center"}" id="${"preloader"}"><div class="${"d-flex justify-content-center"}"><div class="${"spinner-border"}" style="${"width: 3rem; height: 3rem;"}" role="${"status"}"><span class="${"sr-only"}">Loading...</span></div></div></div>`
	: ``}`;
});

const map = new Map();
function subscribe$1(event, subscriber) {
    if (!map.has(event)) {
        map.set(event, [subscriber]);
    }
    else {
        const subscribers = map.get(event);
        subscribers.push(subscriber);
        map.set(event, subscribers);
    }
}
function subscribePrivate(id, event, subscriber) {
    const e = `${id}-${event}`;
    subscribe$1(e, subscriber);
}
function dispatchSingle(event, payload) {
    const result = dispatchSync(event, payload)[0];
    console.debug("dispatch_event_single", event, payload, result);
    return result;
}
function dispatch(event, payload) {
    return __awaiter(this, void 0, void 0, function* () {
        console.debug("dispatch_event", event, payload);
        if (map.has(event)) {
            const subscribers = map.get(event);
            const promises = subscribers.map((subscriber) => {
                return subscriber(payload);
            });
            yield Promise.all(promises);
        }
    });
}
function dispatchSync(event, payload) {
    console.debug("dispatch_event_sync", event, payload);
    if (map.has(event)) {
        const subscribers = map.get(event);
        return subscribers.map((subscriber) => {
            return subscriber(payload);
        });
    }
    return [];
}

function dispatchFieldChange(field, change) {
    dispatchSync("field_changed", {
        field,
        change
    });
}
function subscribeFieldChange(callback) {
    subscribe$1("field_changed", (payload) => {
        if (!payload.field) {
            console.error("Field change was undefined.", payload);
            return;
        }
        callback(payload.field, payload.change);
    });
}

function randomStringSmall() {
    return Math.random().toString(36).substring(2, 3) + Math.random().toString(36).substring(2, 5);
}
function randomString() {
    return uuid.v4();
}

/* src\components\layout\Dialog.svelte generated by Svelte v3.24.1 */

const Dialog = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
		function adopt(value) {
			return value instanceof P
			? value
			: new P(function (resolve) {
						resolve(value);
					});
		}

		return new (P || (P = Promise))(function (resolve, reject) {
				function fulfilled(value) {
					try {
						step(generator.next(value));
					} catch(e) {
						reject(e);
					}
				}

				function rejected(value) {
					try {
						step(generator["throw"](value));
					} catch(e) {
						reject(e);
					}
				}

				function step(result) {
					result.done
					? resolve(result.value)
					: adopt(result.value).then(fulfilled, rejected);
				}

				step((generator = generator.apply(thisArg, _arguments || [])).next());
			});
	};

	
	let { title = "" } = $$props;
	let { isOpen = false } = $$props;

	let { onClose = () => {
		
	} } = $$props;

	let { actions = [] } = $$props;
	let container;
	let modal;
	let processing = -1;
	let focusable = null;

	onMount(() => {
		//@ts-ignore
		modal = new bootstrap.Modal(container);

		container.addEventListener("hidden.bs.modal", function (e) {
			close();
		});

		if (isOpen) {
			open();
		}
	});

	function open() {
		isOpen = true;
		modal.show();
	}

	function close() {
		isOpen = false;
		modal.hide();

		onClose === null || onClose === void 0
		? void 0
		: onClose();
	}

	afterUpdate(() => {
	});

	if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
	if ($$props.isOpen === void 0 && $$bindings.isOpen && isOpen !== void 0) $$bindings.isOpen(isOpen);
	if ($$props.onClose === void 0 && $$bindings.onClose && onClose !== void 0) $$bindings.onClose(onClose);
	if ($$props.actions === void 0 && $$bindings.actions && actions !== void 0) $$bindings.actions(actions);

	return `<div class="${"modal fade"}" tabindex="${"-1"}" aria-labelledby="${"app-dialog-label"}" aria-hidden="${"true"}"${add_attribute("this", container, 1)}><div class="${"modal-dialog"}"><div class="${"modal-content"}"><div class="${"modal-header"}"><h5 class="${"modal-title"}" id="${"app-dialog-label"}">${escape(title)}</h5>
        <button type="${"button"}" class="${"close"}" data-dismiss="${"modal"}" aria-label="${"Close"}"><span aria-hidden="${"true"}">×</span></button></div>
      <div class="${"modal-body"}">${$$slots.default ? $$slots.default({}) : ``}</div>
      ${actions.length > 0
	? `<div class="${"modal-footer"}">${each(actions, (action, index) => `${processing === index
		? `${ `<button${add_attribute("class", "btn btn-" + action.type, 0)} ${ "disabled" }>Processing...</button>`}`
		: `${action.focus
			? `<button${add_attribute("class", "btn btn-" + action.type, 0)}${add_attribute("this", focusable, 1)}>${escape(action.label)}</button>`
			: `<button${add_attribute("class", "btn btn-" + action.type, 0)}>${escape(action.label)}</button>`}`}`)}</div>`
	: ``}</div></div></div>`;
});

/* src\routes\_layout.svelte generated by Svelte v3.24.1 */

const preload = (page, session) => {
	setConfig("API_ENDPOINT", session["API_ENDPOINT"]);
};

const Layout = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let $page;
	let { segment = "" } = $$props;

	const { page } = stores$1();
	$page = get_store_value(page);
	let path;
	if ($$props.segment === void 0 && $$bindings.segment && segment !== void 0) $$bindings.segment(segment);
	$page = get_store_value(page);
	path = $page.path.slice(1);

	return `${($$result.head += `${($$result.title = `<title>${escape(path
	? path.charAt(0).toUpperCase() + path.slice(1)
	: "Index")}</title>`, "")}`, "")}

${segment === "preview"
	? `${$$slots.default ? $$slots.default({}) : ``}`
	: `${validate_component(Preloader, "Preloader").$$render($$result, {}, {}, {})}
  ${validate_component(Navbar, "Navbar").$$render($$result, {}, {}, {})}

  ${$$slots.default ? $$slots.default({}) : ``}

  

  ${validate_component(Dialog, "Dialog").$$render($$result, {}, {}, {})}`}`;
});

var root_comp = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': Layout,
    preload: preload
});

/* src\routes\_error.svelte generated by Svelte v3.24.1 */

const css$1 = {
	code: "section.svelte-ne8acg{flex:1 1 0%;display:flex;flex-direction:column;align-items:center;justify-content:center}h1.svelte-ne8acg,h2.svelte-ne8acg{color:#c81e1e}h1.svelte-ne8acg{margin-top:0.25rem;font-size:1.5rem}h2.svelte-ne8acg{font-size:1.125rem}",
	map: "{\"version\":3,\"file\":\"_error.svelte\",\"sources\":[\"_error.svelte\"],\"sourcesContent\":[\"<script>export let status;\\r\\nexport let error;\\r\\nconst mode = \\\"production\\\";\\r\\nconst dev = mode === 'development';\\r\\n//# sourceMappingURL=_error.svelte.js.map</script>\\r\\n\\r\\n<section>\\r\\n  <h1>{error.message}</h1>\\r\\n  <h2>{status}</h2>\\r\\n</section>\\r\\n\\r\\n{#if dev && error.stack}\\r\\n  <pre>{error.stack}</pre>\\r\\n{/if}\\r\\n\\r\\n<style>\\r\\n  section {\\r\\n    flex: 1 1 0%;\\r\\n    display: flex;\\r\\n    flex-direction: column;\\r\\n    align-items: center;\\r\\n    justify-content: center;\\r\\n  }\\r\\n\\r\\n  h1,\\r\\n  h2 {\\r\\n    color: #c81e1e;\\r\\n  }\\r\\n\\r\\n  h1 {\\r\\n    margin-top: 0.25rem;\\r\\n    font-size: 1.5rem;\\r\\n  }\\r\\n\\r\\n  h2 {\\r\\n    font-size: 1.125rem;\\r\\n  }\\r\\n</style>\\r\\n\"],\"names\":[],\"mappings\":\"AAgBE,OAAO,cAAC,CAAC,AACP,IAAI,CAAE,CAAC,CAAC,CAAC,CAAC,EAAE,CACZ,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,WAAW,CAAE,MAAM,CACnB,eAAe,CAAE,MAAM,AACzB,CAAC,AAED,gBAAE,CACF,EAAE,cAAC,CAAC,AACF,KAAK,CAAE,OAAO,AAChB,CAAC,AAED,EAAE,cAAC,CAAC,AACF,UAAU,CAAE,OAAO,CACnB,SAAS,CAAE,MAAM,AACnB,CAAC,AAED,EAAE,cAAC,CAAC,AACF,SAAS,CAAE,QAAQ,AACrB,CAAC\"}"
};

const Error$1 = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { status } = $$props;
	let { error } = $$props;
	if ($$props.status === void 0 && $$bindings.status && status !== void 0) $$bindings.status(status);
	if ($$props.error === void 0 && $$bindings.error && error !== void 0) $$bindings.error(error);
	$$result.css.add(css$1);

	return `<section class="${"svelte-ne8acg"}"><h1 class="${"svelte-ne8acg"}">${escape(error.message)}</h1>
  <h2 class="${"svelte-ne8acg"}">${escape(status)}</h2></section>

${ ``}`;
});

/* src\node_modules\@sapper\internal\App.svelte generated by Svelte v3.24.1 */

const App = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { stores } = $$props;
	let { error } = $$props;
	let { status } = $$props;
	let { segments } = $$props;
	let { level0 } = $$props;
	let { level1 = null } = $$props;
	let { notify } = $$props;
	afterUpdate(notify);
	setContext(CONTEXT_KEY, stores);
	if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0) $$bindings.stores(stores);
	if ($$props.error === void 0 && $$bindings.error && error !== void 0) $$bindings.error(error);
	if ($$props.status === void 0 && $$bindings.status && status !== void 0) $$bindings.status(status);
	if ($$props.segments === void 0 && $$bindings.segments && segments !== void 0) $$bindings.segments(segments);
	if ($$props.level0 === void 0 && $$bindings.level0 && level0 !== void 0) $$bindings.level0(level0);
	if ($$props.level1 === void 0 && $$bindings.level1 && level1 !== void 0) $$bindings.level1(level1);
	if ($$props.notify === void 0 && $$bindings.notify && notify !== void 0) $$bindings.notify(notify);

	return `


${validate_component(Layout, "Layout").$$render($$result, Object.assign({ segment: segments[0] }, level0.props), {}, {
		default: () => `${error
		? `${validate_component(Error$1, "Error").$$render($$result, { error, status }, {}, {})}`
		: `${validate_component(level1.component || missing_component, "svelte:component").$$render($$result, Object.assign(level1.props), {}, {})}`}`
	})}`;
});

// This file is generated by Sapper — do not edit it!

const ignore = [/^\/example\/?$/];

const components = [
	{
		js: () => Promise.resolve().then(function () { return component_0; }),
		css: ["assets/client-8e3474d2.css","assets/client-8e3474d2.css"]
	},
	{
		js: () => Promise.resolve().then(function () { return component_1; }),
		css: ["assets/client-8e3474d2.css","assets/AccountSidebar-5e356b4c.css"]
	},
	{
		js: () => Promise.resolve().then(function () { return component_2; }),
		css: ["assets/client-8e3474d2.css","assets/AccountSidebar-5e356b4c.css"]
	},
	{
		js: () => Promise.resolve().then(function () { return component_3; }),
		css: ["assets/client-8e3474d2.css","assets/AccountSidebar-5e356b4c.css"]
	},
	{
		js: () => Promise.resolve().then(function () { return component_4; }),
		css: ["assets/client-8e3474d2.css"]
	},
	{
		js: () => Promise.resolve().then(function () { return component_5; }),
		css: ["assets/client-8e3474d2.css","assets/AccountSidebar-5e356b4c.css","assets/AccountSidebar-5e356b4c.css"]
	},
	{
		js: () => Promise.resolve().then(function () { return component_6; }),
		css: ["assets/client-8e3474d2.css","assets/AccountSidebar-5e356b4c.css","assets/AccountSidebar-5e356b4c.css"]
	},
	{
		js: () => Promise.resolve().then(function () { return component_7; }),
		css: ["assets/client-8e3474d2.css","assets/AccountSidebar-5e356b4c.css","assets/AccountSidebar-5e356b4c.css"]
	},
	{
		js: () => Promise.resolve().then(function () { return component_8; }),
		css: ["assets/client-8e3474d2.css","assets/AccountSidebar-5e356b4c.css","assets/AccountSidebar-5e356b4c.css"]
	},
	{
		js: () => Promise.resolve().then(function () { return component_9; }),
		css: ["assets/client-8e3474d2.css","assets/client-8e3474d2.css"]
	},
	{
		js: () => Promise.resolve().then(function () { return component_10; }),
		css: ["assets/client-8e3474d2.css","assets/AccountSidebar-5e356b4c.css","assets/client-8e3474d2.css","assets/index-9fab7b3e.css"]
	},
	{
		js: () => Promise.resolve().then(function () { return component_11; }),
		css: ["assets/client-8e3474d2.css","assets/AccountSidebar-5e356b4c.css"]
	},
	{
		js: () => Promise.resolve().then(function () { return component_12; }),
		css: ["assets/client-8e3474d2.css","assets/index-cb50c97c.css"]
	}
];

const routes = (d => [
	{
		// index.svelte
		pattern: /^\/$/,
		parts: [
			{ i: 0 }
		]
	},

	{
		// account-settings/index.svelte
		pattern: /^\/account-settings\/?$/,
		parts: [
			{ i: 1 }
		]
	},

	{
		// account-settings/security.svelte
		pattern: /^\/account-settings\/security\/?$/,
		parts: [
			null,
			{ i: 2 }
		]
	},

	{
		// account-settings/billing.svelte
		pattern: /^\/account-settings\/billing\/?$/,
		parts: [
			null,
			{ i: 3 }
		]
	},

	{
		// form-settings/index.svelte
		pattern: /^\/form-settings\/?$/,
		parts: [
			{ i: 4 }
		]
	},

	{
		// form-settings/[formId]/workflows.svelte
		pattern: /^\/form-settings\/([^/]+?)\/workflows\/?$/,
		parts: [
			null,
			null,
			{ i: 5, params: match => ({ formId: d(match[1]) }) }
		]
	},

	{
		// form-settings/[formId]/scoring.svelte
		pattern: /^\/form-settings\/([^/]+?)\/scoring\/?$/,
		parts: [
			null,
			null,
			{ i: 6, params: match => ({ formId: d(match[1]) }) }
		]
	},

	{
		// form-settings/[formId]/emails.svelte
		pattern: /^\/form-settings\/([^/]+?)\/emails\/?$/,
		parts: [
			null,
			null,
			{ i: 7, params: match => ({ formId: d(match[1]) }) }
		]
	},

	{
		// form-settings/[formId].svelte
		pattern: /^\/form-settings\/([^/]+?)\/?$/,
		parts: [
			null,
			{ i: 8, params: match => ({ formId: d(match[1]) }) }
		]
	},

	{
		// submissions/index.svelte
		pattern: /^\/submissions\/?$/,
		parts: [
			{ i: 9 }
		]
	},

	{
		// builder/index.svelte
		pattern: /^\/builder\/?$/,
		parts: [
			{ i: 10 }
		]
	},

	{
		// preview/index.svelte
		pattern: /^\/preview\/?$/,
		parts: [
			{ i: 11 }
		]
	},

	{
		// folder/index.svelte
		pattern: /^\/folder\/?$/,
		parts: [
			{ i: 12 }
		]
	}
])(decodeURIComponent);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter$1(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function goto(href, opts) {
    if (opts === void 0) { opts = { noscroll: false, replaceState: false }; }
    var target = select_target(new URL(href, document.baseURI));
    if (target) {
        _history[opts.replaceState ? 'replaceState' : 'pushState']({ id: cid }, '', href);
        return navigate(target, null, opts.noscroll).then(function () { });
    }
    location.href = href;
    return new Promise(function (f) { }); // never resolves
}

function page_store(value) {
    var store = writable(value);
    var ready = true;
    function notify() {
        ready = true;
        store.update(function (val) { return val; });
    }
    function set(new_value) {
        ready = false;
        store.set(new_value);
    }
    function subscribe(run) {
        var old_value;
        return store.subscribe(function (new_value) {
            if (old_value === undefined || (ready && new_value !== old_value)) {
                run(old_value = new_value);
            }
        });
    }
    return { notify: notify, set: set, subscribe: subscribe };
}

var initial_data = typeof __SAPPER__ !== 'undefined' && __SAPPER__;
var ready = false;
var root_component;
var current_token;
var root_preloaded;
var current_branch = [];
var current_query = '{}';
var stores = {
    page: page_store({}),
    preloading: writable(null),
    session: writable(initial_data && initial_data.session)
};
var $session;
var session_dirty;
stores.session.subscribe(function (value) { return __awaiter$1(void 0, void 0, void 0, function () {
    var dest, token, _a, redirect, props, branch;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                $session = value;
                if (!ready)
                    return [2 /*return*/];
                session_dirty = true;
                dest = select_target(new URL(location.href));
                token = current_token = {};
                return [4 /*yield*/, hydrate_target(dest)];
            case 1:
                _a = _b.sent(), redirect = _a.redirect, props = _a.props, branch = _a.branch;
                if (token !== current_token)
                    return [2 /*return*/]; // a secondary navigation happened while we were loading
                if (!redirect) return [3 /*break*/, 3];
                return [4 /*yield*/, goto(redirect.location, { replaceState: true })];
            case 2:
                _b.sent();
                return [3 /*break*/, 5];
            case 3: return [4 /*yield*/, render(branch, props, dest.page)];
            case 4:
                _b.sent();
                _b.label = 5;
            case 5: return [2 /*return*/];
        }
    });
}); });
var prefetching = null;
var target;
var uid = 1;
var cid;
var _history = typeof history !== 'undefined' ? history : {
    pushState: function (state, title, href) { },
    replaceState: function (state, title, href) { },
    scrollRestoration: ''
};
var scroll_history = {};
function extract_query(search) {
    var query = Object.create(null);
    if (search.length > 0) {
        search.slice(1).split('&').forEach(function (searchParam) {
            var _a = __read(/([^=]*)(?:=(.*))?/.exec(decodeURIComponent(searchParam.replace(/\+/g, ' '))), 3), key = _a[1], _b = _a[2], value = _b === void 0 ? '' : _b;
            if (typeof query[key] === 'string')
                query[key] = [query[key]];
            if (typeof query[key] === 'object')
                query[key].push(value);
            else
                query[key] = value;
        });
    }
    return query;
}
function select_target(url) {
    if (url.origin !== location.origin)
        return null;
    if (!url.pathname.startsWith(initial_data.baseUrl))
        return null;
    var path = url.pathname.slice(initial_data.baseUrl.length);
    if (path === '') {
        path = '/';
    }
    // avoid accidental clashes between server routes and page routes
    if (ignore.some(function (pattern) { return pattern.test(path); }))
        return;
    for (var i = 0; i < routes.length; i += 1) {
        var route = routes[i];
        var match = route.pattern.exec(path);
        if (match) {
            var query = extract_query(url.search);
            var part = route.parts[route.parts.length - 1];
            var params = part.params ? part.params(match) : {};
            var page = { host: location.host, path: path, query: query, params: params };
            return { href: url.href, route: route, match: match, page: page };
        }
    }
}
function scroll_state() {
    return {
        x: pageXOffset,
        y: pageYOffset
    };
}
function navigate(dest, id, noscroll, hash) {
    return __awaiter$1(this, void 0, void 0, function () {
        var current_scroll, loaded, token, loaded_result, redirect, props, branch, scroll_1, deep_linked;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (id) {
                        // popstate or initial navigation
                        cid = id;
                    }
                    else {
                        current_scroll = scroll_state();
                        // clicked on a link. preserve scroll state
                        scroll_history[cid] = current_scroll;
                        id = cid = ++uid;
                        scroll_history[cid] = noscroll ? current_scroll : { x: 0, y: 0 };
                    }
                    cid = id;
                    if (root_component)
                        stores.preloading.set(true);
                    loaded = prefetching && prefetching.href === dest.href ?
                        prefetching.promise :
                        hydrate_target(dest);
                    prefetching = null;
                    token = current_token = {};
                    return [4 /*yield*/, loaded];
                case 1:
                    loaded_result = _a.sent();
                    redirect = loaded_result.redirect;
                    if (token !== current_token)
                        return [2 /*return*/]; // a secondary navigation happened while we were loading
                    if (!redirect) return [3 /*break*/, 3];
                    return [4 /*yield*/, goto(redirect.location, { replaceState: true })];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 3:
                    props = loaded_result.props, branch = loaded_result.branch;
                    return [4 /*yield*/, render(branch, props, dest.page)];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5:
                    if (document.activeElement && (document.activeElement instanceof HTMLElement))
                        document.activeElement.blur();
                    if (!noscroll) {
                        scroll_1 = scroll_history[id];
                        if (hash) {
                            deep_linked = document.getElementById(hash.slice(1));
                            if (deep_linked) {
                                scroll_1 = {
                                    x: 0,
                                    y: deep_linked.getBoundingClientRect().top + scrollY
                                };
                            }
                        }
                        scroll_history[cid] = scroll_1;
                        if (scroll_1)
                            scrollTo(scroll_1.x, scroll_1.y);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function render(branch, props, page) {
    return __awaiter$1(this, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    stores.page.set(page);
                    stores.preloading.set(false);
                    if (!root_component) return [3 /*break*/, 1];
                    root_component.$set(props);
                    return [3 /*break*/, 3];
                case 1:
                    props.stores = {
                        page: { subscribe: stores.page.subscribe },
                        preloading: { subscribe: stores.preloading.subscribe },
                        session: stores.session
                    };
                    _a = props;
                    _b = {};
                    return [4 /*yield*/, root_preloaded];
                case 2:
                    _a.level0 = (_b.props = _c.sent(),
                        _b);
                    props.notify = stores.page.notify;
                    root_component = new App({
                        target: target,
                        props: props,
                        hydrate: true
                    });
                    _c.label = 3;
                case 3:
                    current_branch = branch;
                    current_query = JSON.stringify(page.query);
                    ready = true;
                    session_dirty = false;
                    return [2 /*return*/];
            }
        });
    });
}
function part_changed(i, segment, match, stringified_query) {
    // TODO only check query string changes for preload functions
    // that do in fact depend on it (using static analysis or
    // runtime instrumentation)
    if (stringified_query !== current_query)
        return true;
    var previous = current_branch[i];
    if (!previous)
        return false;
    if (segment !== previous.segment)
        return true;
    if (previous.match) {
        if (JSON.stringify(previous.match.slice(1, i + 2)) !== JSON.stringify(match.slice(1, i + 2))) {
            return true;
        }
    }
}
function hydrate_target(dest) {
    return __awaiter$1(this, void 0, void 0, function () {
        var route, page, segments, redirect, props, preload_context, root_preload, branch, l, stringified_query_1, match_1, segment_dirty_1, error_1;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    route = dest.route, page = dest.page;
                    segments = page.path.split('/').filter(Boolean);
                    redirect = null;
                    props = { error: null, status: 200, segments: [segments[0]] };
                    preload_context = {
                        fetch: function (url, opts) { return fetch(url, opts); },
                        redirect: function (statusCode, location) {
                            if (redirect && (redirect.statusCode !== statusCode || redirect.location !== location)) {
                                throw new Error("Conflicting redirects");
                            }
                            redirect = { statusCode: statusCode, location: location };
                        },
                        error: function (status, error) {
                            props.error = typeof error === 'string' ? new Error(error) : error;
                            props.status = status;
                        }
                    };
                    if (!root_preloaded) {
                        root_preload = preload || (function () { });
                        root_preloaded = initial_data.preloaded[0] || root_preload.call(preload_context, {
                            host: page.host,
                            path: page.path,
                            query: page.query,
                            params: {}
                        }, $session);
                    }
                    l = 1;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    stringified_query_1 = JSON.stringify(page.query);
                    match_1 = route.pattern.exec(page.path);
                    segment_dirty_1 = false;
                    return [4 /*yield*/, Promise.all(route.parts.map(function (part, i) { return __awaiter$1(_this, void 0, void 0, function () {
                            var segment, j, _a, component, preload, preloaded, _b;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0:
                                        segment = segments[i];
                                        if (part_changed(i, segment, match_1, stringified_query_1))
                                            segment_dirty_1 = true;
                                        props.segments[l] = segments[i + 1]; // TODO make this less confusing
                                        if (!part)
                                            return [2 /*return*/, { segment: segment }];
                                        j = l++;
                                        if (!session_dirty && !segment_dirty_1 && current_branch[i] && current_branch[i].part === part.i) {
                                            return [2 /*return*/, current_branch[i]];
                                        }
                                        segment_dirty_1 = false;
                                        return [4 /*yield*/, load_component(components[part.i])];
                                    case 1:
                                        _a = _c.sent(), component = _a.default, preload = _a.preload;
                                        if (!(ready || !initial_data.preloaded[i + 1])) return [3 /*break*/, 5];
                                        if (!preload) return [3 /*break*/, 3];
                                        return [4 /*yield*/, preload.call(preload_context, {
                                                host: page.host,
                                                path: page.path,
                                                query: page.query,
                                                params: part.params ? part.params(dest.match) : {}
                                            }, $session)];
                                    case 2:
                                        _b = _c.sent();
                                        return [3 /*break*/, 4];
                                    case 3:
                                        _b = {};
                                        _c.label = 4;
                                    case 4:
                                        preloaded = _b;
                                        return [3 /*break*/, 6];
                                    case 5:
                                        preloaded = initial_data.preloaded[i + 1];
                                        _c.label = 6;
                                    case 6: return [2 /*return*/, (props["level" + j] = { component: component, props: preloaded, segment: segment, match: match_1, part: part.i })];
                                }
                            });
                        }); }))];
                case 2:
                    branch = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    props.error = error_1;
                    props.status = 500;
                    branch = [];
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/, { redirect: redirect, props: props, branch: branch }];
            }
        });
    });
}
function load_css(chunk) {
    var href = "client/" + chunk;
    if (document.querySelector("link[href=\"" + href + "\"]"))
        return;
    return new Promise(function (fulfil, reject) {
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        link.onload = function () { return fulfil(); };
        link.onerror = reject;
        document.head.appendChild(link);
    });
}
function load_component(component) {
    // TODO this is temporary — once placeholders are
    // always rewritten, scratch the ternary
    var promises = (typeof component.css === 'string' ? [] : component.css.map(load_css));
    promises.unshift(component.js());
    return Promise.all(promises).then(function (values) { return values[0]; });
}

var stores$1 = function () { return getContext(CONTEXT_KEY); };

function instance() {
    //@ts-ignore
    return fetch !== null && fetch !== void 0 ? fetch : this.fetch;
}
function apiEndpoint() {
    return config["API_ENDPOINT"];
}
function getApi(path) {
    return __awaiter(this, void 0, void 0, function* () {
        const endpoint = apiEndpoint();
        const response = yield instance()(`${endpoint}${path}`);
        if (!response.ok) {
            const body = yield response.json();
            throw new Error(body.message);
        }
        const body = yield response.json();
        return body;
    });
}
function postApi(path, body) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield requestApiWithBody("POST", path, body);
    });
}
function putApi(path, body) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield requestApiWithBody("PUT", path, body);
    });
}
function deleteApi(path, body) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield requestApiWithBody("DELETE", path, body);
    });
}
function requestApiWithBody(method, path, body) {
    return __awaiter(this, void 0, void 0, function* () {
        const endpoint = apiEndpoint();
        const response = yield instance()(`${endpoint}${path}`, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        if (!response.ok) {
            const body = yield response.json();
            throw new Error(body.message);
        }
        const result = yield response.text();
        if (result === null || result === '') {
            return {};
        }
        return JSON.parse(result);
    });
}

/* src\components\FormList.svelte generated by Svelte v3.24.1 */

const css$2 = {
	code: ".radius-0.svelte-v80ume{border-radius:0rem !important;padding-left:0.5em}",
	map: "{\"version\":3,\"file\":\"FormList.svelte\",\"sources\":[\"FormList.svelte\"],\"sourcesContent\":[\"<script lang=\\\"typescript\\\">var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\\r\\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\\r\\n    return new (P || (P = Promise))(function (resolve, reject) {\\r\\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\\r\\n        function rejected(value) { try { step(generator[\\\"throw\\\"](value)); } catch (e) { reject(e); } }\\r\\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\\r\\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\\r\\n    });\\r\\n};\\r\\n;\\r\\nimport { goto } from '@sapper/app';\\r\\n;\\r\\nimport { onMount } from 'svelte';\\r\\nimport { getApi } from 'services/ApiService';\\r\\nlet forms = [];\\r\\nexport let folder;\\r\\nonMount(() => __awaiter(void 0, void 0, void 0, function* () {\\r\\n    forms = yield getApi('form?lean=true');\\r\\n}));\\r\\nfunction onDelete(formId) { }\\r\\n//# sourceMappingURL=FormList.svelte.js.map</script>\\r\\n\\r\\n<div class=\\\"card-body px-0 pt-0\\\">\\r\\n  <ul class=\\\"list-group list-group-flush\\\">\\r\\n    {#each forms as form}\\r\\n      <li class=\\\"list-group-item border-bottom py-3 radius-0\\\">\\r\\n        <div class=\\\"row align-items-center\\\">\\r\\n          <div class=\\\"col\\\">\\r\\n            <h3 class=\\\"h6 mb-1\\\"><a href=\\\"./invoice.html\\\">{form.title}</a></h3>\\r\\n            <!-- Text -->\\r\\n            <small class=\\\"text-gray-700\\\">{form.changeTime}</small>\\r\\n          </div>\\r\\n          <div class=\\\"col-auto\\\">\\r\\n            <a href={`/submissions?formId=${form.id}`} class=\\\"btn btn-xs btn-outline-dark\\\"> Submissions </a>\\r\\n            <a href={`/builder?formId=${form.id}`} class=\\\"btn btn-xs btn-outline-dark\\\">Edit</a>\\r\\n            <button class=\\\"btn btn-xs btn-outline-dark\\\">\\r\\n              <span\\r\\n                on:click={() => {\\r\\n                  onDelete(form.id || '')\\r\\n                }}\\r\\n                class=\\\"fas fa-trash\\\" />\\r\\n            </button>\\r\\n          </div>\\r\\n        </div>\\r\\n      </li>\\r\\n    {/each}\\r\\n  </ul>\\r\\n</div>\\r\\n\\r\\n<style>\\r\\n  .radius-0 {\\r\\n    border-radius: 0rem !important;\\r\\n    padding-left: 0.5em;\\r\\n  }\\r\\n</style>\\r\\n\"],\"names\":[],\"mappings\":\"AAkDE,SAAS,cAAC,CAAC,AACT,aAAa,CAAE,IAAI,CAAC,UAAU,CAC9B,YAAY,CAAE,KAAK,AACrB,CAAC\"}"
};

const FormList = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
		function adopt(value) {
			return value instanceof P
			? value
			: new P(function (resolve) {
						resolve(value);
					});
		}

		return new (P || (P = Promise))(function (resolve, reject) {
				function fulfilled(value) {
					try {
						step(generator.next(value));
					} catch(e) {
						reject(e);
					}
				}

				function rejected(value) {
					try {
						step(generator["throw"](value));
					} catch(e) {
						reject(e);
					}
				}

				function step(result) {
					result.done
					? resolve(result.value)
					: adopt(result.value).then(fulfilled, rejected);
				}

				step((generator = generator.apply(thisArg, _arguments || [])).next());
			});
	};

	
	
	let forms = [];
	let { folder } = $$props;

	onMount(() => __awaiter(void 0, void 0, void 0, function* () {
		forms = yield getApi("form?lean=true");
	}));

	if ($$props.folder === void 0 && $$bindings.folder && folder !== void 0) $$bindings.folder(folder);
	$$result.css.add(css$2);

	return `<div class="${"card-body px-0 pt-0"}"><ul class="${"list-group list-group-flush"}">${each(forms, form => `<li class="${"list-group-item border-bottom py-3 radius-0 svelte-v80ume"}"><div class="${"row align-items-center"}"><div class="${"col"}"><h3 class="${"h6 mb-1"}"><a href="${"./invoice.html"}">${escape(form.title)}</a></h3>
            
            <small class="${"text-gray-700"}">${escape(form.changeTime)}</small></div>
          <div class="${"col-auto"}"><a${add_attribute("href", `/submissions?formId=${form.id}`, 0)} class="${"btn btn-xs btn-outline-dark"}">Submissions </a>
            <a${add_attribute("href", `/builder?formId=${form.id}`, 0)} class="${"btn btn-xs btn-outline-dark"}">Edit</a>
            <button class="${"btn btn-xs btn-outline-dark"}"><span class="${"fas fa-trash"}"></span></button>
          </div></div>
      </li>`)}</ul>
</div>`;
});

/* src\components\dashboard\RecentForms.svelte generated by Svelte v3.24.1 */

const css$3 = {
	code: ".h5.svelte-sz94a4{padding-bottom:0.2em}",
	map: "{\"version\":3,\"file\":\"RecentForms.svelte\",\"sources\":[\"RecentForms.svelte\"],\"sourcesContent\":[\"<script lang=\\\"typescript\\\">import FormList from 'components/FormList.svelte';\\r\\n;\\r\\nimport { onMount } from 'svelte';\\r\\nlet forms = [];\\r\\nonMount(() => {\\r\\n    forms = getRecentFroms();\\r\\n});\\r\\nfunction getRecentFroms() {\\r\\n    return [];\\r\\n}\\r\\n//# sourceMappingURL=RecentForms.svelte.js.map</script>\\r\\n\\r\\n<div style=\\\"width: 100%\\\">\\r\\n    <h5 class=\\\"h5\\\">Recently Viewed Forms</h5>\\r\\n</div>\\r\\n\\r\\n<style>\\r\\n    .h5{\\r\\n        padding-bottom: 0.2em;\\r\\n    }\\r\\n</style>\"],\"names\":[],\"mappings\":\"AAiBI,iBAAG,CAAC,AACA,cAAc,CAAE,KAAK,AACzB,CAAC\"}"
};

const RecentForms = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {

	onMount(() => {
	});

	$$result.css.add(css$3);

	return `<div style="${"width: 100%"}"><h5 class="${"h5 svelte-sz94a4"}">Recently Viewed Forms</h5>
</div>`;
});

/* src\components\dashboard\SubmissionsDash.svelte generated by Svelte v3.24.1 */

const css$4 = {
	code: ".h5.svelte-13rir58{padding-bottom:0.2em}",
	map: "{\"version\":3,\"file\":\"SubmissionsDash.svelte\",\"sources\":[\"SubmissionsDash.svelte\"],\"sourcesContent\":[\"<script lang=\\\"typescript\\\">import FormList from 'components/FormList.svelte';\\r\\n;\\r\\nimport { onMount } from 'svelte';\\r\\nlet recentSubmissions = [];\\r\\nlet forms = [];\\r\\nonMount(() => {\\r\\n    // forms = getRecentlyViewedSubmissions()\\r\\n});\\r\\nfunction getRecentlyViewedSubmissions() {\\r\\n    return ['submission1'];\\r\\n}\\r\\nfunction getRecentFroms() {\\r\\n    let form1 = { title: 'Form 1', id: 'yeet', changeTime: 'Oct 2 3:30 PM', fields: [] };\\r\\n    let form2 = { title: 'Form 2', id: 'yeet', changeTime: 'Oct 12 3:30 PM', fields: [] };\\r\\n    let form3 = { title: 'Form 3', id: 'yeet', changeTime: 'Oct 22 3:30 PM', fields: [] };\\r\\n    return [form1, form2, form3];\\r\\n}\\r\\n//# sourceMappingURL=SubmissionsDash.svelte.js.map</script>\\r\\n  \\r\\n  <div style=\\\"width: 100%\\\">\\r\\n      <h5 class=\\\"h5\\\">Recently Viewed Form Submissions</h5>\\r\\n      <div class=\\\"card-body px-0 pt-0\\\">\\r\\n        <ul class=\\\"list-group list-group-flush\\\">\\r\\n          {#each forms as form}\\r\\n            <!-- <li class=\\\"list-group-item border-bottom py-3 radius-0\\\">\\r\\n              <div class=\\\"row align-items-center\\\">\\r\\n                <div class=\\\"col\\\">\\r\\n                  <h3 class=\\\"h6 mb-1\\\">\\r\\n                    <a href=\\\"./invoice.html\\\">{form.title}</a>\\r\\n                  </h3>\\r\\n                  <small class=\\\"text-gray-700\\\">{form.lastUpdated}</small>\\r\\n                </div>\\r\\n                <div class=\\\"col-auto\\\">\\r\\n                  <button\\r\\n                    on:click={() => {\\r\\n                      onViewSubmissions(form.id || '')\\r\\n                    }}\\r\\n                    class=\\\"btn btn-xs btn-outline-dark\\\">\\r\\n                    Submissions\\r\\n                  </button>\\r\\n                  <button\\r\\n                    on:click={() => {\\r\\n                      onEdit(form.id || '')\\r\\n                    }}\\r\\n                    class=\\\"btn btn-xs btn-outline-dark\\\">\\r\\n                    Edit\\r\\n                  </button>\\r\\n                  <button class=\\\"btn btn-xs btn-outline-dark\\\">\\r\\n                    <span\\r\\n                      on:click={() => {\\r\\n                        onDelete(form.id || '')\\r\\n                      }}\\r\\n                      class=\\\"fas fa-trash\\\" />\\r\\n                  </button>\\r\\n                </div>\\r\\n              </div>\\r\\n            </li> -->\\r\\n          {/each}\\r\\n        </ul>\\r\\n      </div>\\r\\n  </div>\\r\\n  \\r\\n  <style>\\r\\n      .h5{\\r\\n          padding-bottom: 0.2em;\\r\\n      }\\r\\n  </style>\"],\"names\":[],\"mappings\":\"AA+DM,kBAAG,CAAC,AACA,cAAc,CAAE,KAAK,AACzB,CAAC\"}"
};

const SubmissionsDash = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let forms = [];

	onMount(() => {
		
	}); // forms = getRecentlyViewedSubmissions()

	$$result.css.add(css$4);

	return `<div style="${"width: 100%"}"><h5 class="${"h5 svelte-13rir58"}">Recently Viewed Form Submissions</h5>
      <div class="${"card-body px-0 pt-0"}"><ul class="${"list-group list-group-flush"}">${each(forms, form => ``)}</ul></div>
  </div>`;
});

/* src\components\dashboard\Dashboard.svelte generated by Svelte v3.24.1 */

const css$5 = {
	code: ".card.svelte-1q1y3k7{border-radius:0.3em !important}",
	map: "{\"version\":3,\"file\":\"Dashboard.svelte\",\"sources\":[\"Dashboard.svelte\"],\"sourcesContent\":[\"<script lang=\\\"typescript\\\">import GettingStarted from './GettingStarted.svelte';\\r\\nimport RecentForms from './RecentForms.svelte';\\r\\nimport { goto } from '@sapper/app';\\r\\nimport SubmissionsDash from './SubmissionsDash.svelte';\\r\\nfunction createForm() { }\\r\\n//# sourceMappingURL=Dashboard.svelte.js.map</script>\\r\\n\\r\\n<div>\\r\\n  <div class=\\\"col-12 col-lg-12\\\">\\r\\n    <div class=\\\"row\\\">\\r\\n      <div class=\\\"col-12 col-lg-12 mb-4\\\">\\r\\n        <div class=\\\"card border-light\\\">\\r\\n          <div class=\\\"card-body d-block d-md-flex align-items-center\\\">\\r\\n            <div style=\\\"padding-right: 0.5em;\\\"><a href=\\\"/builder\\\" class=\\\"btn btn-sm btn-outline-dark\\\"> <span class=\\\"fas fa-plus\\\" /> Create Form </a></div>\\r\\n            <div style=\\\"padding-right: 0.5em;\\\"><a href=\\\"/folder\\\" class=\\\"btn btn-sm btn-outline-dark\\\"> <span class=\\\"far fa-folder\\\" /> My Folders </a></div>\\r\\n          </div>\\r\\n        </div>\\r\\n      </div>\\r\\n    </div>\\r\\n    <div class=\\\"row\\\">\\r\\n      <div class=\\\"col-12 col-sm-6 mb-4\\\">\\r\\n        <div class=\\\"card border-light\\\">\\r\\n          <div class=\\\"card-body d-block d-md-flex align-items-center\\\">\\r\\n            <RecentForms />\\r\\n          </div>\\r\\n        </div>\\r\\n      </div>\\r\\n      <div class=\\\"col-12 col-sm-6 mb-4\\\">\\r\\n        <div class=\\\"card border-light\\\">\\r\\n          <div class=\\\"card-body d-block d-md-flex align-items-center\\\">\\r\\n            <SubmissionsDash />\\r\\n          </div>\\r\\n        </div>\\r\\n      </div>\\r\\n    </div>\\r\\n    <!-- <div class=\\\"row\\\">\\r\\n      <div class=\\\"col-12 col-sm-6 mb-4\\\">\\r\\n        <div class=\\\"card border-light\\\">\\r\\n          <div class=\\\"card-body d-block d-md-flex align-items-center\\\" />\\r\\n          <GettingStarted/>\\r\\n        </div>\\r\\n      </div>\\r\\n      <div class=\\\"col-12 col-sm-6 mb-4\\\">\\r\\n        <div class=\\\"card border-light\\\">\\r\\n          <div class=\\\"card-body d-block d-md-flex align-items-center\\\">\\r\\n            <RecentForms />\\r\\n          </div>\\r\\n        </div>\\r\\n      </div>\\r\\n    </div> -->\\r\\n  </div>\\r\\n</div>\\r\\n\\r\\n<style>\\r\\n  .card {\\r\\n    border-radius: 0.3em !important;\\r\\n  }\\r\\n</style>\\r\\n\"],\"names\":[],\"mappings\":\"AAsDE,KAAK,eAAC,CAAC,AACL,aAAa,CAAE,KAAK,CAAC,UAAU,AACjC,CAAC\"}"
};

const Dashboard = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	$$result.css.add(css$5);

	return `<div><div class="${"col-12 col-lg-12"}"><div class="${"row"}"><div class="${"col-12 col-lg-12 mb-4"}"><div class="${"card border-light svelte-1q1y3k7"}"><div class="${"card-body d-block d-md-flex align-items-center"}"><div style="${"padding-right: 0.5em;"}"><a href="${"/builder"}" class="${"btn btn-sm btn-outline-dark"}"><span class="${"fas fa-plus"}"></span> Create Form </a></div>
            <div style="${"padding-right: 0.5em;"}"><a href="${"/folder"}" class="${"btn btn-sm btn-outline-dark"}"><span class="${"far fa-folder"}"></span> My Folders </a></div></div></div></div></div>
    <div class="${"row"}"><div class="${"col-12 col-sm-6 mb-4"}"><div class="${"card border-light svelte-1q1y3k7"}"><div class="${"card-body d-block d-md-flex align-items-center"}">${validate_component(RecentForms, "RecentForms").$$render($$result, {}, {}, {})}</div></div></div>
      <div class="${"col-12 col-sm-6 mb-4"}"><div class="${"card border-light svelte-1q1y3k7"}"><div class="${"card-body d-block d-md-flex align-items-center"}">${validate_component(SubmissionsDash, "SubmissionsDash").$$render($$result, {}, {}, {})}</div></div></div></div>
    </div>
</div>`;
});

/* src\routes\index.svelte generated by Svelte v3.24.1 */

const Routes = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	return `<div style="${" background-color: #f5f9fe;"}"><div class="${"section section-lg pt-6 pt-md-6 bg-soft; height: 1vh;"}"><div class="${"container"}"><div class="${"row pt-5 pt-md-0"}">${validate_component(Dashboard, "Dashboard").$$render($$result, {}, {}, {})}</div></div></div></div>`;
});

var component_0 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': Routes
});

/* src\components\account\AccountSidebar.svelte generated by Svelte v3.24.1 */

const css$6 = {
	code: ".active.svelte-1bhgzku.svelte-1bhgzku{color:#26304c !important;border-radius:0.3em}.card.svelte-1bhgzku.svelte-1bhgzku{border-radius:0.3em}.list-group.dashboard-menu.svelte-1bhgzku .list-group-item.svelte-1bhgzku:hover{border-radius:0.3em}",
	map: "{\"version\":3,\"file\":\"AccountSidebar.svelte\",\"sources\":[\"AccountSidebar.svelte\"],\"sourcesContent\":[\"<script lang=\\\"typescript\\\">export let page = '';\\r\\n//# sourceMappingURL=AccountSidebar.svelte.js.map</script>\\r\\n\\r\\n<div class=\\\"card border-light p-2\\\">\\r\\n    <div class=\\\"card-header bg-white border-0\\\">\\r\\n        <h2 class=\\\"h5 mt-3\\\">Sydne Anschutz</h2>\\r\\n    </div>\\r\\n    <div class=\\\"card-body p-2\\\">\\r\\n        <div class=\\\"list-group dashboard-menu list-group-sm\\\">\\r\\n            <a href=\\\"./account-settings\\\" class=\\\"d-flex list-group-item border-0 list-group-item-action {page === 'settings' ? 'active' : ''}\\\">Settings<span class=\\\"icon icon-xs ml-auto\\\"><span class=\\\"fas fa-chevron-right\\\"></span></span> </a>\\r\\n            <a href=\\\"./account-settings/security\\\" class=\\\"d-flex list-group-item border-0 list-group-item-action {page === 'security' ? 'active' : ''}\\\">Security<span class=\\\"icon icon-xs ml-auto\\\"><span class=\\\"fas fa-chevron-right\\\"></span></span> </a>\\r\\n            <a href=\\\"./account-settings/billing\\\" class=\\\"d-flex list-group-item border-0 list-group-item-action {page === 'billing' ? 'active' : ''}\\\">Billing<span class=\\\"icon icon-xs ml-auto\\\"><span class=\\\"fas fa-chevron-right\\\"></span></span> </a>\\r\\n        </div>\\r\\n    </div>\\r\\n</div>\\r\\n\\r\\n<style>\\r\\n  .active {\\r\\n    color: #26304c !important;\\r\\n    border-radius: 0.3em;\\r\\n  }\\r\\n\\r\\n  .card {\\r\\n    border-radius: 0.3em;\\r\\n  }\\r\\n\\r\\n  .list-group.dashboard-menu .list-group-item:hover {\\r\\n    border-radius: 0.3em;\\r\\n  }\\r\\n</style>\"],\"names\":[],\"mappings\":\"AAiBE,OAAO,8BAAC,CAAC,AACP,KAAK,CAAE,OAAO,CAAC,UAAU,CACzB,aAAa,CAAE,KAAK,AACtB,CAAC,AAED,KAAK,8BAAC,CAAC,AACL,aAAa,CAAE,KAAK,AACtB,CAAC,AAED,WAAW,8BAAe,CAAC,+BAAgB,MAAM,AAAC,CAAC,AACjD,aAAa,CAAE,KAAK,AACtB,CAAC\"}"
};

const AccountSidebar = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { page = "" } = $$props;
	if ($$props.page === void 0 && $$bindings.page && page !== void 0) $$bindings.page(page);
	$$result.css.add(css$6);

	return `<div class="${"card border-light p-2 svelte-1bhgzku"}"><div class="${"card-header bg-white border-0"}"><h2 class="${"h5 mt-3"}">Sydne Anschutz</h2></div>
    <div class="${"card-body p-2"}"><div class="${"list-group dashboard-menu list-group-sm svelte-1bhgzku"}"><a href="${"./account-settings"}" class="${"d-flex list-group-item border-0 list-group-item-action " + escape(page === "settings" ? "active" : "") + " svelte-1bhgzku"}">Settings<span class="${"icon icon-xs ml-auto"}"><span class="${"fas fa-chevron-right"}"></span></span></a>
            <a href="${"./account-settings/security"}" class="${"d-flex list-group-item border-0 list-group-item-action " + escape(page === "security" ? "active" : "") + " svelte-1bhgzku"}">Security<span class="${"icon icon-xs ml-auto"}"><span class="${"fas fa-chevron-right"}"></span></span></a>
            <a href="${"./account-settings/billing"}" class="${"d-flex list-group-item border-0 list-group-item-action " + escape(page === "billing" ? "active" : "") + " svelte-1bhgzku"}">Billing<span class="${"icon icon-xs ml-auto"}"><span class="${"fas fa-chevron-right"}"></span></span></a></div></div>
</div>`;
});

/* src\components\account\Settings.svelte generated by Svelte v3.24.1 */

const Settings = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	return `<div><div class="${"row"}"><div class="${"col-lg-12"}"><div class="${"card card-body bg-white border-light mb-4"}"><h2 class="${"h5 mb-4"}">General information</h2>
        <form><div class="${"row"}"><div class="${"col-md-6 mb-3"}"><div class="${"mb-3"}"><label for="${"first_name"}">First Name</label>
                <input class="${"form-control"}" id="${"first_name"}" type="${"text"}" placeholder="${"Enter your first name"}"></div></div>
            <div class="${"col-md-6 mb-3"}"><div class="${"mb-3"}"><label for="${"last_name"}">Last Name</label>
                <input class="${"form-control"}" id="${"last_name"}" type="${"text"}" placeholder="${"Also your last name"}"></div></div></div>
          <div class="${"row"}"><div class="${"col-md-6 mb-3"}"><div class="${"mb-3"}"><label for="${"email"}">Email</label>
                <input class="${"form-control"}" id="${"email"}" type="${"email"}" placeholder="${"name@company.com"}"></div></div>
            <div class="${"col-md-6 mb-3"}"><div class="${"mb-3"}"><label for="${"phone"}">Phone</label>
                <input class="${"form-control"}" id="${"phone"}" type="${"number"}" placeholder="${"+12-345 678 910"}"></div></div></div>
          <div class="${"mt-3"}"><button type="${"submit"}" class="${"btn btn-primary"}">Save</button></div></form></div></div></div></div>`;
});

/* src\routes\account-settings\index.svelte generated by Svelte v3.24.1 */

const Account_settings = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	return `<div><div class="${"section section-lg pt-5 pt-md-7 bg-soft"}"><div class="${"container"}"><div class="${"row pt-5 pt-md-0"}"><div class="${"col-12 col-md-4 d-none d-lg-block"}">${validate_component(AccountSidebar, "AccountSidebar").$$render($$result, { page: "settings" }, {}, {})}</div>
                <div class="${"col-12 col-lg-8"}">${validate_component(Settings, "Settings").$$render($$result, {}, {}, {})}</div></div></div></div></div>`;
});

var component_1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': Account_settings
});

/* src\components\account\Security.svelte generated by Svelte v3.24.1 */

const Security = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	return `<div><div class="${"card border-light p-0 p-md-4 mb-4"}"><div class="${"card-body"}"><h3 class="${"h5 mb-0"}">Change Password</h3>
            <form class="${"form mt-5"}" autocomplete="${"off"}"><div class="${"mb-4"}"><label for="${"inputPasswordOld"}">Current Password</label>
                    <input type="${"password"}" class="${"form-control"}" id="${"inputPasswordOld"}" required="${""}"></div>
                <div class="${"mb-4"}"><label for="${"inputPasswordNew"}">New Password</label>
                    <input type="${"password"}" class="${"form-control"}" id="${"inputPasswordNew"}" required="${""}">
                    <span class="${"form-text small text-muted"}">The password must be 8-20 characters, and must <em>not</em> contain spaces.
                                            </span></div>
                <div class="${"mb-4"}"><label for="${"inputPasswordNewVerify"}">Verify</label>
                    <input type="${"password"}" class="${"form-control"}" id="${"inputPasswordNewVerify"}" required="${""}">
                    <span class="${"form-text small text-muted"}">To confirm, type the new password again.
                                            </span></div>
                <div class="${"form-group"}"><button type="${"submit"}" class="${"btn btn-dark"}">Save</button></div></form></div></div></div>`;
});

/* src\routes\account-settings\security.svelte generated by Svelte v3.24.1 */

const Security_1 = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	return `<div><div class="${"section section-lg pt-5 pt-md-7 bg-soft"}"><div class="${"container"}"><div class="${"row pt-5 pt-md-0"}"><div class="${"col-12 col-md-4 d-none d-lg-block"}">${validate_component(AccountSidebar, "AccountSidebar").$$render($$result, { page: "security" }, {}, {})}</div>
                <div class="${"col-12 col-lg-8"}">${validate_component(Security, "Security").$$render($$result, {}, {}, {})}</div></div></div></div></div>`;
});

var component_2 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': Security_1
});

/* src\components\account\Billing.svelte generated by Svelte v3.24.1 */

const Billing = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	return `<div class="${"row mb-5"}"><div class="${"col-12 mb-4"}"><div class="${"card border-light text-center py-4 mb-4"}"><div class="${"card-body"}"><h2 class="${"display-3 mb-3"}">Pixel<span class="${"pixel-pro-badge subscription-badge bg-tertiary font-weight-bolder text-white"}">PRO</span></h2>
                <p class="${"my-4"}">Next payment of <span class="${"font-weight-bold"}">$36 (yearly)</span> occurs on August 13, 2020.</p>
                <a class="${"btn btn-sm btn-dark"}" href="${"#"}">Cancel subscription</a></div></div>
        <form action="${"#"}" method="${"post"}" class="${"card border-light p-3 mb-4"}"><div class="${"card-header bg-white border-light p-3 mb-4 mb-md-0"}"><h3 class="${"h5 mb-0"}">Billing details</h3></div>
            <div class="${"card-body p-0 p-md-4"}"><div class="${"row justify-content-center"}"><div class="${"col-12 col-lg-6"}">
                        <div class="${"mb-4"}"><label for="${"cartInputAddress1"}">Address</label>
                            <input type="${"text"}" placeholder="${"123 4th St"}" class="${"form-control"}" id="${"cartInputAddress1"}"></div>
                        </div>
                    <div class="${"col-12 col-lg-6"}">
                        <div class="${"mb-4"}"><label for="${"cartInputCity1"}">City</label>
                            <input type="${"text"}" placeholder="${"Dallas"}" class="${"form-control"}" id="${"cartInputCity1"}"></div>
                        </div>
                    <div class="${"col-12 col-lg-6"}">
                        <div class="${"mb-4"}"><label for="${"cartInputZip1"}">Zip/Postal code</label>
                            <input type="${"number"}" placeholder="${"123456"}" class="${"form-control"}" id="${"cartInputZip1"}"></div>
                        </div>
                    <div class="${"col-12 col-lg-6"}">
                        <div class="${"mb-4"}"><label for="${"cartInputCompany1"}">Company Name</label>
                            <input type="${"text"}" placeholder="${"Company LLC"}" class="${"form-control"}" id="${"cartInputCompany1"}" required></div>
                        </div>
                    <div class="${"col-12 col-lg-6 mb-4"}">
                        <label class="${"my-1 mr-2"}" for="${"inlineFormCustomSelectBilling"}">Country</label>
                        <select class="${"form-select"}" id="${"inlineFormCustomSelectBilling"}" aria-label="${"Messages select example"}"><option selected value="${"Choose..."}">Choose...</option><option value="${"1"}">United States</option><option value="${"2"}">Germany</option><option value="${"3"}">Canada</option></select>
                        </div>
                    <div class="${"col-12 col-lg-6"}">
                        <div class="${"mb-4"}"><label for="${"cartInputPhone1"}">Phone Number</label>
                            <input type="${"number"}" placeholder="${"+(12)345 6789"}" class="${"form-control"}" id="${"cartInputPhone1"}"></div>
                        </div>
                    <div class="${"col-12"}"><button class="${"btn btn-primary btn-dark mt-2 animate-up-2"}" type="${"submit"}">Update</button></div></div></div></form>
        <form action="${"#"}" method="${"post"}" class="${"card border-light p-3 mb-4"}"><div class="${"card-header bg-white border-light p-3 mb-4 mb-md-0"}"><h3 class="${"h5 mb-0"}">Card details</h3></div>
            <div class="${"card-body p-0 p-md-4"}"><div class="${"row justify-content-center"}"><div class="${"col-12"}"><div class="${"mb-4"}"><label class="${"form-label"}" for="${"cardNameLabel"}"><span class="${"small text-dark"}">(Full name as displayed on card)</span></label>
                            <div class="${"input-group mb-4"}"><input class="${"form-control"}" id="${"cardNameLabel"}" placeholder="${"Name on Card *"}" type="${"text"}" required="${""}"></div></div></div>
                    <div class="${"col-12"}"><div class="${"mb-4"}"><label class="${"form-label h6"}" for="${"cardNumberLabel"}">Card Number <span class="${"text-danger"}">*</span></label>
                            <div class="${"input-group"}"><span class="${"input-group-text"}"><span class="${"fas fa-credit-card"}"></span></span>
                                <input type="${"text"}" class="${"form-control"}" id="${"cardNumberLabel"}" placeholder="${"0000 0000 0000 0000"}" aria-label="${"Card number"}" required="${""}"></div></div></div>
                    <div class="${"col-12 col-md-6"}"><div class="${"mb-4"}"><label class="${"form-label h6"}" for="${"cardCVCLabel"}">CVC <span class="${"text-danger"}">*</span></label>
                            <input class="${"form-control"}" id="${"cardCVCLabel"}" placeholder="${"CVC"}" type="${"number"}" required="${""}"></div></div>
                    <div class="${"col-12 col-md-6"}"><div class="${"mb-4"}"><label class="${"form-label h6"}" for="${"cardExpiryLabel"}">Card Expiry <span class="${"text-danger"}">*</span></label>
                            <div class="${"input-group"}"><span class="${"input-group-text"}"><span class="${"fas fa-credit-card"}"></span></span>
                                <input type="${"text"}" class="${"form-control"}" id="${"cardExpiryLabel"}" placeholder="${"MM / YY"}" aria-label="${"Card expiry"}" required="${""}"></div></div></div>
                    <div class="${"col-12"}"><button class="${"btn btn-primary btn-dark mt-2 animate-up-2"}" type="${"submit"}">Update</button></div></div></div></form>
        <div class="${"card card-body bg-white border-light p-0 p-md-4"}"><div class="${"card-header bg-white border-0 p-3"}"><h3 class="${"h5"}">Order History</h3>
                <p class="${"small pr-lg-10"}">This is a list of devices that have logged into your account. Revoke any sessions that you do not recognize.</p></div>
            <div class="${"card-body px-0 pt-0"}"><ul class="${"list-group list-group-flush"}"><li class="${"list-group-item border-bottom py-3"}"><div class="${"row align-items-center"}"><div class="${"col"}"><h3 class="${"h6 mb-1"}"><a href="${"./invoice.html"}">Invoice #120345</a></h3>
                                
                                <small class="${"text-gray-700"}">Billed August 21, 2019
                                </small></div>
                            <div class="${"col-auto"}"><button class="${"btn btn-xs btn-outline-dark"}">Pay now
                                </button></div></div></li>
                    <li class="${"list-group-item border-bottom py-3"}"><div class="${"row align-items-center"}"><div class="${"col"}"><h3 class="${"h6 mb-1"}"><a href="${"./invoice.html"}">Invoice #120344</a></h3>
                                
                                <small class="${"text-gray-700"}">Billed July 21, 2019
                                </small></div>
                            <div class="${"col-auto"}"><span class="${"badge badge-pill badge-success"}"><span class="${"text-uppercase font-weight-bold"}">Paid</span></span></div></div></li>
                    <li class="${"list-group-item border-bottom py-3"}"><div class="${"row align-items-center"}"><div class="${"col"}"><h3 class="${"h6 mb-1"}"><a href="${"./invoice.html"}">Invoice #120343</a></h3>
                                
                                <small class="${"text-gray-700"}">Billed June 21, 2019
                                </small></div>
                            <div class="${"col-auto"}"><span class="${"badge badge-pill badge-success"}"><span class="${"text-uppercase font-weight-bold"}">Paid</span></span></div></div></li></ul></div></div></div></div>`;
});

/* src\routes\account-settings\billing.svelte generated by Svelte v3.24.1 */

const Billing_1 = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	return `<div><div class="${"section section-lg pt-5 pt-md-7 bg-soft"}"><div class="${"container"}"><div class="${"row pt-5 pt-md-0"}"><div class="${"col-12 col-md-4 d-none d-lg-block"}">${validate_component(AccountSidebar, "AccountSidebar").$$render($$result, { page: "billing" }, {}, {})}</div>
                <div class="${"col-12 col-lg-8"}">${validate_component(Billing, "Billing").$$render($$result, {}, {}, {})}</div></div></div></div></div>`;
});

var component_3 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': Billing_1
});

/* src\routes\form-settings\index.svelte generated by Svelte v3.24.1 */

const Form_settings = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	onMount(() => {
		goto("./index");
	});

	return ``;
});

var component_4 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': Form_settings
});

/* src\components\form_settings\FormSettingsSidebar.svelte generated by Svelte v3.24.1 */

const css$7 = {
	code: ".active.svelte-789alh.svelte-789alh{color:#26304c !important;border-radius:0.3em}.card.svelte-789alh.svelte-789alh{border-radius:0.3em}.list-group.dashboard-menu.svelte-789alh .list-group-item.svelte-789alh:hover{border-radius:0.3em}",
	map: "{\"version\":3,\"file\":\"FormSettingsSidebar.svelte\",\"sources\":[\"FormSettingsSidebar.svelte\"],\"sourcesContent\":[\"<script lang=\\\"typescript\\\">import { subscribe } from 'event/EventBus';\\r\\n;\\r\\nimport { onMount } from 'svelte';\\r\\nexport let form;\\r\\nexport let selected;\\r\\nonMount(() => {\\r\\n    subscribe('form_loaded', (updatedForm) => {\\r\\n        form = updatedForm;\\r\\n    });\\r\\n    subscribe('form_updated', (updatedForm) => {\\r\\n        form = updatedForm;\\r\\n    });\\r\\n});\\r\\n//# sourceMappingURL=FormSettingsSidebar.svelte.js.map</script>\\r\\n\\r\\n<div class=\\\"card border-light p-2\\\">\\r\\n  <div class=\\\"card-header bg-white border-0\\\" style=\\\"padding-bottom: 0.5em;\\\">\\r\\n    <div style=\\\"display: flex;\\\">\\r\\n      <h2 class=\\\"h4 mt-3\\\">Form Settings</h2>\\r\\n      <div class=\\\"ml-auto\\\" style=\\\"padding-top: 1.1em;\\\">\\r\\n        <span class=\\\"h4 fas fa-cogs\\\" />\\r\\n      </div>\\r\\n    </div>\\r\\n    <hr />\\r\\n    <h2 class=\\\"h5\\\">{form.title} Form</h2>\\r\\n  </div>\\r\\n  <div class=\\\"card-body p-2\\\">\\r\\n    <div class=\\\"list-group dashboard-menu list-group-sm\\\">\\r\\n      <a href=\\\"./form-settings/{form.id}\\\" class=\\\"d-flex list-group-item border-0 list-group-item-action {selected === 'general' ? 'active' : ''}\\\">\\r\\n        General\\r\\n        <span class=\\\"icon icon-xs ml-auto\\\">\\r\\n          <span class=\\\"fas fa-chevron-right\\\" />\\r\\n        </span>\\r\\n      </a>\\r\\n      <a href=\\\"./form-settings/{form.id}/workflows\\\" class=\\\"d-flex list-group-item border-0 list-group-item-action {selected === 'workflows' ? 'active' : ''}\\\">\\r\\n        Workflows\\r\\n        <span class=\\\"icon icon-xs ml-auto\\\">\\r\\n          <span class=\\\"fas fa-chevron-right\\\" />\\r\\n        </span>\\r\\n      </a>\\r\\n      <a href=\\\"./form-settings/{form.id}/emails\\\" class=\\\"d-flex list-group-item border-0 list-group-item-action {selected === 'emails' ? 'active' : ''}\\\">\\r\\n        Emails\\r\\n        <span class=\\\"icon icon-xs ml-auto\\\">\\r\\n          <span class=\\\"fas fa-chevron-right\\\" />\\r\\n        </span>\\r\\n      </a>\\r\\n      <a href=\\\"./form-settings/{form.id}/scoring\\\" class=\\\"d-flex list-group-item border-0 list-group-item-action {selected === 'scoring' ? 'active' : ''}\\\">\\r\\n        Scoring \\r\\n        <span class=\\\"icon icon-xs ml-auto\\\">\\r\\n          <span class=\\\"fas fa-chevron-right\\\" />\\r\\n        </span>\\r\\n      </a>\\r\\n    </div>\\r\\n  </div>\\r\\n</div>\\r\\n\\r\\n<style>\\r\\n  .active {\\r\\n    color: #26304c !important;\\r\\n    border-radius: 0.3em;\\r\\n  }\\r\\n\\r\\n  .card {\\r\\n    border-radius: 0.3em;\\r\\n  }\\r\\n\\r\\n  .list-group.dashboard-menu .list-group-item:hover {\\r\\n    border-radius: 0.3em;\\r\\n  }\\r\\n\\r\\n  .h5 {\\r\\n  }\\r\\n</style>\\r\\n\"],\"names\":[],\"mappings\":\"AAyDE,OAAO,4BAAC,CAAC,AACP,KAAK,CAAE,OAAO,CAAC,UAAU,CACzB,aAAa,CAAE,KAAK,AACtB,CAAC,AAED,KAAK,4BAAC,CAAC,AACL,aAAa,CAAE,KAAK,AACtB,CAAC,AAED,WAAW,6BAAe,CAAC,8BAAgB,MAAM,AAAC,CAAC,AACjD,aAAa,CAAE,KAAK,AACtB,CAAC\"}"
};

const FormSettingsSidebar = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	
	let { form } = $$props;
	let { selected } = $$props;

	onMount(() => {
		subscribe$1("form_loaded", updatedForm => {
			form = updatedForm;
		});

		subscribe$1("form_updated", updatedForm => {
			form = updatedForm;
		});
	});

	if ($$props.form === void 0 && $$bindings.form && form !== void 0) $$bindings.form(form);
	if ($$props.selected === void 0 && $$bindings.selected && selected !== void 0) $$bindings.selected(selected);
	$$result.css.add(css$7);

	return `<div class="${"card border-light p-2 svelte-789alh"}"><div class="${"card-header bg-white border-0"}" style="${"padding-bottom: 0.5em;"}"><div style="${"display: flex;"}"><h2 class="${"h4 mt-3"}">Form Settings</h2>
      <div class="${"ml-auto"}" style="${"padding-top: 1.1em;"}"><span class="${"h4 fas fa-cogs"}"></span></div></div>
    <hr>
    <h2 class="${"h5 svelte-789alh"}">${escape(form.title)} Form</h2></div>
  <div class="${"card-body p-2"}"><div class="${"list-group dashboard-menu list-group-sm svelte-789alh"}"><a href="${"./form-settings/" + escape(form.id)}" class="${"d-flex list-group-item border-0 list-group-item-action " + escape(selected === "general" ? "active" : "") + " svelte-789alh"}">General
        <span class="${"icon icon-xs ml-auto"}"><span class="${"fas fa-chevron-right"}"></span></span></a>
      <a href="${"./form-settings/" + escape(form.id) + "/workflows"}" class="${"d-flex list-group-item border-0 list-group-item-action " + escape(selected === "workflows" ? "active" : "") + " svelte-789alh"}">Workflows
        <span class="${"icon icon-xs ml-auto"}"><span class="${"fas fa-chevron-right"}"></span></span></a>
      <a href="${"./form-settings/" + escape(form.id) + "/emails"}" class="${"d-flex list-group-item border-0 list-group-item-action " + escape(selected === "emails" ? "active" : "") + " svelte-789alh"}">Emails
        <span class="${"icon icon-xs ml-auto"}"><span class="${"fas fa-chevron-right"}"></span></span></a>
      <a href="${"./form-settings/" + escape(form.id) + "/scoring"}" class="${"d-flex list-group-item border-0 list-group-item-action " + escape(selected === "scoring" ? "active" : "") + " svelte-789alh"}">Scoring 
        <span class="${"icon icon-xs ml-auto"}"><span class="${"fas fa-chevron-right"}"></span></span></a></div></div>
</div>`;
});

function isString(value) {
    return typeof value === "string";
}
function isObject(value) {
    return !isString(value) && typeof value === "object";
}
function isFunction(value) {
    return typeof value === "function"
        && !isString(value) && !nullOrEmpty(value);
}
function isLabelValue(value) {
    return !isString(value) && (value === null || value === void 0 ? void 0 : value.label) != null && (value === null || value === void 0 ? void 0 : value.value) != null;
}

function stringEquals(str1, str2) {
    if (str1 == null && str2 == null) {
        return true;
    }
    if (isString(str1) && isString(str2)) {
        return str1.toLowerCase().trim() === str2.toLowerCase().trim();
    }
    return str1 === str2;
}
function toNumberOrDefault(value) {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? 0 : parsed;
}
function isEmptyOrNull(value) {
    if (value == null) {
        return true;
    }
    if (!Array.isArray(value)) {
        return true;
    }
    return value.length === 0;
}
function nullOrEmpty(str) {
    return str == null || str === '';
}
function fastEquals(any, any2) {
    return JSON.stringify(any) === JSON.stringify(any2);
}
function fastClone(any) {
    if (any == null || !isObject(any)) {
        return any;
    }
    return JSON.parse(JSON.stringify(any));
}

function select(o, s) {
    return get__default['default'](o, s);
}
function set(o, s, value) {
    _set__default['default'](o, s, value);
}

let configStore = {};
let files = {};
let store = {
    fields: {}
};
class FormStore {
    setForm(form) {
        const copy = fastClone(form);
        store = { fields: {} };
        copy.fields.forEach(f => {
            formStore.set(f, {
                fromUser: false,
                field: '',
                value: ''
            });
        });
        Object.keys(copy).forEach(f => {
            if (f === "fields") {
                return;
            }
            //@ts-ignore
            store[f] = copy[f];
        });
        dispatch("form_updated", this.getForm());
    }
    set(field, change = { field: '', value: '', fromUser: false }) {
        if (field.configTarget === 'form') {
            const isSame = fastEquals(configStore[field.id], field);
            if (isSame) {
                return;
            }
            set(store, field.configFieldTarget, field.value);
            dispatch("form_updated", this.getForm());
            dispatchFieldChange(fastClone(field), {
                field: field.configFieldTarget,
                value: field.value,
                fromUser: change.fromUser
            });
            return;
        }
        if (field.configTarget) {
            const isSame = fastEquals(configStore[field.id], field);
            if (isSame) {
                return;
            }
            set(store.fields[field.configTarget], field.configFieldTarget, field.value);
            const copy = fastClone(field);
            configStore[field.id] = copy;
            dispatchFieldChange(copy, change);
            const newField = get__default['default'](store.fields, field.configTarget);
            dispatchFieldChange(fastClone(newField), {
                field: field.configFieldTarget,
                value: field.value,
                fromUser: change.fromUser
            });
            return;
        }
        const isSame = fastEquals(field, get__default['default'](store.fields, field.id));
        if (isSame) {
            return;
        }
        const copy = fastClone(field);
        set(store.fields, field.id, copy);
        dispatchFieldChange(copy, change);
    }
    get(fieldId) {
        const field = store.fields[fieldId];
        if (!field) {
            return undefined;
        }
        const copy = fastClone(field);
        return copy;
    }
    getValue(fieldId) {
        var _a;
        const copy = this.get(fieldId);
        return (_a = copy === null || copy === void 0 ? void 0 : copy.value) !== null && _a !== void 0 ? _a : undefined;
    }
    getForm() {
        const form = { fields: [] };
        Object.keys(store).forEach(k => {
            if (k === "fields") {
                return;
            }
            form[k] = store[k];
        });
        Object.keys(store.fields).forEach(fieldId => {
            const field = store.fields[fieldId];
            if (field.configTarget) {
                return;
            }
            form.fields.push(fastClone(field));
        });
        return form;
    }
    setFile(id, file) {
        files[id] = file;
    }
    clearFile(id) {
        delete files[id];
    }
    getFile(id) {
        return files[id];
    }
}
const formStore = new FormStore();

function firstNotEmpty(...values) {
    for (let v of values) {
        if (!nullOrEmpty(v)) {
            return v;
        }
    }
    return '';
}

/* src\inputs\Label.svelte generated by Svelte v3.24.1 */

const Label = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	
	let { field } = $$props;
	if ($$props.field === void 0 && $$bindings.field && field !== void 0) $$bindings.field(field);

	return `<label${add_attribute("for", field.id, 0)}>${escape(firstNotEmpty(field.label, field.name))}
  ${!field.required ? `<span>(optional)</span>` : ``}</label>`;
});

function debounce(func, wait, immediate = null) {
    let timeout;
    return function () {
        //@ts-ignore
        var context = this, args = arguments;
        var later = function () {
            timeout = null;
            //@ts-ignore
            if (!immediate)
                func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        //@ts-ignore
        clearTimeout(timeout);
        //@ts-ignore
        timeout = setTimeout(later, wait);
        //@ts-ignore
        if (callNow)
            func.apply(context, args);
    };
}

/* src\inputs\TextInput.svelte generated by Svelte v3.24.1 */

const TextInput = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	
	let { field } = $$props;
	let { value = "" } = $$props;
	let { type = "text" } = $$props;

	onMount(() => {
		var _a, _b;

		value = (_b = formStore.getValue((_a = field.configTarget) !== null && _a !== void 0
		? _a
		: field.id)) !== null && _b !== void 0
		? _b
		: "";

		subscribeFieldChange(newField => {
			var _a;

			if (newField.id === field.id) {
				value = (_a = newField.value) !== null && _a !== void 0
				? _a
				: "";
			}
		});
	});

	if ($$props.field === void 0 && $$bindings.field && field !== void 0) $$bindings.field(field);
	if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
	if ($$props.type === void 0 && $$bindings.type && type !== void 0) $$bindings.type(type);

	return `<div class="${"form-group"}">${!field.hideLabel
	? `${validate_component(Label, "Label").$$render($$result, { field }, {}, {})}`
	: ``}
  ${field.rows && field.rows > 1
	? `<textarea${add_attribute("rows", field.rows, 0)}${add_attribute("class", field.properties?.className ?? "form-control", 0)}${add_attribute("id", field.id, 0)}${add_attribute("placeholder", field.placeholder ?? "", 0)}${add_attribute("name", field.name, 0)}${add_attribute("type", type, 0)}>${escape(value)}</textarea>`
	: `<input${add_attribute("class", field.properties?.className ?? "form-control", 0)}${add_attribute("id", field.id, 0)}${add_attribute("value", value, 0)}${add_attribute("placeholder", field.placeholder ?? "", 0)}${add_attribute("name", field.name, 0)}${add_attribute("type", type, 0)}>`}
  ${field.helperText
	? `<small class="${"form-text text-muted"}">${field.helperText ?? ""}</small>`
	: ``}</div>`;
});

var LoadState;
(function (LoadState) {
    LoadState[LoadState["Loading"] = 0] = "Loading";
    LoadState[LoadState["Failed"] = 1] = "Failed";
    LoadState[LoadState["Finished"] = 2] = "Finished";
    LoadState[LoadState["NotStarted"] = 3] = "NotStarted";
})(LoadState || (LoadState = {}));

/* src\inputs\ComboBox.svelte generated by Svelte v3.24.1 */

const css$8 = {
	code: ".item.active{background:var(--itemIsActiveBG, #cddaec) !important;color:var(--itemIsActiveColor, #cddaec) !important}.themed.svelte-3dptv7{--border:1px solid #cddaec;--borderRadius:0.3em;--placeholderColor:#515479;--itemIsActiveColor:#515479;--clearSelectColor:#cddaec;--clearSelectFocusColor:#cddaec;--clearSelectHoverColor:#515479;--indicatorColor:#cddaec;--inputColor:#cddaec;--itemColor:#424767;--listEmptyColor:#cddaec;--multiItemActiveColor:#cddaec;--spinnerColor:#cddaec;--borderFocusColor:#cddaec;--disabledColor:#cddaec;--disabledPlaceholderColor:#cddaec;--groupTitleColor:#cddaec}",
	map: "{\"version\":3,\"file\":\"ComboBox.svelte\",\"sources\":[\"ComboBox.svelte\"],\"sourcesContent\":[\"<script lang=\\\"typescript\\\">var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\\r\\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\\r\\n    return new (P || (P = Promise))(function (resolve, reject) {\\r\\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\\r\\n        function rejected(value) { try { step(generator[\\\"throw\\\"](value)); } catch (e) { reject(e); } }\\r\\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\\r\\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\\r\\n    });\\r\\n};\\r\\nvar _a;\\r\\n;\\r\\nimport { afterUpdate, onDestroy, onMount, tick } from 'svelte';\\r\\nimport { LoadState } from 'models/LoadState';\\r\\nimport { stringEquals, fastEquals } from 'util/Compare';\\r\\nimport { subscribeFieldChange } from 'event/FieldEvent';\\r\\nimport { isFunction, isString } from 'guards/Guard';\\r\\nimport { randomString } from 'util/Generate';\\r\\nimport { dispatch, subscribe } from 'event/EventBus';\\r\\nimport Fuse from 'fuse.js';\\r\\nimport formStore from 'store/FormStore';\\r\\nimport { nullOrEmpty } from 'util/Compare';\\r\\nimport Label from 'inputs/Label.svelte';\\r\\nimport Select from 'svelte-select';\\r\\nlet initialized = false;\\r\\nlet dropdownId;\\r\\nlet open = false;\\r\\nlet fuse;\\r\\nexport let field;\\r\\nlet prevOptions = null;\\r\\nlet activeToolTip;\\r\\nonDestroy(() => {\\r\\n    disposeToolTip();\\r\\n});\\r\\nonMount(() => __awaiter(void 0, void 0, void 0, function* () {\\r\\n    subscribe('show_field_config', (props) => {\\r\\n        value = '';\\r\\n        options = [];\\r\\n        setup();\\r\\n    });\\r\\n    subscribe('combobox_get_options', (props) => {\\r\\n        if (props.id === field.id) {\\r\\n            return options;\\r\\n        }\\r\\n    });\\r\\n    subscribe('combobox_open', (props) => {\\r\\n        if (props.id !== field.id) {\\r\\n            doClose();\\r\\n        }\\r\\n    });\\r\\n    dropdownId = `${field.name}-${randomString()}`;\\r\\n    initialized = false;\\r\\n    value = formStore.getValue(field.id);\\r\\n    subscribe('option_set_modified', (set) => {\\r\\n        if (set.value === field.options) {\\r\\n            setup();\\r\\n        }\\r\\n        if (field.configTarget) {\\r\\n            setup();\\r\\n        }\\r\\n    });\\r\\n    subscribeFieldChange((newField) => {\\r\\n        var _a;\\r\\n        if (newField.id === field.id) {\\r\\n            value = (_a = newField.value) !== null && _a !== void 0 ? _a : '';\\r\\n            normalizeValue();\\r\\n        }\\r\\n    });\\r\\n    yield setup();\\r\\n}));\\r\\n$: {\\r\\n    if (!fastEquals(prevOptions, field.options)) {\\r\\n        prevOptions = (_a = field.options) !== null && _a !== void 0 ? _a : [];\\r\\n        setup();\\r\\n    }\\r\\n}\\r\\nfunction createFuse() {\\r\\n    if (!options) {\\r\\n        return new Fuse([]);\\r\\n    }\\r\\n    return new Fuse(options, {\\r\\n        keys: ['label', 'value'],\\r\\n    });\\r\\n}\\r\\nfunction setup() {\\r\\n    var _a, _b, _c, _d, _e;\\r\\n    return __awaiter(this, void 0, void 0, function* () {\\r\\n        state = LoadState.Loading;\\r\\n        options = [];\\r\\n        try {\\r\\n            if (((_a = field.options) === null || _a === void 0 ? void 0 : _a.type) === 'remote' || isString(field.options) || (((_b = field.options) === null || _b === void 0 ? void 0 : _b.type) === 'local' && isString(field.options.value))) {\\r\\n                const url = field.options.value || field.options;\\r\\n                const result = yield fetch(url);\\r\\n                const data = yield result.json();\\r\\n                if (!data) {\\r\\n                    return;\\r\\n                }\\r\\n                const parsed = [];\\r\\n                if (field.loadTransformer) {\\r\\n                    options = (_c = field.loadTransformer(data)) !== null && _c !== void 0 ? _c : [];\\r\\n                }\\r\\n                else {\\r\\n                    Object.keys(data).forEach((key) => {\\r\\n                        parsed.push({ value: data[key], label: key });\\r\\n                    });\\r\\n                    options = parsed !== null && parsed !== void 0 ? parsed : [];\\r\\n                }\\r\\n            }\\r\\n            else {\\r\\n                const value = (_d = field.options) === null || _d === void 0 ? void 0 : _d.value;\\r\\n                const data = isFunction(value) ? yield value() : yield value;\\r\\n                options = (_e = (field.loadTransformer ? field.loadTransformer(data) : data)) !== null && _e !== void 0 ? _e : [];\\r\\n            }\\r\\n            fuse = createFuse();\\r\\n            normalizeValue();\\r\\n            state = LoadState.Finished;\\r\\n        }\\r\\n        catch (ex) {\\r\\n            console.log(ex);\\r\\n            options = [];\\r\\n            state = LoadState.Failed;\\r\\n        }\\r\\n    });\\r\\n}\\r\\nlet state = LoadState.Loading;\\r\\nlet value = '';\\r\\nlet selectedValue;\\r\\nlet options = [];\\r\\nlet filteredBy = '';\\r\\nlet filtered = new Set();\\r\\nfunction normalizeValue() {\\r\\n    var _a;\\r\\n    const option = options === null || options === void 0 ? void 0 : options.find((w) => stringEquals(w.label, value) || stringEquals(w.value, value));\\r\\n    if (option) {\\r\\n        value = (_a = option.label) !== null && _a !== void 0 ? _a : '';\\r\\n        selectedValue = option;\\r\\n    }\\r\\n}\\r\\nfunction select(option) {\\r\\n    var _a;\\r\\n    doClose();\\r\\n    value = option.value;\\r\\n    field.value = option.value;\\r\\n    formStore.set(field, {\\r\\n        field: 'value',\\r\\n        value: option.value,\\r\\n        fromUser: true,\\r\\n    });\\r\\n    (_a = field.onChange) === null || _a === void 0 ? void 0 : _a.call(field, field.value);\\r\\n}\\r\\nfunction onBodyClick() {\\r\\n    doClose();\\r\\n}\\r\\nfunction onSearch(query) {\\r\\n    if (options.length === 0) {\\r\\n        filtered = new Set();\\r\\n    }\\r\\n    else if (query == null || query === '') {\\r\\n        filtered = new Set();\\r\\n    }\\r\\n    else {\\r\\n        const result = fuse.search(query);\\r\\n        filteredBy = '';\\r\\n        filtered = new Set(result.map((r) => r.item.value));\\r\\n        filteredBy = query;\\r\\n    }\\r\\n}\\r\\nfunction onKeyDown(e) {\\r\\n    if (e.key === 'Escape') {\\r\\n        doClose();\\r\\n    }\\r\\n    else if (e.key === 'ArrowDown') {\\r\\n        e.preventDefault();\\r\\n        const option = document.getElementById(`${field.id}-option-0`);\\r\\n        option === null || option === void 0 ? void 0 : option.focus({\\r\\n            preventScroll: true,\\r\\n        });\\r\\n    }\\r\\n}\\r\\nfunction doOpen() {\\r\\n    dispatch('combobox_open', {\\r\\n        id: field.id,\\r\\n    });\\r\\n    open = true;\\r\\n}\\r\\nfunction doClose() {\\r\\n    disposeToolTip();\\r\\n    open = false;\\r\\n    filtered.clear();\\r\\n    filteredBy = '';\\r\\n}\\r\\nfunction disposeToolTip() {\\r\\n    if (activeToolTip) {\\r\\n        try {\\r\\n            activeToolTip.dispose();\\r\\n        }\\r\\n        catch (ex) { }\\r\\n    }\\r\\n    activeToolTip = undefined;\\r\\n}\\r\\nfunction showTooltip(option, id) {\\r\\n    //@ts-ignore\\r\\n    activeToolTip = new bootstrap.Tooltip(document.getElementById(id), {\\r\\n        title: option.label,\\r\\n        placement: 'top',\\r\\n        trigger: 'manual',\\r\\n    });\\r\\n    setTimeout(() => {\\r\\n        activeToolTip.show();\\r\\n    }, 600);\\r\\n}\\r\\nfunction itemFilter(label, filterText, option) {\\r\\n    if (filteredBy != filterText) {\\r\\n        onSearch(filterText);\\r\\n    }\\r\\n    return filtered.has(option.value);\\r\\n}\\r\\nfunction onSelect(e) {\\r\\n    e.stopPropagation();\\r\\n    field.value = e.detail.value;\\r\\n    formStore.set(field, {\\r\\n        field: 'value',\\r\\n        value: field.value,\\r\\n        fromUser: true,\\r\\n    });\\r\\n}\\r\\nfunction onClear() {\\r\\n    field.value = undefined;\\r\\n    formStore.set(field, {\\r\\n        field: 'value',\\r\\n        value: undefined,\\r\\n        fromUser: true,\\r\\n    });\\r\\n}\\r\\nfunction onMouseDown(option, id) {\\r\\n    disposeToolTip();\\r\\n    showTooltip(option, id);\\r\\n}\\r\\n//# sourceMappingURL=ComboBox.svelte.js.map</script>\\r\\n\\r\\n<div>\\r\\n  {#if !field.hideLabel}\\r\\n    <Label {field} />\\r\\n  {/if}\\r\\n\\r\\n  {#if state === LoadState.Loading}\\r\\n    <div>\\r\\n      <div class=\\\"spinner-border\\\" role=\\\"status\\\"><span class=\\\"sr-only\\\">Loading...</span></div>\\r\\n    </div>\\r\\n  {:else if state === LoadState.Failed}\\r\\n    <p>Failed to load.</p>\\r\\n  {:else}\\r\\n    {#if options}\\r\\n      <div on:click|stopPropagation class=\\\"themed\\\">\\r\\n        <Select items={options} on:select={onSelect} on:clear={onClear} isVirtualList={options.length > 25} {itemFilter} bind:selectedValue showChevron={true} />\\r\\n      </div>\\r\\n    {/if}\\r\\n    {#if field.helperText}\\r\\n      <div style=\\\"padding-top: 0.3em;\\\">\\r\\n        <small class=\\\"form-text text-muted\\\">\\r\\n          {@html field.helperText ?? ''}\\r\\n        </small>\\r\\n      </div>\\r\\n    {/if}\\r\\n  {/if}\\r\\n</div>\\r\\n\\r\\n<style>\\r\\n  :global(.item.active) {\\r\\n    background: var(--itemIsActiveBG, #cddaec) !important;\\r\\n    color: var(--itemIsActiveColor, #cddaec) !important;\\r\\n  }\\r\\n\\r\\n  .themed {\\r\\n    --border: 1px solid #cddaec;\\r\\n    --borderRadius: 0.3em;\\r\\n    --placeholderColor: #515479;\\r\\n    --itemIsActiveColor: #515479;\\r\\n    --clearSelectColor: #cddaec;\\r\\n    --clearSelectFocusColor: #cddaec;\\r\\n    --clearSelectHoverColor: #515479;\\r\\n    --indicatorColor: #cddaec;\\r\\n    --inputColor: #cddaec;\\r\\n    --itemColor: #424767;\\r\\n    --listEmptyColor: #cddaec;\\r\\n    --multiItemActiveColor: #cddaec;\\r\\n    --spinnerColor: #cddaec;\\r\\n    --borderFocusColor: #cddaec;\\r\\n    --disabledColor: #cddaec;\\r\\n    --disabledPlaceholderColor: #cddaec;\\r\\n    --groupTitleColor: #cddaec;\\r\\n  }\\r\\n</style>\\r\\n\"],\"names\":[],\"mappings\":\"AA2QU,YAAY,AAAE,CAAC,AACrB,UAAU,CAAE,IAAI,gBAAgB,CAAC,QAAQ,CAAC,CAAC,UAAU,CACrD,KAAK,CAAE,IAAI,mBAAmB,CAAC,QAAQ,CAAC,CAAC,UAAU,AACrD,CAAC,AAED,OAAO,cAAC,CAAC,AACP,QAAQ,CAAE,iBAAiB,CAC3B,cAAc,CAAE,KAAK,CACrB,kBAAkB,CAAE,OAAO,CAC3B,mBAAmB,CAAE,OAAO,CAC5B,kBAAkB,CAAE,OAAO,CAC3B,uBAAuB,CAAE,OAAO,CAChC,uBAAuB,CAAE,OAAO,CAChC,gBAAgB,CAAE,OAAO,CACzB,YAAY,CAAE,OAAO,CACrB,WAAW,CAAE,OAAO,CACpB,gBAAgB,CAAE,OAAO,CACzB,sBAAsB,CAAE,OAAO,CAC/B,cAAc,CAAE,OAAO,CACvB,kBAAkB,CAAE,OAAO,CAC3B,eAAe,CAAE,OAAO,CACxB,0BAA0B,CAAE,OAAO,CACnC,iBAAiB,CAAE,OAAO,AAC5B,CAAC\"}"
};

const ComboBox = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
		function adopt(value) {
			return value instanceof P
			? value
			: new P(function (resolve) {
						resolve(value);
					});
		}

		return new (P || (P = Promise))(function (resolve, reject) {
				function fulfilled(value) {
					try {
						step(generator.next(value));
					} catch(e) {
						reject(e);
					}
				}

				function rejected(value) {
					try {
						step(generator["throw"](value));
					} catch(e) {
						reject(e);
					}
				}

				function step(result) {
					result.done
					? resolve(result.value)
					: adopt(result.value).then(fulfilled, rejected);
				}

				step((generator = generator.apply(thisArg, _arguments || [])).next());
			});
	};

	var _a;
	let dropdownId;
	let fuse;
	let { field } = $$props;
	let prevOptions = null;
	let activeToolTip;

	onDestroy(() => {
		disposeToolTip();
	});

	onMount(() => __awaiter(void 0, void 0, void 0, function* () {
		subscribe$1("show_field_config", props => {
			value = "";
			options = [];
			setup();
		});

		subscribe$1("combobox_get_options", props => {
			if (props.id === field.id) {
				return options;
			}
		});

		subscribe$1("combobox_open", props => {
			if (props.id !== field.id) {
				doClose();
			}
		});

		dropdownId = `${field.name}-${randomString()}`;
		value = formStore.getValue(field.id);

		subscribe$1("option_set_modified", set => {
			if (set.value === field.options) {
				setup();
			}

			if (field.configTarget) {
				setup();
			}
		});

		subscribeFieldChange(newField => {
			var _a;

			if (newField.id === field.id) {
				value = (_a = newField.value) !== null && _a !== void 0
				? _a
				: "";

				normalizeValue();
			}
		});

		yield setup();
	}));

	function createFuse() {
		if (!options) {
			return new Fuse__default['default']([]);
		}

		return new Fuse__default['default'](options, { keys: ["label", "value"] });
	}

	function setup() {
		var _a, _b, _c, _d, _e;

		return __awaiter(this, void 0, void 0, function* () {
			state = LoadState.Loading;
			options = [];

			try {
				if (((_a = field.options) === null || _a === void 0
				? void 0
				: _a.type) === "remote" || isString(field.options) || ((_b = field.options) === null || _b === void 0
				? void 0
				: _b.type) === "local" && isString(field.options.value)) {
					const url = field.options.value || field.options;
					const result = yield fetch(url);
					const data = yield result.json();

					if (!data) {
						return;
					}

					const parsed = [];

					if (field.loadTransformer) {
						options = (_c = field.loadTransformer(data)) !== null && _c !== void 0
						? _c
						: [];
					} else {
						Object.keys(data).forEach(key => {
							parsed.push({ value: data[key], label: key });
						});

						options = parsed !== null && parsed !== void 0 ? parsed : [];
					}
				} else {
					const value = (_d = field.options) === null || _d === void 0
					? void 0
					: _d.value;

					const data = isFunction(value) ? yield value() : yield value;

					options = (_e = field.loadTransformer
					? field.loadTransformer(data)
					: data) !== null && _e !== void 0
					? _e
					: [];
				}

				fuse = createFuse();
				normalizeValue();
				state = LoadState.Finished;
			} catch(ex) {
				console.log(ex);
				options = [];
				state = LoadState.Failed;
			}
		});
	}

	let state = LoadState.Loading;
	let value = "";
	let selectedValue;
	let options = [];
	let filteredBy = "";
	let filtered = new Set();

	function normalizeValue() {
		var _a;

		const option = options === null || options === void 0
		? void 0
		: options.find(w => stringEquals(w.label, value) || stringEquals(w.value, value));

		if (option) {
			value = (_a = option.label) !== null && _a !== void 0 ? _a : "";
			selectedValue = option;
		}
	}

	function onSearch(query) {
		if (options.length === 0) {
			filtered = new Set();
		} else if (query == null || query === "") {
			filtered = new Set();
		} else {
			const result = fuse.search(query);
			filteredBy = "";
			filtered = new Set(result.map(r => r.item.value));
			filteredBy = query;
		}
	}

	function doClose() {
		disposeToolTip();
		filtered.clear();
		filteredBy = "";
	}

	function disposeToolTip() {
		if (activeToolTip) {
			try {
				activeToolTip.dispose();
			} catch(ex) {
				
			}
		}

		activeToolTip = undefined;
	}

	function itemFilter(label, filterText, option) {
		if (filteredBy != filterText) {
			onSearch(filterText);
		}

		return filtered.has(option.value);
	}

	if ($$props.field === void 0 && $$bindings.field && field !== void 0) $$bindings.field(field);
	$$result.css.add(css$8);
	let $$settled;
	let $$rendered;

	do {
		$$settled = true;

		 {
			{
				if (!fastEquals(prevOptions, field.options)) {
					prevOptions = (_a = field.options) !== null && _a !== void 0 ? _a : [];
					setup();
				}
			}
		}

		$$rendered = `<div>${!field.hideLabel
		? `${validate_component(Label, "Label").$$render($$result, { field }, {}, {})}`
		: ``}

  ${state === LoadState.Loading
		? `<div><div class="${"spinner-border"}" role="${"status"}"><span class="${"sr-only"}">Loading...</span></div></div>`
		: `${state === LoadState.Failed
			? `<p>Failed to load.</p>`
			: `${options
				? `<div class="${"themed svelte-3dptv7"}">${validate_component(Select__default['default'], "Select").$$render(
						$$result,
						{
							items: options,
							isVirtualList: options.length > 25,
							itemFilter,
							showChevron: true,
							selectedValue
						},
						{
							selectedValue: $$value => {
								selectedValue = $$value;
								$$settled = false;
							}
						},
						{}
					)}</div>`
				: ``}
    ${field.helperText
				? `<div style="${"padding-top: 0.3em;"}"><small class="${"form-text text-muted"}">${field.helperText ?? ""}</small></div>`
				: ``}`}`}
</div>`;
	} while (!$$settled);

	return $$rendered;
});

class FieldValueLoader {
    load(field) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.loadValue((_a = field.value) !== null && _a !== void 0 ? _a : field.defaultValue);
        });
    }
    loadValue(value) {
        return __awaiter(this, void 0, void 0, function* () {
            if (value == null) {
                return;
            }
            if (isString(value)) {
                return value;
            }
            if (value.type === "remote") {
                return yield this.loadRemote(value);
            }
            if (value.type === "local") {
                const localValue = value.value;
                if (isObject(localValue) && localValue.type === "remote") {
                    return yield this.loadChildren(localValue);
                }
                return localValue;
            }
            return value;
        });
    }
    loadRemote(value) {
        return __awaiter(this, void 0, void 0, function* () {
            if (isString(value)) {
                return value;
            }
            const response = yield fetch(value.value);
            const result = yield response.json();
            return value.selector ? select(result, value.selector) : result;
        });
    }
    loadChildren(value) {
        return __awaiter(this, void 0, void 0, function* () {
            const keys = Object.keys(value);
            const promises = yield keys.map(w => {
                return this.loadValue(value[w]);
            });
            const results = yield Promise.all(promises);
            const response = {};
            for (let i = 0; i < keys.length; i++) {
                response[keys[i]] = results[i];
            }
            return response;
        });
    }
}

/* src\inputs\StateSelector.svelte generated by Svelte v3.24.1 */

const StateSelector = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	
	let { label = "State" } = $$props;
	let { value = "" } = $$props;
	let { name } = $$props;
	let { id } = $$props;
	let { helperText } = $$props;
	let { hideLabel } = $$props;
	if ($$props.label === void 0 && $$bindings.label && label !== void 0) $$bindings.label(label);
	if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
	if ($$props.name === void 0 && $$bindings.name && name !== void 0) $$bindings.name(name);
	if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
	if ($$props.helperText === void 0 && $$bindings.helperText && helperText !== void 0) $$bindings.helperText(helperText);
	if ($$props.hideLabel === void 0 && $$bindings.hideLabel && hideLabel !== void 0) $$bindings.hideLabel(hideLabel);

	return `${validate_component(ComboBox, "ComboBox").$$render(
		$$result,
		{
			field: {
				id,
				name,
				label,
				helperText: "Zip Code",
				hideLabel: true,
				required: true,
				type: "combobox",
				value,
				options: {
					type: "remote",
					value: "https://gist.githubusercontent.com/mshafrir/2646763/raw/8b0dbb93521f5d6889502305335104218454c2bf/states_hash.json"
				}
			}
		},
		{},
		{}
	)}`;
});

/* src\inputs\Address.svelte generated by Svelte v3.24.1 */

const Address = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	
	let { field } = $$props;
	let { value } = $$props;
	if ($$props.field === void 0 && $$bindings.field && field !== void 0) $$bindings.field(field);
	if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);

	return `${validate_component(Label, "Label").$$render(
		$$result,
		{
			field: {
				label: "Address",
				type: "address",
				id: randomString()
			}
		},
		{},
		{}
	)}
<div class="${"row"}" style="${"width: 100%;"}"><div class="${"col"}"><div class="${"row"}">${validate_component(TextInput, "TextInput").$$render(
		$$result,
		{
			field: {
				required: true,
				name: `${field.name}.address1`,
				id: `${field.id}.value.address1`,
				helperText: "Address Line 1",
				hideLabel: true,
				value: value?.address1 ?? "",
				type: "string"
			}
		},
		{},
		{}
	)}</div>
    <div class="${"row"}" style="${"padding-top: 0.8em;"}">${validate_component(TextInput, "TextInput").$$render(
		$$result,
		{
			field: {
				required: true,
				name: `${field.name}.address2`,
				id: `${field.id}.value.address2`,
				helperText: "Address Line 2",
				hideLabel: true,
				value: value?.address2 ?? "",
				type: "string"
			}
		},
		{},
		{}
	)}</div>
    <div class="${"row"}" style="${"padding-top: 0.8em;"}"><div class="${"col-5"}">${validate_component(TextInput, "TextInput").$$render(
		$$result,
		{
			field: {
				required: true,
				name: `${field.name}.city`,
				id: `${field.id}.value.city`,
				helperText: "City",
				hideLabel: true,
				value: value?.city ?? "",
				type: "string"
			}
		},
		{},
		{}
	)}</div>
      <div class="${"col-3"}">${validate_component(StateSelector, "StateSelector").$$render(
		$$result,
		{
			value: value?.state ?? "",
			id: `${field.id}.value.state`,
			name: `${field.id}.state`,
			helperText: "State",
			hideLabel: true
		},
		{},
		{}
	)}</div>
      <div class="${"col-4"}">${validate_component(TextInput, "TextInput").$$render(
		$$result,
		{
			field: {
				required: true,
				name: `${field.name}.zip`,
				id: `${field.id}.value.zip`,
				helperText: "Zip Code",
				hideLabel: true,
				value: value?.zip ?? "",
				type: "string",
				properties: { pattern: "[d]{5}(-[d]{4})?" }
			}
		},
		{},
		{}
	)}</div></div></div></div>`;
});

/* src\inputs\FullName.svelte generated by Svelte v3.24.1 */

const css$9 = {
	code: ".padding.svelte-1v8st1f{padding-right:0em}",
	map: "{\"version\":3,\"file\":\"FullName.svelte\",\"sources\":[\"FullName.svelte\"],\"sourcesContent\":[\"<script lang=\\\"typescript\\\">import TextInput from 'inputs/TextInput.svelte';\\r\\n;\\r\\nimport { randomString } from 'util/Generate';\\r\\nimport Label from './Label.svelte';\\r\\nexport let field;\\r\\nexport let value;\\r\\n//   export let config: { [key: string]: string }\\r\\nlet config = {\\r\\n    prefix: true,\\r\\n    first: true,\\r\\n    middle: true,\\r\\n    middleInitial: false,\\r\\n    last: true,\\r\\n    suffix: true,\\r\\n};\\r\\n//# sourceMappingURL=FullName.svelte.js.map</script>\\r\\n\\r\\n<Label field={{ label: 'Name', type: 'name', id: randomString() }} />\\r\\n<div class=\\\"row\\\" style=\\\"padding-top: 0.3em; width: 100%;\\\">\\r\\n  {#if config.prefix}\\r\\n    <div class=\\\"col-1 padding\\\">\\r\\n      <TextInput field={{ required: true, name: `${field.name}.prefix`, id: `${field.id}.value.prefix`, helperText: 'Prefix', hideLabel: true, value: value?.prefix ?? '', type: 'string' }} />\\r\\n    </div>\\r\\n  {/if}\\r\\n  {#if config.first}\\r\\n    <div class=\\\"col-3 padding\\\">\\r\\n      <TextInput field={{ required: true, name: `${field.name}.first`, id: `${field.id}.value.first`, helperText: 'First Name', hideLabel: true, value: value?.first ?? '', type: 'string' }} />\\r\\n    </div>\\r\\n  {/if}\\r\\n  {#if config.middle}\\r\\n    <div class=\\\"col-3 padding\\\">\\r\\n      <TextInput field={{ required: true, name: `${field.name}.middle`, id: `${field.id}.value.middle`, helperText: 'Middle Name', hideLabel: true, value: value?.middle ?? '', type: 'string' }} />\\r\\n    </div>\\r\\n  {/if}\\r\\n  {#if config.middleInitial}\\r\\n    <div class=\\\"col-1 padding\\\">\\r\\n      <TextInput\\r\\n        field={{ required: true, name: `${field.name}.middleInitial`, id: `${field.id}.value.middleInitial`, helperText: 'M.I.', hideLabel: true, value: value?.middleInitial ?? '', type: 'string' }} />\\r\\n    </div>\\r\\n  {/if}\\r\\n  {#if config.last}\\r\\n    <div class=\\\"col-3 padding\\\">\\r\\n      <TextInput field={{ required: true, name: `${field.name}.last`, id: `${field.id}.value.last`, helperText: 'Last Name', hideLabel: true, value: value?.last ?? '', type: 'string' }} />\\r\\n    </div>\\r\\n  {/if}\\r\\n  {#if config.suffix}\\r\\n    <div class=\\\"col-1 padding\\\">\\r\\n      <TextInput field={{ required: true, name: `${field.name}.suffix`, id: `${field.id}.value.suffix`, helperText: 'Suffix', hideLabel: true, value: value?.suffix ?? '', type: 'string' }} />\\r\\n    </div>\\r\\n  {/if}\\r\\n</div>\\r\\n\\r\\n<style>\\r\\n  .padding {\\r\\n    padding-right: 0em;\\r\\n  }\\r\\n</style>\\r\\n\"],\"names\":[],\"mappings\":\"AAqDE,QAAQ,eAAC,CAAC,AACR,aAAa,CAAE,GAAG,AACpB,CAAC\"}"
};

const FullName = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	
	let { field } = $$props;
	let { value } = $$props;

	if ($$props.field === void 0 && $$bindings.field && field !== void 0) $$bindings.field(field);
	if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
	$$result.css.add(css$9);

	return `${validate_component(Label, "Label").$$render(
		$$result,
		{
			field: {
				label: "Name",
				type: "name",
				id: randomString()
			}
		},
		{},
		{}
	)}
<div class="${"row"}" style="${"padding-top: 0.3em; width: 100%;"}">${ `<div class="${"col-1 padding svelte-1v8st1f"}">${validate_component(TextInput, "TextInput").$$render(
			$$result,
			{
				field: {
					required: true,
					name: `${field.name}.prefix`,
					id: `${field.id}.value.prefix`,
					helperText: "Prefix",
					hideLabel: true,
					value: value?.prefix ?? "",
					type: "string"
				}
			},
			{},
			{}
		)}</div>`
	}
  ${ `<div class="${"col-3 padding svelte-1v8st1f"}">${validate_component(TextInput, "TextInput").$$render(
			$$result,
			{
				field: {
					required: true,
					name: `${field.name}.first`,
					id: `${field.id}.value.first`,
					helperText: "First Name",
					hideLabel: true,
					value: value?.first ?? "",
					type: "string"
				}
			},
			{},
			{}
		)}</div>`
	}
  ${ `<div class="${"col-3 padding svelte-1v8st1f"}">${validate_component(TextInput, "TextInput").$$render(
			$$result,
			{
				field: {
					required: true,
					name: `${field.name}.middle`,
					id: `${field.id}.value.middle`,
					helperText: "Middle Name",
					hideLabel: true,
					value: value?.middle ?? "",
					type: "string"
				}
			},
			{},
			{}
		)}</div>`
	}
  ${ ``}
  ${ `<div class="${"col-3 padding svelte-1v8st1f"}">${validate_component(TextInput, "TextInput").$$render(
			$$result,
			{
				field: {
					required: true,
					name: `${field.name}.last`,
					id: `${field.id}.value.last`,
					helperText: "Last Name",
					hideLabel: true,
					value: value?.last ?? "",
					type: "string"
				}
			},
			{},
			{}
		)}</div>`
	}
  ${ `<div class="${"col-1 padding svelte-1v8st1f"}">${validate_component(TextInput, "TextInput").$$render(
			$$result,
			{
				field: {
					required: true,
					name: `${field.name}.suffix`,
					id: `${field.id}.value.suffix`,
					helperText: "Suffix",
					hideLabel: true,
					value: value?.suffix ?? "",
					type: "string"
				}
			},
			{},
			{}
		)}</div>`
	}
</div>`;
});

/* src\inputs\TextArea.svelte generated by Svelte v3.24.1 */

const TextArea = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
		function adopt(value) {
			return value instanceof P
			? value
			: new P(function (resolve) {
						resolve(value);
					});
		}

		return new (P || (P = Promise))(function (resolve, reject) {
				function fulfilled(value) {
					try {
						step(generator.next(value));
					} catch(e) {
						reject(e);
					}
				}

				function rejected(value) {
					try {
						step(generator["throw"](value));
					} catch(e) {
						reject(e);
					}
				}

				function step(result) {
					result.done
					? resolve(result.value)
					: adopt(result.value).then(fulfilled, rejected);
				}

				step((generator = generator.apply(thisArg, _arguments || [])).next());
			});
	};

	
	let element;
	let { field } = $$props;
	let { value = { blocks: [] } } = $$props;
	let { onChange } = $$props;

	onMount(() => __awaiter(void 0, void 0, void 0, function* () {
		var _a, _b;

		//@ts-ignore
		Promise.resolve().then(function () { return require('./quill-358f8a4f.js'); }).then(function (n) { return n.quill; });

		//@ts-ignore
		Promise.resolve().then(function () { return require('./quill.snow-afeea4c0.js'); });

		const Quill = (yield Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require('quill')); })).default;

		value = (_b = formStore.getValue((_a = field.configTarget) !== null && _a !== void 0
		? _a
		: field.id)) !== null && _b !== void 0
		? _b
		: "";

		subscribeFieldChange(newField => {
			var _a;

			if (newField.id === field.id) {
				value = (_a = newField.value) !== null && _a !== void 0
				? _a
				: "";
			}
		});

		var toolbarOptions = [
			["bold", "italic", "underline", "strike"],
			[{ list: "ordered" }, { list: "bullet" }],
			[{ header: [1, 2, 3, 4, 5, 6, false] }, { color: [] }, { align: [] }],
			["clean"]
		];

		let quill = new Quill(element,
		{
				theme: "snow",
				placeholder: "Start typing and see the preview on the left side.",
				modules: { toolbar: toolbarOptions }
			});

		//@ts-ignore
		quill.container.firstChild.innerHTML = value;

		quill.on("text-change", function (delta, oldDelta, source) {
			//@ts-ignore
			field.value = quill.container.firstChild.innerHTML;

			formStore.set(field, {
				fromUser: true,
				value: field.value,
				field: "value"
			});
		});
	}));

	if ($$props.field === void 0 && $$bindings.field && field !== void 0) $$bindings.field(field);
	if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
	if ($$props.onChange === void 0 && $$bindings.onChange && onChange !== void 0) $$bindings.onChange(onChange);
	return `<div><div${add_attribute("this", element, 1)}></div></div>`;
});

/* src\inputs\CheckboxGroup.svelte generated by Svelte v3.24.1 */

const CheckboxGroup = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	
	let { field } = $$props;
	let { value = {} } = $$props;
	let otherText = "";

	onMount(() => {
		var _a, _b, _c;

		value = (_b = formStore.getValue((_a = field.configTarget) !== null && _a !== void 0
		? _a
		: field.id)) !== null && _b !== void 0
		? _b
		: {};

		otherText = (_c = value.other) !== null && _c !== void 0 ? _c : "";

		subscribeFieldChange(newField => {
			var _a, _b;

			if (newField.id === field.id) {
				value = (_a = newField.value) !== null && _a !== void 0
				? _a
				: {};

				otherText = (_b = value.other) !== null && _b !== void 0 ? _b : "";
			}
		});
	});

	function isChecked(option) {
		return value[option] != null && value[option] != "";
	}

	if ($$props.field === void 0 && $$bindings.field && field !== void 0) $$bindings.field(field);
	if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);

	return `${!field.hideLabel
	? `${validate_component(Label, "Label").$$render($$result, { field }, {}, {})}`
	: ``}
${field.options
	? `${each(field.options, option => `<div class="${"form-check"}"><input class="${"form-check-input"}" type="${"checkbox"}" value="${""}" ${isChecked(option) ? "checked" : ""}${add_attribute("id", `${field.id}-${option}`, 0)}>
      <label class="${"form-check-label"}"${add_attribute("for", `${field.id}-${option}`, 0)}>${escape(option)}</label>
    </div>`)}
  ${field.includeOther
		? `<input class="${"form-check-input"}" type="${"checkbox"}" value="${""}" ${otherText != "" ? "checked" : ""}${add_attribute("id", `${field.id}-other`, 0)}>
    <label class="${"form-check-label"}"${add_attribute("for", `${field.id}-other`, 0)}>Other: </label>
    <input class="${"form-control"}" type="${"text"}"${add_attribute("value", otherText, 0)}${add_attribute("id", `${field.id}-other`, 0)}>`
		: ``}`
	: ``}`;
});

/* src\inputs\Spacer.svelte generated by Svelte v3.24.1 */

const Spacer = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	
	let { field } = $$props;
	let { value = 0 } = $$props;

	onMount(() => {
		subscribeFieldChange(newField => {
			var _a;

			if (newField.id === field.id) {
				value = toNumberOrDefault((_a = newField.value) !== null && _a !== void 0 ? _a : 1);
			}
		});
	});

	if ($$props.field === void 0 && $$bindings.field && field !== void 0) $$bindings.field(field);
	if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
	return `<div${add_attribute("style", `margin-bottom:${value}em`, 0)}></div>`;
});

/* src\inputs\RadioGroup.svelte generated by Svelte v3.24.1 */

const RadioGroup = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	
	let { field } = $$props;
	let { value = {} } = $$props;
	let otherText = "";
	let otherSelected = false;

	onMount(() => {
		var _a, _b, _c;

		value = (_b = formStore.getValue((_a = field.configTarget) !== null && _a !== void 0
		? _a
		: field.id)) !== null && _b !== void 0
		? _b
		: {};

		otherText = (_c = value.other) !== null && _c !== void 0 ? _c : "";
		otherSelected = otherText != null && otherText != "";

		subscribeFieldChange(newField => {
			var _a, _b;

			if (newField.id === field.id) {
				value = (_a = newField.value) !== null && _a !== void 0
				? _a
				: {};

				if (otherText && !value.other) {
					return;
				}

				otherText = (_b = value.other) !== null && _b !== void 0 ? _b : "";
			}
		});
	});

	function isChecked(option) {
		return value[option] != null && value[option] != "";
	}

	if ($$props.field === void 0 && $$bindings.field && field !== void 0) $$bindings.field(field);
	if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);

	return `${!field.hideLabel
	? `${validate_component(Label, "Label").$$render($$result, { field }, {}, {})}`
	: ``}
${field.options
	? `${each(field.options, option => `<div class="${"form-check"}"><input class="${"form-check-input"}" type="${"radio"}" value="${""}" ${isChecked(option) ? "checked" : ""}${add_attribute("id", `${field.id}-${option}`, 0)}>
      <label class="${"form-check-label"}"${add_attribute("for", `${field.id}-${option}`, 0)}>${escape(option)}</label>
    </div>`)}
  ${field.includeOther
		? `<input class="${"form-check-input"}" type="${"radio"}" value="${""}" ${otherSelected ? "checked" : ""}${add_attribute("id", `${field.id}-other`, 0)}>
    <label class="${"form-check-label"}"${add_attribute("for", `${field.id}-other`, 0)}>Other: </label>
    <input class="${"form-control"}" type="${"text"}"${add_attribute("value", otherText, 0)}${add_attribute("id", `${field.id}-other`, 0)}>`
		: ``}`
	: ``}`;
});

/* src\inputs\RichTextDisplay.svelte generated by Svelte v3.24.1 */

const css$a = {
	code: "p{margin-block-end:0}",
	map: "{\"version\":3,\"file\":\"RichTextDisplay.svelte\",\"sources\":[\"RichTextDisplay.svelte\"],\"sourcesContent\":[\"<script lang=\\\"typescript\\\">var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\\r\\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\\r\\n    return new (P || (P = Promise))(function (resolve, reject) {\\r\\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\\r\\n        function rejected(value) { try { step(generator[\\\"throw\\\"](value)); } catch (e) { reject(e); } }\\r\\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\\r\\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\\r\\n    });\\r\\n};\\r\\n;\\r\\nimport { subscribeFieldChange } from 'event/FieldEvent';\\r\\nimport { onMount } from 'svelte';\\r\\nimport formStore from 'store/FormStore';\\r\\nimport { isString } from 'guards/Guard';\\r\\nimport { LoadState } from 'models/LoadState';\\r\\nexport let field;\\r\\nexport let isPreview = false;\\r\\nlet value = '';\\r\\nlet lastUrl = '';\\r\\nlet state = LoadState.NotStarted;\\r\\nonMount(() => __awaiter(void 0, void 0, void 0, function* () {\\r\\n    var _a;\\r\\n    let url = formStore.getValue((_a = field.configTarget) !== null && _a !== void 0 ? _a : field.id);\\r\\n    subscribeFieldChange((newField) => {\\r\\n        if (newField.id === field.id && lastUrl !== newField.value) {\\r\\n            url = newField.value;\\r\\n            load(url);\\r\\n        }\\r\\n    });\\r\\n    load(url);\\r\\n}));\\r\\nfunction load(url) {\\r\\n    return __awaiter(this, void 0, void 0, function* () {\\r\\n        state = LoadState.Loading;\\r\\n        try {\\r\\n            if (!url) {\\r\\n                return;\\r\\n            }\\r\\n            if (!isString(url)) {\\r\\n                return;\\r\\n            }\\r\\n            if (url.startsWith('http')) {\\r\\n                lastUrl = url;\\r\\n                const response = yield fetch(url);\\r\\n                const html = yield response.text();\\r\\n                value = html !== null && html !== void 0 ? html : '';\\r\\n            }\\r\\n            else {\\r\\n                value = url;\\r\\n            }\\r\\n        }\\r\\n        catch (ex) {\\r\\n            state = LoadState.Failed;\\r\\n        }\\r\\n        finally {\\r\\n            if (state !== LoadState.Failed) {\\r\\n                state = LoadState.Finished;\\r\\n            }\\r\\n        }\\r\\n    });\\r\\n}\\r\\n//# sourceMappingURL=RichTextDisplay.svelte.js.map</script>\\r\\n\\r\\n<div>\\r\\n  {#if isPreview && (value === '' || value == null)}\\r\\n    <h5>Content Placeholder</h5>\\r\\n    <p style=\\\"margin-block-end: 0;\\\">From the field configuration settings, select a content block to display.</p>\\r\\n  {:else if state === LoadState.Finished}\\r\\n    {@html value}\\r\\n  {:else if state === LoadState.Failed}\\r\\n    <p>Failed to load content.</p>\\r\\n  {:else}\\r\\n    <div class=\\\"d-flex justify-content-center\\\">\\r\\n      <div class=\\\"spinner-border text-dark\\\" role=\\\"status\\\">\\r\\n        <span class=\\\"sr-only\\\">Loading...</span>\\r\\n      </div>\\r\\n    </div>\\r\\n  {/if}\\r\\n</div>\\r\\n\\r\\n<style>\\r\\n  :global(p) {\\r\\n    margin-block-end: 0;\\r\\n  }\\r\\n</style>\\r\\n\"],\"names\":[],\"mappings\":\"AAiFU,CAAC,AAAE,CAAC,AACV,gBAAgB,CAAE,CAAC,AACrB,CAAC\"}"
};

const RichTextDisplay = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
		function adopt(value) {
			return value instanceof P
			? value
			: new P(function (resolve) {
						resolve(value);
					});
		}

		return new (P || (P = Promise))(function (resolve, reject) {
				function fulfilled(value) {
					try {
						step(generator.next(value));
					} catch(e) {
						reject(e);
					}
				}

				function rejected(value) {
					try {
						step(generator["throw"](value));
					} catch(e) {
						reject(e);
					}
				}

				function step(result) {
					result.done
					? resolve(result.value)
					: adopt(result.value).then(fulfilled, rejected);
				}

				step((generator = generator.apply(thisArg, _arguments || [])).next());
			});
	};

	
	let { field } = $$props;
	let { isPreview = false } = $$props;
	let value = "";
	let lastUrl = "";
	let state = LoadState.NotStarted;

	onMount(() => __awaiter(void 0, void 0, void 0, function* () {
		var _a;

		let url = formStore.getValue((_a = field.configTarget) !== null && _a !== void 0
		? _a
		: field.id);

		subscribeFieldChange(newField => {
			if (newField.id === field.id && lastUrl !== newField.value) {
				url = newField.value;
				load(url);
			}
		});

		load(url);
	}));

	function load(url) {
		return __awaiter(this, void 0, void 0, function* () {
			state = LoadState.Loading;

			try {
				if (!url) {
					return;
				}

				if (!isString(url)) {
					return;
				}

				if (url.startsWith("http")) {
					lastUrl = url;
					const response = yield fetch(url);
					const html = yield response.text();
					value = html !== null && html !== void 0 ? html : "";
				} else {
					value = url;
				}
			} catch(ex) {
				state = LoadState.Failed;
			} finally {
				if (state !== LoadState.Failed) {
					state = LoadState.Finished;
				}
			}
		});
	}

	if ($$props.field === void 0 && $$bindings.field && field !== void 0) $$bindings.field(field);
	if ($$props.isPreview === void 0 && $$bindings.isPreview && isPreview !== void 0) $$bindings.isPreview(isPreview);
	$$result.css.add(css$a);

	return `<div>${isPreview && (value === "" || value == null)
	? `<h5>Content Placeholder</h5>
    <p style="${"margin-block-end: 0;"}">From the field configuration settings, select a content block to display.</p>`
	: `${state === LoadState.Finished
		? `${value}`
		: `${state === LoadState.Failed
			? `<p>Failed to load content.</p>`
			: `<div class="${"d-flex justify-content-center"}"><div class="${"spinner-border text-dark"}" role="${"status"}"><span class="${"sr-only"}">Loading...</span></div></div>`}`}`}
</div>`;
});

/* src\inputs\Switch.svelte generated by Svelte v3.24.1 */

const Switch = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	
	let { config } = $$props;
	let { field } = $$props;
	let { value = undefined } = $$props;

	onMount(() => {
		var _a;

		value = formStore.getValue((_a = field.configTarget) !== null && _a !== void 0
		? _a
		: field.id);

		subscribeFieldChange((newField, change) => {
			if (newField.id === field.id) {
				if (change.field === "defaultValue") {
					value = newField.defaultValue;
				} else {
					value = newField.value;
				}
			}
		});
	});

	if ($$props.config === void 0 && $$bindings.config && config !== void 0) $$bindings.config(config);
	if ($$props.field === void 0 && $$bindings.field && field !== void 0) $$bindings.field(field);
	if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);

	return `<div class="${"form-check form-switch"}" style="${"margin-bottom: 0; vertical-align: middle;"}"><input class="${"form-check-input"}" type="${"checkbox"}"${add_attribute("id", `${field.id}`, 0)} ${value ? "checked" : ""}>
  <label class="${"form-check-label"}"${add_attribute("for", `${field.id}`, 0)} style="${"padding-top: 0.16em;"}">${escape(firstNotEmpty(field.label, field.name))}</label></div>`;
});

/* src\components\DatePicker.svelte generated by Svelte v3.24.1 */

const css$b = {
	code: ".date-input-hidden.svelte-ig8nfp{background-color:white !important;opacity:1}",
	map: "{\"version\":3,\"file\":\"DatePicker.svelte\",\"sources\":[\"DatePicker.svelte\"],\"sourcesContent\":[\"<script lang=\\\"typescript\\\">var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\\r\\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\\r\\n    return new (P || (P = Promise))(function (resolve, reject) {\\r\\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\\r\\n        function rejected(value) { try { step(generator[\\\"throw\\\"](value)); } catch (e) { reject(e); } }\\r\\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\\r\\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\\r\\n    });\\r\\n};\\r\\nimport { onMount } from 'svelte';\\r\\n;\\r\\nimport Label from '../inputs/Label.svelte';\\r\\nexport let field;\\r\\nlet value = '';\\r\\nlet picker;\\r\\nonMount(() => __awaiter(void 0, void 0, void 0, function* () {\\r\\n    const flatpickr = yield import('flatpickr');\\r\\n    //@ts-ignore\\r\\n    import('flatpickr/dist/flatpickr.min.css');\\r\\n    picker = flatpickr.default(document.getElementById(field.id), {\\r\\n        onChange: (selectedDates, dateStr, instance) => {\\r\\n            value = dateStr;\\r\\n        },\\r\\n        altInput: true,\\r\\n        altFormat: 'F j, Y h:i K',\\r\\n        dateFormat: 'Y-m-d h:i K',\\r\\n        enableTime: true,\\r\\n    });\\r\\n}));\\r\\nfunction clearDate() {\\r\\n    picker.clear();\\r\\n}\\r\\n//# sourceMappingURL=DatePicker.svelte.js.map</script>\\r\\n\\r\\n<Label {field} />\\r\\n<input id={field.id} type=\\\"text\\\" class=\\\"form-control date-input-hidden\\\" value={value ?? ''} placeholder=\\\"Select a date...\\\" />\\r\\n\\r\\n<style>\\r\\n  .date-input-hidden {\\r\\n    background-color: white !important;\\r\\n    opacity: 1;\\r\\n  }\\r\\n</style>\\r\\n\"],\"names\":[],\"mappings\":\"AAsCE,kBAAkB,cAAC,CAAC,AAClB,gBAAgB,CAAE,KAAK,CAAC,UAAU,CAClC,OAAO,CAAE,CAAC,AACZ,CAAC\"}"
};

const DatePicker = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
		function adopt(value) {
			return value instanceof P
			? value
			: new P(function (resolve) {
						resolve(value);
					});
		}

		return new (P || (P = Promise))(function (resolve, reject) {
				function fulfilled(value) {
					try {
						step(generator.next(value));
					} catch(e) {
						reject(e);
					}
				}

				function rejected(value) {
					try {
						step(generator["throw"](value));
					} catch(e) {
						reject(e);
					}
				}

				function step(result) {
					result.done
					? resolve(result.value)
					: adopt(result.value).then(fulfilled, rejected);
				}

				step((generator = generator.apply(thisArg, _arguments || [])).next());
			});
	};

	
	let { field } = $$props;
	let value = "";
	let picker;

	onMount(() => __awaiter(void 0, void 0, void 0, function* () {
		const flatpickr = yield Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require('flatpickr')); });

		//@ts-ignore
		Promise.resolve().then(function () { return require('./flatpickr.min-30ea1f03.js'); });

		picker = flatpickr.default(document.getElementById(field.id), {
			onChange: (selectedDates, dateStr, instance) => {
				value = dateStr;
			},
			altInput: true,
			altFormat: "F j, Y h:i K",
			dateFormat: "Y-m-d h:i K",
			enableTime: true
		});
	}));

	if ($$props.field === void 0 && $$bindings.field && field !== void 0) $$bindings.field(field);
	$$result.css.add(css$b);

	return `${validate_component(Label, "Label").$$render($$result, { field }, {}, {})}
<input${add_attribute("id", field.id, 0)} type="${"text"}" class="${"form-control date-input-hidden svelte-ig8nfp"}"${add_attribute("value", value ?? "", 0)} placeholder="${"Select a date..."}">`;
});

/* src\inputs\FileUpload.svelte generated by Svelte v3.24.1 */

const css$c = {
	code: ".form-file-input.svelte-bhgfry{z-index:unset}",
	map: "{\"version\":3,\"file\":\"FileUpload.svelte\",\"sources\":[\"FileUpload.svelte\"],\"sourcesContent\":[\"<script lang=\\\"typescript\\\">;\\r\\nimport { subscribeFieldChange } from 'event/FieldEvent';\\r\\nimport Label from './Label.svelte';\\r\\nimport { afterUpdate, onMount } from 'svelte';\\r\\nimport formStore from 'store/FormStore';\\r\\nimport { firstNotEmpty } from 'util/Format';\\r\\nimport has from 'lodash.has';\\r\\nimport { randomString } from 'util/Generate';\\r\\nexport let field;\\r\\nlet files;\\r\\nlet placeholder = 'Choose a file...';\\r\\nlet hasFile = false;\\r\\nlet fileId = '';\\r\\nonMount(() => {\\r\\n    placeholder = firstNotEmpty(field.placeholder, 'Choose a file...');\\r\\n});\\r\\nfunction clear() {\\r\\n    if (files) {\\r\\n        hasFile = false;\\r\\n        placeholder = firstNotEmpty(field.placeholder, 'Choose a file...');\\r\\n        files = undefined;\\r\\n        formStore.clearFile(fileId);\\r\\n        fileId = '';\\r\\n        field.value = undefined;\\r\\n        formStore.set(field, {\\r\\n            field: 'value',\\r\\n            value: undefined,\\r\\n            fromUser: true,\\r\\n        });\\r\\n    }\\r\\n}\\r\\nafterUpdate(() => {\\r\\n    if (files && files[0] && !hasFile) {\\r\\n        hasFile = true;\\r\\n        placeholder = files[0].name;\\r\\n        fileId = randomString();\\r\\n        formStore.setFile(fileId, files[0]);\\r\\n        field.value = fileId;\\r\\n        formStore.set(field, {\\r\\n            field: 'value',\\r\\n            value: fileId,\\r\\n            fromUser: true,\\r\\n        });\\r\\n    }\\r\\n});\\r\\n//# sourceMappingURL=FileUpload.svelte.js.map</script>\\r\\n\\r\\n<Label {field} />\\r\\n{#if hasFile}\\r\\n  <div class=\\\"input-group\\\" on:click|stopPropagation>\\r\\n    <input type=\\\"text\\\" class=\\\"form-control\\\" {placeholder} value={placeholder} readonly aria-label={'Uploaded file'} aria-describedby=\\\"basic-addon2\\\" />\\r\\n    <span class=\\\"input-group-text form-file-button\\\" on:click|stopPropagation={clear}>Clear File</span>\\r\\n  </div>\\r\\n{:else}\\r\\n  <div class=\\\"form-file\\\" on:click|stopPropagation>\\r\\n    <input bind:files type=\\\"file\\\" class=\\\"form-file-input\\\" id={`${field.id}-file-input`} on:click|stopPropagation />\\r\\n    <label class=\\\"form-file-label\\\" for=\\\"customFile\\\">\\r\\n      <span class=\\\"form-file-text\\\">{placeholder}</span>\\r\\n      <span class=\\\"form-file-button\\\">Browse</span>\\r\\n    </label>\\r\\n  </div>\\r\\n{/if}\\r\\n\\r\\n<style>\\r\\n  .form-file-input {\\r\\n    z-index: unset;\\r\\n  }\\r\\n</style>\\r\\n\"],\"names\":[],\"mappings\":\"AAgEE,gBAAgB,cAAC,CAAC,AAChB,OAAO,CAAE,KAAK,AAChB,CAAC\"}"
};

const FileUpload = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	
	let { field } = $$props;
	let placeholder = "Choose a file...";

	onMount(() => {
		placeholder = firstNotEmpty(field.placeholder, "Choose a file...");
	});

	afterUpdate(() => {
	});

	if ($$props.field === void 0 && $$bindings.field && field !== void 0) $$bindings.field(field);
	$$result.css.add(css$c);

	return `${validate_component(Label, "Label").$$render($$result, { field }, {}, {})}
${ `<div class="${"form-file"}"><input type="${"file"}" class="${"form-file-input svelte-bhgfry"}"${add_attribute("id", `${field.id}-file-input`, 0)}>
    <label class="${"form-file-label"}" for="${"customFile"}"><span class="${"form-file-text"}">${escape(placeholder)}</span>
      <span class="${"form-file-button"}">Browse</span></label></div>`}`;
});

/* src\features\form\edit\Field.svelte generated by Svelte v3.24.1 */

const css$d = {
	code: ".wrapper.svelte-blsrvm.svelte-blsrvm:hover{background-color:#f5f5f5;cursor:pointer;border-radius:0.3rem}.selected.svelte-blsrvm.svelte-blsrvm{background-color:#f5f5f5;cursor:pointer;border-radius:0.3rem}.placeholder.svelte-blsrvm.svelte-blsrvm{background-color:#f5f5f5 !important;padding:4em !important;border-radius:0.3rem}.hidden.svelte-blsrvm.svelte-blsrvm{opacity:0.7}.btn-group.svelte-blsrvm>.btn.svelte-blsrvm:not(:last-child):not(.dropdown-toggle){border-top-right-radius:0 !important;border-bottom-right-radius:0 !important}.btn-group.svelte-blsrvm>.btn.svelte-blsrvm:nth-child(n + 3),.btn-group>:not(.btn-check)+.btn.svelte-blsrvm.svelte-blsrvm{border-top-left-radius:0 !important;border-bottom-left-radius:0 !important}",
	map: "{\"version\":3,\"file\":\"Field.svelte\",\"sources\":[\"Field.svelte\"],\"sourcesContent\":[\"<script lang=\\\"typescript\\\">var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\\r\\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\\r\\n    return new (P || (P = Promise))(function (resolve, reject) {\\r\\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\\r\\n        function rejected(value) { try { step(generator[\\\"throw\\\"](value)); } catch (e) { reject(e); } }\\r\\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\\r\\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\\r\\n    });\\r\\n};\\r\\n;\\r\\nexport let field;\\r\\nimport TextInput from 'inputs/TextInput.svelte';\\r\\nimport { onMount } from 'svelte';\\r\\nimport ComboBox from 'inputs/ComboBox.svelte';\\r\\nimport { LoadState } from 'models/LoadState';\\r\\nimport { FieldValueLoader } from 'loader/FieldValueLoader';\\r\\nimport Address from 'inputs/Address.svelte';\\r\\nimport FullName from 'inputs/FullName.svelte';\\r\\nimport TextArea from 'inputs/TextArea.svelte';\\r\\nimport CheckboxGroup from 'inputs/CheckboxGroup.svelte';\\r\\nimport Spacer from 'inputs/Spacer.svelte';\\r\\nimport RadioGroup from 'inputs/RadioGroup.svelte';\\r\\nimport formStore from 'store/FormStore';\\r\\nimport { fade } from 'svelte/transition';\\r\\nimport RichTextDisplay from 'inputs/RichTextDisplay.svelte';\\r\\nimport { dispatch } from 'event/EventBus';\\r\\nimport Switch from '../../../inputs/Switch.svelte';\\r\\nimport { subscribe } from 'event/EventBus';\\r\\nimport DatePicker from 'components/DatePicker.svelte';\\r\\nimport { firstNotEmpty } from 'util/Format';\\r\\nimport { subscribeFieldChange } from 'event/FieldEvent';\\r\\nimport { fastClone } from 'util/Compare';\\r\\nimport FileUpload from 'inputs/FileUpload.svelte';\\r\\nimport Dialog from 'components/layout/Dialog.svelte';\\r\\nlet state = LoadState.NotStarted;\\r\\nlet value;\\r\\nlet lastValue;\\r\\nexport let editor = false;\\r\\nexport let config = {};\\r\\nexport let hidden = false;\\r\\nexport let padding = true;\\r\\nlet deleting = false;\\r\\nonMount(load);\\r\\nfunction onClone() {\\r\\n    dispatch('field_clone', {\\r\\n        field,\\r\\n    });\\r\\n}\\r\\nfunction styles() {\\r\\n    let style = '';\\r\\n    if (padding) {\\r\\n        style = `padding: .75em 0.6em; border-radius: 1em;`;\\r\\n    }\\r\\n    if (field.customCss) {\\r\\n        style += ` ${field.customCss} padding-left: 0.6em;`;\\r\\n    }\\r\\n    return style;\\r\\n}\\r\\nfunction select() {\\r\\n    if (field.configTarget || editor) {\\r\\n        return;\\r\\n    }\\r\\n    field.selected = !field.selected;\\r\\n    formStore.set(field, {\\r\\n        field: 'selected',\\r\\n        value: field.selected,\\r\\n        fromUser: false,\\r\\n    });\\r\\n}\\r\\nfunction load() {\\r\\n    var _a;\\r\\n    return __awaiter(this, void 0, void 0, function* () {\\r\\n        lastValue = field.value;\\r\\n        if (((_a = field.value) !== null && _a !== void 0 ? _a : field.defaultValue) != null) {\\r\\n            state = LoadState.Loading;\\r\\n            try {\\r\\n                const loader = new FieldValueLoader();\\r\\n                const result = yield loader.load(field);\\r\\n                value = result;\\r\\n                field.value = result;\\r\\n                formStore.set(field, {\\r\\n                    value: result,\\r\\n                    field: 'value',\\r\\n                    fromUser: false,\\r\\n                });\\r\\n                state = LoadState.Finished;\\r\\n            }\\r\\n            catch (e) {\\r\\n                console.error(e);\\r\\n                state = LoadState.Failed;\\r\\n            }\\r\\n        }\\r\\n    });\\r\\n}\\r\\n//# sourceMappingURL=Field.svelte.js.map</script>\\r\\n\\r\\n<div on:click|stopPropagation={select} style=\\\"margin-top: .3em\\\" class:hidden class:wrapper={!field.configTarget && !editor} class:selected={field.selected}>\\r\\n  {#if field.selected}\\r\\n    <div class=\\\"btn-group float-right\\\" role=\\\"group\\\" aria-label=\\\"Selected\\\" style=\\\"top: -0.5em; right: 1em;\\\">\\r\\n      <button on:click|stopPropagation={onClone} type=\\\"button\\\" class=\\\"btn btn-secondary\\\" style=\\\"font-size: 0.5rem; padding: 0.25rem 0.5rem;\\\">\\r\\n        <span class=\\\"icon-brand\\\"> <span class=\\\"far fa-clone\\\" /> </span>\\r\\n      </button>\\r\\n      <button on:click|stopPropagation={() => dispatch(\\\"confirm_field_deletion\\\", {})} type=\\\"button\\\" class=\\\"btn btn-secondary\\\" style=\\\"font-size: 0.5rem; padding: 0.25rem 0.5rem;\\\">\\r\\n        <span class=\\\"icon-brand\\\"> <span class=\\\"fas fa-trash\\\" /> </span>\\r\\n      </button>\\r\\n    </div>\\r\\n  {/if}\\r\\n  <div style={styles()}>\\r\\n    {#if hidden}\\r\\n      <p>{firstNotEmpty(field.label, field.name)} is hidden by rules defined in logic. This message is only displayed on this preview.</p>\\r\\n    {:else if field.type === 'address'}\\r\\n      <Address {field} {value} />\\r\\n    {:else if field.type === 'string'}\\r\\n      <TextInput {field} />\\r\\n    {:else if field.type === 'number'}\\r\\n      <TextInput {field} type={'number'} />\\r\\n    {:else if field.type === 'combobox'}\\r\\n      <ComboBox {field} {...config} />\\r\\n    {:else if field.type === 'block'}\\r\\n      <RichTextDisplay {field} />\\r\\n    {:else if field.type === 'block-editor'}\\r\\n      <TextArea {field} {...config} isPreview={true} />\\r\\n    {:else if field.type === 'spacer'}\\r\\n      <Spacer {field} />\\r\\n    {:else if field.type === 'switch'}\\r\\n      <Switch {field} {...config} />\\r\\n    {:else if field.type === 'date'}\\r\\n      <DatePicker {field} {...config} />\\r\\n    {:else if field.type === 'placeholder'}\\r\\n      <div class=\\\"placeholder\\\">\\r\\n        <p>You have no fields, drag one from the left sidebar to get started.</p>\\r\\n      </div>\\r\\n    {:else if field.type === 'file'}\\r\\n      <FileUpload {field} />\\r\\n    {:else if field.type === 'checkbox-group'}\\r\\n      <CheckboxGroup {field} />\\r\\n    {:else if field.type === 'radio-group'}\\r\\n      <RadioGroup {field} />\\r\\n    {:else if field.type === 'full-name'}\\r\\n      <FullName {field} {value} />\\r\\n    {:else}\\r\\n      <p>No field found for field. {JSON.stringify(field, null, 2)}</p>\\r\\n    {/if}\\r\\n  </div>\\r\\n</div>\\r\\n\\r\\n<style>\\r\\n  .wrapper:hover {\\r\\n    background-color: #f5f5f5;\\r\\n    cursor: pointer;\\r\\n    border-radius: 0.3rem;\\r\\n  }\\r\\n\\r\\n  .selected {\\r\\n    background-color: #f5f5f5;\\r\\n    cursor: pointer;\\r\\n    border-radius: 0.3rem;\\r\\n  }\\r\\n\\r\\n  .placeholder {\\r\\n    background-color: #f5f5f5 !important;\\r\\n    padding: 4em !important;\\r\\n    border-radius: 0.3rem;\\r\\n  }\\r\\n\\r\\n  .hidden {\\r\\n    opacity: 0.7;\\r\\n  }\\r\\n\\r\\n  .btn-group > .btn:not(:last-child):not(.dropdown-toggle),\\r\\n  .btn-group > .btn-group:not(:last-child) > .btn {\\r\\n    border-top-right-radius: 0 !important;\\r\\n    border-bottom-right-radius: 0 !important;\\r\\n  }\\r\\n\\r\\n  .btn-group > .btn:nth-child(n + 3),\\r\\n  .btn-group > :not(.btn-check) + .btn,\\r\\n  .btn-group > .btn-group:not(:first-child) > .btn {\\r\\n    border-top-left-radius: 0 !important;\\r\\n    border-bottom-left-radius: 0 !important;\\r\\n  }\\r\\n</style>\\r\\n\"],\"names\":[],\"mappings\":\"AAmJE,oCAAQ,MAAM,AAAC,CAAC,AACd,gBAAgB,CAAE,OAAO,CACzB,MAAM,CAAE,OAAO,CACf,aAAa,CAAE,MAAM,AACvB,CAAC,AAED,SAAS,4BAAC,CAAC,AACT,gBAAgB,CAAE,OAAO,CACzB,MAAM,CAAE,OAAO,CACf,aAAa,CAAE,MAAM,AACvB,CAAC,AAED,YAAY,4BAAC,CAAC,AACZ,gBAAgB,CAAE,OAAO,CAAC,UAAU,CACpC,OAAO,CAAE,GAAG,CAAC,UAAU,CACvB,aAAa,CAAE,MAAM,AACvB,CAAC,AAED,OAAO,4BAAC,CAAC,AACP,OAAO,CAAE,GAAG,AACd,CAAC,AAED,wBAAU,CAAG,kBAAI,KAAK,WAAW,CAAC,KAAK,gBAAgB,CAAC,AACR,CAAC,AAC/C,uBAAuB,CAAE,CAAC,CAAC,UAAU,CACrC,0BAA0B,CAAE,CAAC,CAAC,UAAU,AAC1C,CAAC,AAED,wBAAU,CAAG,kBAAI,WAAW,KAAK,CAAC,CAClC,UAAU,CAAG,KAAK,UAAU,CAAC,CAAG,IAAI,4BACa,CAAC,AAChD,sBAAsB,CAAE,CAAC,CAAC,UAAU,CACpC,yBAAyB,CAAE,CAAC,CAAC,UAAU,AACzC,CAAC\"}"
};

const Field = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
		function adopt(value) {
			return value instanceof P
			? value
			: new P(function (resolve) {
						resolve(value);
					});
		}

		return new (P || (P = Promise))(function (resolve, reject) {
				function fulfilled(value) {
					try {
						step(generator.next(value));
					} catch(e) {
						reject(e);
					}
				}

				function rejected(value) {
					try {
						step(generator["throw"](value));
					} catch(e) {
						reject(e);
					}
				}

				function step(result) {
					result.done
					? resolve(result.value)
					: adopt(result.value).then(fulfilled, rejected);
				}

				step((generator = generator.apply(thisArg, _arguments || [])).next());
			});
	};

	
	let { field } = $$props;
	let state = LoadState.NotStarted;
	let value;
	let lastValue;
	let { editor = false } = $$props;
	let { config = {} } = $$props;
	let { hidden = false } = $$props;
	let { padding = true } = $$props;
	onMount(load);

	function styles() {
		let style = "";

		if (padding) {
			style = `padding: .75em 0.6em; border-radius: 1em;`;
		}

		if (field.customCss) {
			style += ` ${field.customCss} padding-left: 0.6em;`;
		}

		return style;
	}

	function load() {
		var _a;

		return __awaiter(this, void 0, void 0, function* () {
			lastValue = field.value;

			if (((_a = field.value) !== null && _a !== void 0
			? _a
			: field.defaultValue) != null) {
				state = LoadState.Loading;

				try {
					const loader = new FieldValueLoader();
					const result = yield loader.load(field);
					value = result;
					field.value = result;

					formStore.set(field, {
						value: result,
						field: "value",
						fromUser: false
					});

					state = LoadState.Finished;
				} catch(e) {
					console.error(e);
					state = LoadState.Failed;
				}
			}
		});
	}

	if ($$props.field === void 0 && $$bindings.field && field !== void 0) $$bindings.field(field);
	if ($$props.editor === void 0 && $$bindings.editor && editor !== void 0) $$bindings.editor(editor);
	if ($$props.config === void 0 && $$bindings.config && config !== void 0) $$bindings.config(config);
	if ($$props.hidden === void 0 && $$bindings.hidden && hidden !== void 0) $$bindings.hidden(hidden);
	if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0) $$bindings.padding(padding);
	$$result.css.add(css$d);

	return `<div style="${"margin-top: .3em"}" class="${[
		"svelte-blsrvm",
		(hidden ? "hidden" : "") + " " + (!field.configTarget && !editor ? "wrapper" : "") + " " + (field.selected ? "selected" : "")
	].join(" ").trim()}">${field.selected
	? `<div class="${"btn-group float-right svelte-blsrvm"}" role="${"group"}" aria-label="${"Selected"}" style="${"top: -0.5em; right: 1em;"}"><button type="${"button"}" class="${"btn btn-secondary svelte-blsrvm"}" style="${"font-size: 0.5rem; padding: 0.25rem 0.5rem;"}"><span class="${"icon-brand"}"><span class="${"far fa-clone"}"></span></span></button>
      <button type="${"button"}" class="${"btn btn-secondary svelte-blsrvm"}" style="${"font-size: 0.5rem; padding: 0.25rem 0.5rem;"}"><span class="${"icon-brand"}"><span class="${"fas fa-trash"}"></span></span></button></div>`
	: ``}
  <div${add_attribute("style", styles(), 0)}>${hidden
	? `<p>${escape(firstNotEmpty(field.label, field.name))} is hidden by rules defined in logic. This message is only displayed on this preview.</p>`
	: `${field.type === "address"
		? `${validate_component(Address, "Address").$$render($$result, { field, value }, {}, {})}`
		: `${field.type === "string"
			? `${validate_component(TextInput, "TextInput").$$render($$result, { field }, {}, {})}`
			: `${field.type === "number"
				? `${validate_component(TextInput, "TextInput").$$render($$result, { field, type: "number" }, {}, {})}`
				: `${field.type === "combobox"
					? `${validate_component(ComboBox, "ComboBox").$$render($$result, Object.assign({ field }, config), {}, {})}`
					: `${field.type === "block"
						? `${validate_component(RichTextDisplay, "RichTextDisplay").$$render($$result, { field }, {}, {})}`
						: `${field.type === "block-editor"
							? `${validate_component(TextArea, "TextArea").$$render($$result, Object.assign({ field }, config, { isPreview: true }), {}, {})}`
							: `${field.type === "spacer"
								? `${validate_component(Spacer, "Spacer").$$render($$result, { field }, {}, {})}`
								: `${field.type === "switch"
									? `${validate_component(Switch, "Switch").$$render($$result, Object.assign({ field }, config), {}, {})}`
									: `${field.type === "date"
										? `${validate_component(DatePicker, "DatePicker").$$render($$result, Object.assign({ field }, config), {}, {})}`
										: `${field.type === "placeholder"
											? `<div class="${"placeholder svelte-blsrvm"}"><p>You have no fields, drag one from the left sidebar to get started.</p></div>`
											: `${field.type === "file"
												? `${validate_component(FileUpload, "FileUpload").$$render($$result, { field }, {}, {})}`
												: `${field.type === "checkbox-group"
													? `${validate_component(CheckboxGroup, "CheckboxGroup").$$render($$result, { field }, {}, {})}`
													: `${field.type === "radio-group"
														? `${validate_component(RadioGroup, "RadioGroup").$$render($$result, { field }, {}, {})}`
														: `${field.type === "full-name"
															? `${validate_component(FullName, "FullName").$$render($$result, { field, value }, {}, {})}`
															: `<p>No field found for field. ${escape(JSON.stringify(field, null, 2))}</p>`}`}`}`}`}`}`}`}`}`}`}`}`}`}`}</div>
</div>`;
});

/* src\features\form\edit\FormEditSettings.svelte generated by Svelte v3.24.1 */

const FormEditSettings = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	
	let { form } = $$props;

	onMount(() => {
		subscribe$1("form_loaded", updatedForm => {
			form = updatedForm;
		});

		subscribe$1("form_updated", updatedForm => {
			form = updatedForm;
		});
	});

	if ($$props.form === void 0 && $$bindings.form && form !== void 0) $$bindings.form(form);

	return `${validate_component(Field, "Field").$$render(
		$$result,
		{
			field: {
				id: randomString(),
				required: true,
				label: "Form Title",
				value: { type: "local", value: form.title },
				type: "string",
				configFieldTarget: "title",
				configTarget: "form"
			}
		},
		{},
		{}
	)}
${validate_component(Field, "Field").$$render(
		$$result,
		{
			field: {
				id: randomString(),
				required: true,
				label: "Form Description",
				value: { type: "local", value: form.description },
				type: "string",
				configFieldTarget: "description",
				configTarget: "form"
			}
		},
		{},
		{}
	)}


<h2 class="${"h5"}" style="${"padding-top: 2em;"}">Form Availability</h2>
${validate_component(Field, "Field").$$render(
		$$result,
		{
			field: {
				id: randomString(),
				type: "switch",
				label: "Disable Summisions",
				value: {
					type: "local",
					value: form.disableSubmissions ?? false
				},
				configFieldTarget: "disableSubmissions",
				configTarget: "form"
			}
		},
		{},
		{}
	)}
${validate_component(Field, "Field").$$render(
		$$result,
		{
			field: {
				id: randomString(),
				type: "switch",
				label: "Disable after a maximum number of submissions",
				value: {
					type: "local",
					value: form.maxSubmissions ?? false
				},
				configFieldTarget: "maxSubmissions",
				configTarget: "form"
			}
		},
		{},
		{}
	)}
${validate_component(Field, "Field").$$render(
		$$result,
		{
			field: {
				id: randomString(),
				type: "date",
				required: true,
				label: "Submissions open after date/time",
				value: {
					type: "local",
					value: form.openDateTime ?? ""
				},
				configFieldTarget: "openDateTime",
				configTarget: "form"
			}
		},
		{},
		{}
	)}

${validate_component(Field, "Field").$$render(
		$$result,
		{
			field: {
				id: randomString(),
				type: "date",
				required: true,
				label: "Submissions close after date/time ",
				value: {
					type: "local",
					value: form.closeDateTime ?? ""
				},
				configFieldTarget: "closeDateTime",
				configTarget: "form"
			}
		},
		{},
		{}
	)}`;
});

/* src\features\form\edit\FormEdit.svelte generated by Svelte v3.24.1 */

const FormEdit = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	
	let form;

	onMount(() => {
		form = formStore.getForm();
		console.log(form);

		subscribe$1("form_updated", props => {
			form = props;
		});
	});

	return `${form
	? `<div style="${"padding-left: 0.5em;"}"><h5 style="${"padding-bottom: 0.2em;"}">Form Settings</h5>

    
    <hr></div>

  <div style="${"padding-right: 1.5em;"}"><div class="${""}" style="${"padding: 0.75em 0.4em;"}"><button target="${"_blank"}" class="${"btn btn-sm btn-outline-dark"}"><span class="${"fas fa-cog"}"></span>  Manage Workflows</button></div>
    ${validate_component(Field, "Field").$$render(
			$$result,
			{
				field: {
					id: randomString(),
					type: "switch",
					label: "Enable Logic For Preview",
					value: {
						type: "local",
						value: form.enableLogic ?? true
					},
					configFieldTarget: "enableLogic",
					configTarget: "form"
				}
			},
			{},
			{}
		)}
    ${validate_component(FormEditSettings, "FormEditSettings").$$render($$result, { form }, {}, {})}</div>`
	: `<div class="${"spinner"}"></div>`}`;
});

function saveForm() {
    return __awaiter(this, void 0, void 0, function* () {
        const form = formStore.getForm();
        const isNew = form.id == null;
        removeValues(form);
        const saved = yield save(form);
        form.id = saved.id;
        saveToLocalStorage(form);
        formStore.setForm(form);
        if (isNew) {
            goto('/builder?formId=' + form.id);
        }
    });
}
function saveToLocalStorage(form) {
    let copy = fastClone(form);
    copy = removeValues(copy);
    localStorage.setItem("form", JSON.stringify(copy));
}
function removeValues(form) {
    form.fields = form.fields.map(f => {
        delete (f.value);
        return f;
    });
    return form;
}
function save(form) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (form.id ? putApi(`form/${form.id}`, form) : postApi("form", form));
    });
}

/* src\components\form_settings\EmailSettings.svelte generated by Svelte v3.24.1 */

const EmailSettings = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	
	let { form } = $$props;

	onMount(() => {
		subscribe$1("form_loaded", updatedForm => {
			form = updatedForm;
		});

		subscribe$1("form_updated", updatedForm => {
			form = updatedForm;
		});
	});

	if ($$props.form === void 0 && $$bindings.form && form !== void 0) $$bindings.form(form);

	return `<p style="${"padding-top: 0.6em; margin-bottom: 0em;"}">Configure what emails are sent when the form is submitted.</p>

${validate_component(Field, "Field").$$render(
		$$result,
		{
			field: {
				id: randomString(),
				type: "switch",
				label: "Send me an email summary on submission",
				value: {
					type: "local",
					value: form.emailOnSubmission ?? false
				},
				configFieldTarget: "emailOnSubmission",
				configTarget: "form"
			}
		},
		{},
		{}
	)}


<h2 class="${"h5"}" style="${"padding-top: 0.5em;"}">Custom Emails</h2>

${validate_component(Field, "Field").$$render(
		$$result,
		{
			field: {
				id: randomString(),
				required: true,
				label: "Form Title",
				value: { type: "local", value: form.title },
				type: "string",
				configFieldTarget: "title",
				configTarget: "form"
			}
		},
		{},
		{}
	)}

${validate_component(Field, "Field").$$render(
		$$result,
		{
			field: {
				id: randomString(),
				type: "switch",
				label: "Disable after a maximum number of submissions",
				value: {
					type: "local",
					value: form.maxSubmissions ?? false
				},
				configFieldTarget: "maxSubmissions",
				configTarget: "form"
			}
		},
		{},
		{}
	)}

${validate_component(Field, "Field").$$render(
		$$result,
		{
			field: {
				id: randomString(),
				type: "date",
				required: true,
				label: "Submissions close after date/time ",
				value: {
					type: "local",
					value: form.closeDateTime ?? ""
				},
				configFieldTarget: "closeDateTime",
				configTarget: "form"
			}
		},
		{},
		{}
	)}`;
});

/* src\components\form_settings\FormSettingsDetails.svelte generated by Svelte v3.24.1 */

const FormSettingsDetails = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
		function adopt(value) {
			return value instanceof P
			? value
			: new P(function (resolve) {
						resolve(value);
					});
		}

		return new (P || (P = Promise))(function (resolve, reject) {
				function fulfilled(value) {
					try {
						step(generator.next(value));
					} catch(e) {
						reject(e);
					}
				}

				function rejected(value) {
					try {
						step(generator["throw"](value));
					} catch(e) {
						reject(e);
					}
				}

				function step(result) {
					result.done
					? resolve(result.value)
					: adopt(result.value).then(fulfilled, rejected);
				}

				step((generator = generator.apply(thisArg, _arguments || [])).next());
			});
	};
	let { form } = $$props;
	let { selected } = $$props;

	subscribe$1("save_form", params => __awaiter(void 0, void 0, void 0, function* () {
		yield saveForm();
	}));

	onMount(() => {
		console.log(selected);
	});

	if ($$props.form === void 0 && $$bindings.form && form !== void 0) $$bindings.form(form);
	if ($$props.selected === void 0 && $$bindings.selected && selected !== void 0) $$bindings.selected(selected);

	return `<div class="${"row mb-5"}"><div class="${"col-12 mb-4"}"><div class="${"d-flex justify-content-end"}" style="${"padding-bottom: 1em; padding-left: 0; display: flex; text-align: right;"}"><div style="${"text-align: right;"}"><a${add_attribute("href", `/submissions?formId=${form.id}`, 0)} target="${"_blank"}" class="${"btn btn-outline-dark"}">View Submissions</a></div>
      <div style="${"text-align: right; padding-left: 0.5em;"}"><a${add_attribute("href", `/builder?formId=${form.id}`, 0)} target="${"_blank"}" class="${"btn btn-outline-dark"}"><span class="${"fas fa-pencil-alt"}"></span> Edit Form </a></div>
      <div style="${"text-align: right; padding-left: 0.5em;"}"><a${add_attribute("href", `/preview?formId=${form.id}`, 0)} target="${"_blank"}" class="${"btn btn-outline-dark"}">Preview Form</a></div></div>
    <form action="${"#"}" method="${"post"}" class="${"card border-light p-3 mb-4"}">${selected === "general"
	? `<div class="${"card-header bg-white border-light p-3 mb-4 mb-md-0"}" style="${"display: flex; padding-top: 0.2em !important;"}"><h3 class="${"h5 mb-0"}" style="${"padding-top: 0.4em;"}">General</h3></div>
        <div class="${"card-body p-0 p-md-4"}" style="${"padding-top: 0.5em !important;"}"><div class="${"row justify-content-center"}">${form
		? `${validate_component(FormEditSettings, "FormEditSettings").$$render($$result, { form }, {}, {})}`
		: `<div class="${"spinner"}"></div>`}</div></div>`
	: ``}
      ${selected === "workflows"
	? `<div class="${"card-header bg-white border-light p-3 mb-4 mb-md-0"}" style="${"display: flex; padding-top: 0.2em !important;"}"><h3 class="${"h5 mb-0"}" style="${"padding-top: 0.4em;"}">Workflows</h3></div>
        <div class="${"card-body p-0 p-md-4"}" style="${"padding-top: 0.5em !important;"}"><div class="${"row justify-content-center"}">${form ? `` : `<div class="${"spinner"}"></div>`}</div></div>`
	: ``}
      ${selected === "emails"
	? `<div class="${"card-header bg-white border-light p-3 mb-4 mb-md-0"}" style="${"display: flex; padding-top: 0.2em !important;"}"><h3 class="${"h5 mb-0"}" style="${"padding-top: 0.4em;"}">Configure Emails</h3></div>
        <div class="${"card-body p-0 p-md-4"}" style="${"padding-top: 0.5em !important;"}"><div class="${"row justify-content-center"}">${form
		? `${validate_component(EmailSettings, "EmailSettings").$$render($$result, { form }, {}, {})}`
		: `<div class="${"spinner"}"></div>`}</div></div>`
	: ``}
      <div class="${"d-flex justify-content-end ml-auto"}" style="${"padding-right: 1em; padding-bottom: 1em;"}">${ `<button class="${"btn btn-primary"}" type="${"button"}">Save Changes</button>`}</div></form></div></div>`;
});

/* src\components\form_settings\FormSettings.svelte generated by Svelte v3.24.1 */

const FormSettings = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	
	let { form } = $$props;
	let { selected } = $$props;
	if ($$props.form === void 0 && $$bindings.form && form !== void 0) $$bindings.form(form);
	if ($$props.selected === void 0 && $$bindings.selected && selected !== void 0) $$bindings.selected(selected);

	return `<div class="${"section section-lg pt-6 pt-md-6 bg-soft"}"><div class="${"container"}"><div class="${"row pt-3 pt-md-0"}"><div class="${"col-12 col-md-4 d-none d-lg-block"}">${form != null
	? `${validate_component(FormSettingsSidebar, "FormSettingsSidebar").$$render($$result, { form, selected }, {}, {})}`
	: ``}</div>
    <div class="${"col-12 col-lg-8"}">${form != null
	? `${validate_component(FormSettingsDetails, "FormSettingsDetails").$$render($$result, { form, selected }, {}, {})}`
	: ``}</div></div></div></div>`;
});

/* src\routes\form-settings\[formId]\workflows.svelte generated by Svelte v3.24.1 */
let selected = "workflows";

const Workflows = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	
	
	let { form } = $$props;

	onMount(() => {
		getForm();
	});

	function getForm() {
		let temp = localStorage.getItem("form");

		if (!temp) {
			temp = JSON.stringify({ fields: [] });
		}

		form = JSON.parse(temp);

		form.fields = form.fields.map(w => {
			w.selected = false;
			return w;
		});

		formStore.setForm(form);
		dispatch("form_loaded", { form });
	}

	if ($$props.form === void 0 && $$bindings.form && form !== void 0) $$bindings.form(form);
	return `<div style="${"background-color: #f5f9fe;"}">${validate_component(FormSettings, "FormSettings").$$render($$result, { form, selected }, {}, {})}</div>`;
});

var component_5 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': Workflows
});

/* src\routes\form-settings\[formId]\scoring.svelte generated by Svelte v3.24.1 */
let selected$1 = "scoring";

const Scoring = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	
	
	let { form } = $$props;

	onMount(() => {
		getForm();
	});

	function getForm() {
		let temp = localStorage.getItem("form");

		if (!temp) {
			temp = JSON.stringify({ fields: [] });
		}

		form = JSON.parse(temp);

		form.fields = form.fields.map(w => {
			w.selected = false;
			return w;
		});

		formStore.setForm(form);
		dispatch("form_loaded", { form });
	}

	if ($$props.form === void 0 && $$bindings.form && form !== void 0) $$bindings.form(form);
	return `<div style="${"background-color: #f5f9fe;"}">${validate_component(FormSettings, "FormSettings").$$render($$result, { form, selected: selected$1 }, {}, {})}</div>`;
});

var component_6 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': Scoring
});

/* src\routes\form-settings\[formId]\emails.svelte generated by Svelte v3.24.1 */
let selected$2 = "emails";

const Emails = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	
	
	let { form } = $$props;

	onMount(() => {
		getForm();
	});

	function getForm() {
		let temp = localStorage.getItem("form");

		if (!temp) {
			temp = JSON.stringify({ fields: [] });
		}

		form = JSON.parse(temp);

		form.fields = form.fields.map(w => {
			w.selected = false;
			return w;
		});

		formStore.setForm(form);
		dispatch("form_loaded", { form });
	}

	if ($$props.form === void 0 && $$bindings.form && form !== void 0) $$bindings.form(form);
	return `<div style="${"background-color: #f5f9fe;"}">${validate_component(FormSettings, "FormSettings").$$render($$result, { form, selected: selected$2 }, {}, {})}</div>`;
});

var component_7 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': Emails
});

/* src\routes\form-settings\[formId].svelte generated by Svelte v3.24.1 */
let selected$3 = "general";

const U5BformIdu5D = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	
	
	let { form } = $$props;

	onMount(() => {
		getForm();
	});

	function getForm() {
		let temp = localStorage.getItem("form");

		if (!temp) {
			temp = JSON.stringify({ fields: [] });
		}

		form = JSON.parse(temp);

		form.fields = form.fields.map(w => {
			w.selected = false;
			return w;
		});

		formStore.setForm(form);
		dispatch("form_loaded", { form });
	}

	if ($$props.form === void 0 && $$bindings.form && form !== void 0) $$bindings.form(form);
	return `<div style="${"background-color: #f5f9fe;"}">${validate_component(FormSettings, "FormSettings").$$render($$result, { form, selected: selected$3 }, {}, {})}</div>`;
});

var component_8 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': U5BformIdu5D
});

function getUrlParameter(name, url) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    let results = regex.exec(url !== null && url !== void 0 ? url : location.search);
    return results === null ? undefined : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

/* src\components\Pagination.svelte generated by Svelte v3.24.1 */

const css$e = {
	code: ".rows-page-button.svelte-179vh0d{height:40px;margin-left:1em}",
	map: "{\"version\":3,\"file\":\"Pagination.svelte\",\"sources\":[\"Pagination.svelte\"],\"sourcesContent\":[\"<script lang=\\\"typescript\\\">import { subscribePrivate } from 'event/EventBus';\\r\\nimport { afterUpdate, onMount } from 'svelte';\\r\\nexport let id = '';\\r\\nexport let rowsPerPage = 10;\\r\\nexport let page = 1;\\r\\nexport let count = 0;\\r\\nexport let onRangeChange;\\r\\nlet pages = 1;\\r\\nlet hasNext = true;\\r\\nlet hasPrevious = false;\\r\\nlet rowsPerPageEntries = [10, 25, 50, 100];\\r\\nlet showing = '';\\r\\nafterUpdate(() => {\\r\\n    onChange();\\r\\n});\\r\\nonMount(() => {\\r\\n    subscribePrivate(id, 'on_sort', () => {\\r\\n        page = 1;\\r\\n    });\\r\\n});\\r\\nfunction onChange() {\\r\\n    pages = Math.ceil(count / rowsPerPage);\\r\\n    if (page > pages) {\\r\\n        page = pages || 1;\\r\\n    }\\r\\n    hasNext = page < pages;\\r\\n    hasPrevious = page > 1;\\r\\n    let showingCount = Math.floor(page * rowsPerPage);\\r\\n    showingCount = showingCount >= count ? Math.floor(count) : showingCount;\\r\\n    showing = `Showing ${showingCount} / ${Math.floor(count)} Entries`;\\r\\n    onRangeChange(range());\\r\\n    console.log('count', count, 'pages', pages, 'page', page, 'hasNext', hasNext, 'hasPrev', hasPrevious, 'range', range());\\r\\n}\\r\\nfunction setRowsPerPage(newValue) {\\r\\n    rowsPerPage = newValue;\\r\\n    page = 1;\\r\\n}\\r\\nfunction setPage(newPage) {\\r\\n    page = newPage;\\r\\n}\\r\\nfunction range() {\\r\\n    const max = rowsPerPage * page;\\r\\n    const min = max - rowsPerPage;\\r\\n    return { min, max };\\r\\n}\\r\\n//# sourceMappingURL=Pagination.svelte.js.map</script>\\r\\n\\r\\n<nav aria-label=\\\"Table Pagination\\\">\\r\\n  <ul class=\\\"pagination justify-content-end\\\">\\r\\n    <li>\\r\\n      <div class=\\\"dropdown\\\" style=\\\"margin-right: .5em\\\">\\r\\n        <button class=\\\"btn btn-secondary dropdown-toggle rows-page-button\\\" type=\\\"button\\\" id=\\\"dropdownMenuButton\\\" data-toggle=\\\"dropdown\\\" aria-expanded=\\\"false\\\">{showing}</button>\\r\\n        <ul class=\\\"dropdown-menu\\\" aria-labelledby=\\\"dropdownMenuButton\\\">\\r\\n          {#each rowsPerPageEntries as entry}\\r\\n            <li>\\r\\n              <a\\r\\n                class=\\\"dropdown-item\\\"\\r\\n                href=\\\"javascript:void(0)\\\"\\r\\n                on:click={() => {\\r\\n                  setRowsPerPage(entry)\\r\\n                }}>\\r\\n                Show {entry} Entires\\r\\n              </a>\\r\\n            </li>\\r\\n          {/each}\\r\\n        </ul>\\r\\n      </div>\\r\\n    </li>\\r\\n    {#if hasPrevious}\\r\\n      <li class=\\\"page-item\\\">\\r\\n        <a class=\\\"page-link\\\" on:click={() => setPage(page - 1)} href=\\\"javascript:void(0)\\\" tabindex=\\\"-1\\\" aria-disabled=\\\"true\\\">Previous</a>\\r\\n      </li>\\r\\n    {/if}\\r\\n    {#if !hasNext && hasPrevious && page - 2 != 0}\\r\\n      <li class=\\\"page-item\\\">\\r\\n        <a class=\\\"page-link\\\" on:click={() => setPage(page - 2)} href=\\\"javascript:void(0)\\\">{page - 2}</a>\\r\\n      </li>\\r\\n    {/if}\\r\\n    {#if page > 1}\\r\\n      <li class=\\\"page-item\\\">\\r\\n        <a class=\\\"page-link\\\" on:click={() => setPage(page - 1)} href=\\\"javascript:void(0)\\\">{page - 1}</a>\\r\\n      </li>\\r\\n    {/if}\\r\\n    <li class=\\\"page-item active\\\" aria-current=\\\"page\\\">\\r\\n      <a class=\\\"page-link\\\" href=\\\"javascript:void(0)\\\">{page}</a>\\r\\n    </li>\\r\\n    {#if hasNext}\\r\\n      <li class=\\\"page-item\\\">\\r\\n        <a class=\\\"page-link\\\" on:click={() => setPage(page + 1)} href=\\\"javascript:void(0)\\\">{page + 1}</a>\\r\\n      </li>\\r\\n    {/if}\\r\\n    {#if page === 1 && pages >= 3}\\r\\n      <li class=\\\"page-item\\\">\\r\\n        <a class=\\\"page-link\\\" on:click={() => setPage(page + 2)} href=\\\"javascript:void(0)\\\">{page + 2}</a>\\r\\n      </li>\\r\\n    {/if}\\r\\n    {#if hasNext}\\r\\n      <li class=\\\"page-item\\\">\\r\\n        <a class=\\\"page-link\\\" on:click={() => setPage(page + 1)} href=\\\"javascript:void(0)\\\">Next</a>\\r\\n      </li>\\r\\n    {/if}\\r\\n  </ul>\\r\\n</nav>\\r\\n\\r\\n<style>\\r\\n  .rows-page-button {\\r\\n    height: 40px;\\r\\n    margin-left: 1em;\\r\\n  }\\r\\n</style>\\r\\n\"],\"names\":[],\"mappings\":\"AAyGE,iBAAiB,eAAC,CAAC,AACjB,MAAM,CAAE,IAAI,CACZ,WAAW,CAAE,GAAG,AAClB,CAAC\"}"
};

const Pagination = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { id = "" } = $$props;
	let { rowsPerPage = 10 } = $$props;
	let { page = 1 } = $$props;
	let { count = 0 } = $$props;
	let { onRangeChange } = $$props;
	let pages = 1;
	let hasNext = true;
	let hasPrevious = false;
	let rowsPerPageEntries = [10, 25, 50, 100];
	let showing = "";

	afterUpdate(() => {
		onChange();
	});

	onMount(() => {
		subscribePrivate(id, "on_sort", () => {
			page = 1;
		});
	});

	function onChange() {
		pages = Math.ceil(count / rowsPerPage);

		if (page > pages) {
			page = pages || 1;
		}

		hasNext = page < pages;
		hasPrevious = page > 1;
		let showingCount = Math.floor(page * rowsPerPage);
		showingCount = showingCount >= count ? Math.floor(count) : showingCount;
		showing = `Showing ${showingCount} / ${Math.floor(count)} Entries`;
		onRangeChange(range());
		console.log("count", count, "pages", pages, "page", page, "hasNext", hasNext, "hasPrev", hasPrevious, "range", range());
	}

	function range() {
		const max = rowsPerPage * page;
		const min = max - rowsPerPage;
		return { min, max };
	}

	if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
	if ($$props.rowsPerPage === void 0 && $$bindings.rowsPerPage && rowsPerPage !== void 0) $$bindings.rowsPerPage(rowsPerPage);
	if ($$props.page === void 0 && $$bindings.page && page !== void 0) $$bindings.page(page);
	if ($$props.count === void 0 && $$bindings.count && count !== void 0) $$bindings.count(count);
	if ($$props.onRangeChange === void 0 && $$bindings.onRangeChange && onRangeChange !== void 0) $$bindings.onRangeChange(onRangeChange);
	$$result.css.add(css$e);

	return `<nav aria-label="${"Table Pagination"}"><ul class="${"pagination justify-content-end"}"><li><div class="${"dropdown"}" style="${"margin-right: .5em"}"><button class="${"btn btn-secondary dropdown-toggle rows-page-button svelte-179vh0d"}" type="${"button"}" id="${"dropdownMenuButton"}" data-toggle="${"dropdown"}" aria-expanded="${"false"}">${escape(showing)}</button>
        <ul class="${"dropdown-menu"}" aria-labelledby="${"dropdownMenuButton"}">${each(rowsPerPageEntries, entry => `<li><a class="${"dropdown-item"}" href="${"javascript:void(0)"}">Show ${escape(entry)} Entires
              </a>
            </li>`)}</ul></div></li>
    ${hasPrevious
	? `<li class="${"page-item"}"><a class="${"page-link"}" href="${"javascript:void(0)"}" tabindex="${"-1"}" aria-disabled="${"true"}">Previous</a></li>`
	: ``}
    ${!hasNext && hasPrevious && page - 2 != 0
	? `<li class="${"page-item"}"><a class="${"page-link"}" href="${"javascript:void(0)"}">${escape(page - 2)}</a></li>`
	: ``}
    ${page > 1
	? `<li class="${"page-item"}"><a class="${"page-link"}" href="${"javascript:void(0)"}">${escape(page - 1)}</a></li>`
	: ``}
    <li class="${"page-item active"}" aria-current="${"page"}"><a class="${"page-link"}" href="${"javascript:void(0)"}">${escape(page)}</a></li>
    ${hasNext
	? `<li class="${"page-item"}"><a class="${"page-link"}" href="${"javascript:void(0)"}">${escape(page + 1)}</a></li>`
	: ``}
    ${page === 1 && pages >= 3
	? `<li class="${"page-item"}"><a class="${"page-link"}" href="${"javascript:void(0)"}">${escape(page + 2)}</a></li>`
	: ``}
    ${hasNext
	? `<li class="${"page-item"}"><a class="${"page-link"}" href="${"javascript:void(0)"}">Next</a></li>`
	: ``}</ul>
</nav>`;
});

/* src\components\Toast.svelte generated by Svelte v3.24.1 */

const css$f = {
	code: ".toast-container.svelte-hsmqtg{position:fixed;max-height:0px;right:15px;left:0;top:85px;z-index:100000}.toast.svelte-hsmqtg{display:block;background-color:#424767;opacity:1;color:white;font-size:12pt !important;min-width:250px}.toast-header{color:#ffffff !important;background-color:#52547a !important}",
	map: "{\"version\":3,\"file\":\"Toast.svelte\",\"sources\":[\"Toast.svelte\"],\"sourcesContent\":[\"<script lang=\\\"typescript\\\">import { dispatch } from 'event/EventBus';\\r\\nimport { onMount } from 'svelte';\\r\\nexport let id = '';\\r\\nexport let message = '';\\r\\nexport let title = '';\\r\\nlet component;\\r\\nonMount(() => {\\r\\n    //@ts-ignore\\r\\n    const toast = new bootstrap.Toast(component, {\\r\\n        delay: 0,\\r\\n        autohide: false,\\r\\n    });\\r\\n    component.addEventListener('hidden.bs.toast', () => {\\r\\n        dispatch('toast_closed', {\\r\\n            id,\\r\\n        });\\r\\n    });\\r\\n    toast.show();\\r\\n});\\r\\n//# sourceMappingURL=Toast.svelte.js.map</script>\\r\\n\\r\\n<div aria-live=\\\"polite\\\" aria-atomic=\\\"true\\\" class=\\\"toast-container\\\">\\r\\n  <div class=\\\"toast\\\" bind:this={component} style=\\\"position: absolute; top: 0; right: 0;\\\">\\r\\n    <div class=\\\"toast-header\\\">\\r\\n      <strong class=\\\"mr-auto\\\">{title}</strong>\\r\\n      <button type=\\\"button\\\" class=\\\"ml-2 mb-1 close\\\" data-dismiss=\\\"toast\\\" aria-label=\\\"Close\\\">\\r\\n        <span aria-hidden=\\\"true\\\">&times;</span>\\r\\n      </button>\\r\\n    </div>\\r\\n    <div class=\\\"toast-body\\\">{message}</div>\\r\\n  </div>\\r\\n</div>\\r\\n\\r\\n<style>\\r\\n  .toast-container {\\r\\n    position: fixed;\\r\\n    max-height: 0px;\\r\\n    right: 15px;\\r\\n    left: 0;\\r\\n    top: 85px;\\r\\n    z-index: 100000;\\r\\n  }\\r\\n\\r\\n  .toast {\\r\\n    display: block;\\r\\n    background-color: #424767;\\r\\n    opacity: 1;\\r\\n    color: white;\\r\\n    font-size: 12pt !important;\\r\\n    min-width: 250px;\\r\\n  }\\r\\n\\r\\n  :global(.toast-header) {\\r\\n    color: #ffffff !important;\\r\\n    background-color: #52547a !important;\\r\\n  }\\r\\n</style>\\r\\n\"],\"names\":[],\"mappings\":\"AAkCE,gBAAgB,cAAC,CAAC,AAChB,QAAQ,CAAE,KAAK,CACf,UAAU,CAAE,GAAG,CACf,KAAK,CAAE,IAAI,CACX,IAAI,CAAE,CAAC,CACP,GAAG,CAAE,IAAI,CACT,OAAO,CAAE,MAAM,AACjB,CAAC,AAED,MAAM,cAAC,CAAC,AACN,OAAO,CAAE,KAAK,CACd,gBAAgB,CAAE,OAAO,CACzB,OAAO,CAAE,CAAC,CACV,KAAK,CAAE,KAAK,CACZ,SAAS,CAAE,IAAI,CAAC,UAAU,CAC1B,SAAS,CAAE,KAAK,AAClB,CAAC,AAEO,aAAa,AAAE,CAAC,AACtB,KAAK,CAAE,OAAO,CAAC,UAAU,CACzB,gBAAgB,CAAE,OAAO,CAAC,UAAU,AACtC,CAAC\"}"
};

const Toast = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { id = "" } = $$props;
	let { message = "" } = $$props;
	let { title = "" } = $$props;
	let component;

	onMount(() => {
		//@ts-ignore
		const toast = new bootstrap.Toast(component, { delay: 0, autohide: false });

		component.addEventListener("hidden.bs.toast", () => {
			dispatch("toast_closed", { id });
		});

		toast.show();
	});

	if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
	if ($$props.message === void 0 && $$bindings.message && message !== void 0) $$bindings.message(message);
	if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
	$$result.css.add(css$f);

	return `<div aria-live="${"polite"}" aria-atomic="${"true"}" class="${"toast-container svelte-hsmqtg"}"><div class="${"toast svelte-hsmqtg"}" style="${"position: absolute; top: 0; right: 0;"}"${add_attribute("this", component, 1)}><div class="${"toast-header"}"><strong class="${"mr-auto"}">${escape(title)}</strong>
      <button type="${"button"}" class="${"ml-2 mb-1 close"}" data-dismiss="${"toast"}" aria-label="${"Close"}"><span aria-hidden="${"true"}">×</span></button></div>
    <div class="${"toast-body"}">${escape(message)}</div></div>
</div>`;
});

/* src\components\ToastManager.svelte generated by Svelte v3.24.1 */

const ToastManager = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let toasts = [];

	subscribe$1("show_toast", props => {
		const id = randomString();

		toasts = toasts.concat([
			{
				id,
				message: props.message,
				title: props.title
			}
		]);

		setTimeout(
			() => {
				removeById(id);
			},
			props.timeout || 4000
		);
	});

	subscribe$1("toast_closed", props => {
		removeById(props.id);
	});

	function removeById(id) {
		toasts.splice(toasts.findIndex(t => t.id === id), 1);
		toasts = toasts;
	}

	return `${each(toasts, toast => `${validate_component(Toast, "Toast").$$render(
		$$result,
		{
			message: toast.message,
			title: toast.title
		},
		{},
		{}
	)}`)}`;
});

/* src\components\RemoteTable.svelte generated by Svelte v3.24.1 */

const css$g = {
	code: ".table-hover.svelte-1gvtbyy.svelte-1gvtbyy{margin-top:1em !important;margin-right:auto !important;margin-left:auto !important}table.svelte-1gvtbyy tr:hover td.svelte-1gvtbyy:first-child{border-top-left-radius:0.45rem;border-bottom-left-radius:0.45rem}table.svelte-1gvtbyy tr:hover td.svelte-1gvtbyy:last-child{border-top-right-radius:0.45rem;border-bottom-right-radius:0.45rem}tr.active.svelte-1gvtbyy.svelte-1gvtbyy{background-color:#f5f5f5 !important;border-radius:0.45rem}td.svelte-1gvtbyy.svelte-1gvtbyy{max-width:500px;width:500px !important}.text.svelte-1gvtbyy.svelte-1gvtbyy{overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}th{cursor:pointer}.fa-columns.svelte-1gvtbyy.svelte-1gvtbyy{cursor:pointer;height:1.5em;width:1.5em}.fa-cog.svelte-1gvtbyy.svelte-1gvtbyy{cursor:pointer;height:1.5em;width:1.5em}.fa-trash-alt.svelte-1gvtbyy.svelte-1gvtbyy{cursor:pointer;height:1.5em;width:1.5em}",
	map: "{\"version\":3,\"file\":\"RemoteTable.svelte\",\"sources\":[\"RemoteTable.svelte\"],\"sourcesContent\":[\"<script lang=\\\"typescript\\\">var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\\r\\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\\r\\n    return new (P || (P = Promise))(function (resolve, reject) {\\r\\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\\r\\n        function rejected(value) { try { step(generator[\\\"throw\\\"](value)); } catch (e) { reject(e); } }\\r\\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\\r\\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\\r\\n    });\\r\\n};\\r\\n;\\r\\nimport { onMount, tick } from 'svelte';\\r\\nimport Fuse from 'fuse.js';\\r\\nimport { LoadState } from 'models/LoadState';\\r\\nimport { randomString } from 'util/Generate';\\r\\nimport Pagination from 'components/Pagination.svelte';\\r\\nimport { dispatch, dispatchPrivate } from 'event/EventBus';\\r\\nimport { fastEquals } from 'util/Compare';\\r\\nimport Dialog from 'components/layout/Dialog.svelte';\\r\\nimport ToastManager from 'components/ToastManager.svelte';\\r\\nimport { isObject } from 'guards/Guard';\\r\\nexport let getRows;\\r\\nlet id = '';\\r\\nlet caption = '';\\r\\nlet searchPlaceHolder = 'Search';\\r\\nlet rows = [];\\r\\nlet filtered = [];\\r\\nlet columns = [];\\r\\nlet filteredColumns = [];\\r\\nlet query = '';\\r\\nlet fuse;\\r\\nlet state = LoadState.Loading;\\r\\nlet lastSelectedIndex = -1;\\r\\nlet range = { min: 1, max: 1 };\\r\\nlet widths = {};\\r\\nlet canvasContext;\\r\\nlet sort = '';\\r\\nlet sortDirection = '';\\r\\nlet editingColumns = false;\\r\\nlet allRowsSelected = false;\\r\\nlet selectedCount = 0;\\r\\nlet modal = '';\\r\\nexport let headerActions = [];\\r\\nexport let onEdit = undefined;\\r\\nexport let onDelete = undefined;\\r\\nexport let hidden = new Set();\\r\\nexport let sortColumns = undefined;\\r\\nexport let onFormat = () => undefined;\\r\\nfunction createFuse() {\\r\\n    const list = rows.map((r) => {\\r\\n        const result = {};\\r\\n        Object.keys(r).forEach((key) => {\\r\\n            result[key] = isObject(r[key]) ? JSON.stringify(r[key]) : r[key];\\r\\n        });\\r\\n        return result;\\r\\n    });\\r\\n    return new Fuse(list, {\\r\\n        keys: Object.keys(rows[0]),\\r\\n    });\\r\\n}\\r\\nonMount(() => {\\r\\n    id = randomString();\\r\\n    hidden.add('table_meta_id');\\r\\n    const element = document.createElement('canvas');\\r\\n    canvasContext = element.getContext('2d');\\r\\n    load();\\r\\n});\\r\\n$: {\\r\\n    if (rows.length === 0) {\\r\\n        filtered = rows;\\r\\n    }\\r\\n    else if (query === '') {\\r\\n        filtered = rows;\\r\\n    }\\r\\n    else {\\r\\n        const result = fuse.search(query);\\r\\n        filtered = result.map((r) => r.item);\\r\\n    }\\r\\n}\\r\\nfunction selectAllRows() {\\r\\n    for (let i = 0; i < filtered.length; i++) {\\r\\n        if (i >= range.min && i <= range.max) {\\r\\n            filtered[i].meta_selected = allRowsSelected ? false : true;\\r\\n        }\\r\\n    }\\r\\n    allRowsSelected = !allRowsSelected;\\r\\n    let count = 0;\\r\\n    for (let i = 0; i < filtered.length; i++) {\\r\\n        if (filtered[i].meta_selected) {\\r\\n            count++;\\r\\n        }\\r\\n    }\\r\\n    selectedCount = count;\\r\\n}\\r\\nfunction load() {\\r\\n    var _a, _b;\\r\\n    return __awaiter(this, void 0, void 0, function* () {\\r\\n        try {\\r\\n            rows = yield getRows();\\r\\n            if (rows.length === 0) {\\r\\n                state = LoadState.Finished;\\r\\n                return;\\r\\n            }\\r\\n            rows.map((w) => {\\r\\n                w.table_meta_id = randomString();\\r\\n                return w;\\r\\n            });\\r\\n            fuse = createFuse();\\r\\n            filtered = rows;\\r\\n            columns = Object.keys((_a = rows[rows.length - 1]) !== null && _a !== void 0 ? _a : {});\\r\\n            columns = (_b = sortColumns === null || sortColumns === void 0 ? void 0 : sortColumns(columns)) !== null && _b !== void 0 ? _b : columns;\\r\\n            filteredColumns = columns.filter((w) => !hidden.has(w));\\r\\n            state = LoadState.Finished;\\r\\n        }\\r\\n        catch (ex) {\\r\\n            console.error(ex);\\r\\n            state = LoadState.Failed;\\r\\n        }\\r\\n    });\\r\\n}\\r\\nfunction sortColumn(column) {\\r\\n    if (sort === column) {\\r\\n        sort = column;\\r\\n        sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';\\r\\n    }\\r\\n    else {\\r\\n        sort = column;\\r\\n        sortDirection = 'desc';\\r\\n    }\\r\\n    dispatchPrivate(id, 'on_sort', { sort, sortDirection });\\r\\n    filtered = filtered.sort(function (a, b) {\\r\\n        var _a, _b, _c, _d;\\r\\n        var nameA = (_b = (_a = a[sort]) === null || _a === void 0 ? void 0 : _a.toString()) === null || _b === void 0 ? void 0 : _b.toUpperCase();\\r\\n        var nameB = (_d = (_c = b[sort]) === null || _c === void 0 ? void 0 : _c.toString()) === null || _d === void 0 ? void 0 : _d.toUpperCase();\\r\\n        if (nameA == null && nameB == null) {\\r\\n            return 0;\\r\\n        }\\r\\n        if (nameA == null) {\\r\\n            return 1;\\r\\n        }\\r\\n        if (nameB == null) {\\r\\n            return 1;\\r\\n        }\\r\\n        if (nameA < nameB) {\\r\\n            return 1;\\r\\n        }\\r\\n        if (nameA > nameB) {\\r\\n            return -1;\\r\\n        }\\r\\n        return 0;\\r\\n    });\\r\\n    if (sortDirection === 'asc') {\\r\\n        filtered = filtered.reverse();\\r\\n    }\\r\\n}\\r\\nfunction headerStyle(column) {\\r\\n    if (widths[column]) {\\r\\n        return 'width: ' + widths[column] + 'px;';\\r\\n    }\\r\\n}\\r\\nfunction setWidths() {\\r\\n    let values = filtered.slice(range.min, range.max);\\r\\n    widths = {};\\r\\n    values.forEach((value) => {\\r\\n        columns.forEach((c) => {\\r\\n            var _a;\\r\\n            const v = value[c];\\r\\n            let width = getTextWidth(v, '');\\r\\n            if (width < 150) {\\r\\n                width = 150;\\r\\n            }\\r\\n            if (width > 400) {\\r\\n                width = 400;\\r\\n            }\\r\\n            if (((_a = widths[c]) !== null && _a !== void 0 ? _a : 0) < width) {\\r\\n                widths[c] = width;\\r\\n            }\\r\\n        });\\r\\n    });\\r\\n}\\r\\nfunction renderValue(row, column) {\\r\\n    var _a, _b;\\r\\n    let value = (_a = row[column]) !== null && _a !== void 0 ? _a : '';\\r\\n    value = (_b = onFormat(column, row[column])) !== null && _b !== void 0 ? _b : value;\\r\\n    return isObject(value) || Array.isArray(value) ? JSON.stringify(value) : value;\\r\\n}\\r\\nfunction getTextWidth(text, font) {\\r\\n    canvasContext.font = 'bold 1em arial';\\r\\n    return canvasContext.measureText(text).width;\\r\\n}\\r\\nfunction toggleColumn(checked, column) {\\r\\n    checked ? hidden.delete(column) : hidden.add(column);\\r\\n    filteredColumns = columns.filter((w) => !hidden.has(w));\\r\\n}\\r\\nfunction onRowClick(row) {\\r\\n    const index = filtered.findIndex((w) => w.table_meta_id === row.table_meta_id);\\r\\n    if (filtered[index].meta_selected) {\\r\\n        selectedCount--;\\r\\n        filtered[index].meta_selected = false;\\r\\n    }\\r\\n    else {\\r\\n        selectedCount++;\\r\\n        filtered[index].meta_selected = true;\\r\\n    }\\r\\n}\\r\\nfunction deleteEntries() {\\r\\n    return __awaiter(this, void 0, void 0, function* () {\\r\\n        const selected = filtered.filter((w) => w.meta_selected);\\r\\n        if (selected.length !== selectedCount) {\\r\\n            throw new Error('Selection count did not match actual selected.');\\r\\n        }\\r\\n        yield (onDelete === null || onDelete === void 0 ? void 0 : onDelete(selected));\\r\\n        dispatch('show_toast', {\\r\\n            title: 'Deletion Started',\\r\\n            message: 'Your entries have been queued for deletion. This may take up to 2 minutes to show.',\\r\\n        });\\r\\n    });\\r\\n}\\r\\n//# sourceMappingURL=RemoteTable.svelte.js.map</script>\\r\\n\\r\\n<div>\\r\\n  <ToastManager />\\r\\n  <div class=\\\"d-flex bd-highlight mb-3\\\">\\r\\n    <div class=\\\"mr-auto p-2 bd-highlight\\\">\\r\\n      <input class=\\\"form-control\\\" placeholder={searchPlaceHolder} bind:value={query} style=\\\"width: 300px\\\" />\\r\\n    </div>\\r\\n    {#if selectedCount > 0}\\r\\n      <div class=\\\"p-2 bd-highlight\\\">\\r\\n        <div style=\\\"margin-top: 5px;\\\">\\r\\n          Selected:\\r\\n          <strong>{selectedCount} of {filtered.length}</strong>\\r\\n        </div>\\r\\n      </div>\\r\\n      <div class=\\\"p-2 bd-highlight\\\">\\r\\n        <div style=\\\"pointer: cursor;\\\" on:click={() => (modal = 'delete')}>\\r\\n          <i class=\\\"fas fa-trash-alt\\\" />\\r\\n        </div>\\r\\n      </div>\\r\\n    {/if}\\r\\n    <div class=\\\"p-2 bd-highlight\\\">\\r\\n      <div style=\\\"pointer: cursor;\\\">\\r\\n        <i class=\\\"fas fa-cog\\\" />\\r\\n      </div>\\r\\n    </div>\\r\\n    <div class=\\\"p-2 bd-highlight\\\">\\r\\n      <div style=\\\"pointer: cursor;\\\" on:click={() => (modal = 'toggle_column')}>\\r\\n        <i class=\\\"fas fa-columns\\\" />\\r\\n      </div>\\r\\n    </div>\\r\\n  </div>\\r\\n  {#if state === LoadState.Loading}\\r\\n    <div style=\\\"text-align: center; padding-top: 1em; padding-bottom: 1em;\\\">\\r\\n      <div class=\\\"spinner-border text-secondary\\\" role=\\\"status\\\">\\r\\n        <span class=\\\"sr-only\\\">Loading...</span>\\r\\n      </div>\\r\\n    </div>\\r\\n  {:else if state === LoadState.Finished}\\r\\n    <canvas id=\\\"canvas\\\" style=\\\"display: none\\\" />\\r\\n    {#if rows.length === 0}\\r\\n      <div style=\\\"text-align: center; padding-top: 1em; padding-bottom: 1em;\\\">\\r\\n        <div class=\\\"text-secondary\\\">\\r\\n          <p>No results to display.</p>\\r\\n        </div>\\r\\n      </div>\\r\\n    {:else}\\r\\n      <div class=\\\"table-responsive\\\">\\r\\n        <table class=\\\"table table-hover\\\" style=\\\"table-layout: fixed;\\\">\\r\\n          <!-- svelte-ignore empty-block -->\\r\\n          <tbody>\\r\\n            <tr>\\r\\n              <th scope=\\\"col\\\" style=\\\"width: 50px\\\">\\r\\n                <div class=\\\"form-check\\\">\\r\\n                  <input class=\\\"form-check-input\\\" type=\\\"checkbox\\\" value=\\\"\\\" checked={allRowsSelected} on:change={selectAllRows} id={'row-toggle-all'} />\\r\\n                </div>\\r\\n              </th>\\r\\n              {#each filteredColumns as column (column)}\\r\\n                <th scope=\\\"col\\\" style={headerStyle(column)} on:click={() => sortColumn(column)}>\\r\\n                  {column}\\r\\n                  <span>\\r\\n                    {#if sort === column && sortDirection === 'asc'}\\r\\n                      <span>\\r\\n                        <span class=\\\"fas fa-chevron-up\\\" />\\r\\n                      </span>\\r\\n                    {:else if sort === column && sortDirection === 'desc'}\\r\\n                      <span>\\r\\n                        <span class=\\\"fas fa-chevron-down\\\" />\\r\\n                      </span>\\r\\n                    {/if}\\r\\n                  </span>\\r\\n                </th>\\r\\n              {/each}\\r\\n            </tr>\\r\\n            {#each filtered as row, index}\\r\\n              {#if index >= range.min && index <= range.max}\\r\\n                <tr class:active={row.meta_selected} style=\\\"vertical-align: middle;\\\">\\r\\n                  <td>\\r\\n                    <div class=\\\"form-check\\\">\\r\\n                      <input\\r\\n                        class=\\\"form-check-input\\\"\\r\\n                        type=\\\"checkbox\\\"\\r\\n                        value=\\\"\\\"\\r\\n                        checked={row.meta_selected}\\r\\n                        on:change={(e) => {\\r\\n                          onRowClick(row)\\r\\n                        }}\\r\\n                        id={'row-toggle-' + index} />\\r\\n                    </div>\\r\\n                  </td>\\r\\n                  {#each filteredColumns as column}\\r\\n                    <td>\\r\\n                      <div class=\\\"text\\\">{renderValue(row, column)}</div>\\r\\n                    </td>\\r\\n                  {/each}\\r\\n                </tr>\\r\\n              {/if}\\r\\n            {/each}\\r\\n          </tbody>\\r\\n        </table>\\r\\n      </div>\\r\\n      <Pagination\\r\\n        {id}\\r\\n        count={filtered.length}\\r\\n        onRangeChange={(r) => {\\r\\n          if (fastEquals(r, range)) {\\r\\n            return\\r\\n          }\\r\\n          range = r\\r\\n          setWidths()\\r\\n          columns = columns\\r\\n        }} />\\r\\n    {/if}\\r\\n  {:else if state === LoadState.Failed}\\r\\n    <div style=\\\"padding-top:1em; padding-left: 1em;\\\">\\r\\n      <p>Failed to load rows, please try refreshing the page.</p>\\r\\n    </div>\\r\\n  {/if}\\r\\n  {#if modal === 'toggle_column'}\\r\\n    <Dialog\\r\\n      title={'Toggle Column Visibility'}\\r\\n      isOpen={true}\\r\\n      onClose={() => {\\r\\n        modal = ''\\r\\n      }}>\\r\\n      {#each columns as column}\\r\\n        {#if column !== 'table_meta_id'}\\r\\n          <div class=\\\"form-check\\\">\\r\\n            <input\\r\\n              class=\\\"form-check-input\\\"\\r\\n              type=\\\"checkbox\\\"\\r\\n              value=\\\"\\\"\\r\\n              checked={!hidden.has(column)}\\r\\n              on:change={(e) => {\\r\\n                toggleColumn(e.target.checked, column)\\r\\n              }}\\r\\n              id={'toggle-' + column} />\\r\\n            <label class=\\\"form-check-label\\\" for={'toggle-' + column}>{column}</label>\\r\\n          </div>\\r\\n        {/if}\\r\\n      {/each}\\r\\n    </Dialog>\\r\\n  {:else if modal === 'delete'}\\r\\n    <Dialog\\r\\n      title={'Confirm Deletion'}\\r\\n      isOpen={true}\\r\\n      actions={[{ label: `Delete ${selectedCount} Entries`, type: 'danger', onClick: deleteEntries }, { label: 'Cancel', type: 'secondary' }]}\\r\\n      onClose={() => {\\r\\n        modal = ''\\r\\n      }}>\\r\\n      <p>Are you sure you want to delete {selectedCount} entries?</p>\\r\\n    </Dialog>\\r\\n  {/if}\\r\\n</div>\\r\\n\\r\\n<style>\\r\\n  .table-hover {\\r\\n    margin-top: 1em !important;\\r\\n    margin-right: auto !important;\\r\\n    margin-left: auto !important;\\r\\n  }\\r\\n\\r\\n  table tr:hover td:first-child {\\r\\n    border-top-left-radius: 0.45rem;\\r\\n    border-bottom-left-radius: 0.45rem;\\r\\n  }\\r\\n  table tr:hover td:last-child {\\r\\n    border-top-right-radius: 0.45rem;\\r\\n    border-bottom-right-radius: 0.45rem;\\r\\n  }\\r\\n\\r\\n  tr.active {\\r\\n    background-color: #f5f5f5 !important;\\r\\n    border-radius: 0.45rem;\\r\\n  }\\r\\n\\r\\n  td {\\r\\n    max-width: 500px;\\r\\n    width: 500px !important;\\r\\n  }\\r\\n\\r\\n  .text {\\r\\n    overflow: hidden;\\r\\n    text-overflow: ellipsis;\\r\\n    display: -webkit-box;\\r\\n    -webkit-line-clamp: 2; /* number of lines to show */\\r\\n    -webkit-box-orient: vertical;\\r\\n  }\\r\\n\\r\\n  :global(th) {\\r\\n    cursor: pointer;\\r\\n  }\\r\\n\\r\\n  .fa-columns {\\r\\n    cursor: pointer;\\r\\n    height: 1.5em;\\r\\n    width: 1.5em;\\r\\n  }\\r\\n\\r\\n  .fa-cog {\\r\\n    cursor: pointer;\\r\\n    height: 1.5em;\\r\\n    width: 1.5em;\\r\\n  }\\r\\n  .fa-trash-alt {\\r\\n    cursor: pointer;\\r\\n    height: 1.5em;\\r\\n    width: 1.5em;\\r\\n  }\\r\\n</style>\\r\\n\"],\"names\":[],\"mappings\":\"AAqXE,YAAY,8BAAC,CAAC,AACZ,UAAU,CAAE,GAAG,CAAC,UAAU,CAC1B,YAAY,CAAE,IAAI,CAAC,UAAU,CAC7B,WAAW,CAAE,IAAI,CAAC,UAAU,AAC9B,CAAC,AAED,oBAAK,CAAC,EAAE,MAAM,CAAC,iBAAE,YAAY,AAAC,CAAC,AAC7B,sBAAsB,CAAE,OAAO,CAC/B,yBAAyB,CAAE,OAAO,AACpC,CAAC,AACD,oBAAK,CAAC,EAAE,MAAM,CAAC,iBAAE,WAAW,AAAC,CAAC,AAC5B,uBAAuB,CAAE,OAAO,CAChC,0BAA0B,CAAE,OAAO,AACrC,CAAC,AAED,EAAE,OAAO,8BAAC,CAAC,AACT,gBAAgB,CAAE,OAAO,CAAC,UAAU,CACpC,aAAa,CAAE,OAAO,AACxB,CAAC,AAED,EAAE,8BAAC,CAAC,AACF,SAAS,CAAE,KAAK,CAChB,KAAK,CAAE,KAAK,CAAC,UAAU,AACzB,CAAC,AAED,KAAK,8BAAC,CAAC,AACL,QAAQ,CAAE,MAAM,CAChB,aAAa,CAAE,QAAQ,CACvB,OAAO,CAAE,WAAW,CACpB,kBAAkB,CAAE,CAAC,CACrB,kBAAkB,CAAE,QAAQ,AAC9B,CAAC,AAEO,EAAE,AAAE,CAAC,AACX,MAAM,CAAE,OAAO,AACjB,CAAC,AAED,WAAW,8BAAC,CAAC,AACX,MAAM,CAAE,OAAO,CACf,MAAM,CAAE,KAAK,CACb,KAAK,CAAE,KAAK,AACd,CAAC,AAED,OAAO,8BAAC,CAAC,AACP,MAAM,CAAE,OAAO,CACf,MAAM,CAAE,KAAK,CACb,KAAK,CAAE,KAAK,AACd,CAAC,AACD,aAAa,8BAAC,CAAC,AACb,MAAM,CAAE,OAAO,CACf,MAAM,CAAE,KAAK,CACb,KAAK,CAAE,KAAK,AACd,CAAC\"}"
};
let searchPlaceHolder = "Search";

const RemoteTable = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
		function adopt(value) {
			return value instanceof P
			? value
			: new P(function (resolve) {
						resolve(value);
					});
		}

		return new (P || (P = Promise))(function (resolve, reject) {
				function fulfilled(value) {
					try {
						step(generator.next(value));
					} catch(e) {
						reject(e);
					}
				}

				function rejected(value) {
					try {
						step(generator["throw"](value));
					} catch(e) {
						reject(e);
					}
				}

				function step(result) {
					result.done
					? resolve(result.value)
					: adopt(result.value).then(fulfilled, rejected);
				}

				step((generator = generator.apply(thisArg, _arguments || [])).next());
			});
	};

	
	let { getRows } = $$props;
	let id = "";
	let rows = [];
	let filtered = [];
	let columns = [];
	let filteredColumns = [];
	let query = "";
	let fuse;
	let state = LoadState.Loading;
	let range = { min: 1, max: 1 };
	let widths = {};
	let canvasContext;
	let sort = "";
	let sortDirection = "";
	let selectedCount = 0;
	let { headerActions = [] } = $$props;
	let { onEdit = undefined } = $$props;
	let { onDelete = undefined } = $$props;
	let { hidden = new Set() } = $$props;
	let { sortColumns = undefined } = $$props;
	let { onFormat = () => undefined } = $$props;

	function createFuse() {
		const list = rows.map(r => {
			const result = {};

			Object.keys(r).forEach(key => {
				result[key] = isObject(r[key]) ? JSON.stringify(r[key]) : r[key];
			});

			return result;
		});

		return new Fuse__default['default'](list, { keys: Object.keys(rows[0]) });
	}

	onMount(() => {
		id = randomString();
		hidden.add("table_meta_id");
		const element = document.createElement("canvas");
		canvasContext = element.getContext("2d");
		load();
	});

	function load() {
		var _a, _b;

		return __awaiter(this, void 0, void 0, function* () {
			try {
				rows = yield getRows();

				if (rows.length === 0) {
					state = LoadState.Finished;
					return;
				}

				rows.map(w => {
					w.table_meta_id = randomString();
					return w;
				});

				fuse = createFuse();
				filtered = rows;

				columns = Object.keys((_a = rows[rows.length - 1]) !== null && _a !== void 0
				? _a
				: {});

				columns = (_b = sortColumns === null || sortColumns === void 0
				? void 0
				: sortColumns(columns)) !== null && _b !== void 0
				? _b
				: columns;

				filteredColumns = columns.filter(w => !hidden.has(w));
				state = LoadState.Finished;
			} catch(ex) {
				console.error(ex);
				state = LoadState.Failed;
			}
		});
	}

	function headerStyle(column) {
		if (widths[column]) {
			return "width: " + widths[column] + "px;";
		}
	}

	function setWidths() {
		let values = filtered.slice(range.min, range.max);
		widths = {};

		values.forEach(value => {
			columns.forEach(c => {
				var _a;
				const v = value[c];
				let width = getTextWidth(v);

				if (width < 150) {
					width = 150;
				}

				if (width > 400) {
					width = 400;
				}

				if (((_a = widths[c]) !== null && _a !== void 0 ? _a : 0) < width) {
					widths[c] = width;
				}
			});
		});
	}

	function renderValue(row, column) {
		var _a, _b;
		let value = (_a = row[column]) !== null && _a !== void 0 ? _a : "";

		value = (_b = onFormat(column, row[column])) !== null && _b !== void 0
		? _b
		: value;

		return isObject(value) || Array.isArray(value)
		? JSON.stringify(value)
		: value;
	}

	function getTextWidth(text, font) {
		canvasContext.font = "bold 1em arial";
		return canvasContext.measureText(text).width;
	}

	if ($$props.getRows === void 0 && $$bindings.getRows && getRows !== void 0) $$bindings.getRows(getRows);
	if ($$props.headerActions === void 0 && $$bindings.headerActions && headerActions !== void 0) $$bindings.headerActions(headerActions);
	if ($$props.onEdit === void 0 && $$bindings.onEdit && onEdit !== void 0) $$bindings.onEdit(onEdit);
	if ($$props.onDelete === void 0 && $$bindings.onDelete && onDelete !== void 0) $$bindings.onDelete(onDelete);
	if ($$props.hidden === void 0 && $$bindings.hidden && hidden !== void 0) $$bindings.hidden(hidden);
	if ($$props.sortColumns === void 0 && $$bindings.sortColumns && sortColumns !== void 0) $$bindings.sortColumns(sortColumns);
	if ($$props.onFormat === void 0 && $$bindings.onFormat && onFormat !== void 0) $$bindings.onFormat(onFormat);
	$$result.css.add(css$g);

	 {
		{
			if (rows.length === 0) {
				filtered = rows;
			} else {
				filtered = rows;
			}
		}
	}

	return `<div>${validate_component(ToastManager, "ToastManager").$$render($$result, {}, {}, {})}
  <div class="${"d-flex bd-highlight mb-3"}"><div class="${"mr-auto p-2 bd-highlight"}"><input class="${"form-control"}"${add_attribute("placeholder", searchPlaceHolder, 0)} style="${"width: 300px"}"${add_attribute("value", query, 1)}></div>
    ${selectedCount > 0
	? `<div class="${"p-2 bd-highlight"}"><div style="${"margin-top: 5px;"}">Selected:
          <strong>${escape(selectedCount)} of ${escape(filtered.length)}</strong></div></div>
      <div class="${"p-2 bd-highlight"}"><div style="${"pointer: cursor;"}"><i class="${"fas fa-trash-alt svelte-1gvtbyy"}"></i></div></div>`
	: ``}
    <div class="${"p-2 bd-highlight"}"><div style="${"pointer: cursor;"}"><i class="${"fas fa-cog svelte-1gvtbyy"}"></i></div></div>
    <div class="${"p-2 bd-highlight"}"><div style="${"pointer: cursor;"}"><i class="${"fas fa-columns svelte-1gvtbyy"}"></i></div></div></div>
  ${state === LoadState.Loading
	? `<div style="${"text-align: center; padding-top: 1em; padding-bottom: 1em;"}"><div class="${"spinner-border text-secondary"}" role="${"status"}"><span class="${"sr-only"}">Loading...</span></div></div>`
	: `${state === LoadState.Finished
		? `<canvas id="${"canvas"}" style="${"display: none"}"></canvas>
    ${rows.length === 0
			? `<div style="${"text-align: center; padding-top: 1em; padding-bottom: 1em;"}"><div class="${"text-secondary"}"><p>No results to display.</p></div></div>`
			: `<div class="${"table-responsive"}"><table class="${"table table-hover svelte-1gvtbyy"}" style="${"table-layout: fixed;"}">
          <tbody><tr><th scope="${"col"}" style="${"width: 50px"}"><div class="${"form-check"}"><input class="${"form-check-input"}" type="${"checkbox"}" value="${""}" ${ ""}${add_attribute("id", "row-toggle-all", 0)}></div></th>
              ${each(filteredColumns, column => `<th scope="${"col"}"${add_attribute("style", headerStyle(column), 0)}>${escape(column)}
                  <span>${sort === column && sortDirection === "asc"
				? `<span><span class="${"fas fa-chevron-up"}"></span>
                      </span>`
				: `${sort === column && sortDirection === "desc"
					? `<span><span class="${"fas fa-chevron-down"}"></span>
                      </span>`
					: ``}`}</span>
                </th>`)}</tr>
            ${each(filtered, (row, index) => `${index >= range.min && index <= range.max
				? `<tr style="${"vertical-align: middle;"}" class="${["svelte-1gvtbyy", row.meta_selected ? "active" : ""].join(" ").trim()}"><td class="${"svelte-1gvtbyy"}"><div class="${"form-check"}"><input class="${"form-check-input"}" type="${"checkbox"}" value="${""}" ${row.meta_selected ? "checked" : ""}${add_attribute("id", "row-toggle-" + index, 0)}>
                    </div></td>
                  ${each(filteredColumns, column => `<td class="${"svelte-1gvtbyy"}"><div class="${"text svelte-1gvtbyy"}">${escape(renderValue(row, column))}</div>
                    </td>`)}
                </tr>`
				: ``}`)}</tbody></table></div>
      ${validate_component(Pagination, "Pagination").$$render(
					$$result,
					{
						id,
						count: filtered.length,
						onRangeChange: r => {
							if (fastEquals(r, range)) {
								return;
							}

							range = r;
							setWidths();
							columns = columns;
						}
					},
					{},
					{}
				)}`}`
		: `${state === LoadState.Failed
			? `<div style="${"padding-top:1em; padding-left: 1em;"}"><p>Failed to load rows, please try refreshing the page.</p></div>`
			: ``}`}`}
  ${ `${ ``}`}
</div>`;
});

/* src\routes\submissions\index.svelte generated by Svelte v3.24.1 */

var __awaiter$2 = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
	function adopt(value) {
		return value instanceof P
		? value
		: new P(function (resolve) {
					resolve(value);
				});
	}

	return new (P || (P = Promise))(function (resolve, reject) {
			function fulfilled(value) {
				try {
					step(generator.next(value));
				} catch(e) {
					reject(e);
				}
			}

			function rejected(value) {
				try {
					step(generator["throw"](value));
				} catch(e) {
					reject(e);
				}
			}

			function step(result) {
				result.done
				? resolve(result.value)
				: adopt(result.value).then(fulfilled, rejected);
			}

			step((generator = generator.apply(thisArg, _arguments || [])).next());
		});
};

function preload$1(page, session) {
	return __awaiter$2(this, void 0, void 0, function* () {
		const formId = getUrlParameter("formId");

		if (!formId) {
			return {};
		}

		const url = `https://json-data.s3.us-west-002.backblazeb2.com/${formId}.json`;

		//@ts-ignore
		const res = yield this.fetch(url);

		const form = yield res.json();
		return { formId, form };
	});
}

const Submissions = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
		function adopt(value) {
			return value instanceof P
			? value
			: new P(function (resolve) {
						resolve(value);
					});
		}

		return new (P || (P = Promise))(function (resolve, reject) {
				function fulfilled(value) {
					try {
						step(generator.next(value));
					} catch(e) {
						reject(e);
					}
				}

				function rejected(value) {
					try {
						step(generator["throw"](value));
					} catch(e) {
						reject(e);
					}
				}

				function step(result) {
					result.done
					? resolve(result.value)
					: adopt(result.value).then(fulfilled, rejected);
				}

				step((generator = generator.apply(thisArg, _arguments || [])).next());
			});
	};

	
	
	let { formId = "" } = $$props;
	let { form } = $$props;
	let state = LoadState.NotStarted;
	let types = {};
	let hidden = new Set(["submission_id"]);

	function getRows() {
		return __awaiter(this, void 0, void 0, function* () {
			const submissions = yield getApi(`form/${formId}/submission`);
			const labels = {};

			form.fields.forEach(f => {
				var _a;

				if (f.name) {
					labels[f.name] = (_a = f.label) !== null && _a !== void 0 ? _a : f.name;
				}
			});

			return submissions.map(d => {
				Object.keys(d.details).forEach(key => {
					var _a, _b, _c;

					if (labels[key]) {
						const label = labels[key];
						d.details[label] = d.details[key];

						types[label] = (_b = (_a = form.fields.find(w => w.label === label)) === null || _a === void 0
						? void 0
						: _a.type) !== null && _b !== void 0
						? _b
						: "";

						delete d.details[key];
					} else {
						const fieldByName = (_c = form.fields.find(w => w.name === key)) === null || _c === void 0
						? void 0
						: _c.type;

						if (fieldByName) {
							types[key] = fieldByName;
						}
					}
				});

				d.details["Submission Date"] = new Date(d.createTime).toLocaleString();
				d.details["submission_id"] = d.id;
				return d.details;
			});
		});
	}

	function sortColumns(columns) {
		return columns.sort((a, b) => {
			return form.fields.findIndex(f => f.label === a) - form.fields.findIndex(f => f.label === b);
		});
	}

	function format(column, value) {
		var _a, _b, _c, _d, _e;
		const type = types[column];

		if (type === "address" && isObject(value)) {

			const results = [
				(_a = value === null || value === void 0
				? void 0
				: value.address1) === null || _a === void 0
				? void 0
				: _a.value,
				(_b = value === null || value === void 0
				? void 0
				: value.address2) === null || _b === void 0
				? void 0
				: _b.value,
				(_c = value === null || value === void 0
				? void 0
				: value.state) === null || _c === void 0
				? void 0
				: _c.value,
				(_d = value === null || value === void 0 ? void 0 : value.city) === null || _d === void 0
				? void 0
				: _d.value,
				(_e = value === null || value === void 0 ? void 0 : value.zip) === null || _e === void 0
				? void 0
				: _e.value
			];

			return results.filter(r => r).join(" ");
		}

		if (type === "checkbox-group" && isObject(value)) {
			return Object.values(value).filter(v => v != null).join(", ");
		}

		if (type === "radio-group" && isObject(value)) {
			return Object.values(value).find(v => v != null);
		}

		return undefined;
	}

	function onDelete(rows) {
		return __awaiter(this, void 0, void 0, function* () {
			const ids = rows.map(r => r["submission_id"]).filter(r => r != null);
			yield deleteApi(`form/${formId}/submission`, ids);
		});
	}

	if ($$props.formId === void 0 && $$bindings.formId && formId !== void 0) $$bindings.formId(formId);
	if ($$props.form === void 0 && $$bindings.form && form !== void 0) $$bindings.form(form);

	return `<div class="${"container-fluid clearfix"}" id="${"main-container"}" style="${"margin-top: 3.9em;"}"><div class="${"main"}"><h1>Submissions</h1>
    <hr>
    <div>${validate_component(RemoteTable, "RemoteTable").$$render(
		$$result,
		{
			getRows,
			sortColumns,
			onDelete,
			onFormat: format,
			hidden
		},
		{},
		{}
	)}</div></div>
</div>`;
});

var component_9 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': Submissions,
    preload: preload$1
});

var DynamicFormMode;
(function (DynamicFormMode) {
    DynamicFormMode[DynamicFormMode["Preview"] = 0] = "Preview";
    DynamicFormMode[DynamicFormMode["Live"] = 1] = "Live";
})(DynamicFormMode || (DynamicFormMode = {}));

class LogicBuilder {
    evaluate(field) {
        if (!field.logic) {
            return true;
        }
        if (!field.logic.rules) {
            return true;
        }
        const rules = field.logic.rules.filter(r => {
            if (nullOrEmpty(r.field) || nullOrEmpty(r.condition)) {
                return false;
            }
            return true;
        });
        if (rules.length === 0) {
            return true;
        }
        if (field.logic.action === "show-any-match") {
            for (let rule of rules) {
                const fieldTargetValue = formStore.getValue(rule.field);
                if (fieldTargetValue == null) {
                    continue;
                }
                if (this.evaluateCondition(rule, fieldTargetValue)) {
                    return true;
                }
            }
            return false;
        }
        if (field.logic.action === "show-all-match") {
            for (let rule of rules) {
                const fieldTargetValue = formStore.getValue(rule.field);
                if (fieldTargetValue == null) {
                    return false;
                }
                if (!this.evaluateCondition(rule, fieldTargetValue)) {
                    return false;
                }
            }
            return true;
        }
        if (field.logic.action === "hide-all-match") {
            for (let rule of rules) {
                const fieldTargetValue = formStore.getValue(rule.field);
                if (fieldTargetValue == null) {
                    return true;
                }
                if (!this.evaluateCondition(rule, fieldTargetValue)) {
                    return true;
                }
            }
            return false;
        }
        if (field.logic.action === "hide-any-match") {
            for (let rule of rules) {
                const fieldTargetValue = formStore.getValue(rule.field);
                if (fieldTargetValue == null) {
                    continue;
                }
                if (this.evaluateCondition(rule, fieldTargetValue)) {
                    return false;
                }
            }
            return true;
        }
        return false;
    }
    evaluateCondition(rule, value) {
        if (isLabelValue(value)) {
            return this.evaluateCondition(rule, value.value) || this.evaluateCondition(rule, value.label);
        }
        switch (rule.condition) {
            case "contains":
                return this.toLowerCase(value).includes(this.toLowerCase(rule.value));
            case "startsWith":
                return this.toLowerCase(value).startsWith(this.toLowerCase(rule.value));
            case "endsWith":
                return this.toLowerCase(value).endsWith(this.toLowerCase(rule.value));
            case "eq":
                return this.toLowerCase(value) == this.toLowerCase(rule.value);
            case "gt":
                return parseFloat(value) > parseFloat(rule.value);
            case "lt":
                return parseFloat(value) < parseFloat(rule.value);
            case "lte":
                return parseFloat(value) <= parseFloat(rule.value);
            case "gte":
                return parseFloat(value) >= parseFloat(rule.value);
            case "hasValue":
                return this.hasValue(value);
            case "notHaveValue":
                return !this.hasValue(value);
            case "isTrue":
                return value != null && value == true;
            case "isFalse":
                return value != null && value == false;
            case "isFileExtension":
                return this.isFileExtension(value, rule);
            case "isNotFileExtension":
                return !this.isFileExtension(value, rule);
            default:
                return false;
        }
    }
    hasValue(value) {
        return value != null && value != "";
    }
    isFileExtension(value, rule) {
        if (!this.hasValue(value)) {
            return false;
        }
        const file = formStore.getFile(value);
        if (!file) {
            return false;
        }
        const fileName = file.name;
        const split = fileName.split(".");
        if (split.length < 2) {
            return false;
        }
        const rules = rule.value.split(",").map((r) => {
            return r.replace(" ", "").replace(".", "");
        });
        for (let r of rules) {
            if (r === split[split.length - 1]) {
                return true;
            }
        }
        return false;
    }
    toLowerCase(value) {
        if (!this.hasValue(value)) {
            return '';
        }
        return value.toString().toLowerCase();
    }
}

/* src\features\form\edit\DynamicForm.svelte generated by Svelte v3.24.1 */

const css$h = {
	code: ".ex-over{background-color:#f5f5f5;height:100%;min-height:60vh;padding-top:3em;padding-bottom:3em !important}",
	map: "{\"version\":3,\"file\":\"DynamicForm.svelte\",\"sources\":[\"DynamicForm.svelte\"],\"sourcesContent\":[\"<script lang=\\\"typescript\\\">import Field from './Field.svelte';\\r\\n;\\r\\n;\\r\\nimport { subscribeFieldChange } from 'event/FieldEvent';\\r\\nimport { DynamicFormMode } from 'components/models/ComponentProps';\\r\\nimport { dispatch, dispatchSync, subscribe } from 'event/EventBus';\\r\\nimport { transformDraggedElement } from './util/Draggable';\\r\\nimport formStore from 'store/FormStore';\\r\\nimport { LogicBuilder } from 'services/LogicBuilder';\\r\\nimport { fastClone } from 'util/Compare';\\r\\nimport { onMount } from 'svelte';\\r\\nimport { goto } from '@sapper/app';\\r\\nimport Dialog from 'components/layout/Dialog.svelte';\\r\\nimport { randomString } from 'util/Generate';\\r\\nimport { saveToLocalStorage } from './services/SaveForm';\\r\\nexport let form;\\r\\nexport let mode = DynamicFormMode.Live;\\r\\nlet considering = false;\\r\\nlet values = {};\\r\\nlet hasPlaceholder = false;\\r\\nlet fromSidebar = false;\\r\\nlet deleting = false;\\r\\nonMount(() => {\\r\\n    subscribe('confirm_field_deletion', () => {\\r\\n        deleting = true;\\r\\n    });\\r\\n    subscribe('form_placeholder_changed', (props) => {\\r\\n        hasPlaceholder = props.added;\\r\\n    });\\r\\n});\\r\\nsubscribeFieldChange((updatedField) => {\\r\\n    if (!form || !form.fields) {\\r\\n        return;\\r\\n    }\\r\\n    const index = form.fields.findIndex((w) => w.id === updatedField.id);\\r\\n    if (index === -1) {\\r\\n        return;\\r\\n    }\\r\\n    form.fields[index].updated = !form.fields[index].updated;\\r\\n    const fieldsWithRules = form.fields.filter((w) => {\\r\\n        if (!w.logic || !w.logic.rules) {\\r\\n            return false;\\r\\n        }\\r\\n        const hasRule = w.logic.rules.find((rule) => rule.field === updatedField.id);\\r\\n        return hasRule != null;\\r\\n    });\\r\\n    for (let fieldWithRule of fieldsWithRules) {\\r\\n        let ruleIndex = form.fields.findIndex((w) => w.id === fieldWithRule.id);\\r\\n        form.fields[ruleIndex].updated = !form.fields[ruleIndex].updated;\\r\\n    }\\r\\n});\\r\\nfunction display(field) {\\r\\n    if (!form.enableLogic) {\\r\\n        return true;\\r\\n    }\\r\\n    if (!field.logic) {\\r\\n        return true;\\r\\n    }\\r\\n    const builder = new LogicBuilder();\\r\\n    return builder.evaluate(field);\\r\\n}\\r\\nfunction onFormPreview() {\\r\\n    const form = formStore.getForm();\\r\\n    saveToLocalStorage(form);\\r\\n    if (form.id) {\\r\\n        window.open(`./preview/${form.id}?mode=local`, '_blank');\\r\\n    }\\r\\n    else {\\r\\n        window.open(`./preview/local?mode=local`, '_blank');\\r\\n    }\\r\\n}\\r\\nfunction onDelete() {\\r\\n    const selected = form.fields.find((w) => w.selected);\\r\\n    if (selected) {\\r\\n        dispatch('field_delete', {\\r\\n            field: selected,\\r\\n        });\\r\\n    }\\r\\n}\\r\\n//# sourceMappingURL=DynamicForm.svelte.js.map</script>\\r\\n\\r\\n{#if deleting}\\r\\n  <Dialog\\r\\n    title={'Confirm Deletion'}\\r\\n    isOpen={true}\\r\\n    actions={[{ label: `Delete Field`, type: 'danger', onClick: onDelete, focus: true }, { label: 'Cancel', type: 'secondary' }]}\\r\\n    onClose={() => {\\r\\n      deleting = false\\r\\n    }}>\\r\\n    <p>Are you sure you want to delete this field? Deletion is permanent and cannot be reversed.</p>\\r\\n    <p>Changes will be applied after the form is saved.</p>\\r\\n  </Dialog>\\r\\n{/if}\\r\\n<div class=\\\"row\\\" style=\\\"padding-left: 0.5em; display: flex\\\">\\r\\n  <div class=\\\"col\\\">\\r\\n    <h4>{form.title || 'Form Title'}</h4>\\r\\n    <small class=\\\"text-gray-700\\\">{form.description ?? ''}</small>\\r\\n  </div>\\r\\n  <div class=\\\"col-auto\\\" style=\\\"text-align: right\\\"><a href={`/preview?formId=${form.id}`} target=\\\"_blank\\\" class=\\\"btn btn-xs btn-outline-dark\\\">Preview Form</a></div>\\r\\n</div>\\r\\n<hr style=\\\"margin-top: 0.5rem; margin-bottom: 0.7rem;\\\" />\\r\\n<form class=\\\"preview-padding\\\" id=\\\"form-preview\\\">\\r\\n  <div style=\\\"padding-bottom: 1em\\\" id=\\\"form-preview-fields\\\">\\r\\n    {#each form.fields as field (field.id)}\\r\\n      {#if display(field)}\\r\\n        <div id={`form-field-${field.id}`}>\\r\\n          <Field field={fastClone(field)} />\\r\\n        </div>\\r\\n      {:else}\\r\\n        <div id={`form-field-${field.id}`}>\\r\\n          <Field field={fastClone(field)} hidden={true} />\\r\\n        </div>\\r\\n      {/if}\\r\\n    {/each}\\r\\n  </div>\\r\\n  <button style=\\\"margin-left: 0.5em\\\" class=\\\"btn btn-primary\\\" type=\\\"submit\\\">Submit</button>\\r\\n</form>\\r\\n\\r\\n<style>\\r\\n  :global(.ex-over) {\\r\\n    background-color: #f5f5f5;\\r\\n    height: 100%;\\r\\n    min-height: 60vh;\\r\\n    padding-top: 3em;\\r\\n    padding-bottom: 3em !important;\\r\\n  }\\r\\n</style>\\r\\n\"],\"names\":[],\"mappings\":\"AAuHU,QAAQ,AAAE,CAAC,AACjB,gBAAgB,CAAE,OAAO,CACzB,MAAM,CAAE,IAAI,CACZ,UAAU,CAAE,IAAI,CAChB,WAAW,CAAE,GAAG,CAChB,cAAc,CAAE,GAAG,CAAC,UAAU,AAChC,CAAC\"}"
};

const DynamicForm = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	
	
	let { form } = $$props;
	let { mode = DynamicFormMode.Live } = $$props;
	let hasPlaceholder = false;
	let deleting = false;

	onMount(() => {
		subscribe$1("confirm_field_deletion", () => {
			deleting = true;
		});

		subscribe$1("form_placeholder_changed", props => {
			hasPlaceholder = props.added;
		});
	});

	subscribeFieldChange(updatedField => {
		if (!form || !form.fields) {
			return;
		}

		const index = form.fields.findIndex(w => w.id === updatedField.id);

		if (index === -1) {
			return;
		}

		form.fields[index].updated = !form.fields[index].updated;

		const fieldsWithRules = form.fields.filter(w => {
			if (!w.logic || !w.logic.rules) {
				return false;
			}

			const hasRule = w.logic.rules.find(rule => rule.field === updatedField.id);
			return hasRule != null;
		});

		for (let fieldWithRule of fieldsWithRules) {
			let ruleIndex = form.fields.findIndex(w => w.id === fieldWithRule.id);
			form.fields[ruleIndex].updated = !form.fields[ruleIndex].updated;
		}
	});

	function display(field) {
		if (!form.enableLogic) {
			return true;
		}

		if (!field.logic) {
			return true;
		}

		const builder = new LogicBuilder();
		return builder.evaluate(field);
	}

	function onDelete() {
		const selected = form.fields.find(w => w.selected);

		if (selected) {
			dispatch("field_delete", { field: selected });
		}
	}

	if ($$props.form === void 0 && $$bindings.form && form !== void 0) $$bindings.form(form);
	if ($$props.mode === void 0 && $$bindings.mode && mode !== void 0) $$bindings.mode(mode);
	$$result.css.add(css$h);

	return `${deleting
	? `${validate_component(Dialog, "Dialog").$$render(
			$$result,
			{
				title: "Confirm Deletion",
				isOpen: true,
				actions: [
					{
						label: `Delete Field`,
						type: "danger",
						onClick: onDelete,
						focus: true
					},
					{ label: "Cancel", type: "secondary" }
				],
				onClose: () => {
					deleting = false;
				}
			},
			{},
			{
				default: () => `<p>Are you sure you want to delete this field? Deletion is permanent and cannot be reversed.</p>
    <p>Changes will be applied after the form is saved.</p>`
			}
		)}`
	: ``}
<div class="${"row"}" style="${"padding-left: 0.5em; display: flex"}"><div class="${"col"}"><h4>${escape(form.title || "Form Title")}</h4>
    <small class="${"text-gray-700"}">${escape(form.description ?? "")}</small></div>
  <div class="${"col-auto"}" style="${"text-align: right"}"><a${add_attribute("href", `/preview?formId=${form.id}`, 0)} target="${"_blank"}" class="${"btn btn-xs btn-outline-dark"}">Preview Form</a></div></div>
<hr style="${"margin-top: 0.5rem; margin-bottom: 0.7rem;"}">
<form class="${"preview-padding"}" id="${"form-preview"}"><div style="${"padding-bottom: 1em"}" id="${"form-preview-fields"}">${each(form.fields, field => `${display(field)
	? `<div${add_attribute("id", `form-field-${field.id}`, 0)}>${validate_component(Field, "Field").$$render($$result, { field: fastClone(field) }, {}, {})}
        </div>`
	: `<div${add_attribute("id", `form-field-${field.id}`, 0)}>${validate_component(Field, "Field").$$render($$result, { field: fastClone(field), hidden: true }, {}, {})}
        </div>`}`)}</div>
  <button style="${"margin-left: 0.5em"}" class="${"btn btn-primary"}" type="${"submit"}">Submit</button>
</form>`;
});

const debounceSave = debounce(() => {
    const form = formStore.getForm();
    saveToLocalStorage(form);
}, 500);
function startPreviewSaver() {
    subscribeFieldChange(() => {
        debounceSave();
    });
    subscribe$1("form_updated", () => {
        debounceSave();
    });
}

function setFieldDefaults(field) {
    if (field.type === 'checkbox-group') {
        field.value = { "Option 1": "Option 1" };
        field.options = ["Option 1", "Option 2"];
    }
    if (field.type === 'radio-group') {
        field.value = { "Option 1": "Option 1" };
        field.options = ["Option 1", "Option 2"];
    }
    return field;
}

/* src\features\form\edit\FormBuilder.svelte generated by Svelte v3.24.1 */

const FormBuilder = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
		function adopt(value) {
			return value instanceof P
			? value
			: new P(function (resolve) {
						resolve(value);
					});
		}

		return new (P || (P = Promise))(function (resolve, reject) {
				function fulfilled(value) {
					try {
						step(generator.next(value));
					} catch(e) {
						reject(e);
					}
				}

				function rejected(value) {
					try {
						step(generator["throw"](value));
					} catch(e) {
						reject(e);
					}
				}

				function step(result) {
					result.done
					? resolve(result.value)
					: adopt(result.value).then(fulfilled, rejected);
				}

				step((generator = generator.apply(thisArg, _arguments || [])).next());
			});
	};

	
	
	let loadingActive = false;
	let dragForm;
	let form;

	function loadForm() {
		var _a;

		return __awaiter(this, void 0, void 0, function* () {
			loadingActive = true;

			const formId = (_a = getUrlParameter("formId")) !== null && _a !== void 0
			? _a
			: "new";

			try {
				if (formId === "new") {
					form = { fields: [], title: "My New Form" };
				} else {
					form = yield getApi(`form/${formId}`);
				}

				if (!form) {
					return;
				}

				if (!form.fields) {
					form.fields = [];
				}

				form.fields = form.fields.map(w => {
					w.selected = false;
					return w;
				});

				// todo remove this, just for testing
				form.groups = [
					{ value: "123", label: "Personal Details" },
					{
						value: "456",
						label: "Experience Questions"
					}
				];

				addPlaceHolder();
				formStore.setForm(form);
				dispatch("form_loaded", { form });
				startPreviewSaver();
			} finally {
				loadingActive = false;
			}
		});
	}

	function removePlaceHolder() {
		const placeholder = form.fields.findIndex(w => w.type === "placeholder");

		if (placeholder !== -1) {
			const temp = fastClone(form.fields);
			temp.splice(placeholder, 1);
			form.fields = temp;
			dispatch("form_placeholder_changed", { added: false });
		}
	}

	function addPlaceHolder() {
		if (form.fields.filter(w => w.type !== "placeholder").length !== 0) {
			removePlaceHolder();
			return;
		}

		if (form.fields.find(w => w.type === "placeholder")) {
			return;
		}

		form.fields = form.fields.concat([
			{
				name: "placeholder-field",
				label: "You have no fields",
				type: "placeholder",
				id: "placeholder"
			}
		]);

		dispatch("form_placeholder_changed", { added: true });
	}

	onMount(() => __awaiter(void 0, void 0, void 0, function* () {
		subscribe$1("form_updated", props => {
			form = props;
			addPlaceHolder();
		});

		subscribe$1("field_delete", params => {
			const index = form.fields.findIndex(w => w.id === params.field.id);
			const temp = [...form.fields];
			temp.splice(index, 1);
			form.fields = temp;
			formStore.setForm(form);
		});

		subscribe$1("right_sidebar_loaded", () => {
			form && dispatch("form_loaded", { form });
		});

		subscribe$1("add_field", params => {
			form.fields = form.fields.map(w => {
				w.selected = false;
				return w;
			});

			const id = randomString();

			let field = {
				name: "new-field-" + randomStringSmall(),
				label: "New Field " + randomStringSmall(),
				type: params.type,
				id,
				selected: true,
				value: undefined,
				expanded: true
			};

			field = setFieldDefaults(field);
			form.fields = form.fields.concat(field);
			removePlaceHolder();
			formStore.setForm(form);
		});

		subscribe$1("field_clone", params => {
			const index = form.fields.findIndex(w => w.id === params.field.id);
			const copy = fastClone(form.fields[index]);
			copy.name = copy.name + "-" + randomStringSmall();
			copy.label = copy.label + " Copy";
			copy.id = randomString();
			copy.selected = true;
			const temp = fastClone(form.fields);
			temp.splice(index + 1, 0, copy);
			form.fields = temp;
			formStore.set(copy);
		});

		subscribe$1("save_form", params => __awaiter(void 0, void 0, void 0, function* () {
			yield saveForm();
		}));

		subscribe$1("get_form_fields", () => {
			return form.fields;
		});

		subscribe$1("drag_over", () => {
			removePlaceHolder();
		});

		subscribe$1("drag_finished", elements => __awaiter(void 0, void 0, void 0, function* () {
			removePlaceHolder();
			console.log(elements);

			let fields = elements.filter(w => w).map(e => {
				if (e.id === "form-field-placeholder") {
					return undefined;
				}

				if (e.id.startsWith("form-field-")) {
					const field = form.fields.find(w => w.id === e.id.replace("form-field-", ""));

					if (field) {
						field.selected = false;
					}

					return field;
				}

				if (e.id.startsWith("sidebar-block-")) {
					const type = e.id.replace("sidebar-block-", "");

					let field = {
						id: randomString(),
						type,
						name: "new-field-" + randomStringSmall(),
						label: "New Field " + randomStringSmall(),
						selected: true,
						value: undefined
					};

					field = setFieldDefaults(field);
					return field;
				}
			});

			fields = fields.filter(w => w != null);
			form.fields = fastClone(fields);
			dragForm = fastClone(form);
			yield tick();
			dragForm = undefined;

			if (form.fields.length === 0) {
				addPlaceHolder();
			}

			formStore.setForm(form);
		}));

		subscribeFieldChange(newField => {
			if (!newField.selected) {
				return;
			}

			form.fields = form.fields.map(f => {
				if (f.id !== newField.id && f.selected) {
					f.selected = false;
					formStore.set(f);
				}

				return f;
			});
		});

		subscribe$1("form_updated", params => {
			form = params;
		});

		subscribe$1("document_click", () => {
			form.fields = form.fields.map(f => {
				if (f.selected) {
					f.selected = false;
					formStore.set(f);
				}

				return f;
			});
		});

		subscribeFieldChange(field => __awaiter(void 0, void 0, void 0, function* () {
			if (!form || !form.fields) {
				return;
			}

			const index = form.fields.findIndex(w => w.id === field.id);

			if (index !== -1) {
				form.fields[index] = field;
			}
		}));

		loadForm();
	}));

	return `<div>${validate_component(ToastManager, "ToastManager").$$render($$result, {}, {}, {})}
  ${form == null || loadingActive
	? `<div class="${"flex-column justify-content-center align-items-center"}"><div class="${"d-flex justify-content-center"}"><div class="${"spinner-border"}" style="${"width: 3rem; height: 3rem; margin-top: 2em"}" role="${"status"}"><span class="${"sr-only"}">Loading...</span></div></div></div>`
	: `<div class="${"container"}" style="${"padding-left: 0.4em; padding-top: 0.5em;"}"><div class="${"row"}">${dragForm
		? `<div${add_attribute("class", "col-md no-gutters max-width", 0)}>${validate_component(DynamicForm, "DynamicForm").$$render(
				$$result,
				{
					form: dragForm,
					mode: DynamicFormMode.Preview
				},
				{},
				{}
			)}</div>`
		: `<div${add_attribute("class", "col-md no-gutters max-width", 0)}>${validate_component(DynamicForm, "DynamicForm").$$render($$result, { form, mode: DynamicFormMode.Preview }, {}, {})}</div>`}</div></div>`}
</div>`;
});

/* src\components\Repeater.svelte generated by Svelte v3.24.1 */

const css$i = {
	code: ".fa-trash.svelte-105i2dl{height:0.5em;cursor:pointer;margin-top:15px}.fa-plus.svelte-105i2dl{height:0.5em;cursor:pointer;margin-top:15px}",
	map: "{\"version\":3,\"file\":\"Repeater.svelte\",\"sources\":[\"Repeater.svelte\"],\"sourcesContent\":[\"<script lang=\\\"typescript\\\">;\\r\\nimport { dispatch } from 'event/EventBus';\\r\\nimport { onMount } from 'svelte';\\r\\nexport let onChange;\\r\\nexport let helperText = '';\\r\\nexport let onlyLabel = false;\\r\\nexport let label = 'Options';\\r\\nexport let options = [\\r\\n    {\\r\\n        label: '',\\r\\n        value: '',\\r\\n    },\\r\\n];\\r\\nonMount(() => [onRepeaterChange(false)]);\\r\\nfunction onRepeaterChange(user = true) {\\r\\n    if (onlyLabel) {\\r\\n        const labels = options.map((m) => m.label);\\r\\n        user && dispatch('user_change', labels);\\r\\n        onChange === null || onChange === void 0 ? void 0 : onChange(labels);\\r\\n    }\\r\\n    else {\\r\\n        user && dispatch('user_change', options);\\r\\n        onChange === null || onChange === void 0 ? void 0 : onChange(options);\\r\\n    }\\r\\n}\\r\\nfunction remove(option) {\\r\\n    options.splice(option, 1);\\r\\n    options = [...options];\\r\\n    onRepeaterChange();\\r\\n    if (options.length === 0) {\\r\\n        options = [\\r\\n            {\\r\\n                label: '',\\r\\n                value: '',\\r\\n            },\\r\\n        ];\\r\\n    }\\r\\n}\\r\\nfunction addNew() {\\r\\n    options = options.concat([\\r\\n        {\\r\\n            label: '',\\r\\n            value: '',\\r\\n        },\\r\\n    ]);\\r\\n}\\r\\n//# sourceMappingURL=Repeater.svelte.js.map</script>\\r\\n\\r\\n<div>\\r\\n  <label style=\\\"margin-left: .5em\\\">{label}</label>\\r\\n  {#each options as option, i}\\r\\n    <div class=\\\"d-flex flex-row bd-highlight justify-end\\\">\\r\\n      {#if onlyLabel}\\r\\n        <div class=\\\"p-1 bd-highlight\\\" style=\\\"width: 100%;\\\">\\r\\n          <input class=\\\"form-control\\\" name=\\\"display\\\" type=\\\"text\\\" on:blur={() => onRepeaterChange(true)} bind:value={option.label} placeholder={'Option'} />\\r\\n        </div>\\r\\n      {:else}\\r\\n        <div class=\\\"p-1 bd-highlight\\\" style=\\\"width: 100%;\\\">\\r\\n          <input class=\\\"form-control\\\" name=\\\"display\\\" type=\\\"text\\\" on:blur={() => onRepeaterChange(true)} bind:value={option.label} placeholder={'Display'} />\\r\\n        </div>\\r\\n        <div class=\\\"p-1 bd-highlight\\\" style=\\\"width: 100%;\\\">\\r\\n          <input class=\\\"form-control\\\" name=\\\"value\\\" type=\\\"text\\\" on:blur={() => onRepeaterChange(true)} bind:value={option.value} placeholder={'Value'} />\\r\\n        </div>\\r\\n      {/if}\\r\\n      <div class=\\\"bd-highlight\\\"><span class=\\\"icon baseline\\\" on:click={addNew}> <span class=\\\"fas fa-plus\\\" /> </span></div>\\r\\n      <div class=\\\"bd-highlight\\\"><span class=\\\"icon baseline\\\" on:click={() => remove(i)}> <span class=\\\"fas fa-trash\\\" /> </span></div>\\r\\n    </div>\\r\\n  {/each}\\r\\n  {#if helperText}\\r\\n    <div class=\\\"helper-text\\\">\\r\\n      {@html helperText ?? ''}\\r\\n    </div>\\r\\n  {/if}\\r\\n</div>\\r\\n\\r\\n<style>\\r\\n  .fa-trash {\\r\\n    height: 0.5em;\\r\\n    cursor: pointer;\\r\\n    margin-top: 15px;\\r\\n  }\\r\\n\\r\\n  .fa-plus {\\r\\n    height: 0.5em;\\r\\n    cursor: pointer;\\r\\n    margin-top: 15px;\\r\\n  }\\r\\n</style>\\r\\n\"],\"names\":[],\"mappings\":\"AA4EE,SAAS,eAAC,CAAC,AACT,MAAM,CAAE,KAAK,CACb,MAAM,CAAE,OAAO,CACf,UAAU,CAAE,IAAI,AAClB,CAAC,AAED,QAAQ,eAAC,CAAC,AACR,MAAM,CAAE,KAAK,CACb,MAAM,CAAE,OAAO,CACf,UAAU,CAAE,IAAI,AAClB,CAAC\"}"
};

const Repeater = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	
	let { onChange } = $$props;
	let { helperText = "" } = $$props;
	let { onlyLabel = false } = $$props;
	let { label = "Options" } = $$props;
	let { options = [{ label: "", value: "" }] } = $$props;
	onMount(() => [onRepeaterChange(false)]);

	function onRepeaterChange(user = true) {
		if (onlyLabel) {
			const labels = options.map(m => m.label);
			user && dispatch("user_change", labels);

			onChange === null || onChange === void 0
			? void 0
			: onChange(labels);
		} else {
			user && dispatch("user_change", options);

			onChange === null || onChange === void 0
			? void 0
			: onChange(options);
		}
	}

	if ($$props.onChange === void 0 && $$bindings.onChange && onChange !== void 0) $$bindings.onChange(onChange);
	if ($$props.helperText === void 0 && $$bindings.helperText && helperText !== void 0) $$bindings.helperText(helperText);
	if ($$props.onlyLabel === void 0 && $$bindings.onlyLabel && onlyLabel !== void 0) $$bindings.onlyLabel(onlyLabel);
	if ($$props.label === void 0 && $$bindings.label && label !== void 0) $$bindings.label(label);
	if ($$props.options === void 0 && $$bindings.options && options !== void 0) $$bindings.options(options);
	$$result.css.add(css$i);

	return `<div><label style="${"margin-left: .5em"}">${escape(label)}</label>
  ${each(options, (option, i) => `<div class="${"d-flex flex-row bd-highlight justify-end"}">${onlyLabel
	? `<div class="${"p-1 bd-highlight"}" style="${"width: 100%;"}"><input class="${"form-control"}" name="${"display"}" type="${"text"}"${add_attribute("placeholder", "Option", 0)}${add_attribute("value", option.label, 1)}>
        </div>`
	: `<div class="${"p-1 bd-highlight"}" style="${"width: 100%;"}"><input class="${"form-control"}" name="${"display"}" type="${"text"}"${add_attribute("placeholder", "Display", 0)}${add_attribute("value", option.label, 1)}></div>
        <div class="${"p-1 bd-highlight"}" style="${"width: 100%;"}"><input class="${"form-control"}" name="${"value"}" type="${"text"}"${add_attribute("placeholder", "Value", 0)}${add_attribute("value", option.value, 1)}>
        </div>`}
      <div class="${"bd-highlight"}"><span class="${"icon baseline"}"><span class="${"fas fa-plus svelte-105i2dl"}"></span> </span></div>
      <div class="${"bd-highlight"}"><span class="${"icon baseline"}"><span class="${"fas fa-trash svelte-105i2dl"}"></span> </span></div>
    </div>`)}
  ${helperText
	? `<div class="${"helper-text"}">${helperText ?? ""}</div>`
	: ``}
</div>`;
});

/* src\features\form\edit\ComboBoxOptionsEditor.svelte generated by Svelte v3.24.1 */

const css$j = {
	code: ".manage-button.svelte-bh6pw2{margin-top:0.5em;margin-left:0.6em}",
	map: "{\"version\":3,\"file\":\"ComboBoxOptionsEditor.svelte\",\"sources\":[\"ComboBoxOptionsEditor.svelte\"],\"sourcesContent\":[\"<script lang=\\\"typescript\\\">;\\r\\nimport { dispatch } from \\\"event/EventBus\\\";\\r\\nimport OptionSetsList from \\\"./OptionSetsList.svelte\\\";\\r\\nimport Field from \\\"./Field.svelte\\\";\\r\\nimport { randomString } from \\\"util/Generate\\\";\\r\\nimport { apiEndpoint } from \\\"services/ApiService\\\";\\r\\nexport let field;\\r\\nfunction manageSets() {\\r\\n    dispatch(\\\"dialog_show\\\", {\\r\\n        child: OptionSetsList,\\r\\n        closeOnOutsideClick: false,\\r\\n        confirmCloseOnDirty: true,\\r\\n        title: \\\"Manage Option Sets\\\",\\r\\n        save: false,\\r\\n    });\\r\\n}\\r\\nfunction loadTransformer(value) {\\r\\n    return value.map((v) => {\\r\\n        return {\\r\\n            label: v.name,\\r\\n            value: v.value,\\r\\n        };\\r\\n    });\\r\\n}\\r\\n//# sourceMappingURL=ComboBoxOptionsEditor.svelte.js.map</script>\\r\\n\\r\\n<div>\\r\\n  <Field\\r\\n    field={{ id: randomString(), loadTransformer: loadTransformer, required: true, label: 'Option Set', value: field.options, name: `${field.id}-builder-config-field-field_editor-options`, type: 'combobox', options: { type: 'remote', value: `${apiEndpoint()}option-set` }, configFieldTarget: 'options', configTarget: field.id }}\\r\\n  />\\r\\n  <button\\r\\n    on:click={manageSets}\\r\\n    class=\\\"manage-button btn btn-light\\\"\\r\\n    type=\\\"button\\\"\\r\\n  >\\r\\n    Manage Option Sets\\r\\n  </button>\\r\\n</div>\\r\\n\\r\\n<style>\\r\\n  .manage-button {\\r\\n    margin-top: 0.5em;\\r\\n    margin-left: 0.6em;\\r\\n  }\\r\\n</style>\\r\\n\"],\"names\":[],\"mappings\":\"AAwCE,cAAc,cAAC,CAAC,AACd,UAAU,CAAE,KAAK,CACjB,WAAW,CAAE,KAAK,AACpB,CAAC\"}"
};

function loadTransformer(value) {
	return value.map(v => {
		return { label: v.name, value: v.value };
	});
}

const ComboBoxOptionsEditor = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	
	let { field } = $$props;

	if ($$props.field === void 0 && $$bindings.field && field !== void 0) $$bindings.field(field);
	$$result.css.add(css$j);

	return `<div>${validate_component(Field, "Field").$$render(
		$$result,
		{
			field: {
				id: randomString(),
				loadTransformer,
				required: true,
				label: "Option Set",
				value: field.options,
				name: `${field.id}-builder-config-field-field_editor-options`,
				type: "combobox",
				options: {
					type: "remote",
					value: `${apiEndpoint()}option-set`
				},
				configFieldTarget: "options",
				configTarget: field.id
			}
		},
		{},
		{}
	)}
  <button class="${"manage-button btn btn-light svelte-bh6pw2"}" type="${"button"}">Manage Option Sets
  </button>
</div>`;
});

/* src\features\form\edit\AddressEditor.svelte generated by Svelte v3.24.1 */

const AddressEditor = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	
	
	let { field } = $$props;
	let { expanded } = $$props;

	if ($$props.field === void 0 && $$bindings.field && field !== void 0) $$bindings.field(field);
	if ($$props.expanded === void 0 && $$bindings.expanded && expanded !== void 0) $$bindings.expanded(expanded);

	return `<div><div style="${"padding-left: 0.5em;"}"><h5 style="${"padding-bottom: 0.2em;"}">Address Settings</h5>
        <hr></div></div>`;
});

/* src\features\form\edit\CheckboxGroupEditor.svelte generated by Svelte v3.24.1 */

const CheckboxGroupEditor = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	
	
	let { field } = $$props;
	let { expanded } = $$props;

	function onOptionsChange(options) {
		if (options.length === 0) {
			options = ["Checkbox Item 1"];
		}

		field.options = options;

		formStore.set(field, {
			fromUser: true,
			field: "options",
			value: options
		});
	}

	function options() {
		var _a;

		if (isEmptyOrNull(field.options)) {
			return [
				{
					label: "Checkbox Item 1",
					value: "Checkbox Item 1"
				}
			];
		}

		return (_a = field.options) === null || _a === void 0
		? void 0
		: _a.map(w => {
				return { label: w, value: w };
			});
	}

	if ($$props.field === void 0 && $$bindings.field && field !== void 0) $$bindings.field(field);
	if ($$props.expanded === void 0 && $$bindings.expanded && expanded !== void 0) $$bindings.expanded(expanded);

	return `<div>${validate_component(Repeater, "Repeater").$$render(
		$$result,
		{
			options: options(),
			onlyLabel: true,
			label: "Checkbox Options",
			onChange: onOptionsChange
		},
		{},
		{}
	)}
  ${validate_component(Field, "Field").$$render(
		$$result,
		{
			field: {
				id: randomString(),
				type: "switch",
				label: "Include 'Other' Option",
				value: {
					type: "local",
					value: field.includeOther || false
				},
				configFieldTarget: "includeOther",
				configTarget: field.id
			}
		},
		{},
		{}
	)}</div>`;
});

/* src\features\form\edit\RadioGroupEditor.svelte generated by Svelte v3.24.1 */

const RadioGroupEditor = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	
	
	let { field } = $$props;
	let { expanded } = $$props;

	function onOptionsChange(options) {
		if (options.length === 0) {
			options = ["Radio Item 1"];
		}

		field.options = options;

		formStore.set(field, {
			fromUser: true,
			field: "options",
			value: options
		});
	}

	function options() {
		var _a;

		if (isEmptyOrNull(field.options)) {
			return [
				{
					label: "Radio Item 1",
					value: "Radio Item 1"
				}
			];
		}

		return (_a = field.options) === null || _a === void 0
		? void 0
		: _a.map(w => {
				return { label: w, value: w };
			});
	}

	if ($$props.field === void 0 && $$bindings.field && field !== void 0) $$bindings.field(field);
	if ($$props.expanded === void 0 && $$bindings.expanded && expanded !== void 0) $$bindings.expanded(expanded);

	return `<div>${validate_component(Repeater, "Repeater").$$render(
		$$result,
		{
			options: options(),
			onlyLabel: true,
			label: "Radio Options",
			onChange: onOptionsChange
		},
		{},
		{}
	)}
  ${validate_component(Field, "Field").$$render(
		$$result,
		{
			field: {
				id: randomString(),
				type: "switch",
				label: "Include 'Other' Option",
				value: {
					type: "local",
					value: field.includeOther || false
				},
				configFieldTarget: "includeOther",
				configTarget: field.id
			}
		},
		{},
		{}
	)}</div>`;
});

/* src\features\form\edit\FieldTypeEditor.svelte generated by Svelte v3.24.1 */

const FieldTypeEditor = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	
	let { field } = $$props;
	if ($$props.field === void 0 && $$bindings.field && field !== void 0) $$bindings.field(field);

	return `<div>${field.type === "string"
	? `${validate_component(Field, "Field").$$render(
			$$result,
			{
				field: {
					id: randomString(),
					type: "number",
					label: "Rows",
					value: { type: "local", value: field.rows || 1 },
					configFieldTarget: "rows",
					configTarget: field.id
				}
			},
			{},
			{}
		)}`
	: `${field.type === "combobox"
		? `${validate_component(ComboBoxOptionsEditor, "ComboBoxOptionsEditor").$$render($$result, { field }, {}, {})}`
		: `${field.type === "address"
			? `${validate_component(AddressEditor, "AddressEditor").$$render($$result, { field, expanded: field.expanded }, {}, {})}`
			: `${field.type === "checkbox-group"
				? `${validate_component(CheckboxGroupEditor, "CheckboxGroupEditor").$$render($$result, { field, expanded: field.expanded }, {}, {})}`
				: `${field.type === "radio-group"
					? `${validate_component(RadioGroupEditor, "RadioGroupEditor").$$render($$result, { field, expanded: field.expanded }, {}, {})}`
					: `${field.type === "switch"
						? `${validate_component(Field, "Field").$$render(
								$$result,
								{
									field: {
										id: randomString(),
										type: "switch",
										label: "Default Value",
										value: {
											type: "local",
											value: field.defaultValue || false
										},
										configFieldTarget: "defaultValue",
										configTarget: field.id
									}
								},
								{},
								{}
							)}`
						: ``}`}`}`}`}`}</div>`;
});

/* src\components\LogicRule.svelte generated by Svelte v3.24.1 */

function customCss() {
	return "padding-top: 0em; padding-left: 0.6em; padding-right: 0.6em; padding-bottom: 0.7em;";
}

const LogicRule = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
		function adopt(value) {
			return value instanceof P
			? value
			: new P(function (resolve) {
						resolve(value);
					});
		}

		return new (P || (P = Promise))(function (resolve, reject) {
				function fulfilled(value) {
					try {
						step(generator.next(value));
					} catch(e) {
						reject(e);
					}
				}

				function rejected(value) {
					try {
						step(generator["throw"](value));
					} catch(e) {
						reject(e);
					}
				}

				function step(result) {
					result.done
					? resolve(result.value)
					: adopt(result.value).then(fulfilled, rejected);
				}

				step((generator = generator.apply(thisArg, _arguments || [])).next());
			});
	};

	
	
	
	let { helperText = "" } = $$props;
	let { field } = $$props;
	let options = [];

	onMount(() => __awaiter(void 0, void 0, void 0, function* () {
		subscribeFieldChange((newField, change) => {
			var _a, _b, _c;

			if (change.field === "value") {
				return;
			}

			if (field.id === newField.id) {
				field = newField;

				if (((_a = field.logic) === null || _a === void 0
				? void 0
				: _a.action) && isEmptyOrNull((_b = field.logic) === null || _b === void 0
				? void 0
				: _b.rules)) {
					addNew();
				}

				if ((_c = field.logic) === null || _c === void 0
				? void 0
				: _c.rules) {
					field.logic.rules.forEach((f, i) => {
						options[i] = getOptions(i);
					});
				}
			}
		});
	}));

	function getFields() {
		let fields = dispatchSingle("get_form_fields", {});
		fields = fields.filter(w => w.id !== field.id && w.type !== "spacer");
		return fields;
	}

	function addNew() {
		var _a, _b;

		if (!((_a = field.logic) === null || _a === void 0
		? void 0
		: _a.rules)) {
			field.logic = (_b = field.logic) !== null && _b !== void 0
			? _b
			: { rules: [], action: "" };

			field.logic.rules = [];
		}

		field.logic.rules = field.logic.rules.concat([{ field: "", value: "", condition: "" }]);
		formStore.set(field);
	}

	function shouldShowValue(index) {
		var _a, _b, _c, _d;

		const condition = (_d = (_c = (_b = (_a = field.logic) === null || _a === void 0
		? void 0
		: _a.rules) === null || _b === void 0
		? void 0
		: _b[index]) === null || _c === void 0
		? void 0
		: _c.condition) !== null && _d !== void 0
		? _d
		: "";

		const toNotShow = ["hasValue", "isTrue", "isFalse", "notHaveValue"];

		if (toNotShow.includes(condition)) {
			return false;
		}

		return true;
	}

	function getOptions(index) {
		var _a, _b, _c, _d, _e, _f;

		const value = (_c = (_b = (_a = field.logic) === null || _a === void 0
		? void 0
		: _a.rules) === null || _b === void 0
		? void 0
		: _b[index]) === null || _c === void 0
		? void 0
		: _c.condition;

		const condition = conditions(index).find(w => w.value === value);

		if (!condition) {
			return {
				valueType: "text",
				showValue: false,
				options: () => Promise.resolve([]),
				helperText: "",
				placeholder: ""
			};
		}

		return {
			valueType: (_d = condition.valueInput) !== null && _d !== void 0
			? _d
			: "text",
			showValue: shouldShowValue(index),
			options: () => loadOptions(index),
			helperText: (_e = condition.helper) !== null && _e !== void 0
			? _e
			: "",
			placeholder: (_f = condition.placeholder) !== null && _f !== void 0
			? _f
			: ""
		};
	}

	function loadOptions(index) {
		var _a, _b, _c;

		const id = (_c = (_b = (_a = field.logic) === null || _a === void 0
		? void 0
		: _a.rules) === null || _b === void 0
		? void 0
		: _b[index]) === null || _c === void 0
		? void 0
		: _c.field;

		if (!id) {
			return Promise.resolve([]);
		}

		return dispatchSingle("combobox_get_options", { id });
	}

	function conditions(index) {
		var _a, _b, _c;

		const targetFieldId = (_c = (_b = (_a = field.logic) === null || _a === void 0
		? void 0
		: _a.rules) === null || _b === void 0
		? void 0
		: _b[index]) === null || _c === void 0
		? void 0
		: _c.field;

		if (!targetFieldId) {
			return [];
		}

		const fields = getFields();
		const targetField = fields.find(w => w.id === targetFieldId);

		if (!targetField) {
			return [];
		}

		if (targetField.type === "string") {
			return [
				{ label: "Contains", value: "contains" },
				{
					label: "Starts With",
					value: "startsWith"
				},
				{ label: "Ends With", value: "endsWith" },
				{ label: "Equals", value: "eq" },
				{ label: "Has Value", value: "hasValue" }
			];
		}

		if (targetField.type === "combobox") {
			return [
				{
					label: "Equals",
					value: "eq",
					valueInput: "combobox",
					options: loadOptions
				},
				{
					label: "Not Equals",
					value: "notEq",
					valueInput: "combobox",
					options: loadOptions
				},
				{
					label: "Has Selected Option",
					value: "hasValue"
				}
			];
		}

		if (targetField.type === "switch") {
			return [
				{ label: "Is Toggled", value: "isTrue" },
				{
					label: "Is Not Toggled",
					value: "isFalse"
				}
			];
		}

		if (targetField.type === "file") {
			return [
				{
					label: "Has Chosen File",
					value: "hasValue"
				},
				{
					label: "Has Not Chosen File",
					value: "notHaveValue"
				},
				{
					label: "Is File Extension",
					value: "isFileExtension",
					helper: "You can include multiple extensions by seperating with a comma.",
					placeholder: "pdf, txt, png"
				},
				{
					label: "Is Not File Extension",
					helper: "You can include multiple extensions by seperating with a comma.",
					value: "isNotFileExtension",
					placeholder: "pdf, txt, png"
				}
			];
		}

		if (targetField.type === "number") {
			return [
				{ label: "Greater Than", value: "gt" },
				{ label: "Less Than", value: "lt" },
				{
					label: "Less Than or Equal To",
					value: "lte"
				},
				{
					label: "Greater Than or Equal To",
					value: "gte"
				},
				{ label: "Equal To", value: "eq" },
				{ label: "Has Value", value: "hasValue" }
			];
		}

		return [];
	}

	function fieldsTransformer(fields) {
		return fields.map(f => {
			return {
				label: `${firstNotEmpty(f.label, f.name)} - ${f.type}`,
				value: f.id
			};
		});
	}

	if ($$props.helperText === void 0 && $$bindings.helperText && helperText !== void 0) $$bindings.helperText(helperText);
	if ($$props.field === void 0 && $$bindings.field && field !== void 0) $$bindings.field(field);

	return `<div>${each(field.logic?.rules ?? [], (option, i) => `<div class="${"container"}" style="${"background-color: rgb(245 249 253); padding-left: 0.3em; padding-right: 0.3em;"}"><div class="${"row"}"><div class="${"col"}"><div class="${"float-right"}" style="${"position: relative; display: inline-flex; vertical-align: middle; top: 0.8em; right: 0.6em;"}"><button type="${"button"}" class="${"btn btn-secondary"}" style="${"font-size: 0.5rem; padding: 0.25rem 0.5rem;"}"><span class="${"icon-brand"}"><span class="${"fas fa-trash"}"></span></span>
            </button></div>
          ${validate_component(Field, "Field").$$render(
		$$result,
		{
			config: { search: true },
			field: {
				id: randomString(),
				loadTransformer: fieldsTransformer,
				helperText: "Select which field the conditional should be ran against.",
				label: "Select Field",
				value: {
					type: "local",
					value: field.logic?.rules?.[i]?.field
				},
				type: "combobox",
				required: true,
				configFieldTarget: `logic.rules[${i}].field`,
				configTarget: field.id,
				options: { type: "local", value: getFields }
			}
		},
		{},
		{}
	)}
        </div></div>
      <div class="${"row"}">${(field.logic?.rules?.[i]?.field)
	? `${validate_component(Field, "Field").$$render(
			$$result,
			{
				config: { search: true },
				field: {
					id: randomString(),
					customCss: customCss(),
					label: "Select Your Condition",
					value: {
						type: "local",
						value: field.logic?.rules?.[i]?.condition
					},
					type: "combobox",
					required: true,
					configFieldTarget: `logic.rules[${i}].condition`,
					configTarget: field.id,
					options: { type: "local", value: conditions(i) }
				}
			},
			{},
			{}
		)}`
	: ``}</div>
      <div class="${"row"}">${field.logic?.rules?.[i]?.condition && options[i]?.showValue
	? `${options[i].valueType === "text"
		? `${validate_component(Field, "Field").$$render(
				$$result,
				{
					field: {
						id: randomString(),
						customCss: customCss(),
						helperText: options[i].helperText,
						placeholder: options[i].placeholder,
						label: "Provide Value For Conditional",
						value: {
							type: "local",
							value: field.logic?.rules?.[i]?.value
						},
						type: "string",
						required: true,
						configFieldTarget: `logic.rules[${i}].value`,
						configTarget: field.id
					}
				},
				{},
				{}
			)}`
		: `${options[i].valueType === "combobox"
			? `${validate_component(Field, "Field").$$render(
					$$result,
					{
						field: {
							id: randomString(),
							customCss: customCss(),
							helperText: options[i].helperText,
							placeholder: options[i].placeholder,
							label: "Provide Value For Conditional",
							value: {
								type: "local",
								value: field.logic?.rules?.[i]?.value
							},
							type: "combobox",
							required: true,
							configFieldTarget: `logic.rules[${i}].value`,
							configTarget: field.id,
							options: { type: "local", value: options[i].options }
						}
					},
					{},
					{}
				)}`
			: ``}`}`
	: ``}
      </div></div>
    <br>`)}
  ${helperText
	? `<div class="${"helper-text"}">${helperText ?? ""}</div>`
	: ``}
  <button class="${"btn-primary btn"}" style="${""}">Add Rule</button>
</div>`;
});

/* src\features\form\edit\LogicBuilder.svelte generated by Svelte v3.24.1 */

const LogicBuilder$1 = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	
	let { field } = $$props;

	const actions = [
		{
			label: "Show this field when all rule(s) match",
			value: "show-all-match"
		},
		{
			label: "Show this field when any rule(s) match",
			value: "show-any-match"
		},
		{
			label: "Hide this field when any rule(s) match",
			value: "hide-any-match"
		},
		{
			label: "Hide this field when all rule(s) match",
			value: "hide-all-match"
		}
	];

	if ($$props.field === void 0 && $$bindings.field && field !== void 0) $$bindings.field(field);

	return `${validate_component(Field, "Field").$$render(
		$$result,
		{
			field: {
				id: randomString(),
				label: "Select Action",
				helperText: "What should happen when all or some of your rules are matched.",
				value: {
					type: "local",
					value: field.logic?.action
				},
				type: "combobox",
				required: true,
				configFieldTarget: "logic.action",
				configTarget: field.id,
				options: { type: "local", value: actions }
			},
			padding: false
		},
		{},
		{}
	)}
<hr>
${validate_component(LogicRule, "LogicRule").$$render($$result, { field }, {}, {})}`;
});

/* src\features\form\edit\LogicAccordion.svelte generated by Svelte v3.24.1 */

const css$k = {
	code: ".accordionHeader.svelte-1jod1ik.svelte-1jod1ik{background-color:transparent;padding:0.25em 0.1em}.accordionCollapse.svelte-1jod1ik.svelte-1jod1ik{background-color:transparent}.card-body.svelte-1jod1ik.svelte-1jod1ik{padding-top:0.75em;padding-bottom:0.75em}.accordion.svelte-1jod1ik>.card.svelte-1jod1ik{overflow:visible}.accordion.svelte-1jod1ik .card.svelte-1jod1ik:hover{background-color:white}.card-body.svelte-1jod1ik.svelte-1jod1ik{padding-right:0.8em;padding-left:0.8em}",
	map: "{\"version\":3,\"file\":\"LogicAccordion.svelte\",\"sources\":[\"LogicAccordion.svelte\"],\"sourcesContent\":[\"<script lang=\\\"typescript\\\">import LogicBuilder from \\\"./LogicBuilder.svelte\\\";\\r\\n;\\r\\nexport let field;\\r\\n//# sourceMappingURL=LogicAccordion.svelte.js.map</script>\\r\\n\\r\\n\\r\\n        <div class=\\\"accordion mt-4\\\" id=\\\"accordionLogic\\\" style=\\\"margin-bottom: 1em;\\\">\\r\\n            <div class=\\\"card border-light mb-0\\\">\\r\\n                <div class=\\\"card-header accordionHeader\\\" id=\\\"headingOne\\\">\\r\\n                    <h2 class=\\\"mb-0\\\">\\r\\n                        <button class=\\\"btn btn-link btn-block d-flex justify-content-between text-left\\\" type=\\\"button\\\" data-toggle=\\\"collapse\\\" data-target=\\\"#collapseOne\\\" aria-expanded=\\\"false\\\" aria-controls=\\\"collapseOne\\\">\\r\\n                            <span class=\\\"h6 mb-0 font-weight-bold\\\">Logic</span>\\r\\n                            <span class=\\\"icon\\\"><span class=\\\"fas fa-plus\\\" style=\\\"font-size: 1em;\\\"></span></span>\\r\\n                        </button>\\r\\n                    </h2>\\r\\n                </div>\\r\\n                    <div id=\\\"collapseOne\\\" class=\\\"collapse accordionCollapse\\\" aria-labelledby=\\\"headingOne\\\" data-parent=\\\"#accordionLogic\\\">\\r\\n                    <div class=\\\"card-body\\\">\\r\\n                        <p class=\\\"mb-0\\\">\\r\\n                            <LogicBuilder field={field}/>\\r\\n                        </p>\\r\\n                    </div>\\r\\n                </div>\\r\\n            </div>\\r\\n        </div>\\r\\n\\r\\n<style>\\r\\n    .accordionHeader{\\r\\n        background-color: transparent;\\r\\n        padding: 0.25em 0.1em;\\r\\n    }\\r\\n    /*border-bottom: 0rem solid rgba(23, 31, 56, 0.125);*/\\r\\n    .accordionCollapse{\\r\\n        background-color: transparent;\\r\\n    }\\r\\n    .card-body{\\r\\n        padding-top: 0.75em;\\r\\n        padding-bottom: 0.75em;\\r\\n    }\\r\\n\\r\\n    .accordion > .card {\\r\\n        overflow: visible;\\r\\n    }\\r\\n\\r\\n    .accordion .card:hover {\\r\\n        background-color: white;\\r\\n    }\\r\\n\\r\\n    .card-body{\\r\\n        padding-right: 0.8em;\\r\\n        padding-left: 0.8em;\\r\\n    }\\r\\n</style>\\r\\n\\r\\n\"],\"names\":[],\"mappings\":\"AA2BI,8CAAgB,CAAC,AACb,gBAAgB,CAAE,WAAW,CAC7B,OAAO,CAAE,MAAM,CAAC,KAAK,AACzB,CAAC,AAED,gDAAkB,CAAC,AACf,gBAAgB,CAAE,WAAW,AACjC,CAAC,AACD,wCAAU,CAAC,AACP,WAAW,CAAE,MAAM,CACnB,cAAc,CAAE,MAAM,AAC1B,CAAC,AAED,yBAAU,CAAG,KAAK,eAAC,CAAC,AAChB,QAAQ,CAAE,OAAO,AACrB,CAAC,AAED,yBAAU,CAAC,oBAAK,MAAM,AAAC,CAAC,AACpB,gBAAgB,CAAE,KAAK,AAC3B,CAAC,AAED,wCAAU,CAAC,AACP,aAAa,CAAE,KAAK,CACpB,YAAY,CAAE,KAAK,AACvB,CAAC\"}"
};

const LogicAccordion = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	
	let { field } = $$props;
	if ($$props.field === void 0 && $$bindings.field && field !== void 0) $$bindings.field(field);
	$$result.css.add(css$k);

	return `<div class="${"accordion mt-4 svelte-1jod1ik"}" id="${"accordionLogic"}" style="${"margin-bottom: 1em;"}"><div class="${"card border-light mb-0 svelte-1jod1ik"}"><div class="${"card-header accordionHeader svelte-1jod1ik"}" id="${"headingOne"}"><h2 class="${"mb-0"}"><button class="${"btn btn-link btn-block d-flex justify-content-between text-left"}" type="${"button"}" data-toggle="${"collapse"}" data-target="${"#collapseOne"}" aria-expanded="${"false"}" aria-controls="${"collapseOne"}"><span class="${"h6 mb-0 font-weight-bold"}">Logic</span>
                            <span class="${"icon"}"><span class="${"fas fa-plus"}" style="${"font-size: 1em;"}"></span></span></button></h2></div>
                    <div id="${"collapseOne"}" class="${"collapse accordionCollapse svelte-1jod1ik"}" aria-labelledby="${"headingOne"}" data-parent="${"#accordionLogic"}"><div class="${"card-body svelte-1jod1ik"}"><p class="${"mb-0"}">${validate_component(LogicBuilder$1, "LogicBuilder").$$render($$result, { field }, {}, {})}</p></div></div></div>
        </div>`;
});

/* src\features\form\edit\ContentBlockEditor.svelte generated by Svelte v3.24.1 */

const css$l = {
	code: ".blocks-button.svelte-ps6so1{margin-top:0.8em}",
	map: "{\"version\":3,\"file\":\"ContentBlockEditor.svelte\",\"sources\":[\"ContentBlockEditor.svelte\"],\"sourcesContent\":[\"<script lang=\\\"typescript\\\">;\\r\\n;\\r\\nimport Field from \\\"./Field.svelte\\\";\\r\\nimport { randomString } from \\\"util/Generate\\\";\\r\\nimport { dispatch } from \\\"event/EventBus\\\";\\r\\nimport ContentBlockList from \\\"./ContentBlockList.svelte\\\";\\r\\nexport let field;\\r\\nexport let expanded;\\r\\nfunction manageBlocks() {\\r\\n    dispatch(\\\"dialog_show\\\", {\\r\\n        child: ContentBlockList,\\r\\n        closeOnOutsideClick: false,\\r\\n        confirmCloseOnDirty: true,\\r\\n        title: \\\"Manage Content Blocks\\\",\\r\\n        save: false,\\r\\n    });\\r\\n}\\r\\nfunction loadTransformer(value) {\\r\\n    return value.map((v) => {\\r\\n        return {\\r\\n            label: v.name,\\r\\n            value: v.value,\\r\\n        };\\r\\n    });\\r\\n}\\r\\n//# sourceMappingURL=ContentBlockEditor.svelte.js.map</script>\\r\\n\\r\\n<div>\\r\\n<div style=\\\"padding-left: 0.5em;\\\">\\r\\n    <h5 style=\\\"padding-bottom: 0.2em;\\\">Content Block Settings</h5>\\r\\n    <hr />\\r\\n</div>\\r\\n<Field\\r\\n        editor={true}\\r\\n        padding={false}\\r\\n        field={{\\r\\n            id : randomString(),\\r\\n            type : 'block-editor',\\r\\n            value : field.value,\\r\\n            configTarget: field.id,\\r\\n            configFieldTarget : 'value'\\r\\n        }}/>\\r\\n    <div class=\\\"flex\\\">\\r\\n        <button class=\\\"blocks-button btn btn-light\\\" type=\\\"button\\\">\\r\\n            Select Block\\r\\n        </button>\\r\\n        <button class=\\\"blocks-button btn btn-light\\\" type=\\\"button\\\">\\r\\n            Save Block\\r\\n        </button>\\r\\n    </div>\\r\\n</div>\\r\\n\\r\\n<style>\\r\\n    .blocks-button {\\r\\n        margin-top: 0.8em;\\r\\n    }\\r\\n</style>\\r\\n\\r\\n\"],\"names\":[],\"mappings\":\"AAqDI,cAAc,cAAC,CAAC,AACZ,UAAU,CAAE,KAAK,AACrB,CAAC\"}"
};

const ContentBlockEditor = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	
	
	let { field } = $$props;
	let { expanded } = $$props;

	if ($$props.field === void 0 && $$bindings.field && field !== void 0) $$bindings.field(field);
	if ($$props.expanded === void 0 && $$bindings.expanded && expanded !== void 0) $$bindings.expanded(expanded);
	$$result.css.add(css$l);

	return `<div><div style="${"padding-left: 0.5em;"}"><h5 style="${"padding-bottom: 0.2em;"}">Content Block Settings</h5>
    <hr></div>
${validate_component(Field, "Field").$$render(
		$$result,
		{
			editor: true,
			padding: false,
			field: {
				id: randomString(),
				type: "block-editor",
				value: field.value,
				configTarget: field.id,
				configFieldTarget: "value"
			}
		},
		{},
		{}
	)}
    <div class="${"flex"}"><button class="${"blocks-button btn btn-light svelte-ps6so1"}" type="${"button"}">Select Block
        </button>
        <button class="${"blocks-button btn btn-light svelte-ps6so1"}" type="${"button"}">Save Block
        </button></div>
</div>`;
});

/* src\features\form\edit\GroupDetails.svelte generated by Svelte v3.24.1 */

const GroupDetails = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	
	let { field } = $$props;

	function getGroups() {
		var _a;
		let form = formStore.getForm();
		return (_a = form.groups) !== null && _a !== void 0 ? _a : [];
	}

	onMount(() => {
		
	});

	if ($$props.field === void 0 && $$bindings.field && field !== void 0) $$bindings.field(field);

	return `<div>${validate_component(Field, "Field").$$render(
		$$result,
		{
			config: { search: true },
			field: {
				id: randomString(),
				label: "Specify Group",
				helperText: "Link fields together via a group",
				value: { type: "local", value: field.groupId },
				type: "combobox",
				required: true,
				configFieldTarget: `groupId`,
				configTarget: field.id,
				options: { type: "local", value: getGroups }
			}
		},
		{},
		{}
	)}
<div class="${"d-flex bd-highlight justify-end"}" style="${"padding: .75em 0.6em;"}"><button target="${"_blank"}" class="${"btn btn-sm btn-outline-dark"}"><span class="${"fas fa-cog"}"></span>
    Group Settings
</button></div></div>`;
});

/* src\features\form\edit\GroupAccordion.svelte generated by Svelte v3.24.1 */

const css$m = {
	code: ".accordionHeader.svelte-12yv0lm.svelte-12yv0lm{background-color:transparent;padding:0.25em 0.1em}.accordionCollapse.svelte-12yv0lm.svelte-12yv0lm{background-color:transparent}.card-body.svelte-12yv0lm.svelte-12yv0lm{padding-top:0.75em;padding-bottom:0.75em}.accordion.svelte-12yv0lm>.card.svelte-12yv0lm{overflow:visible}.accordion.svelte-12yv0lm .card.svelte-12yv0lm:hover{background-color:white}.card-body.svelte-12yv0lm.svelte-12yv0lm{padding-right:0.8em;padding-left:0.8em}",
	map: "{\"version\":3,\"file\":\"GroupAccordion.svelte\",\"sources\":[\"GroupAccordion.svelte\"],\"sourcesContent\":[\"<script lang=\\\"typescript\\\">import LogicBuilder from './LogicBuilder.svelte';\\r\\n;\\r\\nimport GroupDetails from './GroupDetails.svelte';\\r\\nimport { firstNotEmpty } from 'util/Format';\\r\\nimport { dispatchSingle } from 'event/EventBus';\\r\\nexport let field;\\r\\n//# sourceMappingURL=GroupAccordion.svelte.js.map</script>\\r\\n\\r\\n<div class=\\\"accordion\\\" id=\\\"accordionGroup\\\" style=\\\"margin-bottom: 3rem;\\\">\\r\\n  <div class=\\\"card border-light mb-0\\\">\\r\\n    <div class=\\\"card-header accordionHeader\\\" id=\\\"headingTwo\\\">\\r\\n      <h2 class=\\\"mb-0\\\">\\r\\n        <button\\r\\n          class=\\\"btn btn-link btn-block d-flex justify-content-between text-left\\\"\\r\\n          type=\\\"button\\\"\\r\\n          data-toggle=\\\"collapse\\\"\\r\\n          data-target=\\\"#collapseTwo\\\"\\r\\n          aria-expanded=\\\"false\\\"\\r\\n          aria-controls=\\\"collapseTwo\\\">\\r\\n          <span class=\\\"h6 mb-0 font-weight-bold\\\">Group</span>\\r\\n          <span class=\\\"icon\\\">\\r\\n            <span class=\\\"fas fa-plus\\\" style=\\\"font-size: 1em;\\\" />\\r\\n          </span>\\r\\n        </button>\\r\\n      </h2>\\r\\n    </div>\\r\\n    <div id=\\\"collapseTwo\\\" class=\\\"collapse accordionCollapse\\\" aria-labelledby=\\\"headingTwo\\\" data-parent=\\\"#accordionGroup\\\">\\r\\n      <div class=\\\"card-body\\\">\\r\\n        <p class=\\\"mb-0\\\">\\r\\n          <GroupDetails {field} />\\r\\n        </p>\\r\\n      </div>\\r\\n    </div>\\r\\n  </div>\\r\\n</div>\\r\\n\\r\\n<style>\\r\\n  .accordionHeader {\\r\\n    background-color: transparent;\\r\\n    padding: 0.25em 0.1em;\\r\\n  }\\r\\n  /*border-bottom: 0rem solid rgba(23, 31, 56, 0.125);*/\\r\\n  .accordionCollapse {\\r\\n    background-color: transparent;\\r\\n  }\\r\\n  .card-body {\\r\\n    padding-top: 0.75em;\\r\\n    padding-bottom: 0.75em;\\r\\n  }\\r\\n\\r\\n  .accordion > .card {\\r\\n    overflow: visible;\\r\\n  }\\r\\n\\r\\n  .accordion .card:hover {\\r\\n    background-color: white;\\r\\n  }\\r\\n\\r\\n  .card-body {\\r\\n    padding-right: 0.8em;\\r\\n    padding-left: 0.8em;\\r\\n  }\\r\\n</style>\\r\\n\"],\"names\":[],\"mappings\":\"AAqCE,gBAAgB,8BAAC,CAAC,AAChB,gBAAgB,CAAE,WAAW,CAC7B,OAAO,CAAE,MAAM,CAAC,KAAK,AACvB,CAAC,AAED,kBAAkB,8BAAC,CAAC,AAClB,gBAAgB,CAAE,WAAW,AAC/B,CAAC,AACD,UAAU,8BAAC,CAAC,AACV,WAAW,CAAE,MAAM,CACnB,cAAc,CAAE,MAAM,AACxB,CAAC,AAED,yBAAU,CAAG,KAAK,eAAC,CAAC,AAClB,QAAQ,CAAE,OAAO,AACnB,CAAC,AAED,yBAAU,CAAC,oBAAK,MAAM,AAAC,CAAC,AACtB,gBAAgB,CAAE,KAAK,AACzB,CAAC,AAED,UAAU,8BAAC,CAAC,AACV,aAAa,CAAE,KAAK,CACpB,YAAY,CAAE,KAAK,AACrB,CAAC\"}"
};

const GroupAccordion = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	
	let { field } = $$props;
	if ($$props.field === void 0 && $$bindings.field && field !== void 0) $$bindings.field(field);
	$$result.css.add(css$m);

	return `<div class="${"accordion svelte-12yv0lm"}" id="${"accordionGroup"}" style="${"margin-bottom: 3rem;"}"><div class="${"card border-light mb-0 svelte-12yv0lm"}"><div class="${"card-header accordionHeader svelte-12yv0lm"}" id="${"headingTwo"}"><h2 class="${"mb-0"}"><button class="${"btn btn-link btn-block d-flex justify-content-between text-left"}" type="${"button"}" data-toggle="${"collapse"}" data-target="${"#collapseTwo"}" aria-expanded="${"false"}" aria-controls="${"collapseTwo"}"><span class="${"h6 mb-0 font-weight-bold"}">Group</span>
          <span class="${"icon"}"><span class="${"fas fa-plus"}" style="${"font-size: 1em;"}"></span></span></button></h2></div>
    <div id="${"collapseTwo"}" class="${"collapse accordionCollapse svelte-12yv0lm"}" aria-labelledby="${"headingTwo"}" data-parent="${"#accordionGroup"}"><div class="${"card-body svelte-12yv0lm"}"><p class="${"mb-0"}">${validate_component(GroupDetails, "GroupDetails").$$render($$result, { field }, {}, {})}</p></div></div></div>
</div>`;
});

/* src\features\form\edit\FieldEdit.svelte generated by Svelte v3.24.1 */

const FieldEdit = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	
	
	let { field } = $$props;
	let { config = {} } = $$props;
	let cantBeRequired = ["switch"];
	if ($$props.field === void 0 && $$bindings.field && field !== void 0) $$bindings.field(field);
	if ($$props.config === void 0 && $$bindings.config && config !== void 0) $$bindings.config(config);

	return `<div><div style="${"max-height: 95vh; overflow: auto;"}">${field.type === "spacer"
	? `${validate_component(Field, "Field").$$render(
			$$result,
			{
				field: {
					id: randomString(),
					label: "Increase value to add more spacing between the previous and next field.",
					required: true,
					value: field.value ?? 1,
					type: "number",
					configFieldTarget: "value",
					configTarget: field.id
				}
			},
			{},
			{}
		)}`
	: `${field.type === "block"
		? `${validate_component(ContentBlockEditor, "ContentBlockEditor").$$render($$result, { field, expanded: field.expanded }, {}, {})}`
		: `<div style="${"padding-left: 0.5em;"}"><h5 style="${"padding-bottom: 0.2em;"}">Field Settings</h5>
        <hr></div>
      <div${add_attribute("id", `field-button-${field.id}`, 0)}>${!cantBeRequired.includes(field.type)
			? `${validate_component(Field, "Field").$$render(
					$$result,
					{
						config: { search: false },
						field: {
							id: randomString(),
							customCss: "padding-bottom: 0em;",
							label: "Required",
							value: { type: "local", value: field.required },
							type: "switch",
							configFieldTarget: "required",
							configTarget: field.id,
							options: {
								type: "local",
								value: [{ label: "Yes", value: true }, { label: "No", value: false }]
							}
						}
					},
					{},
					{}
				)}`
			: ``}
        ${validate_component(Field, "Field").$$render(
				$$result,
				{
					field: {
						id: randomString(),
						label: "Name",
						required: true,
						value: field.name,
						type: "string",
						configFieldTarget: "name",
						configTarget: field.id
					}
				},
				{},
				{}
			)}
        ${validate_component(Field, "Field").$$render(
				$$result,
				{
					field: {
						id: randomString(),
						label: "Label",
						value: field.label,
						type: "string",
						configFieldTarget: "label",
						configTarget: field.id
					}
				},
				{},
				{}
			)}
        ${validate_component(Field, "Field").$$render(
				$$result,
				{
					field: {
						id: randomString(),
						label: "Helper Text",
						value: field.helperText,
						type: "string",
						configFieldTarget: "helperText",
						configTarget: field.id
					}
				},
				{},
				{}
			)}
        ${validate_component(Field, "Field").$$render(
				$$result,
				{
					field: {
						id: randomString(),
						label: "Field Type",
						value: { type: "local", value: field.type },
						type: "combobox",
						required: true,
						configFieldTarget: "type",
						configTarget: field.id,
						options: {
							type: "remote",
							value: "http://localhost:8080/field-types.json"
						}
					}
				},
				{},
				{}
			)}
        ${validate_component(FieldTypeEditor, "FieldTypeEditor").$$render($$result, { field }, {}, {})}</div>`}`}
    ${validate_component(LogicAccordion, "LogicAccordion").$$render($$result, { field }, {}, {})}
    ${validate_component(GroupAccordion, "GroupAccordion").$$render($$result, { field }, {}, {})}</div></div>`;
});

/* src\features\form\edit\FormSidebar.svelte generated by Svelte v3.24.1 */

const css$n = {
	code: ".block.svelte-1ture1{margin-bottom:1em;cursor:pointer}.save-button.svelte-1ture1{width:94%;height:40px;padding:0 0;margin-bottom:1.2em;margin-left:-6px}.h6.svelte-1ture1{font-weight:400}.pl-3.svelte-1ture1{padding-left:0.7rem !important}",
	map: "{\"version\":3,\"file\":\"FormSidebar.svelte\",\"sources\":[\"FormSidebar.svelte\"],\"sourcesContent\":[\"<script lang=\\\"typescript\\\">var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\\r\\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\\r\\n    return new (P || (P = Promise))(function (resolve, reject) {\\r\\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\\r\\n        function rejected(value) { try { step(generator[\\\"throw\\\"](value)); } catch (e) { reject(e); } }\\r\\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\\r\\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\\r\\n    });\\r\\n};\\r\\nimport { dispatch, subscribe } from 'event/EventBus';\\r\\nimport { flip } from 'svelte/animate';\\r\\nimport { randomString } from 'util/Generate';\\r\\nimport { onMount, tick } from 'svelte';\\r\\nimport FieldEdit from './FieldEdit.svelte';\\r\\nimport { slide } from 'svelte/transition';\\r\\nimport { subscribeFieldChange } from 'event/FieldEvent';\\r\\nimport { fastClone } from 'util/Compare';\\r\\nimport { transformDraggedElement } from './util/Draggable';\\r\\nimport { debounce } from 'util/Debounce';\\r\\nlet saving = false;\\r\\nlet drake = null;\\r\\nlet dragula;\\r\\nfunction defaultBlocks() {\\r\\n    return [\\r\\n        { name: 'string' },\\r\\n        { name: 'switch' },\\r\\n        { name: 'spacer' },\\r\\n        { name: 'date' },\\r\\n        { name: 'block' },\\r\\n        { name: 'file' },\\r\\n        { name: 'address' },\\r\\n        { name: 'checkbox-group' },\\r\\n        { name: 'radio-group' },\\r\\n        { name: 'full-name' },\\r\\n    ];\\r\\n}\\r\\nlet blocks = defaultBlocks();\\r\\nconst loadDragula = debounce(() => __awaiter(void 0, void 0, void 0, function* () {\\r\\n    if (!dragula) {\\r\\n        dragula = (yield import('dragula')).default;\\r\\n        yield tick();\\r\\n    }\\r\\n    if (drake) {\\r\\n        drake.destroy();\\r\\n    }\\r\\n    yield tick();\\r\\n    drake = dragula([document.querySelector('#block-container'), document.querySelector('#form-preview-fields')], {\\r\\n        copy: function (el, source) {\\r\\n            return source === document.getElementById('block-container');\\r\\n        },\\r\\n        accepts: function (el, target) {\\r\\n            return target !== document.getElementById('block-container');\\r\\n        },\\r\\n    })\\r\\n        .on('drag', function (el) {\\r\\n        var _a;\\r\\n        if (el.id && el.id.startsWith('form-field-')) {\\r\\n            return;\\r\\n        }\\r\\n        const container = document.getElementById('form-preview-fields');\\r\\n        if (container && !((_a = container.className) === null || _a === void 0 ? void 0 : _a.includes('ex-over'))) {\\r\\n            container.className += ' ex-over';\\r\\n        }\\r\\n    })\\r\\n        .on('over', function (el, container) {\\r\\n        var _a;\\r\\n        if (el.id && el.id.startsWith('form-field-')) {\\r\\n            return;\\r\\n        }\\r\\n        if (container.id === 'form-preview-fields' && !((_a = container.className) === null || _a === void 0 ? void 0 : _a.includes('ex-over'))) {\\r\\n            container.className += ' ex-over';\\r\\n        }\\r\\n        dispatch('drag_over', container);\\r\\n    })\\r\\n        .on('drop', function (el) {\\r\\n        console.log('drop');\\r\\n        const container = document.getElementById('form-preview-fields');\\r\\n        if (container) {\\r\\n            container.className = container.className.replace('ex-over', '');\\r\\n        }\\r\\n        const fields = Array.from(document.querySelector('#form-preview-fields').childNodes).filter((w) => { var _a, _b; return ((_a = w.id) === null || _a === void 0 ? void 0 : _a.startsWith('sidebar-block')) || ((_b = w.id) === null || _b === void 0 ? void 0 : _b.startsWith('form-field-')); });\\r\\n        dispatch('drag_finished', fields);\\r\\n        el.remove();\\r\\n        setTimeout(() => {\\r\\n            drake.destroy();\\r\\n        }, 100);\\r\\n    });\\r\\n}), 500);\\r\\nfunction addField(block) {\\r\\n    dispatch('add_field', {\\r\\n        type: block.name,\\r\\n    });\\r\\n}\\r\\nfunction saveDraft() {\\r\\n    return __awaiter(this, void 0, void 0, function* () {\\r\\n        saving = true;\\r\\n        yield dispatch('save_form', {\\r\\n            status: 'draft',\\r\\n        });\\r\\n        saving = false;\\r\\n    });\\r\\n}\\r\\nfunction saveAndPublish() { }\\r\\nonMount(() => __awaiter(void 0, void 0, void 0, function* () {\\r\\n    import('dragula/dist/dragula.css');\\r\\n    subscribe('form_updated', () => {\\r\\n        loadDragula();\\r\\n    });\\r\\n}));\\r\\n//# sourceMappingURL=FormSidebar.svelte.js.map</script>\\r\\n\\r\\n<div style=\\\"text-align:center;\\\">\\r\\n  {#if saving}\\r\\n    <button class=\\\"btn save-button btn-primary\\\" type=\\\"button\\\" disabled>Saving...</button>\\r\\n  {:else}<button class=\\\"btn save-button btn-primary\\\" type=\\\"button\\\" on:click={saveDraft}>Save Form</button>{/if}\\r\\n</div>\\r\\n<div style=\\\"padding-left: 0.2em;\\\">\\r\\n  <h5 style=\\\"\\\">Add Field</h5>\\r\\n  <hr style=\\\"margin-right: 0.7em !important;\\\" />\\r\\n  <div id=\\\"block-container\\\">\\r\\n    {#each blocks as block}\\r\\n      {#if block.name === 'string'}\\r\\n        <div class=\\\"d-flex px-2 block\\\" id={'sidebar-block-' + block.name}>\\r\\n          <div>\\r\\n            <div class=\\\"icon icon-sm icon-secondary\\\"><span class=\\\"fas fas fa-i-cursor\\\" /></div>\\r\\n          </div>\\r\\n          <div class=\\\"pl-3\\\">\\r\\n            <h6 class=\\\"h6\\\">Text Input</h6>\\r\\n          </div>\\r\\n        </div>\\r\\n      {:else if block.name === 'spacer'}\\r\\n        <div class=\\\"d-flex px-2 block\\\" id={'sidebar-block-' + block.name}>\\r\\n          <div>\\r\\n            <div class=\\\"icon icon-sm icon-secondary\\\"><span class=\\\"fas fa-rocket\\\" /></div>\\r\\n          </div>\\r\\n          <div class=\\\"pl-3\\\">\\r\\n            <h6 class=\\\"h6\\\">Spacer</h6>\\r\\n          </div>\\r\\n        </div>\\r\\n      {:else if block.name === 'switch'}\\r\\n        <div class=\\\"d-flex px-2 block\\\" id={'sidebar-block-' + block.name}>\\r\\n          <div>\\r\\n            <div class=\\\"icon icon-sm icon-secondary\\\"><span class=\\\"fas fa-toggle-off\\\" /></div>\\r\\n          </div>\\r\\n          <div class=\\\"pl-3\\\">\\r\\n            <h6 class=\\\"h6\\\">Toggle</h6>\\r\\n          </div>\\r\\n        </div>\\r\\n      {:else if block.name === 'combobox'}\\r\\n        <div class=\\\"d-flex px-2 block\\\" id={'sidebar-block-' + block.name}>\\r\\n          <div>\\r\\n            <div class=\\\"icon icon-sm icon-secondary\\\"><span class=\\\"far fa-caret-square-down\\\" /></div>\\r\\n          </div>\\r\\n          <div class=\\\"pl-3\\\">\\r\\n            <h6 class=\\\"h6\\\">Dropdown</h6>\\r\\n          </div>\\r\\n        </div>\\r\\n      {:else if block.name === 'block'}\\r\\n        <div class=\\\"d-flex px-2 block\\\" id={'sidebar-block-' + block.name}>\\r\\n          <div>\\r\\n            <div class=\\\"icon icon-sm icon-secondary\\\"><span class=\\\"fas fa-indent\\\" /></div>\\r\\n          </div>\\r\\n          <div class=\\\"pl-3\\\">\\r\\n            <h6 class=\\\"h6\\\">Content</h6>\\r\\n          </div>\\r\\n        </div>\\r\\n      {:else if block.name === 'date'}\\r\\n        <div class=\\\"d-flex px-2 block\\\" id={'sidebar-block-' + block.name}>\\r\\n          <div>\\r\\n            <div class=\\\"icon icon-sm icon-secondary\\\"><span class=\\\"fas fa-calendar-day\\\" /></div>\\r\\n          </div>\\r\\n          <div class=\\\"pl-3\\\">\\r\\n            <h6 class=\\\"h6\\\">Date</h6>\\r\\n          </div>\\r\\n        </div>\\r\\n      {:else if block.name === 'file'}\\r\\n        <div class=\\\"d-flex px-2 block\\\" id={'sidebar-block-' + block.name}>\\r\\n          <div>\\r\\n            <div class=\\\"icon icon-sm icon-secondary\\\"><span class=\\\"fas fa-file-upload\\\" /></div>\\r\\n          </div>\\r\\n          <div class=\\\"pl-3\\\">\\r\\n            <h6 class=\\\"h6\\\">File Upload</h6>\\r\\n          </div>\\r\\n        </div>\\r\\n      {:else if block.name === 'address'}\\r\\n        <div class=\\\"d-flex px-2 block\\\" id={'sidebar-block-' + block.name}>\\r\\n          <div>\\r\\n            <div class=\\\"icon icon-sm icon-secondary\\\"><span class=\\\"far fa-address-card\\\" /></div>\\r\\n          </div>\\r\\n          <div class=\\\"pl-3\\\">\\r\\n            <h6 class=\\\"h6\\\">Address Block</h6>\\r\\n          </div>\\r\\n        </div>\\r\\n      {:else if block.name === 'full-name'}\\r\\n        <div class=\\\"d-flex px-2 block\\\" id={'sidebar-block-' + block.name}>\\r\\n          <div>\\r\\n            <div class=\\\"icon icon-sm icon-secondary\\\"><span class=\\\"far fa-address-card\\\" /></div>\\r\\n          </div>\\r\\n          <div class=\\\"pl-3\\\">\\r\\n            <h6 class=\\\"h6\\\">Full Name</h6>\\r\\n          </div>\\r\\n        </div>\\r\\n      {:else if block.name === 'checkbox-group'}\\r\\n        <div class=\\\"d-flex px-2 block\\\" id={'sidebar-block-' + block.name}>\\r\\n          <div>\\r\\n            <div class=\\\"icon icon-sm icon-secondary\\\"><span class=\\\"far fa-check-square\\\" /></div>\\r\\n          </div>\\r\\n          <div class=\\\"pl-3\\\">\\r\\n            <h6 class=\\\"h6\\\">Checkboxes</h6>\\r\\n          </div>\\r\\n        </div>\\r\\n      {:else if block.name === 'radio-group'}\\r\\n        <div class=\\\"d-flex px-2 block\\\" id={'sidebar-block-' + block.name}>\\r\\n          <div>\\r\\n            <div class=\\\"icon icon-sm icon-secondary\\\"><span class=\\\"fas fa-dot-circle\\\" /></div>\\r\\n          </div>\\r\\n          <div class=\\\"pl-3\\\">\\r\\n            <h6 class=\\\"h6\\\">Radio Buttons</h6>\\r\\n          </div>\\r\\n        </div>\\r\\n      {/if}\\r\\n    {/each}\\r\\n  </div>\\r\\n\\r\\n  <div class=\\\"d-flex px-2 collapsed\\\" href=\\\"#submenu-app\\\" data-toggle=\\\"collapse\\\" data-target=\\\"#submenu-app\\\" aria-expanded=\\\"false\\\">\\r\\n    <div>\\r\\n      <div class=\\\"icon icon-sm icon-secondary\\\"><span class=\\\"fas fa-palette\\\" /></div>\\r\\n    </div>\\r\\n    <div class=\\\"pl-3\\\">\\r\\n      <h6 class=\\\"h6\\\">Styling</h6>\\r\\n    </div>\\r\\n    <div class=\\\"pl-3\\\" />\\r\\n    <div>\\r\\n      <div class=\\\"icon icon-sm icon-secondary link-arrow\\\"><span class=\\\"fas fa-chevron-right\\\" style=\\\"font-size: 1em;\\\" /></div>\\r\\n    </div>\\r\\n  </div>\\r\\n  <div>\\r\\n    <div class=\\\"multi-level collapse\\\" role=\\\"list\\\" id=\\\"submenu-app\\\" aria-expanded=\\\"false\\\" style=\\\"padding-top:0.5em; padding-left: 1em;\\\">\\r\\n      <ul class=\\\"flex-column nav\\\">\\r\\n        <li class=\\\"nav-item\\\">\\r\\n          <a class=\\\"nav-link\\\" id=\\\"address\\\" href=\\\"#\\\" style=\\\"padding-left: 0em;\\\">\\r\\n            <div class=\\\"d-flex px-2 block\\\">\\r\\n              <div>\\r\\n                <div class=\\\"icon icon-sm icon-secondary\\\"><span class=\\\"fas fa-rocket\\\" /></div>\\r\\n              </div>\\r\\n              <div class=\\\"pl-3\\\">\\r\\n                <h6 class=\\\"h6\\\">Spacer</h6>\\r\\n              </div>\\r\\n            </div>\\r\\n          </a>\\r\\n        </li>\\r\\n      </ul>\\r\\n    </div>\\r\\n  </div>\\r\\n</div>\\r\\n\\r\\n<style>\\r\\n  .block {\\r\\n    margin-bottom: 1em;\\r\\n    cursor: pointer;\\r\\n  }\\r\\n\\r\\n  .save-button {\\r\\n    width: 94%;\\r\\n    height: 40px;\\r\\n    padding: 0 0;\\r\\n    margin-bottom: 1.2em;\\r\\n    margin-left: -6px;\\r\\n  }\\r\\n\\r\\n  .px-3 {\\r\\n    padding-left: 1em;\\r\\n  }\\r\\n\\r\\n  .h6 {\\r\\n    font-weight: 400;\\r\\n  }\\r\\n\\r\\n  .pl-3 {\\r\\n    padding-left: 0.7rem !important;\\r\\n  }\\r\\n</style>\\r\\n\"],\"names\":[],\"mappings\":\"AAiQE,MAAM,cAAC,CAAC,AACN,aAAa,CAAE,GAAG,CAClB,MAAM,CAAE,OAAO,AACjB,CAAC,AAED,YAAY,cAAC,CAAC,AACZ,KAAK,CAAE,GAAG,CACV,MAAM,CAAE,IAAI,CACZ,OAAO,CAAE,CAAC,CAAC,CAAC,CACZ,aAAa,CAAE,KAAK,CACpB,WAAW,CAAE,IAAI,AACnB,CAAC,AAMD,GAAG,cAAC,CAAC,AACH,WAAW,CAAE,GAAG,AAClB,CAAC,AAED,KAAK,cAAC,CAAC,AACL,YAAY,CAAE,MAAM,CAAC,UAAU,AACjC,CAAC\"}"
};

function defaultBlocks() {
	return [
		{ name: "string" },
		{ name: "switch" },
		{ name: "spacer" },
		{ name: "date" },
		{ name: "block" },
		{ name: "file" },
		{ name: "address" },
		{ name: "checkbox-group" },
		{ name: "radio-group" },
		{ name: "full-name" }
	];
}

const FormSidebar = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
		function adopt(value) {
			return value instanceof P
			? value
			: new P(function (resolve) {
						resolve(value);
					});
		}

		return new (P || (P = Promise))(function (resolve, reject) {
				function fulfilled(value) {
					try {
						step(generator.next(value));
					} catch(e) {
						reject(e);
					}
				}

				function rejected(value) {
					try {
						step(generator["throw"](value));
					} catch(e) {
						reject(e);
					}
				}

				function step(result) {
					result.done
					? resolve(result.value)
					: adopt(result.value).then(fulfilled, rejected);
				}

				step((generator = generator.apply(thisArg, _arguments || [])).next());
			});
	};
	let drake = null;
	let dragula;
	let blocks = defaultBlocks();

	const loadDragula = debounce(
		() => __awaiter(void 0, void 0, void 0, function* () {
			if (!dragula) {
				dragula = (yield Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require('dragula')); })).default;
				yield tick();
			}

			if (drake) {
				drake.destroy();
			}

			yield tick();

			drake = dragula(
				[
					document.querySelector("#block-container"),
					document.querySelector("#form-preview-fields")
				],
				{
					copy(el, source) {
						return source === document.getElementById("block-container");
					},
					accepts(el, target) {
						return target !== document.getElementById("block-container");
					}
				}
			).on("drag", function (el) {
				var _a;

				if (el.id && el.id.startsWith("form-field-")) {
					return;
				}

				const container = document.getElementById("form-preview-fields");

				if (container && !((_a = container.className) === null || _a === void 0
				? void 0
				: _a.includes("ex-over"))) {
					container.className += " ex-over";
				}
			}).on("over", function (el, container) {
				var _a;

				if (el.id && el.id.startsWith("form-field-")) {
					return;
				}

				if (container.id === "form-preview-fields" && !((_a = container.className) === null || _a === void 0
				? void 0
				: _a.includes("ex-over"))) {
					container.className += " ex-over";
				}

				dispatch("drag_over", container);
			}).on("drop", function (el) {
				console.log("drop");
				const container = document.getElementById("form-preview-fields");

				if (container) {
					container.className = container.className.replace("ex-over", "");
				}

				const fields = Array.from(document.querySelector("#form-preview-fields").childNodes).filter(w => {
					var _a, _b;

					return ((_a = w.id) === null || _a === void 0
					? void 0
					: _a.startsWith("sidebar-block")) || ((_b = w.id) === null || _b === void 0
					? void 0
					: _b.startsWith("form-field-"));
				});

				dispatch("drag_finished", fields);
				el.remove();

				setTimeout(
					() => {
						drake.destroy();
					},
					100
				);
			});
		}),
		500
	);

	onMount(() => __awaiter(void 0, void 0, void 0, function* () {
		Promise.resolve().then(function () { return require('./dragula-fecafae6.js'); });

		subscribe$1("form_updated", () => {
			loadDragula();
		});
	}));

	$$result.css.add(css$n);

	return `<div style="${"text-align:center;"}">${ `<button class="${"btn save-button btn-primary svelte-1ture1"}" type="${"button"}">Save Form</button>`}</div>
<div style="${"padding-left: 0.2em;"}"><h5 style="${""}">Add Field</h5>
  <hr style="${"margin-right: 0.7em !important;"}">
  <div id="${"block-container"}">${each(blocks, block => `${block.name === "string"
	? `<div class="${"d-flex px-2 block svelte-1ture1"}"${add_attribute("id", "sidebar-block-" + block.name, 0)}><div><div class="${"icon icon-sm icon-secondary"}"><span class="${"fas fas fa-i-cursor"}"></span></div></div>
          <div class="${"pl-3 svelte-1ture1"}"><h6 class="${"h6 svelte-1ture1"}">Text Input</h6></div>
        </div>`
	: `${block.name === "spacer"
		? `<div class="${"d-flex px-2 block svelte-1ture1"}"${add_attribute("id", "sidebar-block-" + block.name, 0)}><div><div class="${"icon icon-sm icon-secondary"}"><span class="${"fas fa-rocket"}"></span></div></div>
          <div class="${"pl-3 svelte-1ture1"}"><h6 class="${"h6 svelte-1ture1"}">Spacer</h6></div>
        </div>`
		: `${block.name === "switch"
			? `<div class="${"d-flex px-2 block svelte-1ture1"}"${add_attribute("id", "sidebar-block-" + block.name, 0)}><div><div class="${"icon icon-sm icon-secondary"}"><span class="${"fas fa-toggle-off"}"></span></div></div>
          <div class="${"pl-3 svelte-1ture1"}"><h6 class="${"h6 svelte-1ture1"}">Toggle</h6></div>
        </div>`
			: `${block.name === "combobox"
				? `<div class="${"d-flex px-2 block svelte-1ture1"}"${add_attribute("id", "sidebar-block-" + block.name, 0)}><div><div class="${"icon icon-sm icon-secondary"}"><span class="${"far fa-caret-square-down"}"></span></div></div>
          <div class="${"pl-3 svelte-1ture1"}"><h6 class="${"h6 svelte-1ture1"}">Dropdown</h6></div>
        </div>`
				: `${block.name === "block"
					? `<div class="${"d-flex px-2 block svelte-1ture1"}"${add_attribute("id", "sidebar-block-" + block.name, 0)}><div><div class="${"icon icon-sm icon-secondary"}"><span class="${"fas fa-indent"}"></span></div></div>
          <div class="${"pl-3 svelte-1ture1"}"><h6 class="${"h6 svelte-1ture1"}">Content</h6></div>
        </div>`
					: `${block.name === "date"
						? `<div class="${"d-flex px-2 block svelte-1ture1"}"${add_attribute("id", "sidebar-block-" + block.name, 0)}><div><div class="${"icon icon-sm icon-secondary"}"><span class="${"fas fa-calendar-day"}"></span></div></div>
          <div class="${"pl-3 svelte-1ture1"}"><h6 class="${"h6 svelte-1ture1"}">Date</h6></div>
        </div>`
						: `${block.name === "file"
							? `<div class="${"d-flex px-2 block svelte-1ture1"}"${add_attribute("id", "sidebar-block-" + block.name, 0)}><div><div class="${"icon icon-sm icon-secondary"}"><span class="${"fas fa-file-upload"}"></span></div></div>
          <div class="${"pl-3 svelte-1ture1"}"><h6 class="${"h6 svelte-1ture1"}">File Upload</h6></div>
        </div>`
							: `${block.name === "address"
								? `<div class="${"d-flex px-2 block svelte-1ture1"}"${add_attribute("id", "sidebar-block-" + block.name, 0)}><div><div class="${"icon icon-sm icon-secondary"}"><span class="${"far fa-address-card"}"></span></div></div>
          <div class="${"pl-3 svelte-1ture1"}"><h6 class="${"h6 svelte-1ture1"}">Address Block</h6></div>
        </div>`
								: `${block.name === "full-name"
									? `<div class="${"d-flex px-2 block svelte-1ture1"}"${add_attribute("id", "sidebar-block-" + block.name, 0)}><div><div class="${"icon icon-sm icon-secondary"}"><span class="${"far fa-address-card"}"></span></div></div>
          <div class="${"pl-3 svelte-1ture1"}"><h6 class="${"h6 svelte-1ture1"}">Full Name</h6></div>
        </div>`
									: `${block.name === "checkbox-group"
										? `<div class="${"d-flex px-2 block svelte-1ture1"}"${add_attribute("id", "sidebar-block-" + block.name, 0)}><div><div class="${"icon icon-sm icon-secondary"}"><span class="${"far fa-check-square"}"></span></div></div>
          <div class="${"pl-3 svelte-1ture1"}"><h6 class="${"h6 svelte-1ture1"}">Checkboxes</h6></div>
        </div>`
										: `${block.name === "radio-group"
											? `<div class="${"d-flex px-2 block svelte-1ture1"}"${add_attribute("id", "sidebar-block-" + block.name, 0)}><div><div class="${"icon icon-sm icon-secondary"}"><span class="${"fas fa-dot-circle"}"></span></div></div>
          <div class="${"pl-3 svelte-1ture1"}"><h6 class="${"h6 svelte-1ture1"}">Radio Buttons</h6></div>
        </div>`
											: ``}`}`}`}`}`}`}`}`}`}`}`)}</div>

  <div class="${"d-flex px-2 collapsed"}" href="${"#submenu-app"}" data-toggle="${"collapse"}" data-target="${"#submenu-app"}" aria-expanded="${"false"}"><div><div class="${"icon icon-sm icon-secondary"}"><span class="${"fas fa-palette"}"></span></div></div>
    <div class="${"pl-3 svelte-1ture1"}"><h6 class="${"h6 svelte-1ture1"}">Styling</h6></div>
    <div class="${"pl-3 svelte-1ture1"}"></div>
    <div><div class="${"icon icon-sm icon-secondary link-arrow"}"><span class="${"fas fa-chevron-right"}" style="${"font-size: 1em;"}"></span></div></div></div>
  <div><div class="${"multi-level collapse"}" role="${"list"}" id="${"submenu-app"}" aria-expanded="${"false"}" style="${"padding-top:0.5em; padding-left: 1em;"}"><ul class="${"flex-column nav"}"><li class="${"nav-item"}"><a class="${"nav-link"}" id="${"address"}" href="${"#"}" style="${"padding-left: 0em;"}"><div class="${"d-flex px-2 block svelte-1ture1"}"><div><div class="${"icon icon-sm icon-secondary"}"><span class="${"fas fa-rocket"}"></span></div></div>
              <div class="${"pl-3 svelte-1ture1"}"><h6 class="${"h6 svelte-1ture1"}">Spacer</h6></div></div></a></li></ul></div></div>
</div>`;
});

/* src\features\form\edit\FieldEditSidebar.svelte generated by Svelte v3.24.1 */

const FieldEditSidebar = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	
	
	let field;
	let fieldId;

	onMount(() => {
		subscribeFieldChange(newField => {
			if (newField.id === fieldId && !newField.selected) {
				field = undefined;
				fieldId = undefined;
				return;
			}

			if (newField.selected) {
				field = fastClone(newField);
				fieldId = field.id;
			}
		});
	});

	return `<div><div class="${"col-md no-gutters"}" style="${"padding-left: 0.55em; padding-right: 0.55em;"}">${field
	? `${each([field], f => `<div>${validate_component(FieldEdit, "FieldEdit").$$render($$result, { field: f }, {}, {})}
      </div>`)}`
	: `${validate_component(FormEdit, "FormEdit").$$render($$result, {}, {}, {})}`}</div></div>`;
});

/* src\components\Sidebar.svelte generated by Svelte v3.24.1 */

const css$o = {
	code: ".sidebar.svelte-1nmn5ly{padding-top:1em;min-height:100vh}",
	map: "{\"version\":3,\"file\":\"Sidebar.svelte\",\"sources\":[\"Sidebar.svelte\"],\"sourcesContent\":[\"<script lang=\\\"typescript\\\">\\\"use strict\\\";\\r\\n//# sourceMappingURL=Sidebar.svelte.js.map</script>\\r\\n\\r\\n<nav class=\\\"d-md-block sidebar collapse\\\" style=\\\"background-color: #f5f9fe;\\\" on:click|stopPropagation>\\r\\n  <div style=\\\"margin-left: .5em; margin-right: 0.5em;\\\">\\r\\n    <ul class=\\\"nav flex-column\\\" id=\\\"blocks\\\" style=\\\"padding-top: 0.5em;\\\">\\r\\n      <slot />\\r\\n    </ul>\\r\\n  </div>\\r\\n</nav>\\r\\n\\r\\n<style>\\r\\n  .sidebar {\\r\\n    padding-top: 1em;\\r\\n    min-height: 100vh;\\r\\n  }\\r\\n</style>\\r\\n\"],\"names\":[],\"mappings\":\"AAYE,QAAQ,eAAC,CAAC,AACR,WAAW,CAAE,GAAG,CAChB,UAAU,CAAE,KAAK,AACnB,CAAC\"}"
};

const Sidebar = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	$$result.css.add(css$o);

	return `<nav class="${"d-md-block sidebar collapse svelte-1nmn5ly"}" style="${"background-color: #f5f9fe;"}"><div style="${"margin-left: .5em; margin-right: 0.5em;"}"><ul class="${"nav flex-column"}" id="${"blocks"}" style="${"padding-top: 0.5em;"}">${$$slots.default ? $$slots.default({}) : ``}</ul></div>
</nav>`;
});

/* src\routes\builder\index.svelte generated by Svelte v3.24.1 */

const { Object: Object_1 } = globals;

const css$p = {
	code: ".main.svelte-sg77i1{height:100%;width:53%;margin-top:1em}.left-sidebar.svelte-sg77i1{width:15%;max-width:400px;height:100vh;overflow:auto;margin-left:-13px;position:-webkit-sticky;position:sticky;top:0}#main-container.svelte-sg77i1{display:flex;justify-content:space-between}.right-sidebar.svelte-sg77i1{width:32%;min-height:25vh;height:100%;margin-right:-30px;position:-webkit-sticky;position:sticky;top:0}",
	map: "{\"version\":3,\"file\":\"index.svelte\",\"sources\":[\"index.svelte\"],\"sourcesContent\":[\"<script lang=\\\"typescript\\\">var __rest = (this && this.__rest) || function (s, e) {\\r\\n    var t = {};\\r\\n    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)\\r\\n        t[p] = s[p];\\r\\n    if (s != null && typeof Object.getOwnPropertySymbols === \\\"function\\\")\\r\\n        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {\\r\\n            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))\\r\\n                t[p[i]] = s[p[i]];\\r\\n        }\\r\\n    return t;\\r\\n};\\r\\nimport 'dragula/dist/dragula.min.css';\\r\\nimport FormBuilder from 'features/form/edit/FormBuilder.svelte';\\r\\nimport FormSidebar from 'features/form/edit/FormSidebar.svelte';\\r\\nimport FieldEditSidebar from 'features/form/edit/FieldEditSidebar.svelte';\\r\\nimport { onMount } from 'svelte';\\r\\nimport { subscribe } from 'event/EventBus';\\r\\nimport Sidebar from 'components/Sidebar.svelte';\\r\\n;\\r\\nimport { getUrlParameter } from 'util/Http';\\r\\nlet rightSidebar;\\r\\nlet rightSidebarProps = {};\\r\\nonMount(() => {\\r\\n    rightSidebar = FieldEditSidebar;\\r\\n    subscribe('show_right_sidebar', (_a) => {\\r\\n        var { component } = _a, other = __rest(_a, [\\\"component\\\"]);\\r\\n        rightSidebar = component;\\r\\n        rightSidebarProps = other !== null && other !== void 0 ? other : {};\\r\\n    });\\r\\n});\\r\\n//# sourceMappingURL=index.svelte.js.map</script>\\r\\n\\r\\n<div class=\\\"container-fluid clearfix\\\" id=\\\"main-container\\\" style=\\\"margin-top: 3.9em;\\\">\\r\\n  <div class=\\\"left-sidebar\\\">\\r\\n    <Sidebar>\\r\\n      <FormSidebar />\\r\\n    </Sidebar>\\r\\n  </div>\\r\\n  <div class=\\\"main\\\">\\r\\n    <FormBuilder/>\\r\\n  </div>\\r\\n  <div class=\\\"right-sidebar\\\">\\r\\n    <Sidebar>\\r\\n      <svelte:component this={rightSidebar} {...rightSidebarProps} />\\r\\n    </Sidebar>\\r\\n  </div>\\r\\n</div>\\r\\n\\r\\n<style>\\r\\n  .main {\\r\\n    height: 100%;\\r\\n    width: 53%;\\r\\n    margin-top: 1em;\\r\\n  }\\r\\n\\r\\n  .left-sidebar {\\r\\n    width: 15%;\\r\\n    max-width: 400px;\\r\\n    height: 100vh;\\r\\n    overflow: auto;\\r\\n    margin-left: -13px;\\r\\n    position: -webkit-sticky;\\r\\n    position: sticky;\\r\\n    top: 0;\\r\\n  }\\r\\n  #main-container {\\r\\n    display: flex;\\r\\n    justify-content: space-between;\\r\\n  }\\r\\n\\r\\n  .right-sidebar {\\r\\n    width: 32%;\\r\\n    min-height: 25vh;\\r\\n    height: 100%;\\r\\n    margin-right: -30px;\\r\\n    position: -webkit-sticky;\\r\\n    position: sticky;\\r\\n    top: 0;\\r\\n  }\\r\\n</style>\\r\\n\"],\"names\":[],\"mappings\":\"AAiDE,KAAK,cAAC,CAAC,AACL,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,GAAG,CACV,UAAU,CAAE,GAAG,AACjB,CAAC,AAED,aAAa,cAAC,CAAC,AACb,KAAK,CAAE,GAAG,CACV,SAAS,CAAE,KAAK,CAChB,MAAM,CAAE,KAAK,CACb,QAAQ,CAAE,IAAI,CACd,WAAW,CAAE,KAAK,CAClB,QAAQ,CAAE,cAAc,CACxB,QAAQ,CAAE,MAAM,CAChB,GAAG,CAAE,CAAC,AACR,CAAC,AACD,eAAe,cAAC,CAAC,AACf,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,aAAa,AAChC,CAAC,AAED,cAAc,cAAC,CAAC,AACd,KAAK,CAAE,GAAG,CACV,UAAU,CAAE,IAAI,CAChB,MAAM,CAAE,IAAI,CACZ,YAAY,CAAE,KAAK,CACnB,QAAQ,CAAE,cAAc,CACxB,QAAQ,CAAE,MAAM,CAChB,GAAG,CAAE,CAAC,AACR,CAAC\"}"
};

const Builder = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	var __rest = undefined && undefined.__rest || function (s, e) {
		var t = {};
		for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];

		if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
			if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
		}

		return t;
	};

	
	let rightSidebar;
	let rightSidebarProps = {};

	onMount(() => {
		rightSidebar = FieldEditSidebar;

		subscribe$1("show_right_sidebar", _a => {
			var { component } = _a, other = __rest(_a, ["component"]);
			rightSidebar = component;
			rightSidebarProps = other !== null && other !== void 0 ? other : {};
		});
	});

	$$result.css.add(css$p);

	return `<div class="${"container-fluid clearfix svelte-sg77i1"}" id="${"main-container"}" style="${"margin-top: 3.9em;"}"><div class="${"left-sidebar svelte-sg77i1"}">${validate_component(Sidebar, "Sidebar").$$render($$result, {}, {}, {
		default: () => `${validate_component(FormSidebar, "FormSidebar").$$render($$result, {}, {}, {})}`
	})}</div>
  <div class="${"main svelte-sg77i1"}">${validate_component(FormBuilder, "FormBuilder").$$render($$result, {}, {}, {})}</div>
  <div class="${"right-sidebar svelte-sg77i1"}">${validate_component(Sidebar, "Sidebar").$$render($$result, {}, {}, {
		default: () => `${validate_component(rightSidebar || missing_component, "svelte:component").$$render($$result, Object_1.assign(rightSidebarProps), {}, {})}`
	})}</div>
</div>`;
});

var component_10 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': Builder
});

/* src\features\form\live\LiveField.svelte generated by Svelte v3.24.1 */

const css$q = {
	code: ".hidden.svelte-1ifx1we{display:none}",
	map: "{\"version\":3,\"file\":\"LiveField.svelte\",\"sources\":[\"LiveField.svelte\"],\"sourcesContent\":[\"<script lang=\\\"typescript\\\">var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\\r\\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\\r\\n    return new (P || (P = Promise))(function (resolve, reject) {\\r\\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\\r\\n        function rejected(value) { try { step(generator[\\\"throw\\\"](value)); } catch (e) { reject(e); } }\\r\\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\\r\\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\\r\\n    });\\r\\n};\\r\\n;\\r\\nexport let field;\\r\\nimport TextInput from 'inputs/TextInput.svelte';\\r\\nimport { onMount } from 'svelte';\\r\\nimport ComboBox from 'inputs/ComboBox.svelte';\\r\\nimport { LoadState } from 'models/LoadState';\\r\\nimport { FieldValueLoader } from 'loader/FieldValueLoader';\\r\\nimport Address from 'inputs/Address.svelte';\\r\\nimport TextArea from 'inputs/TextArea.svelte';\\r\\nimport Spacer from 'inputs/Spacer.svelte';\\r\\nimport formStore from 'store/FormStore';\\r\\nimport { fade } from 'svelte/transition';\\r\\nimport RichTextDisplay from 'inputs/RichTextDisplay.svelte';\\r\\nimport { dispatch } from 'event/EventBus';\\r\\nimport { subscribe } from 'event/EventBus';\\r\\nimport Switch from 'inputs/Switch.svelte';\\r\\nimport DatePicker from 'components/DatePicker.svelte';\\r\\nimport { firstNotEmpty } from 'util/Format';\\r\\nimport { subscribeFieldChange } from 'event/FieldEvent';\\r\\nimport { fastClone } from 'util/Compare';\\r\\nimport FileUpload from 'inputs/FileUpload.svelte';\\r\\nimport FullName from 'inputs/FullName.svelte';\\r\\nimport CheckboxGroup from 'inputs/CheckboxGroup.svelte';\\r\\nimport RadioGroup from 'inputs/RadioGroup.svelte';\\r\\nlet state = LoadState.NotStarted;\\r\\nlet value;\\r\\nlet lastValue;\\r\\nexport let config = {};\\r\\nexport let hidden = false;\\r\\nonMount(load);\\r\\nfunction load() {\\r\\n    var _a;\\r\\n    return __awaiter(this, void 0, void 0, function* () {\\r\\n        lastValue = field.value;\\r\\n        if (((_a = field.value) !== null && _a !== void 0 ? _a : field.defaultValue) != null) {\\r\\n            state = LoadState.Loading;\\r\\n            try {\\r\\n                const loader = new FieldValueLoader();\\r\\n                const result = yield loader.load(field);\\r\\n                value = result;\\r\\n                field.value = result;\\r\\n                formStore.set(field, {\\r\\n                    value: result,\\r\\n                    field: 'value',\\r\\n                    fromUser: false,\\r\\n                });\\r\\n                state = LoadState.Finished;\\r\\n            }\\r\\n            catch (e) {\\r\\n                console.error(e);\\r\\n                state = LoadState.Failed;\\r\\n            }\\r\\n        }\\r\\n    });\\r\\n}\\r\\n//# sourceMappingURL=LiveField.svelte.js.map</script>\\r\\n\\r\\n<div style=\\\"margin-top: .3em\\\" class:hidden>\\r\\n  <div style=\\\"padding: .75em 0.6em; border-radius: 1em;\\\">\\r\\n    {#if hidden}\\r\\n      <span />\\r\\n    {:else}\\r\\n      <div transition:fade={{ duration: 300 }}>\\r\\n        {#if field.type === 'address'}\\r\\n          <Address {field} {value} />\\r\\n        {:else if field.type === 'string'}\\r\\n          <TextInput {field} />\\r\\n        {:else if field.type === 'number'}\\r\\n          <TextInput {field} type={'number'} />\\r\\n        {:else if field.type === 'combobox'}\\r\\n          <ComboBox {field} {...config} />\\r\\n        {:else if field.type === 'block'}\\r\\n          <RichTextDisplay {field} />\\r\\n        {:else if field.type === 'block-editor'}\\r\\n          <TextArea {field} {...config} />\\r\\n        {:else if field.type === 'spacer'}\\r\\n          <Spacer {field} />\\r\\n        {:else if field.type === 'switch'}\\r\\n          <Switch {field} {...config} />\\r\\n        {:else if field.type === 'date'}\\r\\n          <DatePicker {field} {...config} />\\r\\n        {:else if field.type === 'file'}\\r\\n          <FileUpload {field} />\\r\\n        {:else if field.type === 'checkbox-group'}\\r\\n          <CheckboxGroup {field} />\\r\\n        {:else if field.type === 'radio-group'}\\r\\n          <RadioGroup {field} />\\r\\n        {:else if field.type === 'full-name'}\\r\\n          <FullName {field} {value} />\\r\\n        {/if}\\r\\n      </div>\\r\\n    {/if}\\r\\n  </div>\\r\\n</div>\\r\\n\\r\\n<style>\\r\\n  .hidden {\\r\\n    display: none;\\r\\n  }\\r\\n</style>\\r\\n\"],\"names\":[],\"mappings\":\"AAyGE,OAAO,eAAC,CAAC,AACP,OAAO,CAAE,IAAI,AACf,CAAC\"}"
};

const LiveField = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
		function adopt(value) {
			return value instanceof P
			? value
			: new P(function (resolve) {
						resolve(value);
					});
		}

		return new (P || (P = Promise))(function (resolve, reject) {
				function fulfilled(value) {
					try {
						step(generator.next(value));
					} catch(e) {
						reject(e);
					}
				}

				function rejected(value) {
					try {
						step(generator["throw"](value));
					} catch(e) {
						reject(e);
					}
				}

				function step(result) {
					result.done
					? resolve(result.value)
					: adopt(result.value).then(fulfilled, rejected);
				}

				step((generator = generator.apply(thisArg, _arguments || [])).next());
			});
	};

	
	let { field } = $$props;
	let state = LoadState.NotStarted;
	let value;
	let lastValue;
	let { config = {} } = $$props;
	let { hidden = false } = $$props;
	onMount(load);

	function load() {
		var _a;

		return __awaiter(this, void 0, void 0, function* () {
			lastValue = field.value;

			if (((_a = field.value) !== null && _a !== void 0
			? _a
			: field.defaultValue) != null) {
				state = LoadState.Loading;

				try {
					const loader = new FieldValueLoader();
					const result = yield loader.load(field);
					value = result;
					field.value = result;

					formStore.set(field, {
						value: result,
						field: "value",
						fromUser: false
					});

					state = LoadState.Finished;
				} catch(e) {
					console.error(e);
					state = LoadState.Failed;
				}
			}
		});
	}

	if ($$props.field === void 0 && $$bindings.field && field !== void 0) $$bindings.field(field);
	if ($$props.config === void 0 && $$bindings.config && config !== void 0) $$bindings.config(config);
	if ($$props.hidden === void 0 && $$bindings.hidden && hidden !== void 0) $$bindings.hidden(hidden);
	$$result.css.add(css$q);

	return `<div style="${"margin-top: .3em"}" class="${["svelte-1ifx1we", hidden ? "hidden" : ""].join(" ").trim()}"><div style="${"padding: .75em 0.6em; border-radius: 1em;"}">${hidden
	? `<span></span>`
	: `<div>${field.type === "address"
		? `${validate_component(Address, "Address").$$render($$result, { field, value }, {}, {})}`
		: `${field.type === "string"
			? `${validate_component(TextInput, "TextInput").$$render($$result, { field }, {}, {})}`
			: `${field.type === "number"
				? `${validate_component(TextInput, "TextInput").$$render($$result, { field, type: "number" }, {}, {})}`
				: `${field.type === "combobox"
					? `${validate_component(ComboBox, "ComboBox").$$render($$result, Object.assign({ field }, config), {}, {})}`
					: `${field.type === "block"
						? `${validate_component(RichTextDisplay, "RichTextDisplay").$$render($$result, { field }, {}, {})}`
						: `${field.type === "block-editor"
							? `${validate_component(TextArea, "TextArea").$$render($$result, Object.assign({ field }, config), {}, {})}`
							: `${field.type === "spacer"
								? `${validate_component(Spacer, "Spacer").$$render($$result, { field }, {}, {})}`
								: `${field.type === "switch"
									? `${validate_component(Switch, "Switch").$$render($$result, Object.assign({ field }, config), {}, {})}`
									: `${field.type === "date"
										? `${validate_component(DatePicker, "DatePicker").$$render($$result, Object.assign({ field }, config), {}, {})}`
										: `${field.type === "file"
											? `${validate_component(FileUpload, "FileUpload").$$render($$result, { field }, {}, {})}`
											: `${field.type === "checkbox-group"
												? `${validate_component(CheckboxGroup, "CheckboxGroup").$$render($$result, { field }, {}, {})}`
												: `${field.type === "radio-group"
													? `${validate_component(RadioGroup, "RadioGroup").$$render($$result, { field }, {}, {})}`
													: `${field.type === "full-name"
														? `${validate_component(FullName, "FullName").$$render($$result, { field, value }, {}, {})}`
														: ``}`}`}`}`}`}`}`}`}`}`}`}`}</div>`}</div>
</div>`;
});

/* src\features\form\live\LiveForm.svelte generated by Svelte v3.24.1 */

const LiveForm = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
		function adopt(value) {
			return value instanceof P
			? value
			: new P(function (resolve) {
						resolve(value);
					});
		}

		return new (P || (P = Promise))(function (resolve, reject) {
				function fulfilled(value) {
					try {
						step(generator.next(value));
					} catch(e) {
						reject(e);
					}
				}

				function rejected(value) {
					try {
						step(generator["throw"](value));
					} catch(e) {
						reject(e);
					}
				}

				function step(result) {
					result.done
					? resolve(result.value)
					: adopt(result.value).then(fulfilled, rejected);
				}

				step((generator = generator.apply(thisArg, _arguments || [])).next());
			});
	};

	
	
	let { form } = $$props;
	let { mode = "" } = $$props;
	let state = LoadState.NotStarted;

	subscribeFieldChange(updatedField => {
		if (!form || !form.fields) {
			return;
		}

		const index = form.fields.findIndex(w => w.id === updatedField.id);

		if (index === -1) {
			return;
		}

		form.fields[index].updated = !form.fields[index].updated;

		const fieldsWithRules = form.fields.filter(w => {
			if (!w.logic || !w.logic.rules) {
				return false;
			}

			const hasRule = w.logic.rules.find(rule => rule.field === updatedField.id);
			return hasRule != null;
		});

		for (let fieldWithRule of fieldsWithRules) {
			let ruleIndex = form.fields.findIndex(w => w.id === fieldWithRule.id);
			form.fields[ruleIndex].updated = !form.fields[ruleIndex].updated;
		}
	});

	function display(field) {
		if (!field.logic) {
			return true;
		}

		const builder = new LogicBuilder();
		return builder.evaluate(field);
	}

	if ($$props.form === void 0 && $$bindings.form && form !== void 0) $$bindings.form(form);
	if ($$props.mode === void 0 && $$bindings.mode && mode !== void 0) $$bindings.mode(mode);

	return `<div style="${"padding-left: 0.5em;"}"><h4>${escape(form.title ?? "Form Title")}</h4>
  <small class="${"text-gray-700"}">${escape(form.description ?? "")}</small>
  <hr></div>
<form><div style="${"padding-bottom: 1em"}">${each(form.fields, field => `${display(field)
	? `<div>${validate_component(LiveField, "LiveField").$$render($$result, { field: fastClone(field) }, {}, {})}
        </div>`
	: `<div>${validate_component(LiveField, "LiveField").$$render($$result, { field: fastClone(field), hidden: true }, {}, {})}
        </div>`}`)}</div>
  ${state === LoadState.NotStarted
	? `<button style="${"margin-left: 0.5em; margin-bottom: 2em"}" class="${"btn btn-primary"}" type="${"submit"}">Submit</button>`
	: `${state === LoadState.Failed
		? `<button style="${"margin-left: 0.5em; margin-bottom: 2em"}" class="${"btn btn-primary"}" type="${"submit"}">Failed to Submit, Click To Try Again</button>`
		: `${state === LoadState.Loading
			? `<button style="${"margin-left: 0.5em; margin-bottom: 2em"}" class="${"btn btn-primary"}" disabled>Submitting...</button>`
			: `${state === LoadState.Finished
				? `<button style="${"margin-left: 0.5em; margin-bottom: 2em"}" class="${"btn btn-primary"}" disabled>Submitted Successfully.</button>`
				: ``}`}`}`}
</form>`;
});

/* src\routes\preview\index.svelte generated by Svelte v3.24.1 */

var __awaiter$3 = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
	function adopt(value) {
		return value instanceof P
		? value
		: new P(function (resolve) {
					resolve(value);
				});
	}

	return new (P || (P = Promise))(function (resolve, reject) {
			function fulfilled(value) {
				try {
					step(generator.next(value));
				} catch(e) {
					reject(e);
				}
			}

			function rejected(value) {
				try {
					step(generator["throw"](value));
				} catch(e) {
					reject(e);
				}
			}

			function step(result) {
				result.done
				? resolve(result.value)
				: adopt(result.value).then(fulfilled, rejected);
			}

			step((generator = generator.apply(thisArg, _arguments || [])).next());
		});
};

function preload$2(page, session) {
	var _a;

	return __awaiter$3(this, void 0, void 0, function* () {
		const formId = getUrlParameter("formId");

		const mode = (_a = page.query) === null || _a === void 0
		? void 0
		: _a.mode;

		if (mode === "local") {
			return { mode };
		}

		if (!formId) {
			return {};
		}

		const url = `https://json-data.s3.us-west-002.backblazeb2.com/${formId}.json`;

		//@ts-ignore
		const res = yield this.fetch(url);

		const form = yield res.json();
		form.id = formId;
		formStore.setForm(form);
		dispatch("form_loaded", { form });
		return { form };
	});
}

const Preview = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	
	
	let { form } = $$props;
	let { mode = "" } = $$props;

	onMount(() => {
		if (mode === "local") {
			const item = localStorage.getItem("form");

			if (!item) {
				return;
			}

			form = JSON.parse(item);

			window.onstorage = e => {
				if (e.key === "form" && e.newValue) {
					form = JSON.parse(e.newValue);
				}
			};
		}

		formStore.setForm(form);
	});

	if ($$props.form === void 0 && $$bindings.form && form !== void 0) $$bindings.form(form);
	if ($$props.mode === void 0 && $$bindings.mode && mode !== void 0) $$bindings.mode(mode);

	return `${mode === "local"
	? `<div class="${"alert alert-info alert-dismissible fade show"}" style="${"border-radius: 0;"}" role="${"alert"}">You are viewing a live preview of how your form will display and act once it is published. This preview will <strong>live update</strong> when changes are made from the form builder, no save neeed.
    <button type="${"button"}" class="${"close"}" data-dismiss="${"alert"}" aria-label="${"Close"}"><span aria-hidden="${"true"}">×</span></button></div>`
	: ``}
<div class="${"container"}"><div style="${"padding-right: 8em; padding-left: 8em;"}"><div class="${"container"}" style="${"margin-top: 2em"}">${form
	? `${validate_component(LiveForm, "LiveForm").$$render($$result, { form, mode }, {}, {})}`
	: `<div class="${"d-flex justify-content-center"}"><div class="${"spinner-border text-dark"}" style="${"width: 3rem; height: 3rem;"}" role="${"status"}"><span class="${"sr-only"}">Loading...</span></div></div>`}</div></div></div>`;
});

var component_11 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': Preview,
    preload: preload$2
});

/* src\components\Folders.svelte generated by Svelte v3.24.1 */

const css$r = {
	code: ".card-header-title.svelte-vnjzs6.svelte-vnjzs6{padding-left:0.9em;padding-right:1em;padding-top:1em;padding-bottom:0.5em}.list-group.dashboard-menu.svelte-vnjzs6 .list-group-item.svelte-vnjzs6:hover{border-radius:0.3em}.active.svelte-vnjzs6.svelte-vnjzs6{color:#26304c !important;border-radius:0.3em}.card.svelte-vnjzs6.svelte-vnjzs6{border-radius:0.3em}.title.svelte-vnjzs6.svelte-vnjzs6{font-weight:600;line-height:1.3;color:#1c2540;padding-left:0.5em;font-size:1em}.list-group-item.svelte-vnjzs6.svelte-vnjzs6{color:#26304c !important}.p-2.svelte-vnjzs6.svelte-vnjzs6{padding-left:0.5rem !important;padding-top:0rem !important;padding-bottom:0rem !important}.btn-outline-dark.svelte-vnjzs6.svelte-vnjzs6{margin-right:0.9em;margin-left:0.9em;padding-top:0.4em;padding-bottom:0.4em;margin-top:1em}",
	map: "{\"version\":3,\"file\":\"Folders.svelte\",\"sources\":[\"Folders.svelte\"],\"sourcesContent\":[\"<script lang=\\\"typescript\\\">import { afterUpdate, onMount } from 'svelte';\\r\\nexport let selected;\\r\\nlet folders = [];\\r\\nlet searchPlaceHolder = 'Search for a form';\\r\\nlet query = '';\\r\\nonMount(() => {\\r\\n    folders = getFolders();\\r\\n});\\r\\nfunction getFolders() {\\r\\n    return ['uncategorized', 'Job Listings', 'Surveys'];\\r\\n}\\r\\nafterUpdate(() => {\\r\\n    console.log(selected);\\r\\n});\\r\\nfunction newFolder() { }\\r\\n//# sourceMappingURL=Folders.svelte.js.map</script>\\r\\n\\r\\n<div class=\\\"card border-light p-2\\\" style=\\\"padding-bottom: 1em !important;\\\">\\r\\n  <div class=\\\"container-fluid p-2 mt-3\\\" style=\\\"padding-left: 0em;\\\">\\r\\n    <input class=\\\"form-control search-bar container-fluid\\\" placeholder={searchPlaceHolder} bind:value={query} />\\r\\n  </div>\\r\\n  <div class=\\\"card-header card-header-title bg-white border-0\\\" style=\\\"display: flex;\\\">\\r\\n    <span class=\\\"title\\\">Your Folders</span>\\r\\n  </div>\\r\\n  {#each folders as folder}\\r\\n    <div class=\\\"card-body p-2\\\">\\r\\n      <div class=\\\"list-group dashboard-menu list-group-sm\\\">\\r\\n        <a href=\\\"./folder/{folder}\\\" class=\\\"d-flex list-group-item border-0 list-group-item-action {folder === selected ? 'active' : ''}\\\" style=\\\"padding-bottom: 0.5em; padding-top: 0.5em;\\\">\\r\\n          {#if folder === 'uncategorized'}\\r\\n            <span class=\\\"fas fa-folder-minus\\\" style=\\\"font-size: 1.3em;\\\" />\\r\\n          {:else}\\r\\n            <span class=\\\"far fa-folder\\\" style=\\\"font-size: 1.2em;\\\" />\\r\\n          {/if}\\r\\n          <span style=\\\"padding-left: 0.5em;\\\">{folder}</span>\\r\\n          {#if folder === selected}\\r\\n            <span class=\\\"icon icon-xs ml-auto\\\">\\r\\n              <span class=\\\"fas fa-chevron-right\\\" />\\r\\n            </span>\\r\\n          {/if}\\r\\n        </a>\\r\\n      </div>\\r\\n    </div>\\r\\n  {/each}\\r\\n  <button on:click={newFolder} class=\\\"btn btn-outline-dark\\\">\\r\\n    <span class=\\\"fas fa-folder-plus\\\" style=\\\"font-size: 1.2em;\\\" />\\r\\n    <span style=\\\"font-weight: 400;\\\">New Folder</span>\\r\\n  </button>\\r\\n</div>\\r\\n\\r\\n<style>\\r\\n  .card-header-title {\\r\\n    padding-left: 0.9em;\\r\\n    padding-right: 1em;\\r\\n    padding-top: 1em;\\r\\n    padding-bottom: 0.5em;\\r\\n  }\\r\\n  .list-group.dashboard-menu .list-group-item:hover {\\r\\n    border-radius: 0.3em;\\r\\n  }\\r\\n\\r\\n  .active {\\r\\n    color: #26304c !important;\\r\\n    border-radius: 0.3em;\\r\\n  }\\r\\n\\r\\n  .card {\\r\\n    border-radius: 0.3em;\\r\\n  }\\r\\n\\r\\n  .title {\\r\\n    font-weight: 600;\\r\\n    line-height: 1.3;\\r\\n    color: #1c2540;\\r\\n    padding-left: 0.5em;\\r\\n    font-size: 1em;\\r\\n  }\\r\\n\\r\\n  .list-group-item {\\r\\n    color: #26304c !important;\\r\\n  }\\r\\n\\r\\n  .p-2 {\\r\\n    padding-left: 0.5rem !important;\\r\\n    padding-top: 0rem !important;\\r\\n    padding-bottom: 0rem !important;\\r\\n  }\\r\\n\\r\\n  .btn-outline-dark {\\r\\n    margin-right: 0.9em;\\r\\n    margin-left: 0.9em;\\r\\n    padding-top: 0.4em;\\r\\n    padding-bottom: 0.4em;\\r\\n    margin-top: 1em;\\r\\n  }\\r\\n</style>\\r\\n\"],\"names\":[],\"mappings\":\"AAkDE,kBAAkB,4BAAC,CAAC,AAClB,YAAY,CAAE,KAAK,CACnB,aAAa,CAAE,GAAG,CAClB,WAAW,CAAE,GAAG,CAChB,cAAc,CAAE,KAAK,AACvB,CAAC,AACD,WAAW,6BAAe,CAAC,8BAAgB,MAAM,AAAC,CAAC,AACjD,aAAa,CAAE,KAAK,AACtB,CAAC,AAED,OAAO,4BAAC,CAAC,AACP,KAAK,CAAE,OAAO,CAAC,UAAU,CACzB,aAAa,CAAE,KAAK,AACtB,CAAC,AAED,KAAK,4BAAC,CAAC,AACL,aAAa,CAAE,KAAK,AACtB,CAAC,AAED,MAAM,4BAAC,CAAC,AACN,WAAW,CAAE,GAAG,CAChB,WAAW,CAAE,GAAG,CAChB,KAAK,CAAE,OAAO,CACd,YAAY,CAAE,KAAK,CACnB,SAAS,CAAE,GAAG,AAChB,CAAC,AAED,gBAAgB,4BAAC,CAAC,AAChB,KAAK,CAAE,OAAO,CAAC,UAAU,AAC3B,CAAC,AAED,IAAI,4BAAC,CAAC,AACJ,YAAY,CAAE,MAAM,CAAC,UAAU,CAC/B,WAAW,CAAE,IAAI,CAAC,UAAU,CAC5B,cAAc,CAAE,IAAI,CAAC,UAAU,AACjC,CAAC,AAED,iBAAiB,4BAAC,CAAC,AACjB,YAAY,CAAE,KAAK,CACnB,WAAW,CAAE,KAAK,CAClB,WAAW,CAAE,KAAK,CAClB,cAAc,CAAE,KAAK,CACrB,UAAU,CAAE,GAAG,AACjB,CAAC\"}"
};

let searchPlaceHolder$1 = "Search for a form";

function getFolders() {
	return ["uncategorized", "Job Listings", "Surveys"];
}

const Folders = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { selected } = $$props;
	let folders = [];
	let query = "";

	onMount(() => {
		folders = getFolders();
	});

	afterUpdate(() => {
		console.log(selected);
	});

	if ($$props.selected === void 0 && $$bindings.selected && selected !== void 0) $$bindings.selected(selected);
	$$result.css.add(css$r);

	return `<div class="${"card border-light p-2 svelte-vnjzs6"}" style="${"padding-bottom: 1em !important;"}"><div class="${"container-fluid p-2 mt-3 svelte-vnjzs6"}" style="${"padding-left: 0em;"}"><input class="${"form-control search-bar container-fluid"}"${add_attribute("placeholder", searchPlaceHolder$1, 0)}${add_attribute("value", query, 1)}></div>
  <div class="${"card-header card-header-title bg-white border-0 svelte-vnjzs6"}" style="${"display: flex;"}"><span class="${"title svelte-vnjzs6"}">Your Folders</span></div>
  ${each(folders, folder => `<div class="${"card-body p-2 svelte-vnjzs6"}"><div class="${"list-group dashboard-menu list-group-sm svelte-vnjzs6"}"><a href="${"./folder/" + escape(folder)}" class="${"d-flex list-group-item border-0 list-group-item-action " + escape(folder === selected ? "active" : "") + " svelte-vnjzs6"}" style="${"padding-bottom: 0.5em; padding-top: 0.5em;"}">${folder === "uncategorized"
	? `<span class="${"fas fa-folder-minus"}" style="${"font-size: 1.3em;"}"></span>`
	: `<span class="${"far fa-folder"}" style="${"font-size: 1.2em;"}"></span>`}
          <span style="${"padding-left: 0.5em;"}">${escape(folder)}</span>
          ${folder === selected
	? `<span class="${"icon icon-xs ml-auto"}"><span class="${"fas fa-chevron-right"}"></span>
            </span>`
	: ``}
        </a></div>
    </div>`)}
  <button class="${"btn btn-outline-dark svelte-vnjzs6"}"><span class="${"fas fa-folder-plus"}" style="${"font-size: 1.2em;"}"></span>
    <span style="${"font-weight: 400;"}">New Folder</span></button>
</div>`;
});

/* src\components\FolderContent.svelte generated by Svelte v3.24.1 */

const css$s = {
	code: ".card.svelte-wc0ycq{border-radius:0.3em}",
	map: "{\"version\":3,\"file\":\"FolderContent.svelte\",\"sources\":[\"FolderContent.svelte\"],\"sourcesContent\":[\"<script lang=\\\"typescript\\\">;\\r\\nimport FormList from './FormList.svelte';\\r\\nexport let folder;\\r\\nfunction onSettings(folderId) { }\\r\\nfunction onImportForm() { }\\r\\n//# sourceMappingURL=FolderContent.svelte.js.map</script>\\r\\n\\r\\n<div class=\\\"row mb-5\\\">\\r\\n  <div class=\\\"col-12 mb-4\\\">\\r\\n    <div class=\\\"card card-body bg-white border-light p-0 p-md-4\\\">\\r\\n      <div class=\\\"card-header bg-white border-0 p-2\\\" style=\\\"display: flex\\\">\\r\\n        <div class=\\\"row\\\">\\r\\n          <div class=\\\"col\\\">\\r\\n            <span class=\\\"h5\\\">{folder.name}</span>\\r\\n            {#if folder.name === 'uncategorized'}\\r\\n              <p class=\\\"small\\\">Uncategorized forms have not been assigned a folder yet.</p>\\r\\n            {:else}\\r\\n              <p class=\\\"small\\\">{folder.forms.length} Submissions</p>\\r\\n            {/if}\\r\\n          </div>\\r\\n          <div class=\\\"col-auto\\\">\\r\\n            <div class=\\\"align-items-center\\\" style=\\\"padding-bottom: 0.3em; text-align: right !important;\\\">\\r\\n              <button\\r\\n                on:click={() => {\\r\\n                  onSettings(folder.id)\\r\\n                }}\\r\\n                class=\\\"btn btn-xs btn-outline-dark\\\">\\r\\n                <span class=\\\"fas fa-cog\\\" />\\r\\n              </button>\\r\\n            </div>\\r\\n            <button on:click={onImportForm} class=\\\"btn btn-xs btn-outline-dark\\\"> <span class=\\\"fas fa-file-import\\\" /> <span>Import Form</span> </button>\\r\\n            <a href=\\\"/builder\\\" class=\\\"btn btn-xs btn-outline-dark\\\"> <span class=\\\"fas fa-plus\\\" /><span>Create Form</span></a>\\r\\n          </div>\\r\\n        </div>\\r\\n      </div>\\r\\n      <FormList {folder} />\\r\\n    </div>\\r\\n  </div>\\r\\n</div>\\r\\n\\r\\n<style>\\r\\n  .card {\\r\\n    border-radius: 0.3em;\\r\\n  }\\r\\n</style>\\r\\n\"],\"names\":[],\"mappings\":\"AAyCE,KAAK,cAAC,CAAC,AACL,aAAa,CAAE,KAAK,AACtB,CAAC\"}"
};

const FolderContent = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	
	let { folder } = $$props;
	if ($$props.folder === void 0 && $$bindings.folder && folder !== void 0) $$bindings.folder(folder);
	$$result.css.add(css$s);

	return `<div class="${"row mb-5"}"><div class="${"col-12 mb-4"}"><div class="${"card card-body bg-white border-light p-0 p-md-4 svelte-wc0ycq"}"><div class="${"card-header bg-white border-0 p-2"}" style="${"display: flex"}"><div class="${"row"}"><div class="${"col"}"><span class="${"h5"}">${escape(folder.name)}</span>
            ${folder.name === "uncategorized"
	? `<p class="${"small"}">Uncategorized forms have not been assigned a folder yet.</p>`
	: `<p class="${"small"}">${escape(folder.forms.length)} Submissions</p>`}</div>
          <div class="${"col-auto"}"><div class="${"align-items-center"}" style="${"padding-bottom: 0.3em; text-align: right !important;"}"><button class="${"btn btn-xs btn-outline-dark"}"><span class="${"fas fa-cog"}"></span></button></div>
            <button class="${"btn btn-xs btn-outline-dark"}"><span class="${"fas fa-file-import"}"></span> <span>Import Form</span></button>
            <a href="${"/builder"}" class="${"btn btn-xs btn-outline-dark"}"><span class="${"fas fa-plus"}"></span><span>Create Form</span></a></div></div></div>
      ${validate_component(FormList, "FormList").$$render($$result, { folder }, {}, {})}</div></div>
</div>`;
});

/* src\routes\folder\index.svelte generated by Svelte v3.24.1 */

var __awaiter$4 = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
	function adopt(value) {
		return value instanceof P
		? value
		: new P(function (resolve) {
					resolve(value);
				});
	}

	return new (P || (P = Promise))(function (resolve, reject) {
			function fulfilled(value) {
				try {
					step(generator.next(value));
				} catch(e) {
					reject(e);
				}
			}

			function rejected(value) {
				try {
					step(generator["throw"](value));
				} catch(e) {
					reject(e);
				}
			}

			function step(result) {
				result.done
				? resolve(result.value)
				: adopt(result.value).then(fulfilled, rejected);
			}

			step((generator = generator.apply(thisArg, _arguments || [])).next());
		});
};

function preload$3(page, session) {
	return __awaiter$4(this, void 0, void 0, function* () {
		const folder = getUrlParameter("folder");

		if (!folder) {
			return "uncategorized";
		}

		return { folderName: folder };
	});
}

function getFolder(folderName) {
	return { name: folderName, forms: [], id: "12345" };
}

const Folder = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	
	
	let { folderName } = $$props;
	let folder;

	onMount(() => {
		folder = getFolder(folderName);
	});

	afterUpdate(() => {
		folder = getFolder(folderName);
	});

	if ($$props.folderName === void 0 && $$bindings.folderName && folderName !== void 0) $$bindings.folderName(folderName);

	return `<div style="${" background-color: #f5f9fe;"}"><div class="${"section section-lg pt-6 pt-md-6 bg-soft"}"><div class="${"container"}"><div class="${"row pt-3 pt-md-0"}"><div class="${"col-12 col-md-4 d-none d-lg-block"}">${validate_component(Folders, "Folders").$$render($$result, { selected: folderName }, {}, {})}</div>
        <div class="${"col-12 col-lg-8"}">${folder != null
	? `${validate_component(FolderContent, "FolderContent").$$render($$result, { folder }, {}, {})}`
	: ``}</div></div></div></div>
</div>`;
});

var component_12 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': Folder,
    preload: preload$3
});

// This file is generated by Sapper — do not edit it!

const d = decodeURIComponent;

const manifest = {
	server_routes: [
		{
			// example.ts
			pattern: /^\/example\/?$/,
			handlers: route_0,
			params: () => ({})
		}
	],

	pages: [
		{
			// index.svelte
			pattern: /^\/$/,
			parts: [
				{ name: "index", file: "index.svelte", component: component_0 }
			]
		},

		{
			// account-settings/index.svelte
			pattern: /^\/account-settings\/?$/,
			parts: [
				{ name: "account$45settings", file: "account-settings/index.svelte", component: component_1 }
			]
		},

		{
			// account-settings/security.svelte
			pattern: /^\/account-settings\/security\/?$/,
			parts: [
				null,
				{ name: "account$45settings_security", file: "account-settings/security.svelte", component: component_2 }
			]
		},

		{
			// account-settings/billing.svelte
			pattern: /^\/account-settings\/billing\/?$/,
			parts: [
				null,
				{ name: "account$45settings_billing", file: "account-settings/billing.svelte", component: component_3 }
			]
		},

		{
			// form-settings/index.svelte
			pattern: /^\/form-settings\/?$/,
			parts: [
				{ name: "form$45settings", file: "form-settings/index.svelte", component: component_4 }
			]
		},

		{
			// form-settings/[formId]/workflows.svelte
			pattern: /^\/form-settings\/([^/]+?)\/workflows\/?$/,
			parts: [
				null,
				null,
				{ name: "form$45settings_$formId_workflows", file: "form-settings/[formId]/workflows.svelte", component: component_5, params: match => ({ formId: d(match[1]) }) }
			]
		},

		{
			// form-settings/[formId]/scoring.svelte
			pattern: /^\/form-settings\/([^/]+?)\/scoring\/?$/,
			parts: [
				null,
				null,
				{ name: "form$45settings_$formId_scoring", file: "form-settings/[formId]/scoring.svelte", component: component_6, params: match => ({ formId: d(match[1]) }) }
			]
		},

		{
			// form-settings/[formId]/emails.svelte
			pattern: /^\/form-settings\/([^/]+?)\/emails\/?$/,
			parts: [
				null,
				null,
				{ name: "form$45settings_$formId_emails", file: "form-settings/[formId]/emails.svelte", component: component_7, params: match => ({ formId: d(match[1]) }) }
			]
		},

		{
			// form-settings/[formId].svelte
			pattern: /^\/form-settings\/([^/]+?)\/?$/,
			parts: [
				null,
				{ name: "form$45settings_$formId", file: "form-settings/[formId].svelte", component: component_8, params: match => ({ formId: d(match[1]) }) }
			]
		},

		{
			// submissions/index.svelte
			pattern: /^\/submissions\/?$/,
			parts: [
				{ name: "submissions", file: "submissions/index.svelte", component: component_9 }
			]
		},

		{
			// builder/index.svelte
			pattern: /^\/builder\/?$/,
			parts: [
				{ name: "builder", file: "builder/index.svelte", component: component_10 }
			]
		},

		{
			// preview/index.svelte
			pattern: /^\/preview\/?$/,
			parts: [
				{ name: "preview", file: "preview/index.svelte", component: component_11 }
			]
		},

		{
			// folder/index.svelte
			pattern: /^\/folder\/?$/,
			parts: [
				{ name: "folder", file: "folder/index.svelte", component: component_12 }
			]
		}
	],

	root_comp,
	error: Error$1
};

const build_dir = "__sapper__/build";

/**
 * @param typeMap [Object] Map of MIME type -> Array[extensions]
 * @param ...
 */
function Mime() {
  this._types = Object.create(null);
  this._extensions = Object.create(null);

  for (var i = 0; i < arguments.length; i++) {
    this.define(arguments[i]);
  }

  this.define = this.define.bind(this);
  this.getType = this.getType.bind(this);
  this.getExtension = this.getExtension.bind(this);
}

/**
 * Define mimetype -> extension mappings.  Each key is a mime-type that maps
 * to an array of extensions associated with the type.  The first extension is
 * used as the default extension for the type.
 *
 * e.g. mime.define({'audio/ogg', ['oga', 'ogg', 'spx']});
 *
 * If a type declares an extension that has already been defined, an error will
 * be thrown.  To suppress this error and force the extension to be associated
 * with the new type, pass `force`=true.  Alternatively, you may prefix the
 * extension with "*" to map the type to extension, without mapping the
 * extension to the type.
 *
 * e.g. mime.define({'audio/wav', ['wav']}, {'audio/x-wav', ['*wav']});
 *
 *
 * @param map (Object) type definitions
 * @param force (Boolean) if true, force overriding of existing definitions
 */
Mime.prototype.define = function(typeMap, force) {
  for (var type in typeMap) {
    var extensions = typeMap[type].map(function(t) {return t.toLowerCase()});
    type = type.toLowerCase();

    for (var i = 0; i < extensions.length; i++) {
      var ext = extensions[i];

      // '*' prefix = not the preferred type for this extension.  So fixup the
      // extension, and skip it.
      if (ext[0] == '*') {
        continue;
      }

      if (!force && (ext in this._types)) {
        throw new Error(
          'Attempt to change mapping for "' + ext +
          '" extension from "' + this._types[ext] + '" to "' + type +
          '". Pass `force=true` to allow this, otherwise remove "' + ext +
          '" from the list of extensions for "' + type + '".'
        );
      }

      this._types[ext] = type;
    }

    // Use first extension as default
    if (force || !this._extensions[type]) {
      var ext = extensions[0];
      this._extensions[type] = (ext[0] != '*') ? ext : ext.substr(1);
    }
  }
};

/**
 * Lookup a mime type based on extension
 */
Mime.prototype.getType = function(path) {
  path = String(path);
  var last = path.replace(/^.*[/\\]/, '').toLowerCase();
  var ext = last.replace(/^.*\./, '').toLowerCase();

  var hasPath = last.length < path.length;
  var hasDot = ext.length < last.length - 1;

  return (hasDot || !hasPath) && this._types[ext] || null;
};

/**
 * Return file extension associated with a mime type
 */
Mime.prototype.getExtension = function(type) {
  type = /^\s*([^;\s]*)/.test(type) && RegExp.$1;
  return type && this._extensions[type.toLowerCase()] || null;
};

var Mime_1 = Mime;

var standard = {"application/andrew-inset":["ez"],"application/applixware":["aw"],"application/atom+xml":["atom"],"application/atomcat+xml":["atomcat"],"application/atomdeleted+xml":["atomdeleted"],"application/atomsvc+xml":["atomsvc"],"application/atsc-dwd+xml":["dwd"],"application/atsc-held+xml":["held"],"application/atsc-rsat+xml":["rsat"],"application/bdoc":["bdoc"],"application/calendar+xml":["xcs"],"application/ccxml+xml":["ccxml"],"application/cdfx+xml":["cdfx"],"application/cdmi-capability":["cdmia"],"application/cdmi-container":["cdmic"],"application/cdmi-domain":["cdmid"],"application/cdmi-object":["cdmio"],"application/cdmi-queue":["cdmiq"],"application/cu-seeme":["cu"],"application/dash+xml":["mpd"],"application/davmount+xml":["davmount"],"application/docbook+xml":["dbk"],"application/dssc+der":["dssc"],"application/dssc+xml":["xdssc"],"application/ecmascript":["ecma","es"],"application/emma+xml":["emma"],"application/emotionml+xml":["emotionml"],"application/epub+zip":["epub"],"application/exi":["exi"],"application/fdt+xml":["fdt"],"application/font-tdpfr":["pfr"],"application/geo+json":["geojson"],"application/gml+xml":["gml"],"application/gpx+xml":["gpx"],"application/gxf":["gxf"],"application/gzip":["gz"],"application/hjson":["hjson"],"application/hyperstudio":["stk"],"application/inkml+xml":["ink","inkml"],"application/ipfix":["ipfix"],"application/its+xml":["its"],"application/java-archive":["jar","war","ear"],"application/java-serialized-object":["ser"],"application/java-vm":["class"],"application/javascript":["js","mjs"],"application/json":["json","map"],"application/json5":["json5"],"application/jsonml+json":["jsonml"],"application/ld+json":["jsonld"],"application/lgr+xml":["lgr"],"application/lost+xml":["lostxml"],"application/mac-binhex40":["hqx"],"application/mac-compactpro":["cpt"],"application/mads+xml":["mads"],"application/manifest+json":["webmanifest"],"application/marc":["mrc"],"application/marcxml+xml":["mrcx"],"application/mathematica":["ma","nb","mb"],"application/mathml+xml":["mathml"],"application/mbox":["mbox"],"application/mediaservercontrol+xml":["mscml"],"application/metalink+xml":["metalink"],"application/metalink4+xml":["meta4"],"application/mets+xml":["mets"],"application/mmt-aei+xml":["maei"],"application/mmt-usd+xml":["musd"],"application/mods+xml":["mods"],"application/mp21":["m21","mp21"],"application/mp4":["mp4s","m4p"],"application/mrb-consumer+xml":["*xdf"],"application/mrb-publish+xml":["*xdf"],"application/msword":["doc","dot"],"application/mxf":["mxf"],"application/n-quads":["nq"],"application/n-triples":["nt"],"application/node":["cjs"],"application/octet-stream":["bin","dms","lrf","mar","so","dist","distz","pkg","bpk","dump","elc","deploy","exe","dll","deb","dmg","iso","img","msi","msp","msm","buffer"],"application/oda":["oda"],"application/oebps-package+xml":["opf"],"application/ogg":["ogx"],"application/omdoc+xml":["omdoc"],"application/onenote":["onetoc","onetoc2","onetmp","onepkg"],"application/oxps":["oxps"],"application/p2p-overlay+xml":["relo"],"application/patch-ops-error+xml":["*xer"],"application/pdf":["pdf"],"application/pgp-encrypted":["pgp"],"application/pgp-signature":["asc","sig"],"application/pics-rules":["prf"],"application/pkcs10":["p10"],"application/pkcs7-mime":["p7m","p7c"],"application/pkcs7-signature":["p7s"],"application/pkcs8":["p8"],"application/pkix-attr-cert":["ac"],"application/pkix-cert":["cer"],"application/pkix-crl":["crl"],"application/pkix-pkipath":["pkipath"],"application/pkixcmp":["pki"],"application/pls+xml":["pls"],"application/postscript":["ai","eps","ps"],"application/provenance+xml":["provx"],"application/pskc+xml":["pskcxml"],"application/raml+yaml":["raml"],"application/rdf+xml":["rdf","owl"],"application/reginfo+xml":["rif"],"application/relax-ng-compact-syntax":["rnc"],"application/resource-lists+xml":["rl"],"application/resource-lists-diff+xml":["rld"],"application/rls-services+xml":["rs"],"application/route-apd+xml":["rapd"],"application/route-s-tsid+xml":["sls"],"application/route-usd+xml":["rusd"],"application/rpki-ghostbusters":["gbr"],"application/rpki-manifest":["mft"],"application/rpki-roa":["roa"],"application/rsd+xml":["rsd"],"application/rss+xml":["rss"],"application/rtf":["rtf"],"application/sbml+xml":["sbml"],"application/scvp-cv-request":["scq"],"application/scvp-cv-response":["scs"],"application/scvp-vp-request":["spq"],"application/scvp-vp-response":["spp"],"application/sdp":["sdp"],"application/senml+xml":["senmlx"],"application/sensml+xml":["sensmlx"],"application/set-payment-initiation":["setpay"],"application/set-registration-initiation":["setreg"],"application/shf+xml":["shf"],"application/sieve":["siv","sieve"],"application/smil+xml":["smi","smil"],"application/sparql-query":["rq"],"application/sparql-results+xml":["srx"],"application/srgs":["gram"],"application/srgs+xml":["grxml"],"application/sru+xml":["sru"],"application/ssdl+xml":["ssdl"],"application/ssml+xml":["ssml"],"application/swid+xml":["swidtag"],"application/tei+xml":["tei","teicorpus"],"application/thraud+xml":["tfi"],"application/timestamped-data":["tsd"],"application/toml":["toml"],"application/ttml+xml":["ttml"],"application/urc-ressheet+xml":["rsheet"],"application/voicexml+xml":["vxml"],"application/wasm":["wasm"],"application/widget":["wgt"],"application/winhlp":["hlp"],"application/wsdl+xml":["wsdl"],"application/wspolicy+xml":["wspolicy"],"application/xaml+xml":["xaml"],"application/xcap-att+xml":["xav"],"application/xcap-caps+xml":["xca"],"application/xcap-diff+xml":["xdf"],"application/xcap-el+xml":["xel"],"application/xcap-error+xml":["xer"],"application/xcap-ns+xml":["xns"],"application/xenc+xml":["xenc"],"application/xhtml+xml":["xhtml","xht"],"application/xliff+xml":["xlf"],"application/xml":["xml","xsl","xsd","rng"],"application/xml-dtd":["dtd"],"application/xop+xml":["xop"],"application/xproc+xml":["xpl"],"application/xslt+xml":["xslt"],"application/xspf+xml":["xspf"],"application/xv+xml":["mxml","xhvml","xvml","xvm"],"application/yang":["yang"],"application/yin+xml":["yin"],"application/zip":["zip"],"audio/3gpp":["*3gpp"],"audio/adpcm":["adp"],"audio/basic":["au","snd"],"audio/midi":["mid","midi","kar","rmi"],"audio/mobile-xmf":["mxmf"],"audio/mp3":["*mp3"],"audio/mp4":["m4a","mp4a"],"audio/mpeg":["mpga","mp2","mp2a","mp3","m2a","m3a"],"audio/ogg":["oga","ogg","spx"],"audio/s3m":["s3m"],"audio/silk":["sil"],"audio/wav":["wav"],"audio/wave":["*wav"],"audio/webm":["weba"],"audio/xm":["xm"],"font/collection":["ttc"],"font/otf":["otf"],"font/ttf":["ttf"],"font/woff":["woff"],"font/woff2":["woff2"],"image/aces":["exr"],"image/apng":["apng"],"image/bmp":["bmp"],"image/cgm":["cgm"],"image/dicom-rle":["drle"],"image/emf":["emf"],"image/fits":["fits"],"image/g3fax":["g3"],"image/gif":["gif"],"image/heic":["heic"],"image/heic-sequence":["heics"],"image/heif":["heif"],"image/heif-sequence":["heifs"],"image/hej2k":["hej2"],"image/hsj2":["hsj2"],"image/ief":["ief"],"image/jls":["jls"],"image/jp2":["jp2","jpg2"],"image/jpeg":["jpeg","jpg","jpe"],"image/jph":["jph"],"image/jphc":["jhc"],"image/jpm":["jpm"],"image/jpx":["jpx","jpf"],"image/jxr":["jxr"],"image/jxra":["jxra"],"image/jxrs":["jxrs"],"image/jxs":["jxs"],"image/jxsc":["jxsc"],"image/jxsi":["jxsi"],"image/jxss":["jxss"],"image/ktx":["ktx"],"image/png":["png"],"image/sgi":["sgi"],"image/svg+xml":["svg","svgz"],"image/t38":["t38"],"image/tiff":["tif","tiff"],"image/tiff-fx":["tfx"],"image/webp":["webp"],"image/wmf":["wmf"],"message/disposition-notification":["disposition-notification"],"message/global":["u8msg"],"message/global-delivery-status":["u8dsn"],"message/global-disposition-notification":["u8mdn"],"message/global-headers":["u8hdr"],"message/rfc822":["eml","mime"],"model/3mf":["3mf"],"model/gltf+json":["gltf"],"model/gltf-binary":["glb"],"model/iges":["igs","iges"],"model/mesh":["msh","mesh","silo"],"model/mtl":["mtl"],"model/obj":["obj"],"model/stl":["stl"],"model/vrml":["wrl","vrml"],"model/x3d+binary":["*x3db","x3dbz"],"model/x3d+fastinfoset":["x3db"],"model/x3d+vrml":["*x3dv","x3dvz"],"model/x3d+xml":["x3d","x3dz"],"model/x3d-vrml":["x3dv"],"text/cache-manifest":["appcache","manifest"],"text/calendar":["ics","ifb"],"text/coffeescript":["coffee","litcoffee"],"text/css":["css"],"text/csv":["csv"],"text/html":["html","htm","shtml"],"text/jade":["jade"],"text/jsx":["jsx"],"text/less":["less"],"text/markdown":["markdown","md"],"text/mathml":["mml"],"text/mdx":["mdx"],"text/n3":["n3"],"text/plain":["txt","text","conf","def","list","log","in","ini"],"text/richtext":["rtx"],"text/rtf":["*rtf"],"text/sgml":["sgml","sgm"],"text/shex":["shex"],"text/slim":["slim","slm"],"text/stylus":["stylus","styl"],"text/tab-separated-values":["tsv"],"text/troff":["t","tr","roff","man","me","ms"],"text/turtle":["ttl"],"text/uri-list":["uri","uris","urls"],"text/vcard":["vcard"],"text/vtt":["vtt"],"text/xml":["*xml"],"text/yaml":["yaml","yml"],"video/3gpp":["3gp","3gpp"],"video/3gpp2":["3g2"],"video/h261":["h261"],"video/h263":["h263"],"video/h264":["h264"],"video/jpeg":["jpgv"],"video/jpm":["*jpm","jpgm"],"video/mj2":["mj2","mjp2"],"video/mp2t":["ts"],"video/mp4":["mp4","mp4v","mpg4"],"video/mpeg":["mpeg","mpg","mpe","m1v","m2v"],"video/ogg":["ogv"],"video/quicktime":["qt","mov"],"video/webm":["webm"]};

var lite = new Mime_1(standard);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter$5(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator$1(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function get_server_route_handler(routes) {
    function handle_route(route, req, res, next) {
        return __awaiter$5(this, void 0, void 0, function () {
            var method, method_export, handle_method, write_1, end_1, setHeader_1, chunks_1, headers_1, handle_next, err_1;
            return __generator$1(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        req.params = route.params(route.pattern.exec(req.path));
                        method = req.method.toLowerCase();
                        method_export = method === 'delete' ? 'del' : method;
                        handle_method = route.handlers[method_export];
                        if (!handle_method) return [3 /*break*/, 5];
                        if (process.env.SAPPER_EXPORT) {
                            write_1 = res.write, end_1 = res.end, setHeader_1 = res.setHeader;
                            chunks_1 = [];
                            headers_1 = {};
                            // intercept data so that it can be exported
                            res.write = function (chunk) {
                                chunks_1.push(Buffer.from(chunk));
                                return write_1.apply(res, [chunk]);
                            };
                            res.setHeader = function (name, value) {
                                headers_1[name.toLowerCase()] = value;
                                setHeader_1.apply(res, [name, value]);
                            };
                            res.end = function (chunk) {
                                if (chunk)
                                    chunks_1.push(Buffer.from(chunk));
                                end_1.apply(res, [chunk]);
                                process.send({
                                    __sapper__: true,
                                    event: 'file',
                                    url: req.url,
                                    method: req.method,
                                    status: res.statusCode,
                                    type: headers_1['content-type'],
                                    body: Buffer.concat(chunks_1)
                                });
                            };
                        }
                        handle_next = function (err) {
                            if (err) {
                                res.statusCode = 500;
                                res.end(err.message);
                            }
                            else {
                                process.nextTick(next);
                            }
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, handle_method(req, res, handle_next)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        console.error(err_1);
                        handle_next(err_1);
                        return [3 /*break*/, 4];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        // no matching handler for method
                        process.nextTick(next);
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    }
    return function find_route(req, res, next) {
        var e_1, _a;
        try {
            for (var routes_1 = __values(routes), routes_1_1 = routes_1.next(); !routes_1_1.done; routes_1_1 = routes_1.next()) {
                var route = routes_1_1.value;
                if (route.pattern.test(req.path)) {
                    handle_route(route, req, res, next);
                    return;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (routes_1_1 && !routes_1_1.done && (_a = routes_1.return)) _a.call(routes_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        next();
    };
}

/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */

/**
 * Module exports.
 * @public
 */

var parse_1 = parse;
var serialize_1 = serialize;

/**
 * Module variables.
 * @private
 */

var decode = decodeURIComponent;
var encode = encodeURIComponent;
var pairSplitRegExp = /; */;

/**
 * RegExp to match field-content in RFC 7230 sec 3.2
 *
 * field-content = field-vchar [ 1*( SP / HTAB ) field-vchar ]
 * field-vchar   = VCHAR / obs-text
 * obs-text      = %x80-FF
 */

var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;

/**
 * Parse a cookie header.
 *
 * Parse the given cookie header string into an object
 * The object has the various cookies as keys(names) => values
 *
 * @param {string} str
 * @param {object} [options]
 * @return {object}
 * @public
 */

function parse(str, options) {
  if (typeof str !== 'string') {
    throw new TypeError('argument str must be a string');
  }

  var obj = {};
  var opt = options || {};
  var pairs = str.split(pairSplitRegExp);
  var dec = opt.decode || decode;

  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i];
    var eq_idx = pair.indexOf('=');

    // skip things that don't look like key=value
    if (eq_idx < 0) {
      continue;
    }

    var key = pair.substr(0, eq_idx).trim();
    var val = pair.substr(++eq_idx, pair.length).trim();

    // quoted values
    if ('"' == val[0]) {
      val = val.slice(1, -1);
    }

    // only assign once
    if (undefined == obj[key]) {
      obj[key] = tryDecode(val, dec);
    }
  }

  return obj;
}

/**
 * Serialize data into a cookie header.
 *
 * Serialize the a name value pair into a cookie string suitable for
 * http headers. An optional options object specified cookie parameters.
 *
 * serialize('foo', 'bar', { httpOnly: true })
 *   => "foo=bar; httpOnly"
 *
 * @param {string} name
 * @param {string} val
 * @param {object} [options]
 * @return {string}
 * @public
 */

function serialize(name, val, options) {
  var opt = options || {};
  var enc = opt.encode || encode;

  if (typeof enc !== 'function') {
    throw new TypeError('option encode is invalid');
  }

  if (!fieldContentRegExp.test(name)) {
    throw new TypeError('argument name is invalid');
  }

  var value = enc(val);

  if (value && !fieldContentRegExp.test(value)) {
    throw new TypeError('argument val is invalid');
  }

  var str = name + '=' + value;

  if (null != opt.maxAge) {
    var maxAge = opt.maxAge - 0;

    if (isNaN(maxAge) || !isFinite(maxAge)) {
      throw new TypeError('option maxAge is invalid')
    }

    str += '; Max-Age=' + Math.floor(maxAge);
  }

  if (opt.domain) {
    if (!fieldContentRegExp.test(opt.domain)) {
      throw new TypeError('option domain is invalid');
    }

    str += '; Domain=' + opt.domain;
  }

  if (opt.path) {
    if (!fieldContentRegExp.test(opt.path)) {
      throw new TypeError('option path is invalid');
    }

    str += '; Path=' + opt.path;
  }

  if (opt.expires) {
    if (typeof opt.expires.toUTCString !== 'function') {
      throw new TypeError('option expires is invalid');
    }

    str += '; Expires=' + opt.expires.toUTCString();
  }

  if (opt.httpOnly) {
    str += '; HttpOnly';
  }

  if (opt.secure) {
    str += '; Secure';
  }

  if (opt.sameSite) {
    var sameSite = typeof opt.sameSite === 'string'
      ? opt.sameSite.toLowerCase() : opt.sameSite;

    switch (sameSite) {
      case true:
        str += '; SameSite=Strict';
        break;
      case 'lax':
        str += '; SameSite=Lax';
        break;
      case 'strict':
        str += '; SameSite=Strict';
        break;
      case 'none':
        str += '; SameSite=None';
        break;
      default:
        throw new TypeError('option sameSite is invalid');
    }
  }

  return str;
}

/**
 * Try decoding a string using a decoding function.
 *
 * @param {string} str
 * @param {function} decode
 * @private
 */

function tryDecode(str, decode) {
  try {
    return decode(str);
  } catch (e) {
    return str;
  }
}

var cookie = {
	parse: parse_1,
	serialize: serialize_1
};

var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$';
var unsafeChars = /[<>\b\f\n\r\t\0\u2028\u2029]/g;
var reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
var escaped$1 = {
    '<': '\\u003C',
    '>': '\\u003E',
    '/': '\\u002F',
    '\\': '\\\\',
    '\b': '\\b',
    '\f': '\\f',
    '\n': '\\n',
    '\r': '\\r',
    '\t': '\\t',
    '\0': '\\0',
    '\u2028': '\\u2028',
    '\u2029': '\\u2029'
};
var objectProtoOwnPropertyNames = Object.getOwnPropertyNames(Object.prototype).sort().join('\0');
function devalue(value) {
    var counts = new Map();
    function walk(thing) {
        if (typeof thing === 'function') {
            throw new Error("Cannot stringify a function");
        }
        if (counts.has(thing)) {
            counts.set(thing, counts.get(thing) + 1);
            return;
        }
        counts.set(thing, 1);
        if (!isPrimitive(thing)) {
            var type = getType(thing);
            switch (type) {
                case 'Number':
                case 'String':
                case 'Boolean':
                case 'Date':
                case 'RegExp':
                    return;
                case 'Array':
                    thing.forEach(walk);
                    break;
                case 'Set':
                case 'Map':
                    Array.from(thing).forEach(walk);
                    break;
                default:
                    var proto = Object.getPrototypeOf(thing);
                    if (proto !== Object.prototype &&
                        proto !== null &&
                        Object.getOwnPropertyNames(proto).sort().join('\0') !== objectProtoOwnPropertyNames) {
                        throw new Error("Cannot stringify arbitrary non-POJOs");
                    }
                    if (Object.getOwnPropertySymbols(thing).length > 0) {
                        throw new Error("Cannot stringify POJOs with symbolic keys");
                    }
                    Object.keys(thing).forEach(function (key) { return walk(thing[key]); });
            }
        }
    }
    walk(value);
    var names = new Map();
    Array.from(counts)
        .filter(function (entry) { return entry[1] > 1; })
        .sort(function (a, b) { return b[1] - a[1]; })
        .forEach(function (entry, i) {
        names.set(entry[0], getName(i));
    });
    function stringify(thing) {
        if (names.has(thing)) {
            return names.get(thing);
        }
        if (isPrimitive(thing)) {
            return stringifyPrimitive(thing);
        }
        var type = getType(thing);
        switch (type) {
            case 'Number':
            case 'String':
            case 'Boolean':
                return "Object(" + stringify(thing.valueOf()) + ")";
            case 'RegExp':
                return "new RegExp(" + stringifyString(thing.source) + ", \"" + thing.flags + "\")";
            case 'Date':
                return "new Date(" + thing.getTime() + ")";
            case 'Array':
                var members = thing.map(function (v, i) { return i in thing ? stringify(v) : ''; });
                var tail = thing.length === 0 || (thing.length - 1 in thing) ? '' : ',';
                return "[" + members.join(',') + tail + "]";
            case 'Set':
            case 'Map':
                return "new " + type + "([" + Array.from(thing).map(stringify).join(',') + "])";
            default:
                var obj = "{" + Object.keys(thing).map(function (key) { return safeKey(key) + ":" + stringify(thing[key]); }).join(',') + "}";
                var proto = Object.getPrototypeOf(thing);
                if (proto === null) {
                    return Object.keys(thing).length > 0
                        ? "Object.assign(Object.create(null)," + obj + ")"
                        : "Object.create(null)";
                }
                return obj;
        }
    }
    var str = stringify(value);
    if (names.size) {
        var params_1 = [];
        var statements_1 = [];
        var values_1 = [];
        names.forEach(function (name, thing) {
            params_1.push(name);
            if (isPrimitive(thing)) {
                values_1.push(stringifyPrimitive(thing));
                return;
            }
            var type = getType(thing);
            switch (type) {
                case 'Number':
                case 'String':
                case 'Boolean':
                    values_1.push("Object(" + stringify(thing.valueOf()) + ")");
                    break;
                case 'RegExp':
                    values_1.push(thing.toString());
                    break;
                case 'Date':
                    values_1.push("new Date(" + thing.getTime() + ")");
                    break;
                case 'Array':
                    values_1.push("Array(" + thing.length + ")");
                    thing.forEach(function (v, i) {
                        statements_1.push(name + "[" + i + "]=" + stringify(v));
                    });
                    break;
                case 'Set':
                    values_1.push("new Set");
                    statements_1.push(name + "." + Array.from(thing).map(function (v) { return "add(" + stringify(v) + ")"; }).join('.'));
                    break;
                case 'Map':
                    values_1.push("new Map");
                    statements_1.push(name + "." + Array.from(thing).map(function (_a) {
                        var k = _a[0], v = _a[1];
                        return "set(" + stringify(k) + ", " + stringify(v) + ")";
                    }).join('.'));
                    break;
                default:
                    values_1.push(Object.getPrototypeOf(thing) === null ? 'Object.create(null)' : '{}');
                    Object.keys(thing).forEach(function (key) {
                        statements_1.push("" + name + safeProp(key) + "=" + stringify(thing[key]));
                    });
            }
        });
        statements_1.push("return " + str);
        return "(function(" + params_1.join(',') + "){" + statements_1.join(';') + "}(" + values_1.join(',') + "))";
    }
    else {
        return str;
    }
}
function getName(num) {
    var name = '';
    do {
        name = chars[num % chars.length] + name;
        num = ~~(num / chars.length) - 1;
    } while (num >= 0);
    return reserved.test(name) ? name + "_" : name;
}
function isPrimitive(thing) {
    return Object(thing) !== thing;
}
function stringifyPrimitive(thing) {
    if (typeof thing === 'string')
        return stringifyString(thing);
    if (thing === void 0)
        return 'void 0';
    if (thing === 0 && 1 / thing < 0)
        return '-0';
    var str = String(thing);
    if (typeof thing === 'number')
        return str.replace(/^(-)?0\./, '$1.');
    return str;
}
function getType(thing) {
    return Object.prototype.toString.call(thing).slice(8, -1);
}
function escapeUnsafeChar(c) {
    return escaped$1[c] || c;
}
function escapeUnsafeChars(str) {
    return str.replace(unsafeChars, escapeUnsafeChar);
}
function safeKey(key) {
    return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? key : escapeUnsafeChars(JSON.stringify(key));
}
function safeProp(key) {
    return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? "." + key : "[" + escapeUnsafeChars(JSON.stringify(key)) + "]";
}
function stringifyString(str) {
    var result = '"';
    for (var i = 0; i < str.length; i += 1) {
        var char = str.charAt(i);
        var code = char.charCodeAt(0);
        if (char === '"') {
            result += '\\"';
        }
        else if (char in escaped$1) {
            result += escaped$1[char];
        }
        else if (code >= 0xd800 && code <= 0xdfff) {
            var next = str.charCodeAt(i + 1);
            // If this is the beginning of a [high, low] surrogate pair,
            // add the next two characters, otherwise escape
            if (code <= 0xdbff && (next >= 0xdc00 && next <= 0xdfff)) {
                result += char + str[++i];
            }
            else {
                result += "\\u" + code.toString(16).toUpperCase();
            }
        }
        else {
            result += char;
        }
    }
    result += '"';
    return result;
}

// Based on https://github.com/tmpvar/jsdom/blob/aa85b2abf07766ff7bf5c1f6daafb3726f2f2db5/lib/jsdom/living/blob.js

// fix for "Readable" isn't a named export issue
const Readable = Stream__default['default'].Readable;

const BUFFER = Symbol('buffer');
const TYPE = Symbol('type');

class Blob {
	constructor() {
		this[TYPE] = '';

		const blobParts = arguments[0];
		const options = arguments[1];

		const buffers = [];
		let size = 0;

		if (blobParts) {
			const a = blobParts;
			const length = Number(a.length);
			for (let i = 0; i < length; i++) {
				const element = a[i];
				let buffer;
				if (element instanceof Buffer) {
					buffer = element;
				} else if (ArrayBuffer.isView(element)) {
					buffer = Buffer.from(element.buffer, element.byteOffset, element.byteLength);
				} else if (element instanceof ArrayBuffer) {
					buffer = Buffer.from(element);
				} else if (element instanceof Blob) {
					buffer = element[BUFFER];
				} else {
					buffer = Buffer.from(typeof element === 'string' ? element : String(element));
				}
				size += buffer.length;
				buffers.push(buffer);
			}
		}

		this[BUFFER] = Buffer.concat(buffers);

		let type = options && options.type !== undefined && String(options.type).toLowerCase();
		if (type && !/[^\u0020-\u007E]/.test(type)) {
			this[TYPE] = type;
		}
	}
	get size() {
		return this[BUFFER].length;
	}
	get type() {
		return this[TYPE];
	}
	text() {
		return Promise.resolve(this[BUFFER].toString());
	}
	arrayBuffer() {
		const buf = this[BUFFER];
		const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
		return Promise.resolve(ab);
	}
	stream() {
		const readable = new Readable();
		readable._read = function () {};
		readable.push(this[BUFFER]);
		readable.push(null);
		return readable;
	}
	toString() {
		return '[object Blob]';
	}
	slice() {
		const size = this.size;

		const start = arguments[0];
		const end = arguments[1];
		let relativeStart, relativeEnd;
		if (start === undefined) {
			relativeStart = 0;
		} else if (start < 0) {
			relativeStart = Math.max(size + start, 0);
		} else {
			relativeStart = Math.min(start, size);
		}
		if (end === undefined) {
			relativeEnd = size;
		} else if (end < 0) {
			relativeEnd = Math.max(size + end, 0);
		} else {
			relativeEnd = Math.min(end, size);
		}
		const span = Math.max(relativeEnd - relativeStart, 0);

		const buffer = this[BUFFER];
		const slicedBuffer = buffer.slice(relativeStart, relativeStart + span);
		const blob = new Blob([], { type: arguments[2] });
		blob[BUFFER] = slicedBuffer;
		return blob;
	}
}

Object.defineProperties(Blob.prototype, {
	size: { enumerable: true },
	type: { enumerable: true },
	slice: { enumerable: true }
});

Object.defineProperty(Blob.prototype, Symbol.toStringTag, {
	value: 'Blob',
	writable: false,
	enumerable: false,
	configurable: true
});

/**
 * fetch-error.js
 *
 * FetchError interface for operational errors
 */

/**
 * Create FetchError instance
 *
 * @param   String      message      Error message for human
 * @param   String      type         Error type for machine
 * @param   String      systemError  For Node.js system error
 * @return  FetchError
 */
function FetchError(message, type, systemError) {
  Error.call(this, message);

  this.message = message;
  this.type = type;

  // when err.type is `system`, err.code contains system error code
  if (systemError) {
    this.code = this.errno = systemError.code;
  }

  // hide custom error implementation details from end-users
  Error.captureStackTrace(this, this.constructor);
}

FetchError.prototype = Object.create(Error.prototype);
FetchError.prototype.constructor = FetchError;
FetchError.prototype.name = 'FetchError';

let convert;
try {
	convert = require('encoding').convert;
} catch (e) {}

const INTERNALS = Symbol('Body internals');

// fix an issue where "PassThrough" isn't a named export for node <10
const PassThrough = Stream__default['default'].PassThrough;

/**
 * Body mixin
 *
 * Ref: https://fetch.spec.whatwg.org/#body
 *
 * @param   Stream  body  Readable stream
 * @param   Object  opts  Response options
 * @return  Void
 */
function Body(body) {
	var _this = this;

	var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	    _ref$size = _ref.size;

	let size = _ref$size === undefined ? 0 : _ref$size;
	var _ref$timeout = _ref.timeout;
	let timeout = _ref$timeout === undefined ? 0 : _ref$timeout;

	if (body == null) {
		// body is undefined or null
		body = null;
	} else if (isURLSearchParams(body)) {
		// body is a URLSearchParams
		body = Buffer.from(body.toString());
	} else if (isBlob(body)) ; else if (Buffer.isBuffer(body)) ; else if (Object.prototype.toString.call(body) === '[object ArrayBuffer]') {
		// body is ArrayBuffer
		body = Buffer.from(body);
	} else if (ArrayBuffer.isView(body)) {
		// body is ArrayBufferView
		body = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
	} else if (body instanceof Stream__default['default']) ; else {
		// none of the above
		// coerce to string then buffer
		body = Buffer.from(String(body));
	}
	this[INTERNALS] = {
		body,
		disturbed: false,
		error: null
	};
	this.size = size;
	this.timeout = timeout;

	if (body instanceof Stream__default['default']) {
		body.on('error', function (err) {
			const error = err.name === 'AbortError' ? err : new FetchError(`Invalid response body while trying to fetch ${_this.url}: ${err.message}`, 'system', err);
			_this[INTERNALS].error = error;
		});
	}
}

Body.prototype = {
	get body() {
		return this[INTERNALS].body;
	},

	get bodyUsed() {
		return this[INTERNALS].disturbed;
	},

	/**
  * Decode response as ArrayBuffer
  *
  * @return  Promise
  */
	arrayBuffer() {
		return consumeBody.call(this).then(function (buf) {
			return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
		});
	},

	/**
  * Return raw response as Blob
  *
  * @return Promise
  */
	blob() {
		let ct = this.headers && this.headers.get('content-type') || '';
		return consumeBody.call(this).then(function (buf) {
			return Object.assign(
			// Prevent copying
			new Blob([], {
				type: ct.toLowerCase()
			}), {
				[BUFFER]: buf
			});
		});
	},

	/**
  * Decode response as json
  *
  * @return  Promise
  */
	json() {
		var _this2 = this;

		return consumeBody.call(this).then(function (buffer) {
			try {
				return JSON.parse(buffer.toString());
			} catch (err) {
				return Body.Promise.reject(new FetchError(`invalid json response body at ${_this2.url} reason: ${err.message}`, 'invalid-json'));
			}
		});
	},

	/**
  * Decode response as text
  *
  * @return  Promise
  */
	text() {
		return consumeBody.call(this).then(function (buffer) {
			return buffer.toString();
		});
	},

	/**
  * Decode response as buffer (non-spec api)
  *
  * @return  Promise
  */
	buffer() {
		return consumeBody.call(this);
	},

	/**
  * Decode response as text, while automatically detecting the encoding and
  * trying to decode to UTF-8 (non-spec api)
  *
  * @return  Promise
  */
	textConverted() {
		var _this3 = this;

		return consumeBody.call(this).then(function (buffer) {
			return convertBody(buffer, _this3.headers);
		});
	}
};

// In browsers, all properties are enumerable.
Object.defineProperties(Body.prototype, {
	body: { enumerable: true },
	bodyUsed: { enumerable: true },
	arrayBuffer: { enumerable: true },
	blob: { enumerable: true },
	json: { enumerable: true },
	text: { enumerable: true }
});

Body.mixIn = function (proto) {
	for (const name of Object.getOwnPropertyNames(Body.prototype)) {
		// istanbul ignore else: future proof
		if (!(name in proto)) {
			const desc = Object.getOwnPropertyDescriptor(Body.prototype, name);
			Object.defineProperty(proto, name, desc);
		}
	}
};

/**
 * Consume and convert an entire Body to a Buffer.
 *
 * Ref: https://fetch.spec.whatwg.org/#concept-body-consume-body
 *
 * @return  Promise
 */
function consumeBody() {
	var _this4 = this;

	if (this[INTERNALS].disturbed) {
		return Body.Promise.reject(new TypeError(`body used already for: ${this.url}`));
	}

	this[INTERNALS].disturbed = true;

	if (this[INTERNALS].error) {
		return Body.Promise.reject(this[INTERNALS].error);
	}

	let body = this.body;

	// body is null
	if (body === null) {
		return Body.Promise.resolve(Buffer.alloc(0));
	}

	// body is blob
	if (isBlob(body)) {
		body = body.stream();
	}

	// body is buffer
	if (Buffer.isBuffer(body)) {
		return Body.Promise.resolve(body);
	}

	// istanbul ignore if: should never happen
	if (!(body instanceof Stream__default['default'])) {
		return Body.Promise.resolve(Buffer.alloc(0));
	}

	// body is stream
	// get ready to actually consume the body
	let accum = [];
	let accumBytes = 0;
	let abort = false;

	return new Body.Promise(function (resolve, reject) {
		let resTimeout;

		// allow timeout on slow response body
		if (_this4.timeout) {
			resTimeout = setTimeout(function () {
				abort = true;
				reject(new FetchError(`Response timeout while trying to fetch ${_this4.url} (over ${_this4.timeout}ms)`, 'body-timeout'));
			}, _this4.timeout);
		}

		// handle stream errors
		body.on('error', function (err) {
			if (err.name === 'AbortError') {
				// if the request was aborted, reject with this Error
				abort = true;
				reject(err);
			} else {
				// other errors, such as incorrect content-encoding
				reject(new FetchError(`Invalid response body while trying to fetch ${_this4.url}: ${err.message}`, 'system', err));
			}
		});

		body.on('data', function (chunk) {
			if (abort || chunk === null) {
				return;
			}

			if (_this4.size && accumBytes + chunk.length > _this4.size) {
				abort = true;
				reject(new FetchError(`content size at ${_this4.url} over limit: ${_this4.size}`, 'max-size'));
				return;
			}

			accumBytes += chunk.length;
			accum.push(chunk);
		});

		body.on('end', function () {
			if (abort) {
				return;
			}

			clearTimeout(resTimeout);

			try {
				resolve(Buffer.concat(accum, accumBytes));
			} catch (err) {
				// handle streams that have accumulated too much data (issue #414)
				reject(new FetchError(`Could not create Buffer from response body for ${_this4.url}: ${err.message}`, 'system', err));
			}
		});
	});
}

/**
 * Detect buffer encoding and convert to target encoding
 * ref: http://www.w3.org/TR/2011/WD-html5-20110113/parsing.html#determining-the-character-encoding
 *
 * @param   Buffer  buffer    Incoming buffer
 * @param   String  encoding  Target encoding
 * @return  String
 */
function convertBody(buffer, headers) {
	if (typeof convert !== 'function') {
		throw new Error('The package `encoding` must be installed to use the textConverted() function');
	}

	const ct = headers.get('content-type');
	let charset = 'utf-8';
	let res, str;

	// header
	if (ct) {
		res = /charset=([^;]*)/i.exec(ct);
	}

	// no charset in content type, peek at response body for at most 1024 bytes
	str = buffer.slice(0, 1024).toString();

	// html5
	if (!res && str) {
		res = /<meta.+?charset=(['"])(.+?)\1/i.exec(str);
	}

	// html4
	if (!res && str) {
		res = /<meta[\s]+?http-equiv=(['"])content-type\1[\s]+?content=(['"])(.+?)\2/i.exec(str);

		if (res) {
			res = /charset=(.*)/i.exec(res.pop());
		}
	}

	// xml
	if (!res && str) {
		res = /<\?xml.+?encoding=(['"])(.+?)\1/i.exec(str);
	}

	// found charset
	if (res) {
		charset = res.pop();

		// prevent decode issues when sites use incorrect encoding
		// ref: https://hsivonen.fi/encoding-menu/
		if (charset === 'gb2312' || charset === 'gbk') {
			charset = 'gb18030';
		}
	}

	// turn raw buffers into a single utf-8 buffer
	return convert(buffer, 'UTF-8', charset).toString();
}

/**
 * Detect a URLSearchParams object
 * ref: https://github.com/bitinn/node-fetch/issues/296#issuecomment-307598143
 *
 * @param   Object  obj     Object to detect by type or brand
 * @return  String
 */
function isURLSearchParams(obj) {
	// Duck-typing as a necessary condition.
	if (typeof obj !== 'object' || typeof obj.append !== 'function' || typeof obj.delete !== 'function' || typeof obj.get !== 'function' || typeof obj.getAll !== 'function' || typeof obj.has !== 'function' || typeof obj.set !== 'function') {
		return false;
	}

	// Brand-checking and more duck-typing as optional condition.
	return obj.constructor.name === 'URLSearchParams' || Object.prototype.toString.call(obj) === '[object URLSearchParams]' || typeof obj.sort === 'function';
}

/**
 * Check if `obj` is a W3C `Blob` object (which `File` inherits from)
 * @param  {*} obj
 * @return {boolean}
 */
function isBlob(obj) {
	return typeof obj === 'object' && typeof obj.arrayBuffer === 'function' && typeof obj.type === 'string' && typeof obj.stream === 'function' && typeof obj.constructor === 'function' && typeof obj.constructor.name === 'string' && /^(Blob|File)$/.test(obj.constructor.name) && /^(Blob|File)$/.test(obj[Symbol.toStringTag]);
}

/**
 * Clone body given Res/Req instance
 *
 * @param   Mixed  instance  Response or Request instance
 * @return  Mixed
 */
function clone(instance) {
	let p1, p2;
	let body = instance.body;

	// don't allow cloning a used body
	if (instance.bodyUsed) {
		throw new Error('cannot clone body after it is used');
	}

	// check that body is a stream and not form-data object
	// note: we can't clone the form-data object without having it as a dependency
	if (body instanceof Stream__default['default'] && typeof body.getBoundary !== 'function') {
		// tee instance body
		p1 = new PassThrough();
		p2 = new PassThrough();
		body.pipe(p1);
		body.pipe(p2);
		// set instance body to teed body and return the other teed body
		instance[INTERNALS].body = p1;
		body = p2;
	}

	return body;
}

/**
 * Performs the operation "extract a `Content-Type` value from |object|" as
 * specified in the specification:
 * https://fetch.spec.whatwg.org/#concept-bodyinit-extract
 *
 * This function assumes that instance.body is present.
 *
 * @param   Mixed  instance  Any options.body input
 */
function extractContentType(body) {
	if (body === null) {
		// body is null
		return null;
	} else if (typeof body === 'string') {
		// body is string
		return 'text/plain;charset=UTF-8';
	} else if (isURLSearchParams(body)) {
		// body is a URLSearchParams
		return 'application/x-www-form-urlencoded;charset=UTF-8';
	} else if (isBlob(body)) {
		// body is blob
		return body.type || null;
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		return null;
	} else if (Object.prototype.toString.call(body) === '[object ArrayBuffer]') {
		// body is ArrayBuffer
		return null;
	} else if (ArrayBuffer.isView(body)) {
		// body is ArrayBufferView
		return null;
	} else if (typeof body.getBoundary === 'function') {
		// detect form data input from form-data module
		return `multipart/form-data;boundary=${body.getBoundary()}`;
	} else if (body instanceof Stream__default['default']) {
		// body is stream
		// can't really do much about this
		return null;
	} else {
		// Body constructor defaults other things to string
		return 'text/plain;charset=UTF-8';
	}
}

/**
 * The Fetch Standard treats this as if "total bytes" is a property on the body.
 * For us, we have to explicitly get it with a function.
 *
 * ref: https://fetch.spec.whatwg.org/#concept-body-total-bytes
 *
 * @param   Body    instance   Instance of Body
 * @return  Number?            Number of bytes, or null if not possible
 */
function getTotalBytes(instance) {
	const body = instance.body;


	if (body === null) {
		// body is null
		return 0;
	} else if (isBlob(body)) {
		return body.size;
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		return body.length;
	} else if (body && typeof body.getLengthSync === 'function') {
		// detect form data input from form-data module
		if (body._lengthRetrievers && body._lengthRetrievers.length == 0 || // 1.x
		body.hasKnownLength && body.hasKnownLength()) {
			// 2.x
			return body.getLengthSync();
		}
		return null;
	} else {
		// body is stream
		return null;
	}
}

/**
 * Write a Body to a Node.js WritableStream (e.g. http.Request) object.
 *
 * @param   Body    instance   Instance of Body
 * @return  Void
 */
function writeToStream(dest, instance) {
	const body = instance.body;


	if (body === null) {
		// body is null
		dest.end();
	} else if (isBlob(body)) {
		body.stream().pipe(dest);
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		dest.write(body);
		dest.end();
	} else {
		// body is stream
		body.pipe(dest);
	}
}

// expose Promise
Body.Promise = global.Promise;

/**
 * headers.js
 *
 * Headers class offers convenient helpers
 */

const invalidTokenRegex = /[^\^_`a-zA-Z\-0-9!#$%&'*+.|~]/;
const invalidHeaderCharRegex = /[^\t\x20-\x7e\x80-\xff]/;

function validateName(name) {
	name = `${name}`;
	if (invalidTokenRegex.test(name) || name === '') {
		throw new TypeError(`${name} is not a legal HTTP header name`);
	}
}

function validateValue(value) {
	value = `${value}`;
	if (invalidHeaderCharRegex.test(value)) {
		throw new TypeError(`${value} is not a legal HTTP header value`);
	}
}

/**
 * Find the key in the map object given a header name.
 *
 * Returns undefined if not found.
 *
 * @param   String  name  Header name
 * @return  String|Undefined
 */
function find(map, name) {
	name = name.toLowerCase();
	for (const key in map) {
		if (key.toLowerCase() === name) {
			return key;
		}
	}
	return undefined;
}

const MAP = Symbol('map');
class Headers {
	/**
  * Headers class
  *
  * @param   Object  headers  Response headers
  * @return  Void
  */
	constructor() {
		let init = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

		this[MAP] = Object.create(null);

		if (init instanceof Headers) {
			const rawHeaders = init.raw();
			const headerNames = Object.keys(rawHeaders);

			for (const headerName of headerNames) {
				for (const value of rawHeaders[headerName]) {
					this.append(headerName, value);
				}
			}

			return;
		}

		// We don't worry about converting prop to ByteString here as append()
		// will handle it.
		if (init == null) ; else if (typeof init === 'object') {
			const method = init[Symbol.iterator];
			if (method != null) {
				if (typeof method !== 'function') {
					throw new TypeError('Header pairs must be iterable');
				}

				// sequence<sequence<ByteString>>
				// Note: per spec we have to first exhaust the lists then process them
				const pairs = [];
				for (const pair of init) {
					if (typeof pair !== 'object' || typeof pair[Symbol.iterator] !== 'function') {
						throw new TypeError('Each header pair must be iterable');
					}
					pairs.push(Array.from(pair));
				}

				for (const pair of pairs) {
					if (pair.length !== 2) {
						throw new TypeError('Each header pair must be a name/value tuple');
					}
					this.append(pair[0], pair[1]);
				}
			} else {
				// record<ByteString, ByteString>
				for (const key of Object.keys(init)) {
					const value = init[key];
					this.append(key, value);
				}
			}
		} else {
			throw new TypeError('Provided initializer must be an object');
		}
	}

	/**
  * Return combined header value given name
  *
  * @param   String  name  Header name
  * @return  Mixed
  */
	get(name) {
		name = `${name}`;
		validateName(name);
		const key = find(this[MAP], name);
		if (key === undefined) {
			return null;
		}

		return this[MAP][key].join(', ');
	}

	/**
  * Iterate over all headers
  *
  * @param   Function  callback  Executed for each item with parameters (value, name, thisArg)
  * @param   Boolean   thisArg   `this` context for callback function
  * @return  Void
  */
	forEach(callback) {
		let thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

		let pairs = getHeaders(this);
		let i = 0;
		while (i < pairs.length) {
			var _pairs$i = pairs[i];
			const name = _pairs$i[0],
			      value = _pairs$i[1];

			callback.call(thisArg, value, name, this);
			pairs = getHeaders(this);
			i++;
		}
	}

	/**
  * Overwrite header values given name
  *
  * @param   String  name   Header name
  * @param   String  value  Header value
  * @return  Void
  */
	set(name, value) {
		name = `${name}`;
		value = `${value}`;
		validateName(name);
		validateValue(value);
		const key = find(this[MAP], name);
		this[MAP][key !== undefined ? key : name] = [value];
	}

	/**
  * Append a value onto existing header
  *
  * @param   String  name   Header name
  * @param   String  value  Header value
  * @return  Void
  */
	append(name, value) {
		name = `${name}`;
		value = `${value}`;
		validateName(name);
		validateValue(value);
		const key = find(this[MAP], name);
		if (key !== undefined) {
			this[MAP][key].push(value);
		} else {
			this[MAP][name] = [value];
		}
	}

	/**
  * Check for header name existence
  *
  * @param   String   name  Header name
  * @return  Boolean
  */
	has(name) {
		name = `${name}`;
		validateName(name);
		return find(this[MAP], name) !== undefined;
	}

	/**
  * Delete all header values given name
  *
  * @param   String  name  Header name
  * @return  Void
  */
	delete(name) {
		name = `${name}`;
		validateName(name);
		const key = find(this[MAP], name);
		if (key !== undefined) {
			delete this[MAP][key];
		}
	}

	/**
  * Return raw headers (non-spec api)
  *
  * @return  Object
  */
	raw() {
		return this[MAP];
	}

	/**
  * Get an iterator on keys.
  *
  * @return  Iterator
  */
	keys() {
		return createHeadersIterator(this, 'key');
	}

	/**
  * Get an iterator on values.
  *
  * @return  Iterator
  */
	values() {
		return createHeadersIterator(this, 'value');
	}

	/**
  * Get an iterator on entries.
  *
  * This is the default iterator of the Headers object.
  *
  * @return  Iterator
  */
	[Symbol.iterator]() {
		return createHeadersIterator(this, 'key+value');
	}
}
Headers.prototype.entries = Headers.prototype[Symbol.iterator];

Object.defineProperty(Headers.prototype, Symbol.toStringTag, {
	value: 'Headers',
	writable: false,
	enumerable: false,
	configurable: true
});

Object.defineProperties(Headers.prototype, {
	get: { enumerable: true },
	forEach: { enumerable: true },
	set: { enumerable: true },
	append: { enumerable: true },
	has: { enumerable: true },
	delete: { enumerable: true },
	keys: { enumerable: true },
	values: { enumerable: true },
	entries: { enumerable: true }
});

function getHeaders(headers) {
	let kind = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'key+value';

	const keys = Object.keys(headers[MAP]).sort();
	return keys.map(kind === 'key' ? function (k) {
		return k.toLowerCase();
	} : kind === 'value' ? function (k) {
		return headers[MAP][k].join(', ');
	} : function (k) {
		return [k.toLowerCase(), headers[MAP][k].join(', ')];
	});
}

const INTERNAL = Symbol('internal');

function createHeadersIterator(target, kind) {
	const iterator = Object.create(HeadersIteratorPrototype);
	iterator[INTERNAL] = {
		target,
		kind,
		index: 0
	};
	return iterator;
}

const HeadersIteratorPrototype = Object.setPrototypeOf({
	next() {
		// istanbul ignore if
		if (!this || Object.getPrototypeOf(this) !== HeadersIteratorPrototype) {
			throw new TypeError('Value of `this` is not a HeadersIterator');
		}

		var _INTERNAL = this[INTERNAL];
		const target = _INTERNAL.target,
		      kind = _INTERNAL.kind,
		      index = _INTERNAL.index;

		const values = getHeaders(target, kind);
		const len = values.length;
		if (index >= len) {
			return {
				value: undefined,
				done: true
			};
		}

		this[INTERNAL].index = index + 1;

		return {
			value: values[index],
			done: false
		};
	}
}, Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]())));

Object.defineProperty(HeadersIteratorPrototype, Symbol.toStringTag, {
	value: 'HeadersIterator',
	writable: false,
	enumerable: false,
	configurable: true
});

/**
 * Export the Headers object in a form that Node.js can consume.
 *
 * @param   Headers  headers
 * @return  Object
 */
function exportNodeCompatibleHeaders(headers) {
	const obj = Object.assign({ __proto__: null }, headers[MAP]);

	// http.request() only supports string as Host header. This hack makes
	// specifying custom Host header possible.
	const hostHeaderKey = find(headers[MAP], 'Host');
	if (hostHeaderKey !== undefined) {
		obj[hostHeaderKey] = obj[hostHeaderKey][0];
	}

	return obj;
}

/**
 * Create a Headers object from an object of headers, ignoring those that do
 * not conform to HTTP grammar productions.
 *
 * @param   Object  obj  Object of headers
 * @return  Headers
 */
function createHeadersLenient(obj) {
	const headers = new Headers();
	for (const name of Object.keys(obj)) {
		if (invalidTokenRegex.test(name)) {
			continue;
		}
		if (Array.isArray(obj[name])) {
			for (const val of obj[name]) {
				if (invalidHeaderCharRegex.test(val)) {
					continue;
				}
				if (headers[MAP][name] === undefined) {
					headers[MAP][name] = [val];
				} else {
					headers[MAP][name].push(val);
				}
			}
		} else if (!invalidHeaderCharRegex.test(obj[name])) {
			headers[MAP][name] = [obj[name]];
		}
	}
	return headers;
}

const INTERNALS$1 = Symbol('Response internals');

// fix an issue where "STATUS_CODES" aren't a named export for node <10
const STATUS_CODES = http__default['default'].STATUS_CODES;

/**
 * Response class
 *
 * @param   Stream  body  Readable stream
 * @param   Object  opts  Response options
 * @return  Void
 */
class Response {
	constructor() {
		let body = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
		let opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		Body.call(this, body, opts);

		const status = opts.status || 200;
		const headers = new Headers(opts.headers);

		if (body != null && !headers.has('Content-Type')) {
			const contentType = extractContentType(body);
			if (contentType) {
				headers.append('Content-Type', contentType);
			}
		}

		this[INTERNALS$1] = {
			url: opts.url,
			status,
			statusText: opts.statusText || STATUS_CODES[status],
			headers,
			counter: opts.counter
		};
	}

	get url() {
		return this[INTERNALS$1].url || '';
	}

	get status() {
		return this[INTERNALS$1].status;
	}

	/**
  * Convenience property representing if the request ended normally
  */
	get ok() {
		return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
	}

	get redirected() {
		return this[INTERNALS$1].counter > 0;
	}

	get statusText() {
		return this[INTERNALS$1].statusText;
	}

	get headers() {
		return this[INTERNALS$1].headers;
	}

	/**
  * Clone this response
  *
  * @return  Response
  */
	clone() {
		return new Response(clone(this), {
			url: this.url,
			status: this.status,
			statusText: this.statusText,
			headers: this.headers,
			ok: this.ok,
			redirected: this.redirected
		});
	}
}

Body.mixIn(Response.prototype);

Object.defineProperties(Response.prototype, {
	url: { enumerable: true },
	status: { enumerable: true },
	ok: { enumerable: true },
	redirected: { enumerable: true },
	statusText: { enumerable: true },
	headers: { enumerable: true },
	clone: { enumerable: true }
});

Object.defineProperty(Response.prototype, Symbol.toStringTag, {
	value: 'Response',
	writable: false,
	enumerable: false,
	configurable: true
});

const INTERNALS$2 = Symbol('Request internals');

// fix an issue where "format", "parse" aren't a named export for node <10
const parse_url = Url__default['default'].parse;
const format_url = Url__default['default'].format;

const streamDestructionSupported = 'destroy' in Stream__default['default'].Readable.prototype;

/**
 * Check if a value is an instance of Request.
 *
 * @param   Mixed   input
 * @return  Boolean
 */
function isRequest(input) {
	return typeof input === 'object' && typeof input[INTERNALS$2] === 'object';
}

function isAbortSignal(signal) {
	const proto = signal && typeof signal === 'object' && Object.getPrototypeOf(signal);
	return !!(proto && proto.constructor.name === 'AbortSignal');
}

/**
 * Request class
 *
 * @param   Mixed   input  Url or Request instance
 * @param   Object  init   Custom options
 * @return  Void
 */
class Request {
	constructor(input) {
		let init = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		let parsedURL;

		// normalize input
		if (!isRequest(input)) {
			if (input && input.href) {
				// in order to support Node.js' Url objects; though WHATWG's URL objects
				// will fall into this branch also (since their `toString()` will return
				// `href` property anyway)
				parsedURL = parse_url(input.href);
			} else {
				// coerce input to a string before attempting to parse
				parsedURL = parse_url(`${input}`);
			}
			input = {};
		} else {
			parsedURL = parse_url(input.url);
		}

		let method = init.method || input.method || 'GET';
		method = method.toUpperCase();

		if ((init.body != null || isRequest(input) && input.body !== null) && (method === 'GET' || method === 'HEAD')) {
			throw new TypeError('Request with GET/HEAD method cannot have body');
		}

		let inputBody = init.body != null ? init.body : isRequest(input) && input.body !== null ? clone(input) : null;

		Body.call(this, inputBody, {
			timeout: init.timeout || input.timeout || 0,
			size: init.size || input.size || 0
		});

		const headers = new Headers(init.headers || input.headers || {});

		if (inputBody != null && !headers.has('Content-Type')) {
			const contentType = extractContentType(inputBody);
			if (contentType) {
				headers.append('Content-Type', contentType);
			}
		}

		let signal = isRequest(input) ? input.signal : null;
		if ('signal' in init) signal = init.signal;

		if (signal != null && !isAbortSignal(signal)) {
			throw new TypeError('Expected signal to be an instanceof AbortSignal');
		}

		this[INTERNALS$2] = {
			method,
			redirect: init.redirect || input.redirect || 'follow',
			headers,
			parsedURL,
			signal
		};

		// node-fetch-only options
		this.follow = init.follow !== undefined ? init.follow : input.follow !== undefined ? input.follow : 20;
		this.compress = init.compress !== undefined ? init.compress : input.compress !== undefined ? input.compress : true;
		this.counter = init.counter || input.counter || 0;
		this.agent = init.agent || input.agent;
	}

	get method() {
		return this[INTERNALS$2].method;
	}

	get url() {
		return format_url(this[INTERNALS$2].parsedURL);
	}

	get headers() {
		return this[INTERNALS$2].headers;
	}

	get redirect() {
		return this[INTERNALS$2].redirect;
	}

	get signal() {
		return this[INTERNALS$2].signal;
	}

	/**
  * Clone this request
  *
  * @return  Request
  */
	clone() {
		return new Request(this);
	}
}

Body.mixIn(Request.prototype);

Object.defineProperty(Request.prototype, Symbol.toStringTag, {
	value: 'Request',
	writable: false,
	enumerable: false,
	configurable: true
});

Object.defineProperties(Request.prototype, {
	method: { enumerable: true },
	url: { enumerable: true },
	headers: { enumerable: true },
	redirect: { enumerable: true },
	clone: { enumerable: true },
	signal: { enumerable: true }
});

/**
 * Convert a Request to Node.js http request options.
 *
 * @param   Request  A Request instance
 * @return  Object   The options object to be passed to http.request
 */
function getNodeRequestOptions(request) {
	const parsedURL = request[INTERNALS$2].parsedURL;
	const headers = new Headers(request[INTERNALS$2].headers);

	// fetch step 1.3
	if (!headers.has('Accept')) {
		headers.set('Accept', '*/*');
	}

	// Basic fetch
	if (!parsedURL.protocol || !parsedURL.hostname) {
		throw new TypeError('Only absolute URLs are supported');
	}

	if (!/^https?:$/.test(parsedURL.protocol)) {
		throw new TypeError('Only HTTP(S) protocols are supported');
	}

	if (request.signal && request.body instanceof Stream__default['default'].Readable && !streamDestructionSupported) {
		throw new Error('Cancellation of streamed requests with AbortSignal is not supported in node < 8');
	}

	// HTTP-network-or-cache fetch steps 2.4-2.7
	let contentLengthValue = null;
	if (request.body == null && /^(POST|PUT)$/i.test(request.method)) {
		contentLengthValue = '0';
	}
	if (request.body != null) {
		const totalBytes = getTotalBytes(request);
		if (typeof totalBytes === 'number') {
			contentLengthValue = String(totalBytes);
		}
	}
	if (contentLengthValue) {
		headers.set('Content-Length', contentLengthValue);
	}

	// HTTP-network-or-cache fetch step 2.11
	if (!headers.has('User-Agent')) {
		headers.set('User-Agent', 'node-fetch/1.0 (+https://github.com/bitinn/node-fetch)');
	}

	// HTTP-network-or-cache fetch step 2.15
	if (request.compress && !headers.has('Accept-Encoding')) {
		headers.set('Accept-Encoding', 'gzip,deflate');
	}

	let agent = request.agent;
	if (typeof agent === 'function') {
		agent = agent(parsedURL);
	}

	if (!headers.has('Connection') && !agent) {
		headers.set('Connection', 'close');
	}

	// HTTP-network fetch step 4.2
	// chunked encoding is handled by Node.js

	return Object.assign({}, parsedURL, {
		method: request.method,
		headers: exportNodeCompatibleHeaders(headers),
		agent
	});
}

/**
 * abort-error.js
 *
 * AbortError interface for cancelled requests
 */

/**
 * Create AbortError instance
 *
 * @param   String      message      Error message for human
 * @return  AbortError
 */
function AbortError(message) {
  Error.call(this, message);

  this.type = 'aborted';
  this.message = message;

  // hide custom error implementation details from end-users
  Error.captureStackTrace(this, this.constructor);
}

AbortError.prototype = Object.create(Error.prototype);
AbortError.prototype.constructor = AbortError;
AbortError.prototype.name = 'AbortError';

// fix an issue where "PassThrough", "resolve" aren't a named export for node <10
const PassThrough$1 = Stream__default['default'].PassThrough;
const resolve_url = Url__default['default'].resolve;

/**
 * Fetch function
 *
 * @param   Mixed    url   Absolute url or Request instance
 * @param   Object   opts  Fetch options
 * @return  Promise
 */
function fetch$1(url, opts) {

	// allow custom promise
	if (!fetch$1.Promise) {
		throw new Error('native promise missing, set fetch.Promise to your favorite alternative');
	}

	Body.Promise = fetch$1.Promise;

	// wrap http.request into fetch
	return new fetch$1.Promise(function (resolve, reject) {
		// build request object
		const request = new Request(url, opts);
		const options = getNodeRequestOptions(request);

		const send = (options.protocol === 'https:' ? https__default['default'] : http__default['default']).request;
		const signal = request.signal;

		let response = null;

		const abort = function abort() {
			let error = new AbortError('The user aborted a request.');
			reject(error);
			if (request.body && request.body instanceof Stream__default['default'].Readable) {
				request.body.destroy(error);
			}
			if (!response || !response.body) return;
			response.body.emit('error', error);
		};

		if (signal && signal.aborted) {
			abort();
			return;
		}

		const abortAndFinalize = function abortAndFinalize() {
			abort();
			finalize();
		};

		// send request
		const req = send(options);
		let reqTimeout;

		if (signal) {
			signal.addEventListener('abort', abortAndFinalize);
		}

		function finalize() {
			req.abort();
			if (signal) signal.removeEventListener('abort', abortAndFinalize);
			clearTimeout(reqTimeout);
		}

		if (request.timeout) {
			req.once('socket', function (socket) {
				reqTimeout = setTimeout(function () {
					reject(new FetchError(`network timeout at: ${request.url}`, 'request-timeout'));
					finalize();
				}, request.timeout);
			});
		}

		req.on('error', function (err) {
			reject(new FetchError(`request to ${request.url} failed, reason: ${err.message}`, 'system', err));
			finalize();
		});

		req.on('response', function (res) {
			clearTimeout(reqTimeout);

			const headers = createHeadersLenient(res.headers);

			// HTTP fetch step 5
			if (fetch$1.isRedirect(res.statusCode)) {
				// HTTP fetch step 5.2
				const location = headers.get('Location');

				// HTTP fetch step 5.3
				const locationURL = location === null ? null : resolve_url(request.url, location);

				// HTTP fetch step 5.5
				switch (request.redirect) {
					case 'error':
						reject(new FetchError(`redirect mode is set to error: ${request.url}`, 'no-redirect'));
						finalize();
						return;
					case 'manual':
						// node-fetch-specific step: make manual redirect a bit easier to use by setting the Location header value to the resolved URL.
						if (locationURL !== null) {
							// handle corrupted header
							try {
								headers.set('Location', locationURL);
							} catch (err) {
								// istanbul ignore next: nodejs server prevent invalid response headers, we can't test this through normal request
								reject(err);
							}
						}
						break;
					case 'follow':
						// HTTP-redirect fetch step 2
						if (locationURL === null) {
							break;
						}

						// HTTP-redirect fetch step 5
						if (request.counter >= request.follow) {
							reject(new FetchError(`maximum redirect reached at: ${request.url}`, 'max-redirect'));
							finalize();
							return;
						}

						// HTTP-redirect fetch step 6 (counter increment)
						// Create a new Request object.
						const requestOpts = {
							headers: new Headers(request.headers),
							follow: request.follow,
							counter: request.counter + 1,
							agent: request.agent,
							compress: request.compress,
							method: request.method,
							body: request.body,
							signal: request.signal,
							timeout: request.timeout
						};

						// HTTP-redirect fetch step 9
						if (res.statusCode !== 303 && request.body && getTotalBytes(request) === null) {
							reject(new FetchError('Cannot follow redirect with body being a readable stream', 'unsupported-redirect'));
							finalize();
							return;
						}

						// HTTP-redirect fetch step 11
						if (res.statusCode === 303 || (res.statusCode === 301 || res.statusCode === 302) && request.method === 'POST') {
							requestOpts.method = 'GET';
							requestOpts.body = undefined;
							requestOpts.headers.delete('content-length');
						}

						// HTTP-redirect fetch step 15
						resolve(fetch$1(new Request(locationURL, requestOpts)));
						finalize();
						return;
				}
			}

			// prepare response
			res.once('end', function () {
				if (signal) signal.removeEventListener('abort', abortAndFinalize);
			});
			let body = res.pipe(new PassThrough$1());

			const response_options = {
				url: request.url,
				status: res.statusCode,
				statusText: res.statusMessage,
				headers: headers,
				size: request.size,
				timeout: request.timeout,
				counter: request.counter
			};

			// HTTP-network fetch step 12.1.1.3
			const codings = headers.get('Content-Encoding');

			// HTTP-network fetch step 12.1.1.4: handle content codings

			// in following scenarios we ignore compression support
			// 1. compression support is disabled
			// 2. HEAD request
			// 3. no Content-Encoding header
			// 4. no content response (204)
			// 5. content not modified response (304)
			if (!request.compress || request.method === 'HEAD' || codings === null || res.statusCode === 204 || res.statusCode === 304) {
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// For Node v6+
			// Be less strict when decoding compressed responses, since sometimes
			// servers send slightly invalid responses that are still accepted
			// by common browsers.
			// Always using Z_SYNC_FLUSH is what cURL does.
			const zlibOptions = {
				flush: zlib__default['default'].Z_SYNC_FLUSH,
				finishFlush: zlib__default['default'].Z_SYNC_FLUSH
			};

			// for gzip
			if (codings == 'gzip' || codings == 'x-gzip') {
				body = body.pipe(zlib__default['default'].createGunzip(zlibOptions));
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// for deflate
			if (codings == 'deflate' || codings == 'x-deflate') {
				// handle the infamous raw deflate response from old servers
				// a hack for old IIS and Apache servers
				const raw = res.pipe(new PassThrough$1());
				raw.once('data', function (chunk) {
					// see http://stackoverflow.com/questions/37519828
					if ((chunk[0] & 0x0F) === 0x08) {
						body = body.pipe(zlib__default['default'].createInflate());
					} else {
						body = body.pipe(zlib__default['default'].createInflateRaw());
					}
					response = new Response(body, response_options);
					resolve(response);
				});
				return;
			}

			// for br
			if (codings == 'br' && typeof zlib__default['default'].createBrotliDecompress === 'function') {
				body = body.pipe(zlib__default['default'].createBrotliDecompress());
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// otherwise, use response as-is
			response = new Response(body, response_options);
			resolve(response);
		});

		writeToStream(req, request);
	});
}
/**
 * Redirect code matching
 *
 * @param   Number   code  Status code
 * @return  Boolean
 */
fetch$1.isRedirect = function (code) {
	return code === 301 || code === 302 || code === 303 || code === 307 || code === 308;
};

// expose Promise
fetch$1.Promise = global.Promise;

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var intToCharMap = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('');

/**
 * Encode an integer in the range of 0 to 63 to a single base 64 digit.
 */
var encode$1 = function (number) {
  if (0 <= number && number < intToCharMap.length) {
    return intToCharMap[number];
  }
  throw new TypeError("Must be between 0 and 63: " + number);
};

/**
 * Decode a single base 64 character code digit to an integer. Returns -1 on
 * failure.
 */
var decode$1 = function (charCode) {
  var bigA = 65;     // 'A'
  var bigZ = 90;     // 'Z'

  var littleA = 97;  // 'a'
  var littleZ = 122; // 'z'

  var zero = 48;     // '0'
  var nine = 57;     // '9'

  var plus = 43;     // '+'
  var slash = 47;    // '/'

  var littleOffset = 26;
  var numberOffset = 52;

  // 0 - 25: ABCDEFGHIJKLMNOPQRSTUVWXYZ
  if (bigA <= charCode && charCode <= bigZ) {
    return (charCode - bigA);
  }

  // 26 - 51: abcdefghijklmnopqrstuvwxyz
  if (littleA <= charCode && charCode <= littleZ) {
    return (charCode - littleA + littleOffset);
  }

  // 52 - 61: 0123456789
  if (zero <= charCode && charCode <= nine) {
    return (charCode - zero + numberOffset);
  }

  // 62: +
  if (charCode == plus) {
    return 62;
  }

  // 63: /
  if (charCode == slash) {
    return 63;
  }

  // Invalid base64 digit.
  return -1;
};

var base64 = {
	encode: encode$1,
	decode: decode$1
};

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 *
 * Based on the Base 64 VLQ implementation in Closure Compiler:
 * https://code.google.com/p/closure-compiler/source/browse/trunk/src/com/google/debugging/sourcemap/Base64VLQ.java
 *
 * Copyright 2011 The Closure Compiler Authors. All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *  * Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above
 *    copyright notice, this list of conditions and the following
 *    disclaimer in the documentation and/or other materials provided
 *    with the distribution.
 *  * Neither the name of Google Inc. nor the names of its
 *    contributors may be used to endorse or promote products derived
 *    from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */



// A single base 64 digit can contain 6 bits of data. For the base 64 variable
// length quantities we use in the source map spec, the first bit is the sign,
// the next four bits are the actual value, and the 6th bit is the
// continuation bit. The continuation bit tells us whether there are more
// digits in this value following this digit.
//
//   Continuation
//   |    Sign
//   |    |
//   V    V
//   101011

var VLQ_BASE_SHIFT = 5;

// binary: 100000
var VLQ_BASE = 1 << VLQ_BASE_SHIFT;

// binary: 011111
var VLQ_BASE_MASK = VLQ_BASE - 1;

// binary: 100000
var VLQ_CONTINUATION_BIT = VLQ_BASE;

/**
 * Converts from a two-complement value to a value where the sign bit is
 * placed in the least significant bit.  For example, as decimals:
 *   1 becomes 2 (10 binary), -1 becomes 3 (11 binary)
 *   2 becomes 4 (100 binary), -2 becomes 5 (101 binary)
 */
function toVLQSigned(aValue) {
  return aValue < 0
    ? ((-aValue) << 1) + 1
    : (aValue << 1) + 0;
}

/**
 * Converts to a two-complement value from a value where the sign bit is
 * placed in the least significant bit.  For example, as decimals:
 *   2 (10 binary) becomes 1, 3 (11 binary) becomes -1
 *   4 (100 binary) becomes 2, 5 (101 binary) becomes -2
 */
function fromVLQSigned(aValue) {
  var isNegative = (aValue & 1) === 1;
  var shifted = aValue >> 1;
  return isNegative
    ? -shifted
    : shifted;
}

/**
 * Returns the base 64 VLQ encoded value.
 */
var encode$2 = function base64VLQ_encode(aValue) {
  var encoded = "";
  var digit;

  var vlq = toVLQSigned(aValue);

  do {
    digit = vlq & VLQ_BASE_MASK;
    vlq >>>= VLQ_BASE_SHIFT;
    if (vlq > 0) {
      // There are still more digits in this value, so we must make sure the
      // continuation bit is marked.
      digit |= VLQ_CONTINUATION_BIT;
    }
    encoded += base64.encode(digit);
  } while (vlq > 0);

  return encoded;
};

/**
 * Decodes the next base 64 VLQ value from the given string and returns the
 * value and the rest of the string via the out parameter.
 */
var decode$2 = function base64VLQ_decode(aStr, aIndex, aOutParam) {
  var strLen = aStr.length;
  var result = 0;
  var shift = 0;
  var continuation, digit;

  do {
    if (aIndex >= strLen) {
      throw new Error("Expected more digits in base 64 VLQ value.");
    }

    digit = base64.decode(aStr.charCodeAt(aIndex++));
    if (digit === -1) {
      throw new Error("Invalid base64 digit: " + aStr.charAt(aIndex - 1));
    }

    continuation = !!(digit & VLQ_CONTINUATION_BIT);
    digit &= VLQ_BASE_MASK;
    result = result + (digit << shift);
    shift += VLQ_BASE_SHIFT;
  } while (continuation);

  aOutParam.value = fromVLQSigned(result);
  aOutParam.rest = aIndex;
};

var base64Vlq = {
	encode: encode$2,
	decode: decode$2
};

function createCommonjsModule(fn, basedir, module) {
	return module = {
	  path: basedir,
	  exports: {},
	  require: function (path, base) {
      return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
    }
	}, fn(module, module.exports), module.exports;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

var util = createCommonjsModule(function (module, exports) {
/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

/**
 * This is a helper function for getting values from parameter/options
 * objects.
 *
 * @param args The object we are extracting values from
 * @param name The name of the property we are getting.
 * @param defaultValue An optional value to return if the property is missing
 * from the object. If this is not specified and the property is missing, an
 * error will be thrown.
 */
function getArg(aArgs, aName, aDefaultValue) {
  if (aName in aArgs) {
    return aArgs[aName];
  } else if (arguments.length === 3) {
    return aDefaultValue;
  } else {
    throw new Error('"' + aName + '" is a required argument.');
  }
}
exports.getArg = getArg;

var urlRegexp = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/;
var dataUrlRegexp = /^data:.+\,.+$/;

function urlParse(aUrl) {
  var match = aUrl.match(urlRegexp);
  if (!match) {
    return null;
  }
  return {
    scheme: match[1],
    auth: match[2],
    host: match[3],
    port: match[4],
    path: match[5]
  };
}
exports.urlParse = urlParse;

function urlGenerate(aParsedUrl) {
  var url = '';
  if (aParsedUrl.scheme) {
    url += aParsedUrl.scheme + ':';
  }
  url += '//';
  if (aParsedUrl.auth) {
    url += aParsedUrl.auth + '@';
  }
  if (aParsedUrl.host) {
    url += aParsedUrl.host;
  }
  if (aParsedUrl.port) {
    url += ":" + aParsedUrl.port;
  }
  if (aParsedUrl.path) {
    url += aParsedUrl.path;
  }
  return url;
}
exports.urlGenerate = urlGenerate;

/**
 * Normalizes a path, or the path portion of a URL:
 *
 * - Replaces consecutive slashes with one slash.
 * - Removes unnecessary '.' parts.
 * - Removes unnecessary '<dir>/..' parts.
 *
 * Based on code in the Node.js 'path' core module.
 *
 * @param aPath The path or url to normalize.
 */
function normalize(aPath) {
  var path = aPath;
  var url = urlParse(aPath);
  if (url) {
    if (!url.path) {
      return aPath;
    }
    path = url.path;
  }
  var isAbsolute = exports.isAbsolute(path);

  var parts = path.split(/\/+/);
  for (var part, up = 0, i = parts.length - 1; i >= 0; i--) {
    part = parts[i];
    if (part === '.') {
      parts.splice(i, 1);
    } else if (part === '..') {
      up++;
    } else if (up > 0) {
      if (part === '') {
        // The first part is blank if the path is absolute. Trying to go
        // above the root is a no-op. Therefore we can remove all '..' parts
        // directly after the root.
        parts.splice(i + 1, up);
        up = 0;
      } else {
        parts.splice(i, 2);
        up--;
      }
    }
  }
  path = parts.join('/');

  if (path === '') {
    path = isAbsolute ? '/' : '.';
  }

  if (url) {
    url.path = path;
    return urlGenerate(url);
  }
  return path;
}
exports.normalize = normalize;

/**
 * Joins two paths/URLs.
 *
 * @param aRoot The root path or URL.
 * @param aPath The path or URL to be joined with the root.
 *
 * - If aPath is a URL or a data URI, aPath is returned, unless aPath is a
 *   scheme-relative URL: Then the scheme of aRoot, if any, is prepended
 *   first.
 * - Otherwise aPath is a path. If aRoot is a URL, then its path portion
 *   is updated with the result and aRoot is returned. Otherwise the result
 *   is returned.
 *   - If aPath is absolute, the result is aPath.
 *   - Otherwise the two paths are joined with a slash.
 * - Joining for example 'http://' and 'www.example.com' is also supported.
 */
function join(aRoot, aPath) {
  if (aRoot === "") {
    aRoot = ".";
  }
  if (aPath === "") {
    aPath = ".";
  }
  var aPathUrl = urlParse(aPath);
  var aRootUrl = urlParse(aRoot);
  if (aRootUrl) {
    aRoot = aRootUrl.path || '/';
  }

  // `join(foo, '//www.example.org')`
  if (aPathUrl && !aPathUrl.scheme) {
    if (aRootUrl) {
      aPathUrl.scheme = aRootUrl.scheme;
    }
    return urlGenerate(aPathUrl);
  }

  if (aPathUrl || aPath.match(dataUrlRegexp)) {
    return aPath;
  }

  // `join('http://', 'www.example.com')`
  if (aRootUrl && !aRootUrl.host && !aRootUrl.path) {
    aRootUrl.host = aPath;
    return urlGenerate(aRootUrl);
  }

  var joined = aPath.charAt(0) === '/'
    ? aPath
    : normalize(aRoot.replace(/\/+$/, '') + '/' + aPath);

  if (aRootUrl) {
    aRootUrl.path = joined;
    return urlGenerate(aRootUrl);
  }
  return joined;
}
exports.join = join;

exports.isAbsolute = function (aPath) {
  return aPath.charAt(0) === '/' || urlRegexp.test(aPath);
};

/**
 * Make a path relative to a URL or another path.
 *
 * @param aRoot The root path or URL.
 * @param aPath The path or URL to be made relative to aRoot.
 */
function relative(aRoot, aPath) {
  if (aRoot === "") {
    aRoot = ".";
  }

  aRoot = aRoot.replace(/\/$/, '');

  // It is possible for the path to be above the root. In this case, simply
  // checking whether the root is a prefix of the path won't work. Instead, we
  // need to remove components from the root one by one, until either we find
  // a prefix that fits, or we run out of components to remove.
  var level = 0;
  while (aPath.indexOf(aRoot + '/') !== 0) {
    var index = aRoot.lastIndexOf("/");
    if (index < 0) {
      return aPath;
    }

    // If the only part of the root that is left is the scheme (i.e. http://,
    // file:///, etc.), one or more slashes (/), or simply nothing at all, we
    // have exhausted all components, so the path is not relative to the root.
    aRoot = aRoot.slice(0, index);
    if (aRoot.match(/^([^\/]+:\/)?\/*$/)) {
      return aPath;
    }

    ++level;
  }

  // Make sure we add a "../" for each component we removed from the root.
  return Array(level + 1).join("../") + aPath.substr(aRoot.length + 1);
}
exports.relative = relative;

var supportsNullProto = (function () {
  var obj = Object.create(null);
  return !('__proto__' in obj);
}());

function identity (s) {
  return s;
}

/**
 * Because behavior goes wacky when you set `__proto__` on objects, we
 * have to prefix all the strings in our set with an arbitrary character.
 *
 * See https://github.com/mozilla/source-map/pull/31 and
 * https://github.com/mozilla/source-map/issues/30
 *
 * @param String aStr
 */
function toSetString(aStr) {
  if (isProtoString(aStr)) {
    return '$' + aStr;
  }

  return aStr;
}
exports.toSetString = supportsNullProto ? identity : toSetString;

function fromSetString(aStr) {
  if (isProtoString(aStr)) {
    return aStr.slice(1);
  }

  return aStr;
}
exports.fromSetString = supportsNullProto ? identity : fromSetString;

function isProtoString(s) {
  if (!s) {
    return false;
  }

  var length = s.length;

  if (length < 9 /* "__proto__".length */) {
    return false;
  }

  if (s.charCodeAt(length - 1) !== 95  /* '_' */ ||
      s.charCodeAt(length - 2) !== 95  /* '_' */ ||
      s.charCodeAt(length - 3) !== 111 /* 'o' */ ||
      s.charCodeAt(length - 4) !== 116 /* 't' */ ||
      s.charCodeAt(length - 5) !== 111 /* 'o' */ ||
      s.charCodeAt(length - 6) !== 114 /* 'r' */ ||
      s.charCodeAt(length - 7) !== 112 /* 'p' */ ||
      s.charCodeAt(length - 8) !== 95  /* '_' */ ||
      s.charCodeAt(length - 9) !== 95  /* '_' */) {
    return false;
  }

  for (var i = length - 10; i >= 0; i--) {
    if (s.charCodeAt(i) !== 36 /* '$' */) {
      return false;
    }
  }

  return true;
}

/**
 * Comparator between two mappings where the original positions are compared.
 *
 * Optionally pass in `true` as `onlyCompareGenerated` to consider two
 * mappings with the same original source/line/column, but different generated
 * line and column the same. Useful when searching for a mapping with a
 * stubbed out mapping.
 */
function compareByOriginalPositions(mappingA, mappingB, onlyCompareOriginal) {
  var cmp = strcmp(mappingA.source, mappingB.source);
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalLine - mappingB.originalLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalColumn - mappingB.originalColumn;
  if (cmp !== 0 || onlyCompareOriginal) {
    return cmp;
  }

  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.generatedLine - mappingB.generatedLine;
  if (cmp !== 0) {
    return cmp;
  }

  return strcmp(mappingA.name, mappingB.name);
}
exports.compareByOriginalPositions = compareByOriginalPositions;

/**
 * Comparator between two mappings with deflated source and name indices where
 * the generated positions are compared.
 *
 * Optionally pass in `true` as `onlyCompareGenerated` to consider two
 * mappings with the same generated line and column, but different
 * source/name/original line and column the same. Useful when searching for a
 * mapping with a stubbed out mapping.
 */
function compareByGeneratedPositionsDeflated(mappingA, mappingB, onlyCompareGenerated) {
  var cmp = mappingA.generatedLine - mappingB.generatedLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
  if (cmp !== 0 || onlyCompareGenerated) {
    return cmp;
  }

  cmp = strcmp(mappingA.source, mappingB.source);
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalLine - mappingB.originalLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalColumn - mappingB.originalColumn;
  if (cmp !== 0) {
    return cmp;
  }

  return strcmp(mappingA.name, mappingB.name);
}
exports.compareByGeneratedPositionsDeflated = compareByGeneratedPositionsDeflated;

function strcmp(aStr1, aStr2) {
  if (aStr1 === aStr2) {
    return 0;
  }

  if (aStr1 === null) {
    return 1; // aStr2 !== null
  }

  if (aStr2 === null) {
    return -1; // aStr1 !== null
  }

  if (aStr1 > aStr2) {
    return 1;
  }

  return -1;
}

/**
 * Comparator between two mappings with inflated source and name strings where
 * the generated positions are compared.
 */
function compareByGeneratedPositionsInflated(mappingA, mappingB) {
  var cmp = mappingA.generatedLine - mappingB.generatedLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = strcmp(mappingA.source, mappingB.source);
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalLine - mappingB.originalLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalColumn - mappingB.originalColumn;
  if (cmp !== 0) {
    return cmp;
  }

  return strcmp(mappingA.name, mappingB.name);
}
exports.compareByGeneratedPositionsInflated = compareByGeneratedPositionsInflated;

/**
 * Strip any JSON XSSI avoidance prefix from the string (as documented
 * in the source maps specification), and then parse the string as
 * JSON.
 */
function parseSourceMapInput(str) {
  return JSON.parse(str.replace(/^\)]}'[^\n]*\n/, ''));
}
exports.parseSourceMapInput = parseSourceMapInput;

/**
 * Compute the URL of a source given the the source root, the source's
 * URL, and the source map's URL.
 */
function computeSourceURL(sourceRoot, sourceURL, sourceMapURL) {
  sourceURL = sourceURL || '';

  if (sourceRoot) {
    // This follows what Chrome does.
    if (sourceRoot[sourceRoot.length - 1] !== '/' && sourceURL[0] !== '/') {
      sourceRoot += '/';
    }
    // The spec says:
    //   Line 4: An optional source root, useful for relocating source
    //   files on a server or removing repeated values in the
    //   “sources” entry.  This value is prepended to the individual
    //   entries in the “source” field.
    sourceURL = sourceRoot + sourceURL;
  }

  // Historically, SourceMapConsumer did not take the sourceMapURL as
  // a parameter.  This mode is still somewhat supported, which is why
  // this code block is conditional.  However, it's preferable to pass
  // the source map URL to SourceMapConsumer, so that this function
  // can implement the source URL resolution algorithm as outlined in
  // the spec.  This block is basically the equivalent of:
  //    new URL(sourceURL, sourceMapURL).toString()
  // ... except it avoids using URL, which wasn't available in the
  // older releases of node still supported by this library.
  //
  // The spec says:
  //   If the sources are not absolute URLs after prepending of the
  //   “sourceRoot”, the sources are resolved relative to the
  //   SourceMap (like resolving script src in a html document).
  if (sourceMapURL) {
    var parsed = urlParse(sourceMapURL);
    if (!parsed) {
      throw new Error("sourceMapURL could not be parsed");
    }
    if (parsed.path) {
      // Strip the last path component, but keep the "/".
      var index = parsed.path.lastIndexOf('/');
      if (index >= 0) {
        parsed.path = parsed.path.substring(0, index + 1);
      }
    }
    sourceURL = join(urlGenerate(parsed), sourceURL);
  }

  return normalize(sourceURL);
}
exports.computeSourceURL = computeSourceURL;
});

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */


var has = Object.prototype.hasOwnProperty;
var hasNativeMap = typeof Map !== "undefined";

/**
 * A data structure which is a combination of an array and a set. Adding a new
 * member is O(1), testing for membership is O(1), and finding the index of an
 * element is O(1). Removing elements from the set is not supported. Only
 * strings are supported for membership.
 */
function ArraySet() {
  this._array = [];
  this._set = hasNativeMap ? new Map() : Object.create(null);
}

/**
 * Static method for creating ArraySet instances from an existing array.
 */
ArraySet.fromArray = function ArraySet_fromArray(aArray, aAllowDuplicates) {
  var set = new ArraySet();
  for (var i = 0, len = aArray.length; i < len; i++) {
    set.add(aArray[i], aAllowDuplicates);
  }
  return set;
};

/**
 * Return how many unique items are in this ArraySet. If duplicates have been
 * added, than those do not count towards the size.
 *
 * @returns Number
 */
ArraySet.prototype.size = function ArraySet_size() {
  return hasNativeMap ? this._set.size : Object.getOwnPropertyNames(this._set).length;
};

/**
 * Add the given string to this set.
 *
 * @param String aStr
 */
ArraySet.prototype.add = function ArraySet_add(aStr, aAllowDuplicates) {
  var sStr = hasNativeMap ? aStr : util.toSetString(aStr);
  var isDuplicate = hasNativeMap ? this.has(aStr) : has.call(this._set, sStr);
  var idx = this._array.length;
  if (!isDuplicate || aAllowDuplicates) {
    this._array.push(aStr);
  }
  if (!isDuplicate) {
    if (hasNativeMap) {
      this._set.set(aStr, idx);
    } else {
      this._set[sStr] = idx;
    }
  }
};

/**
 * Is the given string a member of this set?
 *
 * @param String aStr
 */
ArraySet.prototype.has = function ArraySet_has(aStr) {
  if (hasNativeMap) {
    return this._set.has(aStr);
  } else {
    var sStr = util.toSetString(aStr);
    return has.call(this._set, sStr);
  }
};

/**
 * What is the index of the given string in the array?
 *
 * @param String aStr
 */
ArraySet.prototype.indexOf = function ArraySet_indexOf(aStr) {
  if (hasNativeMap) {
    var idx = this._set.get(aStr);
    if (idx >= 0) {
        return idx;
    }
  } else {
    var sStr = util.toSetString(aStr);
    if (has.call(this._set, sStr)) {
      return this._set[sStr];
    }
  }

  throw new Error('"' + aStr + '" is not in the set.');
};

/**
 * What is the element at the given index?
 *
 * @param Number aIdx
 */
ArraySet.prototype.at = function ArraySet_at(aIdx) {
  if (aIdx >= 0 && aIdx < this._array.length) {
    return this._array[aIdx];
  }
  throw new Error('No element indexed by ' + aIdx);
};

/**
 * Returns the array representation of this set (which has the proper indices
 * indicated by indexOf). Note that this is a copy of the internal array used
 * for storing the members so that no one can mess with internal state.
 */
ArraySet.prototype.toArray = function ArraySet_toArray() {
  return this._array.slice();
};

var ArraySet_1 = ArraySet;

var arraySet = {
	ArraySet: ArraySet_1
};

var binarySearch = createCommonjsModule(function (module, exports) {
/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

exports.GREATEST_LOWER_BOUND = 1;
exports.LEAST_UPPER_BOUND = 2;

/**
 * Recursive implementation of binary search.
 *
 * @param aLow Indices here and lower do not contain the needle.
 * @param aHigh Indices here and higher do not contain the needle.
 * @param aNeedle The element being searched for.
 * @param aHaystack The non-empty array being searched.
 * @param aCompare Function which takes two elements and returns -1, 0, or 1.
 * @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
 *     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
 *     closest element that is smaller than or greater than the one we are
 *     searching for, respectively, if the exact element cannot be found.
 */
function recursiveSearch(aLow, aHigh, aNeedle, aHaystack, aCompare, aBias) {
  // This function terminates when one of the following is true:
  //
  //   1. We find the exact element we are looking for.
  //
  //   2. We did not find the exact element, but we can return the index of
  //      the next-closest element.
  //
  //   3. We did not find the exact element, and there is no next-closest
  //      element than the one we are searching for, so we return -1.
  var mid = Math.floor((aHigh - aLow) / 2) + aLow;
  var cmp = aCompare(aNeedle, aHaystack[mid], true);
  if (cmp === 0) {
    // Found the element we are looking for.
    return mid;
  }
  else if (cmp > 0) {
    // Our needle is greater than aHaystack[mid].
    if (aHigh - mid > 1) {
      // The element is in the upper half.
      return recursiveSearch(mid, aHigh, aNeedle, aHaystack, aCompare, aBias);
    }

    // The exact needle element was not found in this haystack. Determine if
    // we are in termination case (3) or (2) and return the appropriate thing.
    if (aBias == exports.LEAST_UPPER_BOUND) {
      return aHigh < aHaystack.length ? aHigh : -1;
    } else {
      return mid;
    }
  }
  else {
    // Our needle is less than aHaystack[mid].
    if (mid - aLow > 1) {
      // The element is in the lower half.
      return recursiveSearch(aLow, mid, aNeedle, aHaystack, aCompare, aBias);
    }

    // we are in termination case (3) or (2) and return the appropriate thing.
    if (aBias == exports.LEAST_UPPER_BOUND) {
      return mid;
    } else {
      return aLow < 0 ? -1 : aLow;
    }
  }
}

/**
 * This is an implementation of binary search which will always try and return
 * the index of the closest element if there is no exact hit. This is because
 * mappings between original and generated line/col pairs are single points,
 * and there is an implicit region between each of them, so a miss just means
 * that you aren't on the very start of a region.
 *
 * @param aNeedle The element you are looking for.
 * @param aHaystack The array that is being searched.
 * @param aCompare A function which takes the needle and an element in the
 *     array and returns -1, 0, or 1 depending on whether the needle is less
 *     than, equal to, or greater than the element, respectively.
 * @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
 *     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
 *     closest element that is smaller than or greater than the one we are
 *     searching for, respectively, if the exact element cannot be found.
 *     Defaults to 'binarySearch.GREATEST_LOWER_BOUND'.
 */
exports.search = function search(aNeedle, aHaystack, aCompare, aBias) {
  if (aHaystack.length === 0) {
    return -1;
  }

  var index = recursiveSearch(-1, aHaystack.length, aNeedle, aHaystack,
                              aCompare, aBias || exports.GREATEST_LOWER_BOUND);
  if (index < 0) {
    return -1;
  }

  // We have found either the exact element, or the next-closest element than
  // the one we are searching for. However, there may be more than one such
  // element. Make sure we always return the smallest of these.
  while (index - 1 >= 0) {
    if (aCompare(aHaystack[index], aHaystack[index - 1], true) !== 0) {
      break;
    }
    --index;
  }

  return index;
};
});

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

// It turns out that some (most?) JavaScript engines don't self-host
// `Array.prototype.sort`. This makes sense because C++ will likely remain
// faster than JS when doing raw CPU-intensive sorting. However, when using a
// custom comparator function, calling back and forth between the VM's C++ and
// JIT'd JS is rather slow *and* loses JIT type information, resulting in
// worse generated code for the comparator function than would be optimal. In
// fact, when sorting with a comparator, these costs outweigh the benefits of
// sorting in C++. By using our own JS-implemented Quick Sort (below), we get
// a ~3500ms mean speed-up in `bench/bench.html`.

/**
 * Swap the elements indexed by `x` and `y` in the array `ary`.
 *
 * @param {Array} ary
 *        The array.
 * @param {Number} x
 *        The index of the first item.
 * @param {Number} y
 *        The index of the second item.
 */
function swap(ary, x, y) {
  var temp = ary[x];
  ary[x] = ary[y];
  ary[y] = temp;
}

/**
 * Returns a random integer within the range `low .. high` inclusive.
 *
 * @param {Number} low
 *        The lower bound on the range.
 * @param {Number} high
 *        The upper bound on the range.
 */
function randomIntInRange(low, high) {
  return Math.round(low + (Math.random() * (high - low)));
}

/**
 * The Quick Sort algorithm.
 *
 * @param {Array} ary
 *        An array to sort.
 * @param {function} comparator
 *        Function to use to compare two items.
 * @param {Number} p
 *        Start index of the array
 * @param {Number} r
 *        End index of the array
 */
function doQuickSort(ary, comparator, p, r) {
  // If our lower bound is less than our upper bound, we (1) partition the
  // array into two pieces and (2) recurse on each half. If it is not, this is
  // the empty array and our base case.

  if (p < r) {
    // (1) Partitioning.
    //
    // The partitioning chooses a pivot between `p` and `r` and moves all
    // elements that are less than or equal to the pivot to the before it, and
    // all the elements that are greater than it after it. The effect is that
    // once partition is done, the pivot is in the exact place it will be when
    // the array is put in sorted order, and it will not need to be moved
    // again. This runs in O(n) time.

    // Always choose a random pivot so that an input array which is reverse
    // sorted does not cause O(n^2) running time.
    var pivotIndex = randomIntInRange(p, r);
    var i = p - 1;

    swap(ary, pivotIndex, r);
    var pivot = ary[r];

    // Immediately after `j` is incremented in this loop, the following hold
    // true:
    //
    //   * Every element in `ary[p .. i]` is less than or equal to the pivot.
    //
    //   * Every element in `ary[i+1 .. j-1]` is greater than the pivot.
    for (var j = p; j < r; j++) {
      if (comparator(ary[j], pivot) <= 0) {
        i += 1;
        swap(ary, i, j);
      }
    }

    swap(ary, i + 1, j);
    var q = i + 1;

    // (2) Recurse on each half.

    doQuickSort(ary, comparator, p, q - 1);
    doQuickSort(ary, comparator, q + 1, r);
  }
}

/**
 * Sort the given array in-place with the given comparator function.
 *
 * @param {Array} ary
 *        An array to sort.
 * @param {function} comparator
 *        Function to use to compare two items.
 */
var quickSort_1 = function (ary, comparator) {
  doQuickSort(ary, comparator, 0, ary.length - 1);
};

var quickSort = {
	quickSort: quickSort_1
};

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */



var ArraySet$1 = arraySet.ArraySet;

var quickSort$1 = quickSort.quickSort;

function SourceMapConsumer(aSourceMap, aSourceMapURL) {
  var sourceMap = aSourceMap;
  if (typeof aSourceMap === 'string') {
    sourceMap = util.parseSourceMapInput(aSourceMap);
  }

  return sourceMap.sections != null
    ? new IndexedSourceMapConsumer(sourceMap, aSourceMapURL)
    : new BasicSourceMapConsumer(sourceMap, aSourceMapURL);
}

SourceMapConsumer.fromSourceMap = function(aSourceMap, aSourceMapURL) {
  return BasicSourceMapConsumer.fromSourceMap(aSourceMap, aSourceMapURL);
};

/**
 * The version of the source mapping spec that we are consuming.
 */
SourceMapConsumer.prototype._version = 3;

// `__generatedMappings` and `__originalMappings` are arrays that hold the
// parsed mapping coordinates from the source map's "mappings" attribute. They
// are lazily instantiated, accessed via the `_generatedMappings` and
// `_originalMappings` getters respectively, and we only parse the mappings
// and create these arrays once queried for a source location. We jump through
// these hoops because there can be many thousands of mappings, and parsing
// them is expensive, so we only want to do it if we must.
//
// Each object in the arrays is of the form:
//
//     {
//       generatedLine: The line number in the generated code,
//       generatedColumn: The column number in the generated code,
//       source: The path to the original source file that generated this
//               chunk of code,
//       originalLine: The line number in the original source that
//                     corresponds to this chunk of generated code,
//       originalColumn: The column number in the original source that
//                       corresponds to this chunk of generated code,
//       name: The name of the original symbol which generated this chunk of
//             code.
//     }
//
// All properties except for `generatedLine` and `generatedColumn` can be
// `null`.
//
// `_generatedMappings` is ordered by the generated positions.
//
// `_originalMappings` is ordered by the original positions.

SourceMapConsumer.prototype.__generatedMappings = null;
Object.defineProperty(SourceMapConsumer.prototype, '_generatedMappings', {
  configurable: true,
  enumerable: true,
  get: function () {
    if (!this.__generatedMappings) {
      this._parseMappings(this._mappings, this.sourceRoot);
    }

    return this.__generatedMappings;
  }
});

SourceMapConsumer.prototype.__originalMappings = null;
Object.defineProperty(SourceMapConsumer.prototype, '_originalMappings', {
  configurable: true,
  enumerable: true,
  get: function () {
    if (!this.__originalMappings) {
      this._parseMappings(this._mappings, this.sourceRoot);
    }

    return this.__originalMappings;
  }
});

SourceMapConsumer.prototype._charIsMappingSeparator =
  function SourceMapConsumer_charIsMappingSeparator(aStr, index) {
    var c = aStr.charAt(index);
    return c === ";" || c === ",";
  };

/**
 * Parse the mappings in a string in to a data structure which we can easily
 * query (the ordered arrays in the `this.__generatedMappings` and
 * `this.__originalMappings` properties).
 */
SourceMapConsumer.prototype._parseMappings =
  function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
    throw new Error("Subclasses must implement _parseMappings");
  };

SourceMapConsumer.GENERATED_ORDER = 1;
SourceMapConsumer.ORIGINAL_ORDER = 2;

SourceMapConsumer.GREATEST_LOWER_BOUND = 1;
SourceMapConsumer.LEAST_UPPER_BOUND = 2;

/**
 * Iterate over each mapping between an original source/line/column and a
 * generated line/column in this source map.
 *
 * @param Function aCallback
 *        The function that is called with each mapping.
 * @param Object aContext
 *        Optional. If specified, this object will be the value of `this` every
 *        time that `aCallback` is called.
 * @param aOrder
 *        Either `SourceMapConsumer.GENERATED_ORDER` or
 *        `SourceMapConsumer.ORIGINAL_ORDER`. Specifies whether you want to
 *        iterate over the mappings sorted by the generated file's line/column
 *        order or the original's source/line/column order, respectively. Defaults to
 *        `SourceMapConsumer.GENERATED_ORDER`.
 */
SourceMapConsumer.prototype.eachMapping =
  function SourceMapConsumer_eachMapping(aCallback, aContext, aOrder) {
    var context = aContext || null;
    var order = aOrder || SourceMapConsumer.GENERATED_ORDER;

    var mappings;
    switch (order) {
    case SourceMapConsumer.GENERATED_ORDER:
      mappings = this._generatedMappings;
      break;
    case SourceMapConsumer.ORIGINAL_ORDER:
      mappings = this._originalMappings;
      break;
    default:
      throw new Error("Unknown order of iteration.");
    }

    var sourceRoot = this.sourceRoot;
    mappings.map(function (mapping) {
      var source = mapping.source === null ? null : this._sources.at(mapping.source);
      source = util.computeSourceURL(sourceRoot, source, this._sourceMapURL);
      return {
        source: source,
        generatedLine: mapping.generatedLine,
        generatedColumn: mapping.generatedColumn,
        originalLine: mapping.originalLine,
        originalColumn: mapping.originalColumn,
        name: mapping.name === null ? null : this._names.at(mapping.name)
      };
    }, this).forEach(aCallback, context);
  };

/**
 * Returns all generated line and column information for the original source,
 * line, and column provided. If no column is provided, returns all mappings
 * corresponding to a either the line we are searching for or the next
 * closest line that has any mappings. Otherwise, returns all mappings
 * corresponding to the given line and either the column we are searching for
 * or the next closest column that has any offsets.
 *
 * The only argument is an object with the following properties:
 *
 *   - source: The filename of the original source.
 *   - line: The line number in the original source.  The line number is 1-based.
 *   - column: Optional. the column number in the original source.
 *    The column number is 0-based.
 *
 * and an array of objects is returned, each with the following properties:
 *
 *   - line: The line number in the generated source, or null.  The
 *    line number is 1-based.
 *   - column: The column number in the generated source, or null.
 *    The column number is 0-based.
 */
SourceMapConsumer.prototype.allGeneratedPositionsFor =
  function SourceMapConsumer_allGeneratedPositionsFor(aArgs) {
    var line = util.getArg(aArgs, 'line');

    // When there is no exact match, BasicSourceMapConsumer.prototype._findMapping
    // returns the index of the closest mapping less than the needle. By
    // setting needle.originalColumn to 0, we thus find the last mapping for
    // the given line, provided such a mapping exists.
    var needle = {
      source: util.getArg(aArgs, 'source'),
      originalLine: line,
      originalColumn: util.getArg(aArgs, 'column', 0)
    };

    needle.source = this._findSourceIndex(needle.source);
    if (needle.source < 0) {
      return [];
    }

    var mappings = [];

    var index = this._findMapping(needle,
                                  this._originalMappings,
                                  "originalLine",
                                  "originalColumn",
                                  util.compareByOriginalPositions,
                                  binarySearch.LEAST_UPPER_BOUND);
    if (index >= 0) {
      var mapping = this._originalMappings[index];

      if (aArgs.column === undefined) {
        var originalLine = mapping.originalLine;

        // Iterate until either we run out of mappings, or we run into
        // a mapping for a different line than the one we found. Since
        // mappings are sorted, this is guaranteed to find all mappings for
        // the line we found.
        while (mapping && mapping.originalLine === originalLine) {
          mappings.push({
            line: util.getArg(mapping, 'generatedLine', null),
            column: util.getArg(mapping, 'generatedColumn', null),
            lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
          });

          mapping = this._originalMappings[++index];
        }
      } else {
        var originalColumn = mapping.originalColumn;

        // Iterate until either we run out of mappings, or we run into
        // a mapping for a different line than the one we were searching for.
        // Since mappings are sorted, this is guaranteed to find all mappings for
        // the line we are searching for.
        while (mapping &&
               mapping.originalLine === line &&
               mapping.originalColumn == originalColumn) {
          mappings.push({
            line: util.getArg(mapping, 'generatedLine', null),
            column: util.getArg(mapping, 'generatedColumn', null),
            lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
          });

          mapping = this._originalMappings[++index];
        }
      }
    }

    return mappings;
  };

var SourceMapConsumer_1 = SourceMapConsumer;

/**
 * A BasicSourceMapConsumer instance represents a parsed source map which we can
 * query for information about the original file positions by giving it a file
 * position in the generated source.
 *
 * The first parameter is the raw source map (either as a JSON string, or
 * already parsed to an object). According to the spec, source maps have the
 * following attributes:
 *
 *   - version: Which version of the source map spec this map is following.
 *   - sources: An array of URLs to the original source files.
 *   - names: An array of identifiers which can be referrenced by individual mappings.
 *   - sourceRoot: Optional. The URL root from which all sources are relative.
 *   - sourcesContent: Optional. An array of contents of the original source files.
 *   - mappings: A string of base64 VLQs which contain the actual mappings.
 *   - file: Optional. The generated file this source map is associated with.
 *
 * Here is an example source map, taken from the source map spec[0]:
 *
 *     {
 *       version : 3,
 *       file: "out.js",
 *       sourceRoot : "",
 *       sources: ["foo.js", "bar.js"],
 *       names: ["src", "maps", "are", "fun"],
 *       mappings: "AA,AB;;ABCDE;"
 *     }
 *
 * The second parameter, if given, is a string whose value is the URL
 * at which the source map was found.  This URL is used to compute the
 * sources array.
 *
 * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit?pli=1#
 */
function BasicSourceMapConsumer(aSourceMap, aSourceMapURL) {
  var sourceMap = aSourceMap;
  if (typeof aSourceMap === 'string') {
    sourceMap = util.parseSourceMapInput(aSourceMap);
  }

  var version = util.getArg(sourceMap, 'version');
  var sources = util.getArg(sourceMap, 'sources');
  // Sass 3.3 leaves out the 'names' array, so we deviate from the spec (which
  // requires the array) to play nice here.
  var names = util.getArg(sourceMap, 'names', []);
  var sourceRoot = util.getArg(sourceMap, 'sourceRoot', null);
  var sourcesContent = util.getArg(sourceMap, 'sourcesContent', null);
  var mappings = util.getArg(sourceMap, 'mappings');
  var file = util.getArg(sourceMap, 'file', null);

  // Once again, Sass deviates from the spec and supplies the version as a
  // string rather than a number, so we use loose equality checking here.
  if (version != this._version) {
    throw new Error('Unsupported version: ' + version);
  }

  if (sourceRoot) {
    sourceRoot = util.normalize(sourceRoot);
  }

  sources = sources
    .map(String)
    // Some source maps produce relative source paths like "./foo.js" instead of
    // "foo.js".  Normalize these first so that future comparisons will succeed.
    // See bugzil.la/1090768.
    .map(util.normalize)
    // Always ensure that absolute sources are internally stored relative to
    // the source root, if the source root is absolute. Not doing this would
    // be particularly problematic when the source root is a prefix of the
    // source (valid, but why??). See github issue #199 and bugzil.la/1188982.
    .map(function (source) {
      return sourceRoot && util.isAbsolute(sourceRoot) && util.isAbsolute(source)
        ? util.relative(sourceRoot, source)
        : source;
    });

  // Pass `true` below to allow duplicate names and sources. While source maps
  // are intended to be compressed and deduplicated, the TypeScript compiler
  // sometimes generates source maps with duplicates in them. See Github issue
  // #72 and bugzil.la/889492.
  this._names = ArraySet$1.fromArray(names.map(String), true);
  this._sources = ArraySet$1.fromArray(sources, true);

  this._absoluteSources = this._sources.toArray().map(function (s) {
    return util.computeSourceURL(sourceRoot, s, aSourceMapURL);
  });

  this.sourceRoot = sourceRoot;
  this.sourcesContent = sourcesContent;
  this._mappings = mappings;
  this._sourceMapURL = aSourceMapURL;
  this.file = file;
}

BasicSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
BasicSourceMapConsumer.prototype.consumer = SourceMapConsumer;

/**
 * Utility function to find the index of a source.  Returns -1 if not
 * found.
 */
BasicSourceMapConsumer.prototype._findSourceIndex = function(aSource) {
  var relativeSource = aSource;
  if (this.sourceRoot != null) {
    relativeSource = util.relative(this.sourceRoot, relativeSource);
  }

  if (this._sources.has(relativeSource)) {
    return this._sources.indexOf(relativeSource);
  }

  // Maybe aSource is an absolute URL as returned by |sources|.  In
  // this case we can't simply undo the transform.
  var i;
  for (i = 0; i < this._absoluteSources.length; ++i) {
    if (this._absoluteSources[i] == aSource) {
      return i;
    }
  }

  return -1;
};

/**
 * Create a BasicSourceMapConsumer from a SourceMapGenerator.
 *
 * @param SourceMapGenerator aSourceMap
 *        The source map that will be consumed.
 * @param String aSourceMapURL
 *        The URL at which the source map can be found (optional)
 * @returns BasicSourceMapConsumer
 */
BasicSourceMapConsumer.fromSourceMap =
  function SourceMapConsumer_fromSourceMap(aSourceMap, aSourceMapURL) {
    var smc = Object.create(BasicSourceMapConsumer.prototype);

    var names = smc._names = ArraySet$1.fromArray(aSourceMap._names.toArray(), true);
    var sources = smc._sources = ArraySet$1.fromArray(aSourceMap._sources.toArray(), true);
    smc.sourceRoot = aSourceMap._sourceRoot;
    smc.sourcesContent = aSourceMap._generateSourcesContent(smc._sources.toArray(),
                                                            smc.sourceRoot);
    smc.file = aSourceMap._file;
    smc._sourceMapURL = aSourceMapURL;
    smc._absoluteSources = smc._sources.toArray().map(function (s) {
      return util.computeSourceURL(smc.sourceRoot, s, aSourceMapURL);
    });

    // Because we are modifying the entries (by converting string sources and
    // names to indices into the sources and names ArraySets), we have to make
    // a copy of the entry or else bad things happen. Shared mutable state
    // strikes again! See github issue #191.

    var generatedMappings = aSourceMap._mappings.toArray().slice();
    var destGeneratedMappings = smc.__generatedMappings = [];
    var destOriginalMappings = smc.__originalMappings = [];

    for (var i = 0, length = generatedMappings.length; i < length; i++) {
      var srcMapping = generatedMappings[i];
      var destMapping = new Mapping;
      destMapping.generatedLine = srcMapping.generatedLine;
      destMapping.generatedColumn = srcMapping.generatedColumn;

      if (srcMapping.source) {
        destMapping.source = sources.indexOf(srcMapping.source);
        destMapping.originalLine = srcMapping.originalLine;
        destMapping.originalColumn = srcMapping.originalColumn;

        if (srcMapping.name) {
          destMapping.name = names.indexOf(srcMapping.name);
        }

        destOriginalMappings.push(destMapping);
      }

      destGeneratedMappings.push(destMapping);
    }

    quickSort$1(smc.__originalMappings, util.compareByOriginalPositions);

    return smc;
  };

/**
 * The version of the source mapping spec that we are consuming.
 */
BasicSourceMapConsumer.prototype._version = 3;

/**
 * The list of original sources.
 */
Object.defineProperty(BasicSourceMapConsumer.prototype, 'sources', {
  get: function () {
    return this._absoluteSources.slice();
  }
});

/**
 * Provide the JIT with a nice shape / hidden class.
 */
function Mapping() {
  this.generatedLine = 0;
  this.generatedColumn = 0;
  this.source = null;
  this.originalLine = null;
  this.originalColumn = null;
  this.name = null;
}

/**
 * Parse the mappings in a string in to a data structure which we can easily
 * query (the ordered arrays in the `this.__generatedMappings` and
 * `this.__originalMappings` properties).
 */
BasicSourceMapConsumer.prototype._parseMappings =
  function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
    var generatedLine = 1;
    var previousGeneratedColumn = 0;
    var previousOriginalLine = 0;
    var previousOriginalColumn = 0;
    var previousSource = 0;
    var previousName = 0;
    var length = aStr.length;
    var index = 0;
    var cachedSegments = {};
    var temp = {};
    var originalMappings = [];
    var generatedMappings = [];
    var mapping, str, segment, end, value;

    while (index < length) {
      if (aStr.charAt(index) === ';') {
        generatedLine++;
        index++;
        previousGeneratedColumn = 0;
      }
      else if (aStr.charAt(index) === ',') {
        index++;
      }
      else {
        mapping = new Mapping();
        mapping.generatedLine = generatedLine;

        // Because each offset is encoded relative to the previous one,
        // many segments often have the same encoding. We can exploit this
        // fact by caching the parsed variable length fields of each segment,
        // allowing us to avoid a second parse if we encounter the same
        // segment again.
        for (end = index; end < length; end++) {
          if (this._charIsMappingSeparator(aStr, end)) {
            break;
          }
        }
        str = aStr.slice(index, end);

        segment = cachedSegments[str];
        if (segment) {
          index += str.length;
        } else {
          segment = [];
          while (index < end) {
            base64Vlq.decode(aStr, index, temp);
            value = temp.value;
            index = temp.rest;
            segment.push(value);
          }

          if (segment.length === 2) {
            throw new Error('Found a source, but no line and column');
          }

          if (segment.length === 3) {
            throw new Error('Found a source and line, but no column');
          }

          cachedSegments[str] = segment;
        }

        // Generated column.
        mapping.generatedColumn = previousGeneratedColumn + segment[0];
        previousGeneratedColumn = mapping.generatedColumn;

        if (segment.length > 1) {
          // Original source.
          mapping.source = previousSource + segment[1];
          previousSource += segment[1];

          // Original line.
          mapping.originalLine = previousOriginalLine + segment[2];
          previousOriginalLine = mapping.originalLine;
          // Lines are stored 0-based
          mapping.originalLine += 1;

          // Original column.
          mapping.originalColumn = previousOriginalColumn + segment[3];
          previousOriginalColumn = mapping.originalColumn;

          if (segment.length > 4) {
            // Original name.
            mapping.name = previousName + segment[4];
            previousName += segment[4];
          }
        }

        generatedMappings.push(mapping);
        if (typeof mapping.originalLine === 'number') {
          originalMappings.push(mapping);
        }
      }
    }

    quickSort$1(generatedMappings, util.compareByGeneratedPositionsDeflated);
    this.__generatedMappings = generatedMappings;

    quickSort$1(originalMappings, util.compareByOriginalPositions);
    this.__originalMappings = originalMappings;
  };

/**
 * Find the mapping that best matches the hypothetical "needle" mapping that
 * we are searching for in the given "haystack" of mappings.
 */
BasicSourceMapConsumer.prototype._findMapping =
  function SourceMapConsumer_findMapping(aNeedle, aMappings, aLineName,
                                         aColumnName, aComparator, aBias) {
    // To return the position we are searching for, we must first find the
    // mapping for the given position and then return the opposite position it
    // points to. Because the mappings are sorted, we can use binary search to
    // find the best mapping.

    if (aNeedle[aLineName] <= 0) {
      throw new TypeError('Line must be greater than or equal to 1, got '
                          + aNeedle[aLineName]);
    }
    if (aNeedle[aColumnName] < 0) {
      throw new TypeError('Column must be greater than or equal to 0, got '
                          + aNeedle[aColumnName]);
    }

    return binarySearch.search(aNeedle, aMappings, aComparator, aBias);
  };

/**
 * Compute the last column for each generated mapping. The last column is
 * inclusive.
 */
BasicSourceMapConsumer.prototype.computeColumnSpans =
  function SourceMapConsumer_computeColumnSpans() {
    for (var index = 0; index < this._generatedMappings.length; ++index) {
      var mapping = this._generatedMappings[index];

      // Mappings do not contain a field for the last generated columnt. We
      // can come up with an optimistic estimate, however, by assuming that
      // mappings are contiguous (i.e. given two consecutive mappings, the
      // first mapping ends where the second one starts).
      if (index + 1 < this._generatedMappings.length) {
        var nextMapping = this._generatedMappings[index + 1];

        if (mapping.generatedLine === nextMapping.generatedLine) {
          mapping.lastGeneratedColumn = nextMapping.generatedColumn - 1;
          continue;
        }
      }

      // The last mapping for each line spans the entire line.
      mapping.lastGeneratedColumn = Infinity;
    }
  };

/**
 * Returns the original source, line, and column information for the generated
 * source's line and column positions provided. The only argument is an object
 * with the following properties:
 *
 *   - line: The line number in the generated source.  The line number
 *     is 1-based.
 *   - column: The column number in the generated source.  The column
 *     number is 0-based.
 *   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
 *     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
 *     closest element that is smaller than or greater than the one we are
 *     searching for, respectively, if the exact element cannot be found.
 *     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
 *
 * and an object is returned with the following properties:
 *
 *   - source: The original source file, or null.
 *   - line: The line number in the original source, or null.  The
 *     line number is 1-based.
 *   - column: The column number in the original source, or null.  The
 *     column number is 0-based.
 *   - name: The original identifier, or null.
 */
BasicSourceMapConsumer.prototype.originalPositionFor =
  function SourceMapConsumer_originalPositionFor(aArgs) {
    var needle = {
      generatedLine: util.getArg(aArgs, 'line'),
      generatedColumn: util.getArg(aArgs, 'column')
    };

    var index = this._findMapping(
      needle,
      this._generatedMappings,
      "generatedLine",
      "generatedColumn",
      util.compareByGeneratedPositionsDeflated,
      util.getArg(aArgs, 'bias', SourceMapConsumer.GREATEST_LOWER_BOUND)
    );

    if (index >= 0) {
      var mapping = this._generatedMappings[index];

      if (mapping.generatedLine === needle.generatedLine) {
        var source = util.getArg(mapping, 'source', null);
        if (source !== null) {
          source = this._sources.at(source);
          source = util.computeSourceURL(this.sourceRoot, source, this._sourceMapURL);
        }
        var name = util.getArg(mapping, 'name', null);
        if (name !== null) {
          name = this._names.at(name);
        }
        return {
          source: source,
          line: util.getArg(mapping, 'originalLine', null),
          column: util.getArg(mapping, 'originalColumn', null),
          name: name
        };
      }
    }

    return {
      source: null,
      line: null,
      column: null,
      name: null
    };
  };

/**
 * Return true if we have the source content for every source in the source
 * map, false otherwise.
 */
BasicSourceMapConsumer.prototype.hasContentsOfAllSources =
  function BasicSourceMapConsumer_hasContentsOfAllSources() {
    if (!this.sourcesContent) {
      return false;
    }
    return this.sourcesContent.length >= this._sources.size() &&
      !this.sourcesContent.some(function (sc) { return sc == null; });
  };

/**
 * Returns the original source content. The only argument is the url of the
 * original source file. Returns null if no original source content is
 * available.
 */
BasicSourceMapConsumer.prototype.sourceContentFor =
  function SourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
    if (!this.sourcesContent) {
      return null;
    }

    var index = this._findSourceIndex(aSource);
    if (index >= 0) {
      return this.sourcesContent[index];
    }

    var relativeSource = aSource;
    if (this.sourceRoot != null) {
      relativeSource = util.relative(this.sourceRoot, relativeSource);
    }

    var url;
    if (this.sourceRoot != null
        && (url = util.urlParse(this.sourceRoot))) {
      // XXX: file:// URIs and absolute paths lead to unexpected behavior for
      // many users. We can help them out when they expect file:// URIs to
      // behave like it would if they were running a local HTTP server. See
      // https://bugzilla.mozilla.org/show_bug.cgi?id=885597.
      var fileUriAbsPath = relativeSource.replace(/^file:\/\//, "");
      if (url.scheme == "file"
          && this._sources.has(fileUriAbsPath)) {
        return this.sourcesContent[this._sources.indexOf(fileUriAbsPath)]
      }

      if ((!url.path || url.path == "/")
          && this._sources.has("/" + relativeSource)) {
        return this.sourcesContent[this._sources.indexOf("/" + relativeSource)];
      }
    }

    // This function is used recursively from
    // IndexedSourceMapConsumer.prototype.sourceContentFor. In that case, we
    // don't want to throw if we can't find the source - we just want to
    // return null, so we provide a flag to exit gracefully.
    if (nullOnMissing) {
      return null;
    }
    else {
      throw new Error('"' + relativeSource + '" is not in the SourceMap.');
    }
  };

/**
 * Returns the generated line and column information for the original source,
 * line, and column positions provided. The only argument is an object with
 * the following properties:
 *
 *   - source: The filename of the original source.
 *   - line: The line number in the original source.  The line number
 *     is 1-based.
 *   - column: The column number in the original source.  The column
 *     number is 0-based.
 *   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
 *     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
 *     closest element that is smaller than or greater than the one we are
 *     searching for, respectively, if the exact element cannot be found.
 *     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
 *
 * and an object is returned with the following properties:
 *
 *   - line: The line number in the generated source, or null.  The
 *     line number is 1-based.
 *   - column: The column number in the generated source, or null.
 *     The column number is 0-based.
 */
BasicSourceMapConsumer.prototype.generatedPositionFor =
  function SourceMapConsumer_generatedPositionFor(aArgs) {
    var source = util.getArg(aArgs, 'source');
    source = this._findSourceIndex(source);
    if (source < 0) {
      return {
        line: null,
        column: null,
        lastColumn: null
      };
    }

    var needle = {
      source: source,
      originalLine: util.getArg(aArgs, 'line'),
      originalColumn: util.getArg(aArgs, 'column')
    };

    var index = this._findMapping(
      needle,
      this._originalMappings,
      "originalLine",
      "originalColumn",
      util.compareByOriginalPositions,
      util.getArg(aArgs, 'bias', SourceMapConsumer.GREATEST_LOWER_BOUND)
    );

    if (index >= 0) {
      var mapping = this._originalMappings[index];

      if (mapping.source === needle.source) {
        return {
          line: util.getArg(mapping, 'generatedLine', null),
          column: util.getArg(mapping, 'generatedColumn', null),
          lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
        };
      }
    }

    return {
      line: null,
      column: null,
      lastColumn: null
    };
  };

var BasicSourceMapConsumer_1 = BasicSourceMapConsumer;

/**
 * An IndexedSourceMapConsumer instance represents a parsed source map which
 * we can query for information. It differs from BasicSourceMapConsumer in
 * that it takes "indexed" source maps (i.e. ones with a "sections" field) as
 * input.
 *
 * The first parameter is a raw source map (either as a JSON string, or already
 * parsed to an object). According to the spec for indexed source maps, they
 * have the following attributes:
 *
 *   - version: Which version of the source map spec this map is following.
 *   - file: Optional. The generated file this source map is associated with.
 *   - sections: A list of section definitions.
 *
 * Each value under the "sections" field has two fields:
 *   - offset: The offset into the original specified at which this section
 *       begins to apply, defined as an object with a "line" and "column"
 *       field.
 *   - map: A source map definition. This source map could also be indexed,
 *       but doesn't have to be.
 *
 * Instead of the "map" field, it's also possible to have a "url" field
 * specifying a URL to retrieve a source map from, but that's currently
 * unsupported.
 *
 * Here's an example source map, taken from the source map spec[0], but
 * modified to omit a section which uses the "url" field.
 *
 *  {
 *    version : 3,
 *    file: "app.js",
 *    sections: [{
 *      offset: {line:100, column:10},
 *      map: {
 *        version : 3,
 *        file: "section.js",
 *        sources: ["foo.js", "bar.js"],
 *        names: ["src", "maps", "are", "fun"],
 *        mappings: "AAAA,E;;ABCDE;"
 *      }
 *    }],
 *  }
 *
 * The second parameter, if given, is a string whose value is the URL
 * at which the source map was found.  This URL is used to compute the
 * sources array.
 *
 * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit#heading=h.535es3xeprgt
 */
function IndexedSourceMapConsumer(aSourceMap, aSourceMapURL) {
  var sourceMap = aSourceMap;
  if (typeof aSourceMap === 'string') {
    sourceMap = util.parseSourceMapInput(aSourceMap);
  }

  var version = util.getArg(sourceMap, 'version');
  var sections = util.getArg(sourceMap, 'sections');

  if (version != this._version) {
    throw new Error('Unsupported version: ' + version);
  }

  this._sources = new ArraySet$1();
  this._names = new ArraySet$1();

  var lastOffset = {
    line: -1,
    column: 0
  };
  this._sections = sections.map(function (s) {
    if (s.url) {
      // The url field will require support for asynchronicity.
      // See https://github.com/mozilla/source-map/issues/16
      throw new Error('Support for url field in sections not implemented.');
    }
    var offset = util.getArg(s, 'offset');
    var offsetLine = util.getArg(offset, 'line');
    var offsetColumn = util.getArg(offset, 'column');

    if (offsetLine < lastOffset.line ||
        (offsetLine === lastOffset.line && offsetColumn < lastOffset.column)) {
      throw new Error('Section offsets must be ordered and non-overlapping.');
    }
    lastOffset = offset;

    return {
      generatedOffset: {
        // The offset fields are 0-based, but we use 1-based indices when
        // encoding/decoding from VLQ.
        generatedLine: offsetLine + 1,
        generatedColumn: offsetColumn + 1
      },
      consumer: new SourceMapConsumer(util.getArg(s, 'map'), aSourceMapURL)
    }
  });
}

IndexedSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
IndexedSourceMapConsumer.prototype.constructor = SourceMapConsumer;

/**
 * The version of the source mapping spec that we are consuming.
 */
IndexedSourceMapConsumer.prototype._version = 3;

/**
 * The list of original sources.
 */
Object.defineProperty(IndexedSourceMapConsumer.prototype, 'sources', {
  get: function () {
    var sources = [];
    for (var i = 0; i < this._sections.length; i++) {
      for (var j = 0; j < this._sections[i].consumer.sources.length; j++) {
        sources.push(this._sections[i].consumer.sources[j]);
      }
    }
    return sources;
  }
});

/**
 * Returns the original source, line, and column information for the generated
 * source's line and column positions provided. The only argument is an object
 * with the following properties:
 *
 *   - line: The line number in the generated source.  The line number
 *     is 1-based.
 *   - column: The column number in the generated source.  The column
 *     number is 0-based.
 *
 * and an object is returned with the following properties:
 *
 *   - source: The original source file, or null.
 *   - line: The line number in the original source, or null.  The
 *     line number is 1-based.
 *   - column: The column number in the original source, or null.  The
 *     column number is 0-based.
 *   - name: The original identifier, or null.
 */
IndexedSourceMapConsumer.prototype.originalPositionFor =
  function IndexedSourceMapConsumer_originalPositionFor(aArgs) {
    var needle = {
      generatedLine: util.getArg(aArgs, 'line'),
      generatedColumn: util.getArg(aArgs, 'column')
    };

    // Find the section containing the generated position we're trying to map
    // to an original position.
    var sectionIndex = binarySearch.search(needle, this._sections,
      function(needle, section) {
        var cmp = needle.generatedLine - section.generatedOffset.generatedLine;
        if (cmp) {
          return cmp;
        }

        return (needle.generatedColumn -
                section.generatedOffset.generatedColumn);
      });
    var section = this._sections[sectionIndex];

    if (!section) {
      return {
        source: null,
        line: null,
        column: null,
        name: null
      };
    }

    return section.consumer.originalPositionFor({
      line: needle.generatedLine -
        (section.generatedOffset.generatedLine - 1),
      column: needle.generatedColumn -
        (section.generatedOffset.generatedLine === needle.generatedLine
         ? section.generatedOffset.generatedColumn - 1
         : 0),
      bias: aArgs.bias
    });
  };

/**
 * Return true if we have the source content for every source in the source
 * map, false otherwise.
 */
IndexedSourceMapConsumer.prototype.hasContentsOfAllSources =
  function IndexedSourceMapConsumer_hasContentsOfAllSources() {
    return this._sections.every(function (s) {
      return s.consumer.hasContentsOfAllSources();
    });
  };

/**
 * Returns the original source content. The only argument is the url of the
 * original source file. Returns null if no original source content is
 * available.
 */
IndexedSourceMapConsumer.prototype.sourceContentFor =
  function IndexedSourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
    for (var i = 0; i < this._sections.length; i++) {
      var section = this._sections[i];

      var content = section.consumer.sourceContentFor(aSource, true);
      if (content) {
        return content;
      }
    }
    if (nullOnMissing) {
      return null;
    }
    else {
      throw new Error('"' + aSource + '" is not in the SourceMap.');
    }
  };

/**
 * Returns the generated line and column information for the original source,
 * line, and column positions provided. The only argument is an object with
 * the following properties:
 *
 *   - source: The filename of the original source.
 *   - line: The line number in the original source.  The line number
 *     is 1-based.
 *   - column: The column number in the original source.  The column
 *     number is 0-based.
 *
 * and an object is returned with the following properties:
 *
 *   - line: The line number in the generated source, or null.  The
 *     line number is 1-based. 
 *   - column: The column number in the generated source, or null.
 *     The column number is 0-based.
 */
IndexedSourceMapConsumer.prototype.generatedPositionFor =
  function IndexedSourceMapConsumer_generatedPositionFor(aArgs) {
    for (var i = 0; i < this._sections.length; i++) {
      var section = this._sections[i];

      // Only consider this section if the requested source is in the list of
      // sources of the consumer.
      if (section.consumer._findSourceIndex(util.getArg(aArgs, 'source')) === -1) {
        continue;
      }
      var generatedPosition = section.consumer.generatedPositionFor(aArgs);
      if (generatedPosition) {
        var ret = {
          line: generatedPosition.line +
            (section.generatedOffset.generatedLine - 1),
          column: generatedPosition.column +
            (section.generatedOffset.generatedLine === generatedPosition.line
             ? section.generatedOffset.generatedColumn - 1
             : 0)
        };
        return ret;
      }
    }

    return {
      line: null,
      column: null
    };
  };

/**
 * Parse the mappings in a string in to a data structure which we can easily
 * query (the ordered arrays in the `this.__generatedMappings` and
 * `this.__originalMappings` properties).
 */
IndexedSourceMapConsumer.prototype._parseMappings =
  function IndexedSourceMapConsumer_parseMappings(aStr, aSourceRoot) {
    this.__generatedMappings = [];
    this.__originalMappings = [];
    for (var i = 0; i < this._sections.length; i++) {
      var section = this._sections[i];
      var sectionMappings = section.consumer._generatedMappings;
      for (var j = 0; j < sectionMappings.length; j++) {
        var mapping = sectionMappings[j];

        var source = section.consumer._sources.at(mapping.source);
        source = util.computeSourceURL(section.consumer.sourceRoot, source, this._sourceMapURL);
        this._sources.add(source);
        source = this._sources.indexOf(source);

        var name = null;
        if (mapping.name) {
          name = section.consumer._names.at(mapping.name);
          this._names.add(name);
          name = this._names.indexOf(name);
        }

        // The mappings coming from the consumer for the section have
        // generated positions relative to the start of the section, so we
        // need to offset them to be relative to the start of the concatenated
        // generated file.
        var adjustedMapping = {
          source: source,
          generatedLine: mapping.generatedLine +
            (section.generatedOffset.generatedLine - 1),
          generatedColumn: mapping.generatedColumn +
            (section.generatedOffset.generatedLine === mapping.generatedLine
            ? section.generatedOffset.generatedColumn - 1
            : 0),
          originalLine: mapping.originalLine,
          originalColumn: mapping.originalColumn,
          name: name
        };

        this.__generatedMappings.push(adjustedMapping);
        if (typeof adjustedMapping.originalLine === 'number') {
          this.__originalMappings.push(adjustedMapping);
        }
      }
    }

    quickSort$1(this.__generatedMappings, util.compareByGeneratedPositionsDeflated);
    quickSort$1(this.__originalMappings, util.compareByOriginalPositions);
  };

var IndexedSourceMapConsumer_1 = IndexedSourceMapConsumer;

var sourceMapConsumer = {
	SourceMapConsumer: SourceMapConsumer_1,
	BasicSourceMapConsumer: BasicSourceMapConsumer_1,
	IndexedSourceMapConsumer: IndexedSourceMapConsumer_1
};

var SourceMapConsumer$1 = sourceMapConsumer.SourceMapConsumer;

function get_sourcemap_url(contents) {
    var reversed = contents
        .split('\n')
        .reverse()
        .join('\n');
    var match = /\/[/*]#[ \t]+sourceMappingURL=([^\s'"]+?)(?:[ \t]+|$)/gm.exec(reversed);
    if (match)
        return match[1];
    return undefined;
}
var file_cache = new Map();
function get_file_contents(path) {
    if (file_cache.has(path)) {
        return file_cache.get(path);
    }
    try {
        var data = fs__default['default'].readFileSync(path, 'utf8');
        file_cache.set(path, data);
        return data;
    }
    catch (_a) {
        return undefined;
    }
}
function sourcemap_stacktrace(stack) {
    var replace = function (line) {
        return line.replace(/^ {4}at (?:(.+?)\s+\()?(?:(.+?):(\d+)(?::(\d+))?)\)?/, function (input, var_name, file_path, line, column) {
            if (!file_path)
                return input;
            var contents = get_file_contents(file_path);
            if (!contents)
                return input;
            var sourcemap_url = get_sourcemap_url(contents);
            if (!sourcemap_url)
                return input;
            var dir = path__default['default'].dirname(file_path);
            var sourcemap_data;
            if (/^data:application\/json[^,]+base64,/.test(sourcemap_url)) {
                var raw_data = sourcemap_url.slice(sourcemap_url.indexOf(',') + 1);
                try {
                    sourcemap_data = Buffer.from(raw_data, 'base64').toString();
                }
                catch (_a) {
                    return input;
                }
            }
            else {
                var sourcemap_path = path__default['default'].resolve(dir, sourcemap_url);
                var data = get_file_contents(sourcemap_path);
                if (!data)
                    return input;
                sourcemap_data = data;
                dir = path__default['default'].dirname(sourcemap_path);
            }
            var raw_sourcemap;
            try {
                raw_sourcemap = JSON.parse(sourcemap_data);
            }
            catch (_b) {
                return input;
            }
            var consumer = new SourceMapConsumer$1(raw_sourcemap);
            var pos = consumer.originalPositionFor({
                line: Number(line),
                column: Number(column),
                bias: SourceMapConsumer$1.LEAST_UPPER_BOUND
            });
            if (!pos.source)
                return input;
            var source_path = path__default['default'].resolve(dir, pos.source);
            var source = source_path + ":" + (pos.line || 0) + ":" + (pos.column || 0);
            if (!var_name)
                return "    at " + source;
            return "    at " + var_name + " (" + source + ")";
        });
    };
    file_cache.clear();
    return stack
        .split('\n')
        .map(replace)
        .join('\n');
}

function get_page_handler(manifest, session_getter) {
    var get_build_info =  (function (assets) { return function () { return assets; }; })(JSON.parse(fs__default['default'].readFileSync(path__default['default'].join(build_dir, 'build.json'), 'utf-8')));
    var template =  (function (str) { return function () { return str; }; })(read_template(build_dir));
    var has_service_worker = fs__default['default'].existsSync(path__default['default'].join(build_dir, 'service-worker.js'));
    var pages = manifest.pages, error_route = manifest.error;
    function bail(req, res, err) {
        console.error(err);
        var message =  'Internal server error';
        res.statusCode = 500;
        res.end("<pre>" + message + "</pre>");
    }
    function handle_error(req, res, statusCode, error) {
        handle_page({
            pattern: null,
            parts: [
                { name: null, component: { default: error_route } }
            ]
        }, req, res, statusCode, error || new Error('Unknown error in preload function'));
    }
    function handle_page(page, req, res, status, error) {
        if (status === void 0) { status = 200; }
        if (error === void 0) { error = null; }
        return __awaiter$5(this, void 0, void 0, function () {
            var is_service_worker_index, build_info, preload_files, es6_preload, route, link, session, err_1, redirect, preload_error, preload_context, preloaded, match, params, root_preload, root_preloaded, toPreload, err_2, location_1, segments_1, layout_segments_1, l_1, props, l_2, i, part, _a, html_1, head_1, css, serialized, script_1, file, main, nonce_attr_1, legacy_main, styles_1, css_chunks_1, body;
            return __generator$1(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        is_service_worker_index = req.path === '/service-worker-index.html';
                        build_info = get_build_info();
                        res.setHeader('Content-Type', 'text/html');
                        preload_files = Array.isArray(build_info.assets.main) ? build_info.assets.main : [build_info.assets.main];
                        if (!error && !is_service_worker_index) {
                            page.parts.forEach(function (part) {
                                if (!part)
                                    return;
                                // using concat because it could be a string or an array. thanks webpack!
                                preload_files = preload_files.concat(build_info.assets[part.name]);
                            });
                        }
                        es6_preload = false;
                        if (build_info.bundler === 'rollup') {
                            es6_preload = true;
                            route = page.parts[page.parts.length - 1].file;
                            preload_files = preload_files.concat(build_info.dependencies[route]);
                        }
                        link = preload_files
                            .filter(function (v, i, a) { return a.indexOf(v) === i; }) // remove any duplicates
                            .filter(function (file) { return file && !file.match(/\.map$/); }) // exclude source maps
                            .map(function (file) {
                            var as = /\.css$/.test(file) ? 'style' : 'script';
                            var rel = es6_preload && as === 'script' ? 'modulepreload' : 'preload';
                            return "<" + req.baseUrl + "/client/" + file + ">;rel=\"" + rel + "\";as=\"" + as + "\"";
                        })
                            .join(', ');
                        res.setHeader('Link', link);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, session_getter(req, res)];
                    case 2:
                        session = _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _b.sent();
                        return [2 /*return*/, bail(req, res, err_1)];
                    case 4:
                        preload_context = {
                            redirect: function (statusCode, location) {
                                if (redirect && (redirect.statusCode !== statusCode || redirect.location !== location)) {
                                    throw new Error("Conflicting redirects");
                                }
                                location = location.replace(/^\//g, ''); // leading slash (only)
                                redirect = { statusCode: statusCode, location: location };
                            },
                            error: function (statusCode, message) {
                                preload_error = { statusCode: statusCode, message: message };
                            },
                            fetch: function (url, opts) {
                                var protocol = req.socket.encrypted ? 'https' : 'http';
                                var parsed = new Url__default['default'].URL(url, protocol + "://127.0.0.1:" + process.env.PORT + (req.baseUrl ? req.baseUrl + '/' : ''));
                                opts = Object.assign({}, opts);
                                var include_credentials = (opts.credentials === 'include' ||
                                    opts.credentials !== 'omit' && parsed.origin === protocol + "://127.0.0.1:" + process.env.PORT);
                                if (include_credentials) {
                                    opts.headers = Object.assign({}, opts.headers);
                                    var cookies_1 = Object.assign({}, cookie.parse(req.headers.cookie || ''), cookie.parse(opts.headers.cookie || ''));
                                    var set_cookie = res.getHeader('Set-Cookie');
                                    (Array.isArray(set_cookie) ? set_cookie : [set_cookie]).forEach(function (str) {
                                        var match = /([^=]+)=([^;]+)/.exec(str);
                                        if (match)
                                            cookies_1[match[1]] = match[2];
                                    });
                                    var str = Object.keys(cookies_1)
                                        .map(function (key) { return key + "=" + cookies_1[key]; })
                                        .join('; ');
                                    opts.headers.cookie = str;
                                    if (!opts.headers.authorization && req.headers.authorization) {
                                        opts.headers.authorization = req.headers.authorization;
                                    }
                                }
                                return fetch$1(parsed.href, opts);
                            }
                        };
                        _b.label = 5;
                    case 5:
                        _b.trys.push([5, 7, , 8]);
                        root_preload = manifest.root_comp.preload || (function () { });
                        root_preloaded = root_preload.call(preload_context, {
                            host: req.headers.host,
                            path: req.path,
                            query: req.query,
                            params: {}
                        }, session);
                        match = error ? null : page.pattern.exec(req.path);
                        toPreload = [root_preloaded];
                        if (!is_service_worker_index) {
                            toPreload = toPreload.concat(page.parts.map(function (part) {
                                if (!part)
                                    return null;
                                // the deepest level is used below, to initialise the store
                                params = part.params ? part.params(match) : {};
                                return part.component.preload
                                    ? part.component.preload.call(preload_context, {
                                        host: req.headers.host,
                                        path: req.path,
                                        query: req.query,
                                        params: params
                                    }, session)
                                    : {};
                            }));
                        }
                        return [4 /*yield*/, Promise.all(toPreload)];
                    case 6:
                        preloaded = _b.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        err_2 = _b.sent();
                        if (error) {
                            return [2 /*return*/, bail(req, res, err_2)];
                        }
                        preload_error = { statusCode: 500, message: err_2 };
                        preloaded = []; // appease TypeScript
                        return [3 /*break*/, 8];
                    case 8:
                        try {
                            if (redirect) {
                                location_1 = Url__default['default'].resolve((req.baseUrl || '') + '/', redirect.location);
                                res.statusCode = redirect.statusCode;
                                res.setHeader('Location', location_1);
                                res.end();
                                return [2 /*return*/];
                            }
                            if (preload_error) {
                                handle_error(req, res, preload_error.statusCode, preload_error.message);
                                return [2 /*return*/];
                            }
                            segments_1 = req.path.split('/').filter(Boolean);
                            layout_segments_1 = [segments_1[0]];
                            l_1 = 1;
                            page.parts.forEach(function (part, i) {
                                layout_segments_1[l_1] = segments_1[i + 1];
                                if (!part)
                                    return null;
                                l_1++;
                            });
                            if (error instanceof Error && error.stack) {
                                error.stack = sourcemap_stacktrace(error.stack);
                            }
                            props = {
                                stores: {
                                    page: {
                                        subscribe: writable({
                                            host: req.headers.host,
                                            path: req.path,
                                            query: req.query,
                                            params: params
                                        }).subscribe
                                    },
                                    preloading: {
                                        subscribe: writable(null).subscribe
                                    },
                                    session: writable(session)
                                },
                                segments: layout_segments_1,
                                status: error ? status : 200,
                                error: error ? error instanceof Error ? error : { message: error } : null,
                                level0: {
                                    props: preloaded[0]
                                },
                                level1: {
                                    segment: segments_1[0],
                                    props: {}
                                }
                            };
                            if (!is_service_worker_index) {
                                l_2 = 1;
                                for (i = 0; i < page.parts.length; i += 1) {
                                    part = page.parts[i];
                                    if (!part)
                                        continue;
                                    props["level" + l_2++] = {
                                        component: part.component.default,
                                        props: preloaded[i + 1] || {},
                                        segment: segments_1[i]
                                    };
                                }
                            }
                            _a = App.render(props), html_1 = _a.html, head_1 = _a.head, css = _a.css;
                            serialized = {
                                preloaded: "[" + preloaded.map(function (data) { return try_serialize(data, function (err) {
                                    console.error("Failed to serialize preloaded data to transmit to the client at the /" + segments_1.join('/') + " route: " + err.message);
                                    console.warn('The client will re-render over the server-rendered page fresh instead of continuing where it left off. See https://sapper.svelte.dev/docs#Return_value for more information');
                                }); }).join(',') + "]",
                                session: session && try_serialize(session, function (err) {
                                    throw new Error("Failed to serialize session data: " + err.message);
                                }),
                                error: error && serialize_error(props.error)
                            };
                            script_1 = "__SAPPER__={" + [
                                error && "error:" + serialized.error + ",status:" + status,
                                "baseUrl:\"" + req.baseUrl + "\"",
                                serialized.preloaded && "preloaded:" + serialized.preloaded,
                                serialized.session && "session:" + serialized.session
                            ].filter(Boolean).join(',') + "};";
                            if (has_service_worker) {
                                script_1 += "if('serviceWorker' in navigator)navigator.serviceWorker.register('" + req.baseUrl + "/service-worker.js');";
                            }
                            file = [].concat(build_info.assets.main).filter(function (file) { return file && /\.js$/.test(file); })[0];
                            main = req.baseUrl + "/client/" + file;
                            nonce_attr_1 = (res.locals && res.locals.nonce) ? " nonce=\"" + res.locals.nonce + "\"" : '';
                            if (build_info.bundler === 'rollup') {
                                if (build_info.legacy_assets) {
                                    legacy_main = req.baseUrl + "/client/legacy/" + build_info.legacy_assets.main;
                                    script_1 += "(function(){try{eval(\"async function x(){}\");var main=\"" + main + "\"}catch(e){main=\"" + legacy_main + "\"};var s=document.createElement(\"script\");try{new Function(\"if(0)import('')\")();s.src=main;s.type=\"module\";s.crossOrigin=\"use-credentials\";}catch(e){s.src=\"" + req.baseUrl + "/client/shimport@" + build_info.shimport + ".js\";s.setAttribute(\"data-main\",main);}document.head.appendChild(s);}());";
                                }
                                else {
                                    script_1 += "var s=document.createElement(\"script\");try{new Function(\"if(0)import('')\")();s.src=\"" + main + "\";s.type=\"module\";s.crossOrigin=\"use-credentials\";}catch(e){s.src=\"" + req.baseUrl + "/client/shimport@" + build_info.shimport + ".js\";s.setAttribute(\"data-main\",\"" + main + "\")}document.head.appendChild(s)";
                                }
                            }
                            else {
                                script_1 += "</script><script" + nonce_attr_1 + " src=\"" + main + "\" defer>";
                            }
                            // TODO make this consistent across apps
                            // TODO embed build_info in placeholder.ts
                            if (build_info.dependencies) {
                                css_chunks_1 = new Set();
                                page.parts.forEach(function (part) {
                                    if (!part)
                                        return;
                                    var css_chunks_for_part = build_info.dependencies[part.file];
                                    if (css_chunks_for_part) {
                                        css_chunks_for_part.forEach(function (chunk) {
                                            if (chunk.endsWith('.css')) {
                                                css_chunks_1.add(chunk);
                                            }
                                        });
                                    }
                                });
                                styles_1 = Array.from(css_chunks_1)
                                    .map(function (href) { return "<link rel=\"stylesheet\" href=\"client/" + href + "\">"; })
                                    .join('');
                            }
                            else {
                                styles_1 = (css && css.code ? "<style>" + css.code + "</style>" : '');
                            }
                            body = template()
                                .replace('%sapper.base%', function () { return "<base href=\"" + req.baseUrl + "/\">"; })
                                .replace('%sapper.scripts%', function () { return "<script" + nonce_attr_1 + ">" + script_1 + "</script>"; })
                                .replace('%sapper.html%', function () { return html_1; })
                                .replace('%sapper.head%', function () { return head_1; })
                                .replace('%sapper.styles%', function () { return styles_1; });
                            res.statusCode = status;
                            res.end(body);
                        }
                        catch (err) {
                            if (error) {
                                bail(req, res, err);
                            }
                            else {
                                handle_error(req, res, 500, err);
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    }
    return function find_route(req, res, next) {
        var e_1, _a;
        if (req.path === '/service-worker-index.html') {
            var homePage = pages.find(function (page) { return page.pattern.test('/'); });
            handle_page(homePage, req, res);
            return;
        }
        try {
            for (var pages_1 = __values(pages), pages_1_1 = pages_1.next(); !pages_1_1.done; pages_1_1 = pages_1.next()) {
                var page = pages_1_1.value;
                if (page.pattern.test(req.path)) {
                    handle_page(page, req, res);
                    return;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (pages_1_1 && !pages_1_1.done && (_a = pages_1.return)) _a.call(pages_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        handle_error(req, res, 404, 'Not found');
    };
}
function read_template(dir) {
    if (dir === void 0) { dir = build_dir; }
    return fs__default['default'].readFileSync(dir + "/template.html", 'utf-8');
}
function try_serialize(data, fail) {
    try {
        return devalue(data);
    }
    catch (err) {
        if (fail)
            fail(err);
        return null;
    }
}
// Ensure we return something truthy so the client will not re-render the page over the error
function serialize_error(error) {
    if (!error)
        return null;
    var serialized = try_serialize(error);
    if (!serialized) {
        var _a = error, name_1 = _a.name, message = _a.message, stack = _a.stack;
        serialized = try_serialize({ name: name_1, message: message, stack: stack });
    }
    if (!serialized) {
        serialized = '{}';
    }
    return serialized;
}

function middleware(opts) {
    if (opts === void 0) { opts = {}; }
    var session = opts.session, ignore = opts.ignore;
    var emitted_basepath = false;
    return compose_handlers(ignore, [
        function (req, res, next) {
            if (req.baseUrl === undefined) {
                var originalUrl = req.originalUrl || req.url;
                if (req.url === '/' && originalUrl[originalUrl.length - 1] !== '/') {
                    originalUrl += '/';
                }
                req.baseUrl = originalUrl
                    ? originalUrl.slice(0, -req.url.length)
                    : '';
            }
            if (!emitted_basepath && process.send) {
                process.send({
                    __sapper__: true,
                    event: 'basepath',
                    basepath: req.baseUrl
                });
                emitted_basepath = true;
            }
            if (req.path === undefined) {
                req.path = req.url.replace(/\?.*/, '');
            }
            next();
        },
        fs__default['default'].existsSync(path__default['default'].join(build_dir, 'service-worker.js')) && serve({
            pathname: '/service-worker.js',
            cache_control: 'no-cache, no-store, must-revalidate'
        }),
        fs__default['default'].existsSync(path__default['default'].join(build_dir, 'service-worker.js.map')) && serve({
            pathname: '/service-worker.js.map',
            cache_control: 'no-cache, no-store, must-revalidate'
        }),
        serve({
            prefix: '/client/',
            cache_control:  'max-age=31536000, immutable'
        }),
        get_server_route_handler(manifest.server_routes),
        get_page_handler(manifest, session || noop$1)
    ].filter(Boolean));
}
function compose_handlers(ignore, handlers) {
    var total = handlers.length;
    function nth_handler(n, req, res, next) {
        if (n >= total) {
            return next();
        }
        handlers[n](req, res, function () { return nth_handler(n + 1, req, res, next); });
    }
    return !ignore
        ? function (req, res, next) { return nth_handler(0, req, res, next); }
        : function (req, res, next) {
            if (should_ignore(req.path, ignore)) {
                next();
            }
            else {
                nth_handler(0, req, res, next);
            }
        };
}
function should_ignore(uri, val) {
    if (Array.isArray(val))
        return val.some(function (x) { return should_ignore(uri, x); });
    if (val instanceof RegExp)
        return val.test(uri);
    if (typeof val === 'function')
        return val(uri);
    return uri.startsWith(val.charCodeAt(0) === 47 ? val : "/" + val);
}
function serve(_a) {
    var prefix = _a.prefix, pathname = _a.pathname, cache_control = _a.cache_control;
    var filter = pathname
        ? function (req) { return req.path === pathname; }
        : function (req) { return req.path.startsWith(prefix); };
    var cache = new Map();
    var read =  function (file) { return (cache.has(file) ? cache : cache.set(file, fs__default['default'].readFileSync(path__default['default'].join(build_dir, file)))).get(file); };
    return function (req, res, next) {
        if (filter(req)) {
            var type = lite.getType(req.path);
            try {
                var file = path__default['default'].posix.normalize(decodeURIComponent(req.path));
                var data = read(file);
                res.setHeader('Content-Type', type);
                res.setHeader('Cache-Control', cache_control);
                res.end(data);
            }
            catch (err) {
                if (err.code === 'ENOENT') {
                    next();
                }
                else {
                    console.error(err);
                    res.statusCode = 500;
                    res.end('an error occurred while reading a static file from disk');
                }
            }
        }
        else {
            next();
        }
    };
}
function noop$1() { }

const PORT = process.env.PORT; // eslint-disable-line prefer-destructuring
const mode = "production";
const dev = mode === "development";
const app = express__default['default']();
app.use("/logicful-app-site", compression__default['default']({ threshold: 0 }), sirv__default['default']("static", { dev }), middleware({
    session: () => {
        return {
            //API_ENDPOINT : "http://localhost:3000/api/"
            API_ENDPOINT: 'https://staging-api.logicful.org/api/'
        };
    }
}));
app.listen(PORT, (err) => {
    if (err)
        console.log("error", err);
});
