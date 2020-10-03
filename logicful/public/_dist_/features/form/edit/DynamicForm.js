import"./DynamicForm.css.proxy.js";import{SvelteComponent as le,append as _,attr as c,check_outros as z,create_component as S,destroy_component as M,detach as h,element as g,empty as Q,group_outros as G,init as oe,insert as y,mount_component as O,outro_and_destroy_block as ie,safe_not_equal as fe,set_data as U,space as F,text as N,transition_in as C,transition_out as j,update_keyed_each as re}from"../../../../web_modules/svelte/internal.js";import"./Field.js";import{subscribeFieldChange as ne}from"../../../event/FieldEvent.js";import{DynamicFormMode as se}from"../../../components/models/ComponentProps.js";import{dispatch as de,subscribeComponent as me}from"../../../event/EventBus.js";import{LogicBuilder as ue}from"../../../services/LogicBuilder.js";import{fastClone as W}from"../../../util/Compare.js";import{onMount as ae}from"../../../../web_modules/svelte.js";import ce from"../../../components/layout/Dialog.js";import V from"./EditableField.js";import X from"../../../components/Button.js";function Y(s,l,t){const e=s.slice();return e[6]=l[t],e}function Z(s){let l,t;return l=new ce({props:{title:"Confirm Deletion",isOpen:!0,actions:[{label:"Delete Field",type:"danger",onClick:s[3],focus:!0},{label:"Cancel",type:"secondary"}],onClose:s[5],$$slots:{default:[pe]},$$scope:{ctx:s}}}),{c(){S(l.$$.fragment)},m(e,o){O(l,e,o),t=!0},p(e,o){const f={};o&2&&(f.onClose=e[5]),o&512&&(f.$$scope={dirty:o,ctx:e}),l.$set(f)},i(e){if(t)return;C(l.$$.fragment,e),t=!0},o(e){j(l.$$.fragment,e),t=!1},d(e){M(l,e)}}}function pe(s){let l,t,e;return{c(){l=g("p"),l.textContent="Are you sure you want to delete this field?",t=F(),e=g("p"),e.textContent="Changes will be applied after the form is saved.",c(l,"class","text-sm leading-5 text-gray-500"),c(e,"class","text-sm leading-5 text-gray-500")},m(o,f){y(o,l,f),y(o,t,f),y(o,e,f)},d(o){o&&h(l),o&&h(t),o&&h(e)}}}function _e(s){let l;return{c(){l=N("Submissions")},m(t,e){y(t,l,e)},d(t){t&&h(l)}}}function $e(s){let l;return{c(){l=N("Preview")},m(t,e){y(t,l,e)},d(t){t&&h(l)}}}function ge(s){let l,t,e,o,f;return t=new V({props:{field:W(s[6]),hidden:!0}}),{c(){l=g("div"),S(t.$$.fragment),e=F(),c(l,"id",o=`form-field-${s[6].id}`)},m(r,a){y(r,l,a),O(t,l,null),_(l,e),f=!0},p(r,a){const $={};a&1&&($.field=W(r[6])),t.$set($),(!f||a&1&&o!==(o=`form-field-${r[6].id}`))&&c(l,"id",o)},i(r){if(f)return;C(t.$$.fragment,r),f=!0},o(r){j(t.$$.fragment,r),f=!1},d(r){r&&h(l),M(t)}}}function be(s){let l,t,e,o,f;return t=new V({props:{field:W(s[6])}}),{c(){l=g("div"),S(t.$$.fragment),e=F(),c(l,"id",o=`form-field-${s[6].id}`)},m(r,a){y(r,l,a),O(t,l,null),_(l,e),f=!0},p(r,a){const $={};a&1&&($.field=W(r[6])),t.$set($),(!f||a&1&&o!==(o=`form-field-${r[6].id}`))&&c(l,"id",o)},i(r){if(f)return;C(t.$$.fragment,r),f=!0},o(r){j(t.$$.fragment,r),f=!1},d(r){r&&h(l),M(t)}}}function ee(s,l){let t,e,o,f,r,a;const $=[be,ge],d=[];function b(u,m){return m&1&&(e=!!u[2](u[6])),e?0:1}return o=b(l,-1),f=d[o]=$[o](l),{key:s,first:null,c(){t=Q(),f.c(),r=Q(),this.first=t},m(u,m){y(u,t,m),d[o].m(u,m),y(u,r,m),a=!0},p(u,m){let v=o;o=b(u,m),o===v?d[o].p(u,m):(G(),j(d[v],1,1,()=>{d[v]=null}),z(),f=d[o],f||(f=d[o]=$[o](u),f.c()),C(f,1),f.m(r.parentNode,r))},i(u){if(a)return;C(f),a=!0},o(u){j(f),a=!1},d(u){u&&h(t),d[o].d(u),u&&h(r)}}}function ve(s){let l,t,e,o,f=s[0].title+"",r,a,$,d=s[0].description+"",b,u,m,v,w,H,P,I,q,E,R,x,L,k=[],J=new Map,B,p=s[1]&&Z(s);w=new X({props:{type:"secondary",href:`/form/submissions?formId=${s[0].id}&mode=local`,$$slots:{default:[_e]},$$scope:{ctx:s}}}),I=new X({props:{type:"primary",href:`/form/preview?formId=${s[0].id}&mode=local`,$$slots:{default:[$e]},$$scope:{ctx:s}}});let A=s[0].fields;const K=i=>i[6].id;for(let i=0;i<A.length;i+=1){let n=Y(s,A,i),D=K(n);J.set(D,k[i]=ee(D,n))}return{c(){p&&p.c(),l=F(),t=g("div"),e=g("div"),o=g("h1"),r=N(f),a=F(),$=g("p"),b=N(d),u=F(),m=g("div"),v=g("span"),S(w.$$.fragment),H=F(),P=g("span"),S(I.$$.fragment),q=F(),E=g("div"),R=g("div"),x=g("form"),L=g("div");for(let i=0;i<k.length;i+=1)k[i].c();c(o,"class","text-lg font-medium leading-6 text-gray-900 sm:truncate"),c($,"class","max-w-4xl text-sm leading-5 text-gray-500"),c(e,"class","flex-1 min-w-0"),c(v,"class","order-1 ml-3 shadow-sm rounded-md sm:order-0 sm:ml-0"),c(P,"class","order-0 sm:order-1 sm:ml-3 shadow-sm rounded-md"),c(m,"class","mt-4 flex sm:mt-0 sm:ml-4"),c(t,"class",`border-b border-gray-200 px-4 py-4 sm:flex sm:items-center
    sm:justify-between sm:px-6 lg:px-8`),c(L,"id","form-preview-fields"),c(x,"action","#"),c(x,"method","POST"),c(x,"id","form-preview"),c(R,"class","py-8 px-4 sm:rounded-lg sm:px-2"),c(E,"class","sm:mx-auto sm:w-full")},m(i,n){p&&p.m(i,n),y(i,l,n),y(i,t,n),_(t,e),_(e,o),_(o,r),_(e,a),_(e,$),_($,b),_(t,u),_(t,m),_(m,v),O(w,v,null),_(m,H),_(m,P),O(I,P,null),y(i,q,n),y(i,E,n),_(E,R),_(R,x),_(x,L);for(let D=0;D<k.length;D+=1)k[D].m(L,null);B=!0},p(i,[n]){i[1]?p?(p.p(i,n),n&2&&C(p,1)):(p=Z(i),p.c(),C(p,1),p.m(l.parentNode,l)):p&&(G(),j(p,1,1,()=>{p=null}),z()),(!B||n&1)&&f!==(f=i[0].title+"")&&U(r,f),(!B||n&1)&&d!==(d=i[0].description+"")&&U(b,d);const D={};n&1&&(D.href=`/form/submissions?formId=${i[0].id}&mode=local`),n&512&&(D.$$scope={dirty:n,ctx:i}),w.$set(D);const T={};if(n&1&&(T.href=`/form/preview?formId=${i[0].id}&mode=local`),n&512&&(T.$$scope={dirty:n,ctx:i}),I.$set(T),n&5){const te=i[0].fields;G(),k=re(k,n,K,1,i,te,J,L,ie,ee,null,Y),z()}},i(i){if(B)return;C(p),C(w.$$.fragment,i),C(I.$$.fragment,i);for(let n=0;n<A.length;n+=1)C(k[n]);B=!0},o(i){j(p),j(w.$$.fragment,i),j(I.$$.fragment,i);for(let n=0;n<k.length;n+=1)j(k[n]);B=!1},d(i){p&&p.d(i),i&&h(l),i&&h(t),M(w),M(I),i&&h(q),i&&h(E);for(let n=0;n<k.length;n+=1)k[n].d()}}}function he(s,l,t){let{form:e}=l,{mode:o=se.Live}=l,f=!1;me("confirm_field_deletion",()=>{t(1,f=!0)}),ne(ae,d=>{if(!e||!e.fields)return;const b=e.fields.findIndex(m=>m.id===d.id);if(b===-1)return;t(0,e.fields[b].updated=!e.fields[b].updated,e);const u=e.fields.filter(m=>{if(!m.logic||!m.logic.rules)return!1;const v=m.logic.rules.find(w=>w.field===d.id);return v!=null});for(let m of u){let v=e.fields.findIndex(w=>w.id===m.id);t(0,e.fields[v].updated=!e.fields[v].updated,e)}});function r(d){if(!e.enableLogic)return!0;if(!d.logic)return!0;const b=new ue;return b.evaluate(d)}function a(){const d=e.fields.find(b=>b.selected);d&&de("field_delete",{field:d})}const $=()=>{t(1,f=!1)};return s.$$set=d=>{"form"in d&&t(0,e=d.form),"mode"in d&&t(4,o=d.mode)},[e,f,r,a,o,$]}class ye extends le{constructor(s){super();oe(this,s,he,ve,fe,{form:0,mode:4})}}export default ye;
