import{SvelteComponent as P,attr as v,check_outros as h,create_component as y,destroy_component as j,detach as d,element as w,empty as S,group_outros as F,init as H,insert as a,mount_component as x,noop as g,safe_not_equal as I,space as z,transition_in as _,transition_out as b}from"../../../../web_modules/svelte/internal.js";import O from"./LiveForm.js";import{getApi as T}from"../../../services/ApiService.js";import k from"../../../store/FormStore.js";import{onDestroy as A,onMount as C,tick as L}from"../../../../web_modules/svelte.js";import{getUrlParameter as M}from"../../../util/Http.js";import J from"../../submissions/SubmissionPreview.js";function N(f){let o;return{c(){o=w("div"),o.innerHTML=`<div class="flex"><div class="flex-shrink-0"><svg class="h-5 w-5 text-indigo-400" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg></div> 
      <div class="ml-3 flex-1 md:flex md:justify-between"><p class="text-sm leading-5 text-indigo-700">You are viewing a live preview of how your form will display and act
          once it is published. This preview will <strong>live update</strong> when
          changes are made from the form builder, no save neeed.</p></div></div>`,v(o,"class","rounded-md bg-indigo-50 p-4")},m(e,i){a(e,o,i)},d(e){e&&d(o)}}}function V(f){let o;return{c(){o=w("div"),o.innerHTML='<div class="spinner-border text-dark" style="width: 3rem; height: 3rem;" role="status"><span class="sr-only">Loading...</span></div>',v(o,"class","d-flex justify-content-center")},m(e,i){a(e,o,i)},p:g,i:g,o:g,d(e){e&&d(o)}}}function q(f){let o,e,i,r;const l=[D,B],t=[];function c(s,m){return s[1]==="submission_preview"?0:1}return o=c(f,-1),e=t[o]=l[o](f),{c(){e.c(),i=S()},m(s,m){t[o].m(s,m),a(s,i,m),r=!0},p(s,m){let n=o;o=c(s,m),o===n?t[o].p(s,m):(F(),b(t[n],1,1,()=>{t[n]=null}),h(),e=t[o],e||(e=t[o]=l[o](s),e.c()),_(e,1),e.m(i.parentNode,i))},i(s){if(r)return;_(e),r=!0},o(s){b(e),r=!1},d(s){t[o].d(s),s&&d(i)}}}function B(f){let o,e,i;return e=new O({props:{form:f[0],mode:f[1]}}),{c(){o=w("div"),y(e.$$.fragment),v(o,"class","mt-6")},m(r,l){a(r,o,l),x(e,o,null),i=!0},p(r,l){const t={};l&1&&(t.form=r[0]),l&2&&(t.mode=r[1]),e.$set(t)},i(r){if(i)return;_(e.$$.fragment,r),i=!0},o(r){b(e.$$.fragment,r),i=!1},d(r){r&&d(o),j(e)}}}function D(f){let o,e;return o=new J({props:{form:f[0],submission:f[2]}}),{c(){y(o.$$.fragment)},m(i,r){x(o,i,r),e=!0},p(i,r){const l={};r&1&&(l.form=i[0]),r&4&&(l.submission=i[2]),o.$set(l)},i(i){if(e)return;_(o.$$.fragment,i),e=!0},o(i){b(o.$$.fragment,i),e=!1},d(i){j(o,i)}}}function E(f){let o,e,i,r,l,t=f[1]==="local"&&N(f);const c=[q,V],s=[];function m(n,u){return n[0]!=null&&n[0]?.fields?.length>0?0:1}return e=m(f,-1),i=s[e]=c[e](f),{c(){t&&t.c(),o=z(),i.c(),r=S()},m(n,u){t&&t.m(n,u),a(n,o,u),s[e].m(n,u),a(n,r,u),l=!0},p(n,[u]){n[1]==="local"?t||(t=N(n),t.c(),t.m(o.parentNode,o)):t&&(t.d(1),t=null);let p=e;e=m(n,u),e===p?s[e].p(n,u):(F(),b(s[p],1,1,()=>{s[p]=null}),h(),i=s[e],i||(i=s[e]=c[e](n),i.c()),_(i,1),i.m(r.parentNode,r))},i(n){if(l)return;_(i),l=!0},o(n){b(i),l=!1},d(n){t&&t.d(n),n&&d(o),s[e].d(n),n&&d(r)}}}function U(f,o,e){let{submission:i=void 0}=o,{form:r}=o,l="",{mode:t=""}=o;A(()=>{k.setForm({fields:[]}),e(0,r={fields:[]})});async function c(){if(l=M("formId")??"",!l)return;if(e(1,t=M("mode")||t),t==="local"){const s=localStorage.getItem("form");if(!s)return;e(0,r=JSON.parse(s)),window.onstorage=m=>{m.key==="form"&&m.newValue&&e(0,r=JSON.parse(m.newValue))}}else e(0,r=await T(`form/${l}`))}return C(async()=>{k.setForm({fields:[]}),await L(),r||await c(),i&&Object.keys(i.details).forEach(s=>{const m=r.fields.findIndex(n=>n.label===s||n.name===s);m!==-1&&e(0,r.fields[m].value=i.details[s],r)}),await L(),k.setForm(r)}),f.$$set=s=>{"submission"in s&&e(2,i=s.submission),"form"in s&&e(0,r=s.form),"mode"in s&&e(1,t=s.mode)},[r,t,i]}class Y extends P{constructor(f){super();H(this,f,U,E,I,{submission:2,form:0,mode:1})}}export default Y;
