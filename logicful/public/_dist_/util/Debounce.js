export function debounce(e,r,l=null){let t;return function(){var n=this,o=arguments,u=function(){t=null,l||e.apply(n,o)},a=l&&!t;clearTimeout(t),t=setTimeout(u,r),a&&e.apply(n,o)}}
