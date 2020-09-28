
const code = ".footer.svelte-plrhhm{bottom:0;width:100%;height:6.5em;padding-top:1em}.mb-5.svelte-plrhhm{margin-bottom:0rem !important}";

const styleEl = document.createElement("style");
const codeEl = document.createTextNode(code);
styleEl.type = 'text/css';

styleEl.appendChild(codeEl);
document.head.appendChild(styleEl);