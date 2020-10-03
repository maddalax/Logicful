import{SvelteComponent as v,append as d,attr as u,create_component as b,destroy_component as h,detach as _,element as f,init as y,insert as G,listen as S,mount_component as j,safe_not_equal as F,set_style as T,space as $,transition_in as I,transition_out as k}from"../../../../web_modules/svelte/internal.js";import"./Field.js";import{randomString as c}from"../../../util/Generate.js";import"../../../components/Repeater.js";import{dispatch as w}from"../../../event/EventBus.js";import"../../../util/Format.js";import{onMount as E}from"../../../../web_modules/svelte.js";import q from"../../../store/FormStore.js";import C from"./GroupEditSidebar.js";import L from"./ConfigField.js";function x(r){let i,t,s,l,n,o,a,m;return t=new L({props:{config:{search:!0},field:{id:c(),label:"Specify Group",helperText:"Link fields together via a group",value:{type:"local",value:r[0].groupId},type:"combobox",required:!0,configFieldTarget:"groupId",configTarget:r[0].id,options:{type:"local",value:r[1]}}}}),{c(){i=f("div"),b(t.$$.fragment),s=$(),l=f("div"),n=f("button"),n.innerHTML='<span class="fas fa-cog"></span> Group Settings',u(n,"target","_blank"),u(n,"class","btn btn-sm btn-outline-dark"),u(l,"class","d-flex bd-highlight justify-end"),T(l,"padding",".75em 0.6em")},m(e,p){G(e,i,p),j(t,i,null),d(i,s),d(i,l),d(l,n),o=!0,a||(m=S(n,"click",r[2]),a=!0)},p(e,[p]){const g={};p&1&&(g.field={id:c(),label:"Specify Group",helperText:"Link fields together via a group",value:{type:"local",value:e[0].groupId},type:"combobox",required:!0,configFieldTarget:"groupId",configTarget:e[0].id,options:{type:"local",value:e[1]}}),t.$set(g)},i(e){if(o)return;I(t.$$.fragment,e),o=!0},o(e){k(t.$$.fragment,e),o=!1},d(e){e&&_(i),h(t),a=!1,m()}}}function D(r,i,t){let{field:s}=i;function l(){let o=q.getForm();return o.groups??[]}function n(){w("show_right_sidebar",{component:C,groupId:s.groupId})}return E(()=>{}),r.$$set=o=>{"field"in o&&t(0,s=o.field)},[s,l,n]}class M extends v{constructor(r){super();y(this,r,D,x,F,{field:0})}}export default M;
