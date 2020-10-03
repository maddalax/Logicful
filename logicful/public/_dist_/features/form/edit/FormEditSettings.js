import{SvelteComponent as _,create_component as d,destroy_component as g,detach as b,init as v,insert as T,mount_component as u,safe_not_equal as $,space as j,transition_in as a,transition_out as c}from"../../../../web_modules/svelte/internal.js";import"./Field.js";import{randomString as m}from"../../../util/Generate.js";import"../../../../web_modules/svelte.js";import{subscribeComponent as p}from"../../../event/EventBus.js";import"../../../store/FormStore.js";import F from"./ConfigField.js";function S(n){let i,o,t,r;return i=new F({props:{field:{id:m(),required:!0,label:"Form Title",value:n[0].title,type:"string",configFieldTarget:"title",configTarget:"form"}}}),t=new F({props:{field:{id:m(),required:!0,label:"Form Description",value:n[0].description,type:"string",configFieldTarget:"description",configTarget:"form"}}}),{c(){d(i.$$.fragment),o=j(),d(t.$$.fragment)},m(e,f){u(i,e,f),T(e,o,f),u(t,e,f),r=!0},p(e,[f]){const s={};f&1&&(s.field={id:m(),required:!0,label:"Form Title",value:e[0].title,type:"string",configFieldTarget:"title",configTarget:"form"}),i.$set(s);const l={};f&1&&(l.field={id:m(),required:!0,label:"Form Description",value:e[0].description,type:"string",configFieldTarget:"description",configTarget:"form"}),t.$set(l)},i(e){if(r)return;a(i.$$.fragment,e),a(t.$$.fragment,e),r=!0},o(e){c(i.$$.fragment,e),c(t.$$.fragment,e),r=!1},d(e){g(i,e),e&&b(o),g(t,e)}}}function q(n,i,o){let{form:t}=i;return p("form_loaded",r=>{o(0,t=r)}),p("form_updated",r=>{o(0,t=r)}),n.$$set=r=>{"form"in r&&o(0,t=r.form)},[t]}class y extends _{constructor(n){super();v(this,n,q,S,$,{form:0})}}export default y;
