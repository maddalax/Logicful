
const code = "h1.svelte-1w6qkfh{color:#3f83f8;font-size:1.875rem;font-weight:200;margin:0}p.svelte-1w6qkfh{color:#374151;margin:0;margin-top:1rem}";

const styleEl = document.createElement("style");
const codeEl = document.createTextNode(code);
styleEl.type = 'text/css';

styleEl.appendChild(codeEl);
document.head.appendChild(styleEl);