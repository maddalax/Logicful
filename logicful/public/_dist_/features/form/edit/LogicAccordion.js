import{SvelteComponent as g,check_outros as b,create_component as a,destroy_component as d,detach as p,empty as h,group_outros as v,init as w,insert as m,mount_component as $,safe_not_equal as L,space as k,text as y,transition_in as s,transition_out as u}from"../../../../web_modules/svelte/internal.js";import C from"./LogicBuilder.js";import F from"./FlyoutPanel.js";import j from"../../../components/Button.js";function A(f){let t;return{c(){t=y("Manage Logic")},m(n,e){m(n,t,e)},d(n){n&&p(t)}}}function _(f){let t,n;return t=new F({props:{title:"Manage Field Logic",description:"Add rules to change the behavior of when your field should show or hide.",onClose:f[3],$$slots:{default:[B]},$$scope:{ctx:f}}}),{c(){a(t.$$.fragment)},m(e,l){$(t,e,l),n=!0},p(e,l){const o={};l&2&&(o.onClose=e[3]),l&17&&(o.$$scope={dirty:l,ctx:e}),t.$set(o)},i(e){if(n)return;s(t.$$.fragment,e),n=!0},o(e){u(t.$$.fragment,e),n=!1},d(e){d(t,e)}}}function B(f){let t,n;return t=new C({props:{field:f[0]}}),{c(){a(t.$$.fragment)},m(e,l){$(t,e,l),n=!0},p(e,l){const o={};l&1&&(o.field=e[0]),t.$set(o)},i(e){if(n)return;s(t.$$.fragment,e),n=!0},o(e){u(t.$$.fragment,e),n=!1},d(e){d(t,e)}}}function M(f){let t,n,e,l;t=new j({props:{type:"primary",onClick:f[2],$$slots:{default:[A]},$$scope:{ctx:f}}});let o=f[1]&&_(f);return{c(){a(t.$$.fragment),n=k(),o&&o.c(),e=h()},m(i,r){$(t,i,r),m(i,n,r),o&&o.m(i,r),m(i,e,r),l=!0},p(i,[r]){const c={};r&2&&(c.onClick=i[2]),r&16&&(c.$$scope={dirty:r,ctx:i}),t.$set(c),i[1]?o?(o.p(i,r),r&2&&s(o,1)):(o=_(i),o.c(),s(o,1),o.m(e.parentNode,e)):o&&(v(),u(o,1,1,()=>{o=null}),b())},i(i){if(l)return;s(t.$$.fragment,i),s(o),l=!0},o(i){u(t.$$.fragment,i),u(o),l=!1},d(i){d(t,i),i&&p(n),o&&o.d(i),i&&p(e)}}}function P(f,t,n){let{field:e}=t,l=!1;const o=()=>n(1,l=!0),i=()=>n(1,l=!1);return f.$$set=r=>{"field"in r&&n(0,e=r.field)},[e,l,o,i]}class S extends g{constructor(f){super();w(this,f,P,M,L,{field:0})}}export default S;
