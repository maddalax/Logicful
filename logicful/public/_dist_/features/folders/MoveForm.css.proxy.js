
const code = ".p-2.svelte-1bncuw8.svelte-1bncuw8{padding-left:0.5rem !important;padding-top:0rem !important;padding-bottom:0rem !important}.list-group-item.svelte-1bncuw8.svelte-1bncuw8{color:#26304c !important}.list-group.dashboard-menu.svelte-1bncuw8 .list-group-item.svelte-1bncuw8:hover{border-radius:0.3em}.active.svelte-1bncuw8.svelte-1bncuw8{color:#26304c !important;border-radius:0.3em}";

const styleEl = document.createElement("style");
const codeEl = document.createTextNode(code);
styleEl.type = 'text/css';

styleEl.appendChild(codeEl);
document.head.appendChild(styleEl);