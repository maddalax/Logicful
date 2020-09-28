
const code = ".card-header-title.svelte-rvyo6m{padding:1em 1em 0.5em 0.9em}.card.svelte-rvyo6m{border-radius:0.3em}.title.svelte-rvyo6m{font-weight:600;line-height:1.3;color:#1c2540;padding-left:0.5em;font-size:1em}.btn-outline-dark.svelte-rvyo6m{margin-right:0.9em;margin-left:0.9em;padding-top:0.4em;padding-bottom:0.4em;margin-top:1em}";

const styleEl = document.createElement("style");
const codeEl = document.createTextNode(code);
styleEl.type = 'text/css';

styleEl.appendChild(codeEl);
document.head.appendChild(styleEl);