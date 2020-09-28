
const code = ".tooltip-wrapper.svelte-4lel3k{position:relative;display:inline-block}.tooltip.svelte-4lel3k{position:absolute;font-family:inherit;display:inline-block;width:100px;color:inherit;opacity:0;visibility:hidden;transition:opacity 300ms, visibility 300ms}.default-tip.svelte-4lel3k{display:inline-block;padding:8px 16px;border-radius:6px;color:inherit}.tooltip.top.svelte-4lel3k{left:50%;transform:translate(-50%, -100%);margin-top:-8px}.tooltip.bottom.svelte-4lel3k{left:50%;bottom:0;transform:translate(-50%, 100%);margin-bottom:-8px}.tooltip.left.svelte-4lel3k{left:0;transform:translateX(-100%);margin-left:-8px}.tooltip.right.svelte-4lel3k{right:0;transform:translateX(100%);margin-right:-8px}.tooltip.active.svelte-4lel3k{opacity:1;visibility:initial}.tooltip-slot:hover+.tooltip.svelte-4lel3k{opacity:1;visibility:initial}";

const styleEl = document.createElement("style");
const codeEl = document.createTextNode(code);
styleEl.type = 'text/css';

styleEl.appendChild(codeEl);
document.head.appendChild(styleEl);