import{SvelteComponent as J,append as t,attr as s,create_component as N,destroy_component as q,detach as $,element as i,init as O,insert as _,mount_component as A,safe_not_equal as Q,space as d,text as P,transition_in as V,transition_out as E}from"../../../web_modules/svelte/internal.js";import{me as U}from"../../services/AuthService.js";import{onMount as Y}from"../../../web_modules/svelte.js";import"./logos/LogoWhite.js";import F from"../Link.js";function z(r){let e;return{c(){e=P("Dashboard")},m(o,n){_(o,e,n)},d(o){o&&$(e)}}}function G(r){let e;return{c(){e=P("My Forms")},m(o,n){_(o,e,n)},d(o){o&&$(e)}}}function I(r){let e;return{c(){e=i("div"),e.innerHTML=`<div class="py-1 rounded-md bg-white shadow-xs" role="menu" aria-orientation="vertical" aria-labelledby="user-menu"><a href="#" class="block px-4 py-2 text-sm leading-5 text-gray-700
                    hover:bg-gray-100 focus:outline-none focus:bg-gray-100
                    transition duration-150 ease-in-out" role="menuitem">Your Profile</a> 
                <a href="#" class="block px-4 py-2 text-sm leading-5 text-gray-700
                    hover:bg-gray-100 focus:outline-none focus:bg-gray-100
                    transition duration-150 ease-in-out" role="menuitem">Settings</a> 
                <a href="#" class="block px-4 py-2 text-sm leading-5 text-gray-700
                    hover:bg-gray-100 focus:outline-none focus:bg-gray-100
                    transition duration-150 ease-in-out" role="menuitem">Sign out</a></div>`,s(e,"class",`origin-top-right absolute right-0 mt-2 w-48 rounded-md
                shadow-lg`)},m(o,n){_(o,e,n)},d(o){o&&$(e)}}}function K(r){let e,o,n,b,j,c,v,L,y,f,l,H,u,T,m,x,C,g,M,S,W,w,k;l=new F({props:{href:"/",class:`ml-4 px-3 py-2 rounded-md text-sm font-medium leading-5
                text-gray-300 hover:text-white hover:bg-gray-700
                focus:outline-none focus:text-white focus:bg-gray-700 transition
                duration-150 ease-in-out`,$$slots:{default:[z]},$$scope:{ctx:r}}}),u=new F({props:{href:"/folder",class:`px-3 py-2 rounded-md text-sm font-medium leading-5
                text-white bg-gray-900 focus:outline-none focus:text-white
                focus:bg-gray-700 transition duration-150 ease-in-out`,$$slots:{default:[G]},$$scope:{ctx:r}}});let h=!1;return{c(){e=i("nav"),o=i("div"),n=i("div"),b=i("div"),b.innerHTML=`<button class="inline-flex items-center justify-center p-2 rounded-md
            text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none
            focus:bg-gray-700 focus:text-white transition duration-150
            ease-in-out" aria-label="Main menu" aria-expanded="false"><svg class="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg> 
          
          
          <svg class="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>`,j=d(),c=i("div"),v=i("div"),v.innerHTML=`<img class="block lg:hidden h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-on-dark.svg" alt="Workflow logo"/> 
          <img class="hidden lg:block h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-logo-on-dark.svg" alt="Workflow logo"/>`,L=d(),y=i("div"),f=i("div"),N(l.$$.fragment),H=d(),N(u.$$.fragment),T=d(),m=i("div"),x=i("button"),x.innerHTML='<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>',C=d(),g=i("div"),M=i("div"),M.innerHTML=`<button class="flex text-sm border-2 border-transparent rounded-full
                focus:outline-none focus:border-white transition duration-150
                ease-in-out" id="user-menu" aria-label="User menu" aria-haspopup="true"><img class="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80" alt=""/></button>`,S=d(),h&&h.c(),W=d(),w=i("div"),w.innerHTML=`<div class="px-2 pt-2 pb-3"><a href="#" class="block px-3 py-2 rounded-md text-base font-medium text-white
          bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700
          transition duration-150 ease-in-out">Dashboard</a> 
      <a href="#" class="mt-1 block px-3 py-2 rounded-md text-base font-medium
          text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none
          focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out">Team</a> 
      <a href="#" class="mt-1 block px-3 py-2 rounded-md text-base font-medium
          text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none
          focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out">Projects</a> 
      <a href="#" class="mt-1 block px-3 py-2 rounded-md text-base font-medium
          text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none
          focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out">Calendar</a></div>`,s(b,"class","absolute inset-y-0 left-0 flex items-center sm:hidden"),s(v,"class","flex-shrink-0"),s(f,"class","flex"),s(y,"class","hidden sm:block sm:ml-6"),s(c,"class",`flex-1 flex items-center justify-center sm:items-stretch
          sm:justify-start`),s(x,"class",`p-1 border-2 border-transparent text-gray-400 rounded-full
            hover:text-white focus:outline-none focus:text-white
            focus:bg-gray-700 transition duration-150 ease-in-out`),s(x,"aria-label","Notifications"),s(g,"class","ml-3 relative"),s(m,"class",`absolute inset-y-0 right-0 flex items-center pr-2 sm:static
          sm:inset-auto sm:ml-6 sm:pr-0`),s(n,"class","relative flex items-center justify-between h-16"),s(o,"class","max-w-7xl mx-auto px-2 sm:px-6 lg:px-8"),s(w,"class","hidden sm:hidden"),s(e,"class","bg-gray-800")},m(a,p){_(a,e,p),t(e,o),t(o,n),t(n,b),t(n,j),t(n,c),t(c,v),t(c,L),t(c,y),t(y,f),A(l,f,null),t(f,H),A(u,f,null),t(n,T),t(n,m),t(m,x),t(m,C),t(m,g),t(g,M),t(g,S),h&&h.m(g,null),t(e,W),t(e,w),k=!0},p(a,[p]){const B={};p&2&&(B.$$scope={dirty:p,ctx:a}),l.$set(B);const D={};p&2&&(D.$$scope={dirty:p,ctx:a}),u.$set(D)},i(a){if(k)return;V(l.$$.fragment,a),V(u.$$.fragment,a),k=!0},o(a){E(l.$$.fragment,a),E(u.$$.fragment,a),k=!1},d(a){a&&$(e),q(l),q(u),h&&h.d()}}}function R(r){let e;return Y(async()=>{e=await U()}),[]}class X extends J{constructor(r){super();O(this,r,R,K,Q,{})}}export default X;
