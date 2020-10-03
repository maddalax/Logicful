import{SvelteComponent as b,attr as v,create_component as s,destroy_component as u,detach as m,element as C,init as O,insert as d,mount_component as p,safe_not_equal as $,space as _,transition_in as c,transition_out as g}from"../../../../web_modules/svelte/internal.js";import{randomString as h}from"../../../util/Generate.js";import y from"../../../components/Repeater.js";import j from"../../../store/FormStore.js";import{isEmptyOrNull as k}from"../../../util/Compare.js";import F from"./ConfigField.js";function I(n){let r,o,t,i,l;return o=new y({props:{options:n[2](),onlyLabel:!0,label:"Checkbox Options",onChange:n[1]}}),i=new F({props:{field:{id:h(),type:"switch",label:"Include 'Other' Option",value:{type:"local",value:n[0].includeOther||!1},configFieldTarget:"includeOther",configTarget:n[0].id}}}),{c(){r=C("div"),s(o.$$.fragment),t=_(),s(i.$$.fragment),v(r,"class","ml-3")},m(e,f){d(e,r,f),p(o,r,null),d(e,t,f),p(i,e,f),l=!0},p(e,[f]){const a={};f&1&&(a.field={id:h(),type:"switch",label:"Include 'Other' Option",value:{type:"local",value:e[0].includeOther||!1},configFieldTarget:"includeOther",configTarget:e[0].id}),i.$set(a)},i(e){if(l)return;c(o.$$.fragment,e),c(i.$$.fragment,e),l=!0},o(e){g(o.$$.fragment,e),g(i.$$.fragment,e),l=!1},d(e){e&&m(r),u(o),e&&m(t),u(i,e)}}}function N(n){return n.map(r=>({label:r.name,value:r.value}))}function S(n,r,o){let{field:t}=r;function i(e){e.length===0&&(e=["Checkbox Item 1"]),o(0,t.options=e,t),j.set(t,{fromUser:!0,field:"options",value:e})}function l(){return k(t.options)?[{label:"Checkbox Item 1",value:"Checkbox Item 1"}]:t.options?.map(e=>({label:e,value:e}))}return n.$$set=e=>{"field"in e&&o(0,t=e.field)},[t,i,l]}class T extends b{constructor(n){super();O(this,n,S,I,$,{field:0})}}export default T;
