
const code = ".table-hover.svelte-1yxaouc.svelte-1yxaouc{margin-top:1em !important;margin-right:auto !important;margin-left:auto !important}table.svelte-1yxaouc tr:hover td.svelte-1yxaouc:first-child{border-top-left-radius:0.45rem;border-bottom-left-radius:0.45rem}table.svelte-1yxaouc tr:hover td.svelte-1yxaouc:last-child{border-top-right-radius:0.45rem;border-bottom-right-radius:0.45rem}tr.svelte-1yxaouc.svelte-1yxaouc:not(:first-child){background-color:#f4f7f7 !important}tr.active.svelte-1yxaouc.svelte-1yxaouc{border-radius:0.45rem}td.svelte-1yxaouc.svelte-1yxaouc{max-width:500px;width:500px !important}.text.svelte-1yxaouc.svelte-1yxaouc{overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}.text-unread.svelte-1yxaouc.svelte-1yxaouc{font-weight:bold}th{cursor:pointer}.fa-columns.svelte-1yxaouc.svelte-1yxaouc{cursor:pointer;height:1.5em;width:1.5em}.fa-trash-alt.svelte-1yxaouc.svelte-1yxaouc{cursor:pointer;height:1.5em;width:1.5em}.fa-eye.svelte-1yxaouc.svelte-1yxaouc{cursor:pointer;height:1.5em;width:1.5em}.fa-filter.svelte-1yxaouc.svelte-1yxaouc{cursor:pointer;height:1.3em;width:1.3em}.fa-eye-slash.svelte-1yxaouc.svelte-1yxaouc{cursor:pointer;height:1.5em;width:1.5em}.unread.svelte-1yxaouc.svelte-1yxaouc{background-color:white !important}";

const styleEl = document.createElement("style");
const codeEl = document.createTextNode(code);
styleEl.type = 'text/css';

styleEl.appendChild(codeEl);
document.head.appendChild(styleEl);