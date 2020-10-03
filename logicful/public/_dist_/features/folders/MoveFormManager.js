import{SvelteComponent as $,create_component as c,destroy_component as u,init as M,mount_component as d,safe_not_equal as S,transition_in as p,transition_out as g}from"../../../web_modules/svelte/internal.js";import j from"../../components/layout/Dialog.js";import{getApi as w}from"../../services/ApiService.js";import{onMount as b}from"../../../web_modules/svelte.js";import{saveForm as y}from"../form/edit/services/SaveForm.js";import{getFolders as A}from"./FolderService.js";import h from"./MoveForm.js";function k(n){let o,t;return o=new h({props:{folders:n[1],selected:n[2],onSelected:n[3]}}),{c(){c(o.$$.fragment)},m(e,r){d(o,e,r),t=!0},p(e,r){const s={};r&2&&(s.folders=e[1]),r&4&&(s.selected=e[2]),o.$set(s)},i(e){if(t)return;p(o.$$.fragment,e),t=!0},o(e){g(o.$$.fragment,e),t=!1},d(e){u(o,e)}}}function D(n){let o,t;return o=new j({props:{isOpen:!0,onClose:n[0],title:"Select Folder To Move Form(s)",getActions:n[4],$$slots:{default:[k]},$$scope:{ctx:n}}}),{c(){c(o.$$.fragment)},m(e,r){d(o,e,r),t=!0},p(e,[r]){const s={};r&1&&(s.onClose=e[0]),r&262&&(s.$$scope={dirty:r,ctx:e}),o.$set(s)},i(e){if(t)return;p(o.$$.fragment,e),t=!0},o(e){g(o.$$.fragment,e),t=!1},d(e){u(o,e)}}}function O(n,o,t){let{onClose:e}=o,{forms:r}=o,s={},i="",f="";function a(l){t(2,i=l.id),f=l.name}async function v(){const l=r.map(m=>w(`form/${m.id}`)),_=await Promise.all(l),C=_.map(m=>(m.folder=i,y({dispatchEvent:!1},m)));await Promise.all(C)}function F(){let l=[{type:"primary",onClick:v,label:"Move Form(s) to "+f+" Folder"}];return l}return b(async()=>{t(1,s=await A(!0)),a(s[Object.keys(s)[0]])}),n.$$set=l=>{"onClose"in l&&t(0,e=l.onClose),"forms"in l&&t(5,r=l.forms)},[e,s,i,a,F,r]}class P extends ${constructor(n){super();M(this,n,O,D,S,{onClose:0,forms:5})}}export default P;
