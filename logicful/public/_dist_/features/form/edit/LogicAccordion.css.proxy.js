
const code = ".accordionHeader.svelte-12yv0lm.svelte-12yv0lm{background-color:transparent;padding:0.25em 0.1em}.accordionCollapse.svelte-12yv0lm.svelte-12yv0lm{background-color:transparent}.card-body.svelte-12yv0lm.svelte-12yv0lm{padding-top:0.75em;padding-bottom:0.75em}.accordion.svelte-12yv0lm>.card.svelte-12yv0lm{overflow:visible}.accordion.svelte-12yv0lm .card.svelte-12yv0lm:hover{background-color:white}.card-body.svelte-12yv0lm.svelte-12yv0lm{padding-right:0.8em;padding-left:0.8em}";

const styleEl = document.createElement("style");
const codeEl = document.createTextNode(code);
styleEl.type = 'text/css';

styleEl.appendChild(codeEl);
document.head.appendChild(styleEl);