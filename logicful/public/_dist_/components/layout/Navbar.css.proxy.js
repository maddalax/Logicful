
const code = ".navbar-dark.svelte-3njt4b{background-color:#252f4c !important}.btn.svelte-3njt4b{border-radius:0.3em !important}";

const styleEl = document.createElement("style");
const codeEl = document.createTextNode(code);
styleEl.type = 'text/css';

styleEl.appendChild(codeEl);
document.head.appendChild(styleEl);