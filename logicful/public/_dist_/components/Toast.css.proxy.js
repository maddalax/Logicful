
const code = ".toast-container.svelte-hsmqtg{position:fixed;max-height:0px;right:15px;left:0;top:85px;z-index:100000}.toast.svelte-hsmqtg{display:block;background-color:#424767;opacity:1;color:white;font-size:12pt !important;min-width:250px}.toast-header{color:#ffffff !important;background-color:#52547a !important}";

const styleEl = document.createElement("style");
const codeEl = document.createTextNode(code);
styleEl.type = 'text/css';

styleEl.appendChild(codeEl);
document.head.appendChild(styleEl);