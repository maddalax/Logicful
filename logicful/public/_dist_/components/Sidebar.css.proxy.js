
const code = ".sidebar.svelte-1nmn5ly{padding-top:1em;min-height:100vh}";

const styleEl = document.createElement("style");
const codeEl = document.createTextNode(code);
styleEl.type = 'text/css';

styleEl.appendChild(codeEl);
document.head.appendChild(styleEl);