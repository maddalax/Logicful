
const code = ".ex-over{background-color:#f5f5f5;height:100%;min-height:25vh;margin-top:1em;margin-bottom:1em}";

const styleEl = document.createElement("style");
const codeEl = document.createTextNode(code);
styleEl.type = 'text/css';

styleEl.appendChild(codeEl);
document.head.appendChild(styleEl);