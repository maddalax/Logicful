
const code = ".block.svelte-1ture1{margin-bottom:1em;cursor:pointer}.save-button.svelte-1ture1{width:94%;height:40px;padding:0 0;margin-bottom:1.2em;margin-left:-6px}.h6.svelte-1ture1{font-weight:400}.pl-3.svelte-1ture1{padding-left:0.7rem !important}";

const styleEl = document.createElement("style");
const codeEl = document.createTextNode(code);
styleEl.type = 'text/css';

styleEl.appendChild(codeEl);
document.head.appendChild(styleEl);