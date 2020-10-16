import{c as T}from"./common/_commonjsHelpers-7b5f3d4c.js";var se=function(r,i){return Array.prototype.slice.call(r,i)},Re=typeof setImmediate=="function",$;Re?$=function(e){setImmediate(e)}:$=function(e){setTimeout(e,0)};var Le=$,Ae=function(r,i,n){if(!r)return;Le(function(){r.apply(n||null,i||[])})},He=function(r,i){var n=i||{},c={};return r===void 0&&(r={}),r.on=function(o,v){return c[o]?c[o].push(v):c[o]=[v],r},r.once=function(o,v){return v._once=!0,r.on(o,v),r},r.off=function(o,v){var w=arguments.length;if(w===1)delete c[o];else if(w===0)c={};else{var S=c[o];if(!S)return r;S.splice(S.indexOf(v),1)}return r},r.emit=function(){var o=se(arguments);return r.emitterSnapshot(o.shift()).apply(this,o)},r.emitterSnapshot=function(o){var v=(c[o]||[]).slice(0);return function(){var w=se(arguments),S=this||r;if(o==="error"&&n.throws!==!1&&!v.length)throw w.length===1?w[0]:w;return v.forEach(function(y){n.async?Ae(y,w,S):y.apply(S,w),y._once&&r.off(o,y)}),r}},r},le=T.CustomEvent;function ze(){try{var e=new le("cat",{detail:{foo:"bar"}});return e.type==="cat"&&e.detail.foo==="bar"}catch(r){}return!1}var Fe=ze()?le:typeof document.createEvent=="function"?function(r,i){var n=document.createEvent("CustomEvent");return i?n.initCustomEvent(r,i.bubbles,i.cancelable,i.detail):n.initCustomEvent(r,!1,!1,void 0),n}:function(r,i){var n=document.createEventObject();return n.type=r,i?(n.bubbles=Boolean(i.bubbles),n.cancelable=Boolean(i.cancelable),n.detail=i.detail):(n.bubbles=!1,n.cancelable=!1,n.detail=void 0),n},fe=[],V="",Ue=/^on/;for(V in T)Ue.test(V)&&fe.push(V.slice(2));var Ge=fe,R=T.document,ve=Ke,de=$e,j=[];T.addEventListener||(ve=We,de=Ve);var N={add:ve,remove:de,fabricate:Je};function Ke(e,r,i,n){return e.addEventListener(r,i,n)}function We(e,r,i){return e.attachEvent("on"+r,Ze(e,r,i))}function $e(e,r,i,n){return e.removeEventListener(r,i,n)}function Ve(e,r,i){var n=me(e,r,i);if(n)return e.detachEvent("on"+r,n)}function Je(e,r,i){var n=Ge.indexOf(r)===-1?o():c();e.dispatchEvent?e.dispatchEvent(n):e.fireEvent("on"+r,n);function c(){var v;return R.createEvent?(v=R.createEvent("Event"),v.initEvent(r,!0,!0)):R.createEventObject&&(v=R.createEventObject()),v}function o(){return new Fe(r,{detail:i})}}function Qe(e,r,i){return function(c){var o=c||T.event;o.target=o.target||o.srcElement,o.preventDefault=o.preventDefault||function(){o.returnValue=!1},o.stopPropagation=o.stopPropagation||function(){o.cancelBubble=!0},o.which=o.which||o.keyCode,i.call(e,o)}}function Ze(e,r,i){var n=me(e,r,i)||Qe(e,r,i);return j.push({wrapper:n,element:e,type:r,fn:i}),n}function me(e,r,i){var n=et(e,r,i);if(n){var c=j[n].wrapper;return j.splice(n,1),c}}function et(e,r,i){var n,c;for(n=0;n<j.length;n++)if(c=j[n],c.element===e&&c.type===r&&c.fn===i)return n}var ge={},tt="(?:^|\\s)",rt="(?:\\s|$)";function pe(e){var r=ge[e];return r?r.lastIndex=0:ge[e]=r=new RegExp(tt+e+rt,"g"),r}function nt(e,r){var i=e.className;i.length?pe(r).test(i)||(e.className+=" "+r):e.className=r}function it(e,r){e.className=e.className.replace(pe(r)," ").trim()}var O={add:nt,rm:it},Y=document,C=Y.documentElement;function ot(e,r){var i=arguments.length;i===1&&Array.isArray(e)===!1&&(r=e,e=[]);var n,c,o,v,w,S,L,y,B,d,A,X=null,P,u=r||{};u.moves===void 0&&(u.moves=we),u.accepts===void 0&&(u.accepts=we),u.invalid===void 0&&(u.invalid=ke),u.containers===void 0&&(u.containers=e||[]),u.isContainer===void 0&&(u.isContainer=ut),u.copy===void 0&&(u.copy=!1),u.copySortSource===void 0&&(u.copySortSource=!1),u.revertOnSpill===void 0&&(u.revertOnSpill=!1),u.removeOnSpill===void 0&&(u.removeOnSpill=!1),u.direction===void 0&&(u.direction="vertical"),u.ignoreInputTextSelection===void 0&&(u.ignoreInputTextSelection=!0),u.mirrorContainer===void 0&&(u.mirrorContainer=Y.body);var f=He({containers:u.containers,start:Xe,end:te,cancel:oe,remove:ie,destroy:xe,canMove:_e,dragging:!1});return u.removeOnSpill===!0&&f.on("over",Be).on("out",Me),J(),f;function H(t){return f.containers.indexOf(t)!==-1||u.isContainer(t)}function J(t){var a=t?"remove":"add";q(C,a,"mousedown",Ie),q(C,a,"mouseup",U)}function z(t){var a=t?"remove":"add";q(C,a,"mousemove",Oe)}function Q(t){var a=t?"remove":"add";N[a](C,"selectstart",Z),N[a](C,"click",Z)}function xe(){J(!0),U({})}function Z(t){P&&t.preventDefault()}function Ie(t){S=t.clientX,L=t.clientY;var a=he(t)!==1||t.metaKey||t.ctrlKey;if(a)return;var s=t.target,l=F(s);if(!l)return;P=l,z(),t.type==="mousedown"&&(Se(s)?s.focus():t.preventDefault())}function Oe(t){if(!P)return;if(he(t)===0){U({});return}if(t.clientX!==void 0&&t.clientX===S&&t.clientY!==void 0&&t.clientY===L)return;if(u.ignoreInputTextSelection){var a=_("clientX",t),s=_("clientY",t),l=Y.elementFromPoint(a,s);if(Se(l))return}var p=P;z(!0),Q(),te(),ee(p);var m=at(o);v=_("pageX",t)-m.left,w=_("pageY",t)-m.top,O.add(d||o,"gu-transit"),Ne(),W(t)}function F(t){if(f.dragging&&n)return;if(H(t))return;for(var a=t;h(t)&&H(h(t))===!1;){if(u.invalid(t,a))return;if(t=h(t),!t)return}var s=h(t);if(!s)return;if(u.invalid(t,a))return;var l=u.moves(t,s,a,D(t));return l?{item:t,source:s}:void 0}function _e(t){return!!F(t)}function Xe(t){var a=F(t);a&&ee(a)}function ee(t){Pe(t.item,t.source)&&(d=t.item.cloneNode(!0),f.emit("cloned",d,t.item,"copy")),c=t.source,o=t.item,y=B=D(t.item),f.dragging=!0,f.emit("drag",o,c)}function ke(){return!1}function te(){if(!f.dragging)return;var t=d||o;ne(t,h(t))}function re(){P=!1,z(!0),Q(!0)}function U(t){if(re(),!f.dragging)return;var a=d||o,s=_("clientX",t),l=_("clientY",t),p=Ee(n,s,l),m=ae(p,s,l);m&&(d&&u.copySortSource||!d||m!==c)?ne(a,m):u.removeOnSpill?ie():oe()}function ne(t,a){var s=h(t);d&&u.copySortSource&&a===c&&s.removeChild(o),K(a)?f.emit("cancel",t,c,c):f.emit("drop",t,a,c,B),G()}function ie(){if(!f.dragging)return;var t=d||o,a=h(t);a&&a.removeChild(t),f.emit(d?"cancel":"remove",t,a,c),G()}function oe(t){if(!f.dragging)return;var a=arguments.length>0?t:u.revertOnSpill,s=d||o,l=h(s),p=K(l);p===!1&&a&&(d?l&&l.removeChild(d):c.insertBefore(s,y)),p||a?f.emit("cancel",s,c,c):f.emit("drop",s,l,c,B),G()}function G(){var t=d||o;re(),Ye(),t&&O.rm(t,"gu-transit"),A&&clearTimeout(A),f.dragging=!1,X&&f.emit("out",t,X,c),f.emit("dragend",t),c=o=d=y=B=A=X=null}function K(t,a){var s;return a!==void 0?s=a:n?s=B:s=D(d||o),t===c&&s===y}function ae(t,a,s){for(var l=t;l&&!p();)l=h(l);return l;function p(){var m=H(l);if(m===!1)return!1;var M=ue(l,t),g=ce(l,M,a,s),x=K(l,g);return x?!0:u.accepts(o,l,c,g)}}function W(t){if(!n)return;t.preventDefault();var a=_("clientX",t),s=_("clientY",t),l=a-v,p=s-w;n.style.left=l+"px",n.style.top=p+"px";var m=d||o,M=Ee(n,a,s),g=ae(M,a,s),x=g!==null&&g!==X;(x||g===null)&&(qe(),X=g,je());var b=h(m);if(g===c&&d&&!u.copySortSource){b&&b.removeChild(m);return}var E,k=ue(g,M);if(k!==null)E=ce(g,k,a,s);else if(u.revertOnSpill===!0&&!d)E=y,g=c;else{d&&b&&b.removeChild(m);return}(E===null&&x||E!==m&&E!==D(m))&&(B=E,g.insertBefore(m,E),f.emit("shadow",m,g,c));function I(De){f.emit(De,m,X,c)}function je(){x&&I("over")}function qe(){X&&I("out")}}function Be(t){O.rm(t,"gu-hide")}function Me(t){f.dragging&&O.add(t,"gu-hide")}function Ne(){if(n)return;var t=o.getBoundingClientRect();n=o.cloneNode(!0),n.style.width=ye(t)+"px",n.style.height=Ce(t)+"px",O.rm(n,"gu-transit"),O.add(n,"gu-mirror"),u.mirrorContainer.appendChild(n),q(C,"add","mousemove",W),O.add(u.mirrorContainer,"gu-unselectable"),f.emit("cloned",n,o,"mirror")}function Ye(){n&&(O.rm(u.mirrorContainer,"gu-unselectable"),q(C,"remove","mousemove",W),h(n).removeChild(n),n=null)}function ue(t,a){for(var s=a;s!==t&&h(s)!==t;)s=h(s);return s===C?null:s}function ce(t,a,s,l){var p=u.direction==="horizontal",m=a!==t?g():M();return m;function M(){var b=t.children.length,E,k,I;for(E=0;E<b;E++){if(k=t.children[E],I=k.getBoundingClientRect(),p&&I.left+I.width/2>s)return k;if(!p&&I.top+I.height/2>l)return k}return null}function g(){var b=a.getBoundingClientRect();return x(p?s>b.left+ye(b)/2:l>b.top+Ce(b)/2)}function x(b){return b?D(a):a}}function Pe(t,a){return typeof u.copy=="boolean"?u.copy:u.copy(t,a)}}function q(e,r,i,n){var c={mouseup:"touchend",mousedown:"touchstart",mousemove:"touchmove"},o={mouseup:"pointerup",mousedown:"pointerdown",mousemove:"pointermove"},v={mouseup:"MSPointerUp",mousedown:"MSPointerDown",mousemove:"MSPointerMove"};T.navigator.pointerEnabled?N[r](e,o[i],n):T.navigator.msPointerEnabled?N[r](e,v[i],n):(N[r](e,c[i],n),N[r](e,i,n))}function he(e){if(e.touches!==void 0)return e.touches.length;if(e.which!==void 0&&e.which!==0)return e.which;if(e.buttons!==void 0)return e.buttons;var r=e.button;if(r!==void 0)return r&1?1:r&2?3:r&4?2:0}function at(e){var r=e.getBoundingClientRect();return{left:r.left+be("scrollLeft","pageXOffset"),top:r.top+be("scrollTop","pageYOffset")}}function be(e,r){return typeof T[r]!="undefined"?T[r]:C.clientHeight?C[e]:Y.body[e]}function Ee(e,r,i){var n=e||{},c=n.className,o;return n.className+=" gu-hide",o=Y.elementFromPoint(r,i),n.className=c,o}function ut(){return!1}function we(){return!0}function ye(e){return e.width||e.right-e.left}function Ce(e){return e.height||e.bottom-e.top}function h(e){return e.parentNode===Y?null:e.parentNode}function Se(e){return e.tagName==="INPUT"||e.tagName==="TEXTAREA"||e.tagName==="SELECT"||Te(e)}function Te(e){return e?e.contentEditable==="false"?!1:e.contentEditable==="true"?!0:Te(h(e)):!1}function D(e){return e.nextElementSibling||r();function r(){var i=e;do i=i.nextSibling;while(i&&i.nodeType!==1);return i}}function ct(e){return e.targetTouches&&e.targetTouches.length?e.targetTouches[0]:e.changedTouches&&e.changedTouches.length?e.changedTouches[0]:e}function _(e,r){var i=ct(r),n={pageX:"clientX",pageY:"clientY"};return e in n&&!(e in i)&&n[e]in i&&(e=n[e]),i[e]}var st=ot;export default st;