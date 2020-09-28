
const code = ".fa-trash.svelte-105i2dl{height:0.5em;cursor:pointer;margin-top:15px}.fa-plus.svelte-105i2dl{height:0.5em;cursor:pointer;margin-top:15px}";

const styleEl = document.createElement("style");
const codeEl = document.createTextNode(code);
styleEl.type = 'text/css';

styleEl.appendChild(codeEl);
document.head.appendChild(styleEl);