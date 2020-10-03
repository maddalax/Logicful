import{SvelteComponent as d,detach as o,element as m,empty as c,init as u,insert as i,noop as n,safe_not_equal as p}from"../../../web_modules/svelte/internal.js";import{me as f}from"../../services/AuthService.js";import{onMount as b}from"../../../web_modules/svelte.js";function l(r){let t;return{c(){t=m("div"),t.innerHTML=`<div class="card border-light p-0 p-md-4 mb-4"><div class="card-body"><h3 class="h5 mb-0">Manage Team</h3> 
      <form class="form mt-5" autocomplete="off"><div class="mb-4"><label for="inputPasswordOld">Current Password</label>  <input type="password" class="form-control" id="inputPasswordOld" required=""/></div> 
        <div class="mb-4"><label for="inputPasswordNew">New Password</label> 
          <input type="password" class="form-control" id="inputPasswordNew" required=""/> 
          <span class="form-text small text-muted">The password must be 8-20 characters, and must <em>not</em> contain spaces.</span></div> 
        <div class="mb-4"><label for="inputPasswordNewVerify">Verify</label> 
          <input type="password" class="form-control" id="inputPasswordNewVerify" required=""/> 
          <span class="form-text small text-muted">To confirm, type the new password again.</span></div> 
        <div class="form-group"><button type="submit" class="btn btn-dark">Save</button></div></form></div></div>`},m(e,s){i(e,t,s)},d(e){e&&o(t)}}}function v(r){let t,e=r[0]&&l(r);return{c(){e&&e.c(),t=c()},m(s,a){e&&e.m(s,a),i(s,t,a)},p(s,[a]){s[0]?e||(e=l(s),e.c(),e.m(t.parentNode,t)):e&&(e.d(1),e=null)},i:n,o:n,d(s){e&&e.d(s),s&&o(t)}}}let N="";function w(r,t,e){let s;return b(async()=>{e(0,s=await f())}),[s]}class y extends d{constructor(r){super();u(this,r,w,v,p,{})}}export default y;
