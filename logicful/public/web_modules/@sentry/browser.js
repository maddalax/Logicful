import{_ as j,a as Ue,S as m,b as l,g as d,c as v,u as Be,d as B,l as p,i as q,e as Fe,t as Z,f as qe,n as F,h as H,j as He,k,m as M,o as ee,p as Me,q as Ne,r as R,s as te,v as ne,w as Le,x as N,y as We,z as ze,A as S,B as Je,C as re,D as Ke,E as T,F as ie,G as Ge,H as I,I as O,J as ae,K as se,L,M as oe}from"../common/hub-e5e7c94b.js";export{O as Hub,f as Scope,d as addGlobalEventProcessor,g as getCurrentHub,N as getHubFromCarrier,P as makeMain}from"../common/hub-e5e7c94b.js";var b;(function(t){t.Fatal="fatal",t.Error="error",t.Warning="warning",t.Log="log",t.Info="info",t.Debug="debug",t.Critical="critical"})(b||(b={})),function(t){function e(n){switch(n){case"debug":return t.Debug;case"info":return t.Info;case"warn":case"warning":return t.Warning;case"error":return t.Error;case"fatal":return t.Fatal;case"critical":return t.Critical;case"log":default:return t.Log}}t.fromString=e}(b||(b={}));var y;(function(t){t.Unknown="unknown",t.Skipped="skipped",t.Success="success",t.RateLimit="rate_limit",t.Invalid="invalid",t.Failed="failed"})(y||(y={})),function(t){function e(n){return n>=200&&n<300?t.Success:n===429?t.RateLimit:n>=400&&n<500?t.Invalid:n>=500?t.Failed:t.Unknown}t.fromHttpCode=e}(y||(y={}));var Xe=Object.setPrototypeOf||({__proto__:[]}instanceof Array?$e:Ve);function $e(t,e){return t.__proto__=e,t}function Ve(t,e){for(var n in e)t.hasOwnProperty(n)||(t[n]=e[n]);return t}var _=function(t){j(e,t);function e(n){var r=this.constructor,i=t.call(this,n)||this;return i.message=n,i.name=r.prototype.constructor.name,Xe(i,r.prototype),i}return e}(Error),Ye=/^(?:(\w+):)\/\/(?:(\w+)(?::(\w+))?@)([\w.-]+)(?::(\d+))?\/(.+)/,C="Invalid Dsn",ce=function(){function t(e){typeof e=="string"?this._fromString(e):this._fromComponents(e),this._validate()}return t.prototype.toString=function(e){e===void 0&&(e=!1);var n=this,r=n.host,i=n.path,a=n.pass,s=n.port,o=n.projectId,c=n.protocol,u=n.user;return c+"://"+u+(e&&a?":"+a:"")+("@"+r+(s?":"+s:"")+"/"+(i&&i+"/")+o)},t.prototype._fromString=function(e){var n=Ye.exec(e);if(!n)throw new _(C);var r=Ue(n.slice(1),6),i=r[0],a=r[1],s=r[2],o=s===void 0?"":s,c=r[3],u=r[4],f=u===void 0?"":u,h=r[5],w="",E=h,x=E.split("/");if(x.length>1&&(w=x.slice(0,-1).join("/"),E=x.pop()),E){var Q=E.match(/^\d+/);Q&&(E=Q[0])}this._fromComponents({host:c,pass:o,path:w,projectId:E,port:f,protocol:i,user:a})},t.prototype._fromComponents=function(e){this.protocol=e.protocol,this.user=e.user,this.pass=e.pass||"",this.host=e.host,this.port=e.port||"",this.path=e.path||"",this.projectId=e.projectId},t.prototype._validate=function(){var e=this;if(["protocol","user","host","projectId"].forEach(function(n){if(!e[n])throw new _(C+": "+n+" missing")}),!this.projectId.match(/^\d+$/))throw new _(C+": Invalid projectId "+this.projectId);if(this.protocol!=="http"&&this.protocol!=="https")throw new _(C+": Invalid protocol "+this.protocol);if(this.port&&isNaN(parseInt(this.port,10)))throw new _(C+": Invalid port "+this.port)},t}(),Qe=function(){function t(e){this._limit=e,this._buffer=[]}return t.prototype.isReady=function(){return this._limit===void 0||this.length()<this._limit},t.prototype.add=function(e){var n=this;return this.isReady()?(this._buffer.indexOf(e)===-1&&this._buffer.push(e),e.then(function(){return n.remove(e)}).then(null,function(){return n.remove(e).then(null,function(){})}),e):m.reject(new _("Not adding Promise due to buffer limit reached."))},t.prototype.remove=function(e){var n=this._buffer.splice(this._buffer.indexOf(e),1)[0];return n},t.prototype.length=function(){return this._buffer.length},t.prototype.drain=function(e){var n=this;return new m(function(r){var i=setTimeout(function(){e&&e>0&&r(!1)},e);m.all(n._buffer).then(function(){clearTimeout(i),r(!0)}).then(null,function(){r(!0)})})},t}();function g(t){for(var e=[],n=1;n<arguments.length;n++)e[n-1]=arguments[n];var r=d();if(r&&r[t])return r[t].apply(r,v(e));throw new Error("No hub defined or "+t+" was not found on the hub, please open a bug report.")}function le(t,e){var n;try{throw new Error("Sentry syntheticException")}catch(r){n=r}return g("captureException",t,{captureContext:e,originalException:t,syntheticException:n})}function Ze(t,e){var n;try{throw new Error(t)}catch(a){n=a}var r=typeof e=="string"?e:void 0,i=typeof e!="string"?{captureContext:e}:void 0;return g("captureMessage",t,r,l({originalException:t,syntheticException:n},i))}function et(t){return g("captureEvent",t)}function tt(t){g("configureScope",t)}function nt(t){g("addBreadcrumb",t)}function rt(t,e){g("setContext",t,e)}function it(t){g("setExtras",t)}function at(t){g("setTags",t)}function st(t,e){g("setExtra",t,e)}function ot(t,e){g("setTag",t,e)}function ct(t){g("setUser",t)}function ue(t){g("withScope",t)}function lt(t,e){return g("startTransaction",l({},t),e)}var pe="7",de=function(){function t(e){this.dsn=e,this._dsnObject=new ce(e)}return t.prototype.getDsn=function(){return this._dsnObject},t.prototype.getBaseApiEndpoint=function(){var e=this._dsnObject,n=e.protocol?e.protocol+":":"",r=e.port?":"+e.port:"";return n+"//"+e.host+r+(e.path?"/"+e.path:"")+"/api/"},t.prototype.getStoreEndpoint=function(){return this._getIngestEndpoint("store")},t.prototype.getStoreEndpointWithUrlEncodedAuth=function(){return this.getStoreEndpoint()+"?"+this._encodedAuth()},t.prototype.getEnvelopeEndpointWithUrlEncodedAuth=function(){return this._getEnvelopeEndpoint()+"?"+this._encodedAuth()},t.prototype.getStoreEndpointPath=function(){var e=this._dsnObject;return(e.path?"/"+e.path:"")+"/api/"+e.projectId+"/store/"},t.prototype.getRequestHeaders=function(e,n){var r=this._dsnObject,i=["Sentry sentry_version="+pe];return i.push("sentry_client="+e+"/"+n),i.push("sentry_key="+r.user),r.pass&&i.push("sentry_secret="+r.pass),{"Content-Type":"application/json","X-Sentry-Auth":i.join(", ")}},t.prototype.getReportDialogEndpoint=function(e){e===void 0&&(e={});var n=this._dsnObject,r=this.getBaseApiEndpoint()+"embed/error-page/",i=[];i.push("dsn="+n.toString());for(var a in e)if(a==="user"){if(!e.user)continue;e.user.name&&i.push("name="+encodeURIComponent(e.user.name)),e.user.email&&i.push("email="+encodeURIComponent(e.user.email))}else i.push(encodeURIComponent(a)+"="+encodeURIComponent(e[a]));return i.length?r+"?"+i.join("&"):r},t.prototype._getEnvelopeEndpoint=function(){return this._getIngestEndpoint("envelope")},t.prototype._getIngestEndpoint=function(e){var n=this.getBaseApiEndpoint(),r=this._dsnObject;return""+n+r.projectId+"/"+e+"/"},t.prototype._encodedAuth=function(){var e=this._dsnObject,n={sentry_key:e.user,sentry_version:pe};return Be(n)},t}(),he=[];function ut(t){var e=t.defaultIntegrations&&v(t.defaultIntegrations)||[],n=t.integrations,r=[];if(Array.isArray(n)){var i=n.map(function(c){return c.name}),a=[];e.forEach(function(c){i.indexOf(c.name)===-1&&a.indexOf(c.name)===-1&&(r.push(c),a.push(c.name))}),n.forEach(function(c){a.indexOf(c.name)===-1&&(r.push(c),a.push(c.name))})}else typeof n=="function"?(r=n(e),r=Array.isArray(r)?r:[r]):r=v(e);var s=r.map(function(c){return c.name}),o="Debug";return s.indexOf(o)!==-1&&r.push.apply(r,v(r.splice(s.indexOf(o),1))),r}function pt(t){if(he.indexOf(t.name)!==-1)return;t.setupOnce(B,d),he.push(t.name),p.log("Integration installed: "+t.name)}function dt(t){var e={};return ut(t).forEach(function(n){e[n.name]=n,pt(n)}),e}var ht=function(){function t(e,n){this._integrations={},this._processing=!1,this._backend=new e(n),this._options=n,n.dsn&&(this._dsn=new ce(n.dsn))}return t.prototype.captureException=function(e,n,r){var i=this,a=n&&n.event_id;return this._processing=!0,this._getBackend().eventFromException(e,n).then(function(s){a=i.captureEvent(s,n,r)}),a},t.prototype.captureMessage=function(e,n,r,i){var a=this,s=r&&r.event_id;this._processing=!0;var o=q(e)?this._getBackend().eventFromMessage(""+e,n,r):this._getBackend().eventFromException(e,r);return o.then(function(c){s=a.captureEvent(c,r,i)}),s},t.prototype.captureEvent=function(e,n,r){var i=this,a=n&&n.event_id;return this._processing=!0,this._processEvent(e,n,r).then(function(s){a=s&&s.event_id,i._processing=!1}).then(null,function(s){p.error(s),i._processing=!1}),a},t.prototype.getDsn=function(){return this._dsn},t.prototype.getOptions=function(){return this._options},t.prototype.flush=function(e){var n=this;return this._isClientProcessing(e).then(function(r){return clearInterval(r.interval),n._getBackend().getTransport().close(e).then(function(i){return r.ready&&i})})},t.prototype.close=function(e){var n=this;return this.flush(e).then(function(r){return n.getOptions().enabled=!1,r})},t.prototype.setupIntegrations=function(){this._isEnabled()&&(this._integrations=dt(this._options))},t.prototype.getIntegration=function(e){try{return this._integrations[e.id]||null}catch(n){return p.warn("Cannot retrieve integration "+e.id+" from the current Client"),null}},t.prototype._isClientProcessing=function(e){var n=this;return new m(function(r){var i=0,a=1,s=0;clearInterval(s),s=setInterval(function(){n._processing?(i+=a,e&&i>=e&&r({interval:s,ready:!1})):r({interval:s,ready:!0})},a)})},t.prototype._getBackend=function(){return this._backend},t.prototype._isEnabled=function(){return this.getOptions().enabled!==!1&&this._dsn!==void 0},t.prototype._prepareEvent=function(e,n,r){var i=this,a=this.getOptions().normalizeDepth,s=a===void 0?3:a,o=l(l({},e),{event_id:e.event_id||(r&&r.event_id?r.event_id:Fe()),timestamp:e.timestamp||Z()});this._applyClientOptions(o),this._applyIntegrationsMetadata(o);var c=n;r&&r.captureContext&&(c=qe.clone(c).update(r.captureContext));var u=m.resolve(o);return c&&(u=c.applyToEvent(o,r)),u.then(function(f){return typeof s=="number"&&s>0?i._normalizeEvent(f,s):f})},t.prototype._normalizeEvent=function(e,n){if(!e)return null;var r=l(l(l(l(l({},e),e.breadcrumbs&&{breadcrumbs:e.breadcrumbs.map(function(i){return l(l({},i),i.data&&{data:F(i.data,n)})})}),e.user&&{user:F(e.user,n)}),e.contexts&&{contexts:F(e.contexts,n)}),e.extra&&{extra:F(e.extra,n)});return e.contexts&&e.contexts.trace&&(r.contexts.trace=e.contexts.trace),r},t.prototype._applyClientOptions=function(e){var n=this.getOptions(),r=n.environment,i=n.release,a=n.dist,s=n.maxValueLength,o=s===void 0?250:s;e.environment===void 0&&r!==void 0&&(e.environment=r),e.release===void 0&&i!==void 0&&(e.release=i),e.dist===void 0&&a!==void 0&&(e.dist=a),e.message&&(e.message=H(e.message,o));var c=e.exception&&e.exception.values&&e.exception.values[0];c&&c.value&&(c.value=H(c.value,o));var u=e.request;u&&u.url&&(u.url=H(u.url,o))},t.prototype._applyIntegrationsMetadata=function(e){var n=e.sdk,r=Object.keys(this._integrations);n&&r.length>0&&(n.integrations=r)},t.prototype._sendEvent=function(e){this._getBackend().sendEvent(e)},t.prototype._processEvent=function(e,n,r){var i=this,a=this.getOptions(),s=a.beforeSend,o=a.sampleRate;if(!this._isEnabled())return m.reject("SDK not enabled, will not send event.");var c=e.type==="transaction";return!c&&typeof o=="number"&&Math.random()>o?m.reject("This event has been sampled, will not send event."):new m(function(u,f){i._prepareEvent(e,r,n).then(function(h){if(h===null){f("An event processor returned null, will not send event.");return}var w=h,E=n&&n.data&&n.data.__sentry__===!0;if(E||!s||c){i._sendEvent(w),u(w);return}var x=s(h,n);if(typeof x=="undefined")p.error("`beforeSend` method has to return `null` or a valid event.");else if(He(x))i._handleAsyncBeforeSend(x,u,f);else{if(w=x,w===null){p.log("`beforeSend` returned `null`, will not send event."),u(null);return}i._sendEvent(w),u(w)}}).then(null,function(h){i.captureException(h,{data:{__sentry__:!0},originalException:h}),f(`Event processing pipeline threw an error, original event will not be sent. Details have been sent as a new event.
Reason: `+h)})})},t.prototype._handleAsyncBeforeSend=function(e,n,r){var i=this;e.then(function(a){if(a===null){r("`beforeSend` returned `null`, will not send event.");return}i._sendEvent(a),n(a)}).then(null,function(a){r("beforeSend rejected with "+a)})},t}(),ft=function(){function t(){}return t.prototype.sendEvent=function(e){return m.resolve({reason:"NoopTransport: Event has been skipped because no Dsn is configured.",status:y.Skipped})},t.prototype.close=function(e){return m.resolve(!0)},t}(),mt=function(){function t(e){this._options=e,this._options.dsn||p.warn("No DSN provided, backend will not do anything."),this._transport=this._setupTransport()}return t.prototype.eventFromException=function(e,n){throw new _("Backend has to implement `eventFromException` method")},t.prototype.eventFromMessage=function(e,n,r){throw new _("Backend has to implement `eventFromMessage` method")},t.prototype.sendEvent=function(e){this._transport.sendEvent(e).then(null,function(n){p.error("Error while sending event: "+n)})},t.prototype.getTransport=function(){return this._transport},t.prototype._setupTransport=function(){return new ft},t}();function fe(t,e){var n=t.type==="transaction",r={body:JSON.stringify(t),url:n?e.getEnvelopeEndpointWithUrlEncodedAuth():e.getStoreEndpointWithUrlEncodedAuth()};if(n){var i=JSON.stringify({event_id:t.event_id,sent_at:new Date(Z()*1e3).toISOString()}),a=JSON.stringify({type:t.type}),s=i+`
`+a+`
`+r.body;r.body=s}return r}function vt(t,e){e.debug===!0&&p.enable();var n=d(),r=new t(e);n.bindClient(r)}var me,ve=function(){function t(){this.name=t.id}return t.prototype.setupOnce=function(){me=Function.prototype.toString,Function.prototype.toString=function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];var r=this.__sentry_original__||this;return me.apply(r,e)}},t.id="FunctionToString",t}(),gt=[/^Script error\.?$/,/^Javascript error: Script error\.? on line 0$/],ge=function(){function t(e){e===void 0&&(e={}),this._options=e,this.name=t.id}return t.prototype.setupOnce=function(){B(function(e){var n=d();if(!n)return e;var r=n.getIntegration(t);if(r){var i=n.getClient(),a=i?i.getOptions():{},s=r._mergeOptions(a);if(r._shouldDropEvent(e,s))return null}return e})},t.prototype._shouldDropEvent=function(e,n){return this._isSentryError(e,n)?(p.warn(`Event dropped due to being internal Sentry Error.
Event: `+k(e)),!0):this._isIgnoredError(e,n)?(p.warn("Event dropped due to being matched by `ignoreErrors` option.\nEvent: "+k(e)),!0):this._isDeniedUrl(e,n)?(p.warn("Event dropped due to being matched by `denyUrls` option.\nEvent: "+k(e)+`.
Url: `+this._getEventFilterUrl(e)),!0):this._isAllowedUrl(e,n)?!1:(p.warn("Event dropped due to not being matched by `allowUrls` option.\nEvent: "+k(e)+`.
Url: `+this._getEventFilterUrl(e)),!0)},t.prototype._isSentryError=function(e,n){if(!n.ignoreInternal)return!1;try{return e&&e.exception&&e.exception.values&&e.exception.values[0]&&e.exception.values[0].type==="SentryError"||!1}catch(r){return!1}},t.prototype._isIgnoredError=function(e,n){return!n.ignoreErrors||!n.ignoreErrors.length?!1:this._getPossibleEventMessages(e).some(function(r){return n.ignoreErrors.some(function(i){return M(r,i)})})},t.prototype._isDeniedUrl=function(e,n){if(!n.denyUrls||!n.denyUrls.length)return!1;var r=this._getEventFilterUrl(e);return r?n.denyUrls.some(function(i){return M(r,i)}):!1},t.prototype._isAllowedUrl=function(e,n){if(!n.allowUrls||!n.allowUrls.length)return!0;var r=this._getEventFilterUrl(e);return r?n.allowUrls.some(function(i){return M(r,i)}):!0},t.prototype._mergeOptions=function(e){return e===void 0&&(e={}),{allowUrls:v(this._options.whitelistUrls||[],this._options.allowUrls||[],e.whitelistUrls||[],e.allowUrls||[]),denyUrls:v(this._options.blacklistUrls||[],this._options.denyUrls||[],e.blacklistUrls||[],e.denyUrls||[]),ignoreErrors:v(this._options.ignoreErrors||[],e.ignoreErrors||[],gt),ignoreInternal:typeof this._options.ignoreInternal!="undefined"?this._options.ignoreInternal:!0}},t.prototype._getPossibleEventMessages=function(e){if(e.message)return[e.message];if(e.exception)try{var n=e.exception.values&&e.exception.values[0]||{},r=n.type,i=r===void 0?"":r,a=n.value,s=a===void 0?"":a;return[""+s,i+": "+s]}catch(o){return p.error("Cannot extract message for event "+k(e)),[]}return[]},t.prototype._getEventFilterUrl=function(e){try{if(e.stacktrace){var n=e.stacktrace.frames;return n&&n[n.length-1].filename||null}if(e.exception){var r=e.exception.values&&e.exception.values[0].stacktrace&&e.exception.values[0].stacktrace.frames;return r&&r[r.length-1].filename||null}return null}catch(i){return p.error("Cannot extract url for event "+k(e)),null}},t.id="InboundFilters",t}(),yt=Object.freeze({__proto__:null,FunctionToString:ve,InboundFilters:ge}),P="?",bt=/^\s*at (?:(.*?) ?\()?((?:file|https?|blob|chrome-extension|address|native|eval|webpack|<anonymous>|[-a-z]+:|.*bundle|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i,wt=/^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:file|https?|blob|chrome|webpack|resource|moz-extension|capacitor).*?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js))(?::(\d+))?(?::(\d+))?\s*$/i,_t=/^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i,Et=/(\S+) line (\d+)(?: > eval line \d+)* > eval/i,xt=/\((\S*)(?::(\d+))(?::(\d+))\)/,St=/Minified React error #\d+;/i;function U(t){var e=null,n=0;t&&(typeof t.framesToPop=="number"?n=t.framesToPop:St.test(t.message)&&(n=1));try{if(e=Tt(t),e)return ye(e,n)}catch(r){}try{if(e=kt(t),e)return ye(e,n)}catch(r){}return{message:W(t),name:t&&t.name,stack:[],failed:!0}}function kt(t){if(!t||!t.stack)return null;for(var e=[],n=t.stack.split(`
`),r,i,a,s,o=0;o<n.length;++o){if(a=bt.exec(n[o])){var c=a[2]&&a[2].indexOf("native")===0;r=a[2]&&a[2].indexOf("eval")===0,r&&(i=xt.exec(a[2]))&&(a[2]=i[1],a[3]=i[2],a[4]=i[3]),s={url:a[2]&&a[2].indexOf("address at ")===0?a[2].substr("address at ".length):a[2],func:a[1]||P,args:c?[a[2]]:[],line:a[3]?+a[3]:null,column:a[4]?+a[4]:null}}else if(a=_t.exec(n[o]))s={url:a[2],func:a[1]||P,args:[],line:+a[3],column:a[4]?+a[4]:null};else if(a=wt.exec(n[o]))r=a[3]&&a[3].indexOf(" > eval")>-1,r&&(i=Et.exec(a[3]))?(a[1]=a[1]||"eval",a[3]=i[1],a[4]=i[2],a[5]=""):o===0&&!a[5]&&t.columnNumber!==void 0&&(e[0].column=t.columnNumber+1),s={url:a[3],func:a[1]||P,args:a[2]?a[2].split(","):[],line:a[4]?+a[4]:null,column:a[5]?+a[5]:null};else continue;!s.func&&s.line&&(s.func=P),e.push(s)}return e.length?{message:W(t),name:t.name,stack:e}:null}function Tt(t){if(!t||!t.stacktrace)return null;for(var e=t.stacktrace,n=/ line (\d+).*script (?:in )?(\S+)(?:: in function (\S+))?$/i,r=/ line (\d+), column (\d+)\s*(?:in (?:<anonymous function: ([^>]+)>|([^)]+))\((.*)\))? in (.*):\s*$/i,i=e.split(`
`),a=[],s,o=0;o<i.length;o+=2){var c=null;(s=n.exec(i[o]))?c={url:s[2],func:s[3],args:[],line:+s[1],column:null}:(s=r.exec(i[o]))&&(c={url:s[6],func:s[3]||s[4],args:s[5]?s[5].split(","):[],line:+s[1],column:+s[2]}),c&&(!c.func&&c.line&&(c.func=P),a.push(c))}return a.length?{message:W(t),name:t.name,stack:a}:null}function ye(t,e){try{return l(l({},t),{stack:t.stack.slice(e)})}catch(n){return t}}function W(t){var e=t&&t.message;return e?e.error&&typeof e.error.message=="string"?e.error.message:e:"No error message"}var It=50;function be(t){var e=z(t.stack),n={type:t.name,value:t.message};return e&&e.length&&(n.stacktrace={frames:e}),n.type===void 0&&n.value===""&&(n.value="Unrecoverable error caught"),n}function Dt(t,e,n){var r={exception:{values:[{type:ee(t)?t.constructor.name:n?"UnhandledRejection":"Error",value:"Non-Error "+(n?"promise rejection":"exception")+" captured with keys: "+Me(t)}]},extra:{__serialized__:Ne(t)}};if(e){var i=U(e),a=z(i.stack);r.stacktrace={frames:a}}return r}function we(t){var e=be(t);return{exception:{values:[e]}}}function z(t){if(!t||!t.length)return[];var e=t,n=e[0].func||"",r=e[e.length-1].func||"";return(n.indexOf("captureMessage")!==-1||n.indexOf("captureException")!==-1)&&(e=e.slice(1)),r.indexOf("sentryWrapped")!==-1&&(e=e.slice(0,-1)),e.slice(0,It).map(function(i){return{colno:i.column===null?void 0:i.column,filename:i.url||e[0].url,function:i.func||"?",in_app:!0,lineno:i.line===null?void 0:i.line}}).reverse()}function _e(t,e,n){var r=n&&n.syntheticException||void 0,i=J(e,r,{attachStacktrace:t.attachStacktrace});return R(i,{handled:!0,type:"generic"}),i.level=b.Error,n&&n.event_id&&(i.event_id=n.event_id),m.resolve(i)}function Ee(t,e,n,r){n===void 0&&(n=b.Info);var i=r&&r.syntheticException||void 0,a=K(e,i,{attachStacktrace:t.attachStacktrace});return a.level=n,r&&r.event_id&&(a.event_id=r.event_id),m.resolve(a)}function J(t,e,n){n===void 0&&(n={});var r;if(te(t)&&t.error){var i=t;return t=i.error,r=we(U(t)),r}if(ne(t)||Le(t)){var a=t,s=a.name||(ne(a)?"DOMError":"DOMException"),o=a.message?s+": "+a.message:s;return r=K(o,e,n),N(r,o),r}if(We(t))return r=we(U(t)),r;if(ze(t)||ee(t)){var c=t;return r=Dt(c,e,n.rejection),R(r,{synthetic:!0}),r}return r=K(t,e,n),N(r,""+t,void 0),R(r,{synthetic:!0}),r}function K(t,e,n){n===void 0&&(n={});var r={message:t};if(n.attachStacktrace&&e){var i=U(e),a=z(i.stack);r.stacktrace={frames:a}}return r}var G=function(){function t(e){this.options=e,this._buffer=new Qe(30),this._api=new de(this.options.dsn),this.url=this._api.getStoreEndpointWithUrlEncodedAuth()}return t.prototype.sendEvent=function(e){throw new _("Transport Class has to implement `sendEvent` method")},t.prototype.close=function(e){return this._buffer.drain(e)},t}(),Rt=S(),xe=function(t){j(e,t);function e(){var n=t!==null&&t.apply(this,arguments)||this;return n._disabledUntil=new Date(Date.now()),n}return e.prototype.sendEvent=function(n){var r=this;if(new Date(Date.now())<this._disabledUntil)return Promise.reject({event:n,reason:"Transport locked till "+this._disabledUntil+" due to too many requests.",status:429});var i=fe(n,this._api),a={body:i.body,method:"POST",referrerPolicy:Je()?"origin":""};return this.options.fetchParameters!==void 0&&Object.assign(a,this.options.fetchParameters),this.options.headers!==void 0&&(a.headers=this.options.headers),this._buffer.add(new m(function(s,o){Rt.fetch(i.url,a).then(function(c){var u=y.fromHttpCode(c.status);if(u===y.Success){s({status:u});return}if(u===y.RateLimit){var f=Date.now(),h=c.headers.get("Retry-After");r._disabledUntil=new Date(f+re(f,h)),p.warn("Too many requests, backing off till: "+r._disabledUntil)}o(c)}).catch(o)}))},e}(G),Se=function(t){j(e,t);function e(){var n=t!==null&&t.apply(this,arguments)||this;return n._disabledUntil=new Date(Date.now()),n}return e.prototype.sendEvent=function(n){var r=this;if(new Date(Date.now())<this._disabledUntil)return Promise.reject({event:n,reason:"Transport locked till "+this._disabledUntil+" due to too many requests.",status:429});var i=fe(n,this._api);return this._buffer.add(new m(function(a,s){var o=new XMLHttpRequest;o.onreadystatechange=function(){if(o.readyState!==4)return;var u=y.fromHttpCode(o.status);if(u===y.Success){a({status:u});return}if(u===y.RateLimit){var f=Date.now(),h=o.getResponseHeader("Retry-After");r._disabledUntil=new Date(f+re(f,h)),p.warn("Too many requests, backing off till: "+r._disabledUntil)}s(o)},o.open("POST",i.url);for(var c in r.options.headers)r.options.headers.hasOwnProperty(c)&&o.setRequestHeader(c,r.options.headers[c]);o.send(i.body)}))},e}(G),Ot=Object.freeze({__proto__:null,BaseTransport:G,FetchTransport:xe,XHRTransport:Se}),At=function(t){j(e,t);function e(){return t!==null&&t.apply(this,arguments)||this}return e.prototype.eventFromException=function(n,r){return _e(this._options,n,r)},e.prototype.eventFromMessage=function(n,r,i){return r===void 0&&(r=b.Info),Ee(this._options,n,r,i)},e.prototype._setupTransport=function(){if(!this._options.dsn)return t.prototype._setupTransport.call(this);var n=l(l({},this._options.transportOptions),{dsn:this._options.dsn});return this._options.transport?new this._options.transport(n):Ke()?new xe(n):new Se(n)},e}(mt),X=0;function ke(){return X>0}function jt(){X+=1,setTimeout(function(){X-=1})}function D(t,e,n){if(e===void 0&&(e={}),typeof t!="function")return t;try{if(t.__sentry__)return t;if(t.__sentry_wrapped__)return t.__sentry_wrapped__}catch(s){return t}var r=function(){var s=Array.prototype.slice.call(arguments);try{n&&typeof n=="function"&&n.apply(this,arguments);var o=s.map(function(c){return D(c,e)});return t.handleEvent?t.handleEvent.apply(this,o):t.apply(this,o)}catch(c){throw jt(),ue(function(u){u.addEventProcessor(function(f){var h=l({},f);return e.mechanism&&(N(h,void 0,void 0),R(h,e.mechanism)),h.extra=l(l({},h.extra),{arguments:s}),h}),le(c)}),c}};try{for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(r[i]=t[i])}catch(s){}t.prototype=t.prototype||{},r.prototype=t.prototype,Object.defineProperty(t,"__sentry_wrapped__",{enumerable:!1,value:r}),Object.defineProperties(r,{__sentry__:{enumerable:!1,value:!0},__sentry_original__:{enumerable:!1,value:t}});try{var a=Object.getOwnPropertyDescriptor(r,"name");a.configurable&&Object.defineProperty(r,"name",{get:function(){return t.name}})}catch(s){}return r}function Te(t){if(t===void 0&&(t={}),!t.eventId){p.error("Missing eventId option in showReportDialog call");return}if(!t.dsn){p.error("Missing dsn option in showReportDialog call");return}var e=document.createElement("script");e.async=!0,e.src=new de(t.dsn).getReportDialogEndpoint(t),t.onLoad&&(e.onload=t.onLoad),(document.head||document.body).appendChild(e)}var Ie=function(){function t(e){this.name=t.id,this._onErrorHandlerInstalled=!1,this._onUnhandledRejectionHandlerInstalled=!1,this._options=l({onerror:!0,onunhandledrejection:!0},e)}return t.prototype.setupOnce=function(){Error.stackTraceLimit=50,this._options.onerror&&(p.log("Global Handler attached: onerror"),this._installGlobalOnErrorHandler()),this._options.onunhandledrejection&&(p.log("Global Handler attached: onunhandledrejection"),this._installGlobalOnUnhandledRejectionHandler())},t.prototype._installGlobalOnErrorHandler=function(){var e=this;if(this._onErrorHandlerInstalled)return;T({callback:function(n){var r=n.error,i=d(),a=i.getIntegration(t),s=r&&r.__sentry_own_request__===!0;if(!a||ke()||s)return;var o=i.getClient(),c=q(r)?e._eventFromIncompleteOnError(n.msg,n.url,n.line,n.column):e._enhanceEventWithInitialFrame(J(r,void 0,{attachStacktrace:o&&o.getOptions().attachStacktrace,rejection:!1}),n.url,n.line,n.column);R(c,{handled:!1,type:"onerror"}),i.captureEvent(c,{originalException:r})},type:"error"}),this._onErrorHandlerInstalled=!0},t.prototype._installGlobalOnUnhandledRejectionHandler=function(){var e=this;if(this._onUnhandledRejectionHandlerInstalled)return;T({callback:function(n){var r=n;try{"reason"in n?r=n.reason:"detail"in n&&"reason"in n.detail&&(r=n.detail.reason)}catch(u){}var i=d(),a=i.getIntegration(t),s=r&&r.__sentry_own_request__===!0;if(!a||ke()||s)return!0;var o=i.getClient(),c=q(r)?e._eventFromIncompleteRejection(r):J(r,void 0,{attachStacktrace:o&&o.getOptions().attachStacktrace,rejection:!0});c.level=b.Error,R(c,{handled:!1,type:"onunhandledrejection"}),i.captureEvent(c,{originalException:r});return},type:"unhandledrejection"}),this._onUnhandledRejectionHandlerInstalled=!0},t.prototype._eventFromIncompleteOnError=function(e,n,r,i){var a=/^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/i,s=te(e)?e.message:e,o;if(ie(s)){var c=s.match(a);c&&(o=c[1],s=c[2])}var u={exception:{values:[{type:o||"Error",value:s}]}};return this._enhanceEventWithInitialFrame(u,n,r,i)},t.prototype._eventFromIncompleteRejection=function(e){return{exception:{values:[{type:"UnhandledRejection",value:"Non-Error promise rejection captured with value: "+e}]}}},t.prototype._enhanceEventWithInitialFrame=function(e,n,r,i){e.exception=e.exception||{},e.exception.values=e.exception.values||[],e.exception.values[0]=e.exception.values[0]||{},e.exception.values[0].stacktrace=e.exception.values[0].stacktrace||{},e.exception.values[0].stacktrace.frames=e.exception.values[0].stacktrace.frames||[];var a=isNaN(parseInt(i,10))?void 0:i,s=isNaN(parseInt(r,10))?void 0:r,o=ie(n)&&n.length>0?n:Ge();return e.exception.values[0].stacktrace.frames.length===0&&e.exception.values[0].stacktrace.frames.push({colno:a,filename:o,function:"?",in_app:!0,lineno:s}),e},t.id="GlobalHandlers",t}(),Ct=["EventTarget","Window","Node","ApplicationCache","AudioTrackList","ChannelMergerNode","CryptoOperation","EventSource","FileReader","HTMLUnknownElement","IDBDatabase","IDBRequest","IDBTransaction","KeyOperation","MediaController","MessagePort","ModalWindow","Notification","SVGElementInstance","Screen","TextTrack","TextTrackCue","TextTrackList","WebSocket","WebSocketWorker","Worker","XMLHttpRequest","XMLHttpRequestEventTarget","XMLHttpRequestUpload"],De=function(){function t(e){this.name=t.id,this._options=l({XMLHttpRequest:!0,eventTarget:!0,requestAnimationFrame:!0,setInterval:!0,setTimeout:!0},e)}return t.prototype.setupOnce=function(){var e=S();if(this._options.setTimeout&&I(e,"setTimeout",this._wrapTimeFunction.bind(this)),this._options.setInterval&&I(e,"setInterval",this._wrapTimeFunction.bind(this)),this._options.requestAnimationFrame&&I(e,"requestAnimationFrame",this._wrapRAF.bind(this)),this._options.XMLHttpRequest&&"XMLHttpRequest"in e&&I(XMLHttpRequest.prototype,"send",this._wrapXHR.bind(this)),this._options.eventTarget){var n=Array.isArray(this._options.eventTarget)?this._options.eventTarget:Ct;n.forEach(this._wrapEventTarget.bind(this))}},t.prototype._wrapTimeFunction=function(e){return function(){for(var n=[],r=0;r<arguments.length;r++)n[r]=arguments[r];var i=n[0];return n[0]=D(i,{mechanism:{data:{function:O(e)},handled:!0,type:"instrument"}}),e.apply(this,n)}},t.prototype._wrapRAF=function(e){return function(n){return e.call(this,D(n,{mechanism:{data:{function:"requestAnimationFrame",handler:O(e)},handled:!0,type:"instrument"}}))}},t.prototype._wrapEventTarget=function(e){var n=S(),r=n[e]&&n[e].prototype;if(!r||!r.hasOwnProperty||!r.hasOwnProperty("addEventListener"))return;I(r,"addEventListener",function(i){return function(a,s,o){try{typeof s.handleEvent=="function"&&(s.handleEvent=D(s.handleEvent.bind(s),{mechanism:{data:{function:"handleEvent",handler:O(s),target:e},handled:!0,type:"instrument"}}))}catch(c){}return i.call(this,a,D(s,{mechanism:{data:{function:"addEventListener",handler:O(s),target:e},handled:!0,type:"instrument"}}),o)}}),I(r,"removeEventListener",function(i){return function(a,s,o){try{i.call(this,a,s.__sentry_wrapped__,o)}catch(c){}return i.call(this,a,s,o)}})},t.prototype._wrapXHR=function(e){return function(){for(var n=[],r=0;r<arguments.length;r++)n[r]=arguments[r];var i=this,a=["onload","onerror","onprogress","onreadystatechange"];return a.forEach(function(s){s in i&&typeof i[s]=="function"&&I(i,s,function(o){var c={mechanism:{data:{function:s,handler:O(o)},handled:!0,type:"instrument"}};return o.__sentry_original__&&(c.mechanism.data.handler=O(o.__sentry_original__)),D(o,c)})}),e.apply(this,n)}},t.id="TryCatch",t}(),$=function(){function t(e){this.name=t.id,this._options=l({console:!0,dom:!0,fetch:!0,history:!0,sentry:!0,xhr:!0},e)}return t.prototype.addSentryBreadcrumb=function(e){if(!this._options.sentry)return;d().addBreadcrumb({category:"sentry."+(e.type==="transaction"?"transaction":"event"),event_id:e.event_id,level:e.level,message:k(e)},{event:e})},t.prototype.setupOnce=function(){var e=this;this._options.console&&T({callback:function(){for(var n=[],r=0;r<arguments.length;r++)n[r]=arguments[r];e._consoleBreadcrumb.apply(e,v(n))},type:"console"}),this._options.dom&&T({callback:function(){for(var n=[],r=0;r<arguments.length;r++)n[r]=arguments[r];e._domBreadcrumb.apply(e,v(n))},type:"dom"}),this._options.xhr&&T({callback:function(){for(var n=[],r=0;r<arguments.length;r++)n[r]=arguments[r];e._xhrBreadcrumb.apply(e,v(n))},type:"xhr"}),this._options.fetch&&T({callback:function(){for(var n=[],r=0;r<arguments.length;r++)n[r]=arguments[r];e._fetchBreadcrumb.apply(e,v(n))},type:"fetch"}),this._options.history&&T({callback:function(){for(var n=[],r=0;r<arguments.length;r++)n[r]=arguments[r];e._historyBreadcrumb.apply(e,v(n))},type:"history"})},t.prototype._consoleBreadcrumb=function(e){var n={category:"console",data:{arguments:e.args,logger:"console"},level:b.fromString(e.level),message:ae(e.args," ")};if(e.level==="assert")if(e.args[0]===!1)n.message="Assertion failed: "+(ae(e.args.slice(1)," ")||"console.assert"),n.data.arguments=e.args.slice(1);else return;d().addBreadcrumb(n,{input:e.args,level:e.level})},t.prototype._domBreadcrumb=function(e){var n;try{n=e.event.target?se(e.event.target):se(e.event)}catch(r){n="<unknown>"}if(n.length===0)return;d().addBreadcrumb({category:"ui."+e.name,message:n},{event:e.event,name:e.name})},t.prototype._xhrBreadcrumb=function(e){if(e.endTimestamp){if(e.xhr.__sentry_own_request__)return;var n=e.xhr.__sentry_xhr__||{},r=n.method,i=n.url,a=n.status_code,s=n.body;d().addBreadcrumb({category:"xhr",data:{method:r,url:i,status_code:a},type:"http"},{xhr:e.xhr,input:s});return}},t.prototype._fetchBreadcrumb=function(e){if(!e.endTimestamp)return;if(e.fetchData.url.match(/sentry_key/)&&e.fetchData.method==="POST")return;e.error?d().addBreadcrumb({category:"fetch",data:e.fetchData,level:b.Error,type:"http"},{data:e.error,input:e.args}):d().addBreadcrumb({category:"fetch",data:l(l({},e.fetchData),{status_code:e.response.status}),type:"http"},{input:e.args,response:e.response})},t.prototype._historyBreadcrumb=function(e){var n=S(),r=e.from,i=e.to,a=L(n.location.href),s=L(r),o=L(i);s.path||(s=a),a.protocol===o.protocol&&a.host===o.host&&(i=o.relative),a.protocol===s.protocol&&a.host===s.host&&(r=s.relative),d().addBreadcrumb({category:"navigation",data:{from:r,to:i}})},t.id="Breadcrumbs",t}(),Pt="cause",Ut=5,Re=function(){function t(e){e===void 0&&(e={}),this.name=t.id,this._key=e.key||Pt,this._limit=e.limit||Ut}return t.prototype.setupOnce=function(){B(function(e,n){var r=d().getIntegration(t);return r?r._handler(e,n):e})},t.prototype._handler=function(e,n){if(!e.exception||!e.exception.values||!n||!oe(n.originalException,Error))return e;var r=this._walkErrorTree(n.originalException,this._key);return e.exception.values=v(r,e.exception.values),e},t.prototype._walkErrorTree=function(e,n,r){if(r===void 0&&(r=[]),!oe(e[n],Error)||r.length+1>=this._limit)return r;var i=U(e[n]),a=be(i);return this._walkErrorTree(e[n],n,v([a],r))},t.id="LinkedErrors",t}(),A=S(),Oe=function(){function t(){this.name=t.id}return t.prototype.setupOnce=function(){B(function(e){var n,r,i;if(d().getIntegration(t)){if(!A.navigator&&!A.location&&!A.document)return e;var a=((n=e.request)===null||n===void 0?void 0:n.url)||((r=A.location)===null||r===void 0?void 0:r.href),s=(A.document||{}).referrer,o=(A.navigator||{}).userAgent,c=l(l(l({},(i=e.request)===null||i===void 0?void 0:i.headers),s&&{Referer:s}),o&&{"User-Agent":o}),u=l(l({},a&&{url:a}),{headers:c});return l(l({},e),{request:u})}return e})},t.id="UserAgent",t}(),Bt=Object.freeze({__proto__:null,GlobalHandlers:Ie,TryCatch:De,Breadcrumbs:$,LinkedErrors:Re,UserAgent:Oe}),Ae="sentry.javascript.browser",V="5.24.2",je=function(t){j(e,t);function e(n){return n===void 0&&(n={}),t.call(this,At,n)||this}return e.prototype.showReportDialog=function(n){n===void 0&&(n={});var r=S().document;if(!r)return;if(!this._isEnabled()){p.error("Trying to call showReportDialog with Sentry Client disabled");return}Te(l(l({},n),{dsn:n.dsn||this.getDsn()}))},e.prototype._prepareEvent=function(n,r,i){return n.platform=n.platform||"javascript",n.sdk=l(l({},n.sdk),{name:Ae,packages:v(n.sdk&&n.sdk.packages||[],[{name:"npm:@sentry/browser",version:V}]),version:V}),t.prototype._prepareEvent.call(this,n,r,i)},e.prototype._sendEvent=function(n){var r=this.getIntegration($);r&&r.addSentryBreadcrumb(n),t.prototype._sendEvent.call(this,n)},e}(ht),Ce=[new ge,new ve,new De,new $,new Ie,new Re,new Oe];function Ft(t){if(t===void 0&&(t={}),t.defaultIntegrations===void 0&&(t.defaultIntegrations=Ce),t.release===void 0){var e=S();e.SENTRY_RELEASE&&e.SENTRY_RELEASE.id&&(t.release=e.SENTRY_RELEASE.id)}vt(je,t)}function qt(t){t===void 0&&(t={}),t.eventId||(t.eventId=d().lastEventId());var e=d().getClient();e&&e.showReportDialog(t)}function Ht(){return d().lastEventId()}function Mt(){}function Nt(t){t()}function Lt(t){var e=d().getClient();return e?e.flush(t):m.reject(!1)}function Wt(t){var e=d().getClient();return e?e.close(t):m.reject(!1)}function zt(t){return D(t)()}var Pe={},Y=S();Y.Sentry&&Y.Sentry.Integrations&&(Pe=Y.Sentry.Integrations);var Jt=l(l(l({},Pe),yt),Bt);export{je as BrowserClient,Jt as Integrations,Ae as SDK_NAME,V as SDK_VERSION,b as Severity,y as Status,Ot as Transports,nt as addBreadcrumb,et as captureEvent,le as captureException,Ze as captureMessage,Wt as close,tt as configureScope,Ce as defaultIntegrations,_e as eventFromException,Ee as eventFromMessage,Lt as flush,Mt as forceLoad,Ft as init,Te as injectReportDialog,Ht as lastEventId,Nt as onLoad,rt as setContext,st as setExtra,it as setExtras,ot as setTag,at as setTags,ct as setUser,qt as showReportDialog,lt as startTransaction,ue as withScope,zt as wrap};
