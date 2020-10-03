import{SvelteComponent as q,attr as E,check_outros as j,create_component as S,destroy_component as F,detach as g,element as I,empty as B,group_outros as C,init as D,insert as k,mount_component as $,noop as w,safe_not_equal as M,space as v,transition_in as c,transition_out as p}from"../../../web_modules/svelte/internal.js";import{onMount as z}from"../../../web_modules/svelte.js";import{dispatch as N,subscribeComponent as y}from"../../event/EventBus.js";import{getApi as G}from"../../services/ApiService.js";import{me as H}from"../../services/AuthService.js";import{LoadState as _}from"../../models/LoadState.js";import{debounce as J}from"../../util/Debounce.js";import K from"./FormList.js";import"../../components/Link.js";import O from"../../components/Loader.js";import{cacheClear as P}from"../../util/Cache.js";import Q from"./FolderSettings.js";function A(i){let o,t;return o=new Q({props:{folder:i[1],onClose:i[4]}}),{c(){S(o.$$.fragment)},m(e,s){$(o,e,s),t=!0},p(e,s){const l={};s&2&&(l.folder=e[1]),s&8&&(l.onClose=e[4]),o.$set(l)},i(e){if(t)return;c(o.$$.fragment,e),t=!0},o(e){p(o.$$.fragment,e),t=!1},d(e){F(o,e)}}}function h(i){let o,t;return o=new O({}),{c(){S(o.$$.fragment)},m(e,s){$(o,e,s),t=!0},i(e){if(t)return;c(o.$$.fragment,e),t=!0},o(e){p(o.$$.fragment,e),t=!1},d(e){F(o,e)}}}function R(i){let o;return{c(){o=I("p"),o.textContent="Folder Empty",E(o,"class","pl-4")},m(t,e){k(t,o,e)},p:w,i:w,o:w,d(t){t&&g(o)}}}function T(i){let o,t;return o=new K({props:{forms:i[0]}}),{c(){S(o.$$.fragment)},m(e,s){$(o,e,s),t=!0},p(e,s){const l={};s&1&&(l.forms=e[0]),o.$set(l)},i(e){if(t)return;c(o.$$.fragment,e),t=!0},o(e){p(o.$$.fragment,e),t=!1},d(e){F(o,e)}}}function U(i){let o,t,e,s,l,d,n=i[3]&&A(i),f=i[2]===_.Loading&&h(i);const b=[T,R],u=[];function a(r,m){return r[0]?0:1}return e=a(i,-1),s=u[e]=b[e](i),{c(){n&&n.c(),o=v(),f&&f.c(),t=v(),s.c(),l=B()},m(r,m){n&&n.m(r,m),k(r,o,m),f&&f.m(r,m),k(r,t,m),u[e].m(r,m),k(r,l,m),d=!0},p(r,[m]){r[3]?n?(n.p(r,m),m&8&&c(n,1)):(n=A(r),n.c(),c(n,1),n.m(o.parentNode,o)):n&&(C(),p(n,1,1,()=>{n=null}),j()),r[2]===_.Loading?f?m&4&&c(f,1):(f=h(r),f.c(),c(f,1),f.m(t.parentNode,t)):f&&(C(),p(f,1,1,()=>{f=null}),j());let L=e;e=a(r,m),e===L?u[e].p(r,m):(C(),p(u[L],1,1,()=>{u[L]=null}),j(),s=u[e],s||(s=u[e]=b[e](r),s.c()),c(s,1),s.m(l.parentNode,l))},i(r){if(d)return;c(n),c(f),c(s),d=!0},o(r){p(n),p(f),p(s),d=!1},d(r){n&&n.d(r),r&&g(o),f&&f.d(r),r&&g(t),u[e].d(r),r&&g(l)}}}function V(i,o,t){let e=[],s,l,d=_.NotStarted,n=!1;y("folder_edit",()=>{t(3,n=!0)}),y("forms_moved",a=>{t(0,e=[]),t(2,d=_.Loading),P(`api-request-form?folderId=${a}`),f(!1)}),y("folder_selected",async a=>{t(0,e=[]),t(2,d=_.Loading),t(1,l=a.folder),b()});async function f(a=!0){t(0,e=await G(`form?folderId=${l.id}`)),t(1,l.forms=e,l),N("folder_loaded",l),t(2,d=_.Finished)}const b=J(async()=>{f()},300);z(async()=>{s=await H(),N("folder_content_loaded",{})});const u=()=>{t(3,n=!1)};return[e,l,d,n,u]}class W extends q{constructor(i){super();D(this,i,V,U,M,{})}}export default W;
