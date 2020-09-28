
const code = ".main.svelte-sg77i1{height:100%;width:53%;margin-top:1em}.left-sidebar.svelte-sg77i1{width:15%;max-width:400px;height:100vh;overflow:auto;margin-left:-13px;position:-webkit-sticky;position:sticky;top:0}#main-container.svelte-sg77i1{display:flex;justify-content:space-between}.right-sidebar.svelte-sg77i1{width:32%;min-height:25vh;height:100%;margin-right:-30px;position:-webkit-sticky;position:sticky;top:0}";

const styleEl = document.createElement("style");
const codeEl = document.createTextNode(code);
styleEl.type = 'text/css';

styleEl.appendChild(codeEl);
document.head.appendChild(styleEl);