export default function a(e,o,l){let t;return function(){let n=this,u=arguments,c=function(){t=null,l||e.apply(n,u)},i=l&&!t;clearTimeout(t),t=setTimeout(c,o),i&&e.apply(n,u)}}
