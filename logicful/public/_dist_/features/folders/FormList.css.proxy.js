
const code = ".radius-0.svelte-ie0b39{border-radius:0rem !important;padding-left:0.5em}.form-list.svelte-ie0b39{max-height:70vh;overflow:auto}";

const styleEl = document.createElement("style");
const codeEl = document.createTextNode(code);
styleEl.type = 'text/css';

styleEl.appendChild(codeEl);
document.head.appendChild(styleEl);