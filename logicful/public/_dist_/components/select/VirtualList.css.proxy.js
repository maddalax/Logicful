
const code = "svelte-virtual-list-viewport.svelte-13thbeo{position:relative;overflow-y:auto;-webkit-overflow-scrolling:touch;display:block}svelte-virtual-list-contents.svelte-13thbeo,svelte-virtual-list-row.svelte-13thbeo{display:block}svelte-virtual-list-row.svelte-13thbeo{overflow:hidden}";

const styleEl = document.createElement("style");
const codeEl = document.createTextNode(code);
styleEl.type = 'text/css';

styleEl.appendChild(codeEl);
document.head.appendChild(styleEl);