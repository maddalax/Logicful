
const code = ".wrapper.svelte-gpg6ej.svelte-gpg6ej:hover{background-color:#f5f5f5;cursor:pointer;border-radius:0.3rem}.selected.svelte-gpg6ej.svelte-gpg6ej{background-color:#f5f5f5;cursor:pointer;border-radius:0.3rem}.placeholder.svelte-gpg6ej.svelte-gpg6ej{padding:4em !important;border-radius:0.3rem;background-image:url(\"data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23424767FF' stroke-width='1' stroke-dasharray='12%2c 15' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e\")}.hidden.svelte-gpg6ej.svelte-gpg6ej{opacity:0.7}.btn-group.svelte-gpg6ej>.btn.svelte-gpg6ej:not(:last-child):not(.dropdown-toggle){border-top-right-radius:0 !important;border-bottom-right-radius:0 !important}.btn-group.svelte-gpg6ej>.btn.svelte-gpg6ej:nth-child(n + 3),.btn-group>:not(.btn-check)+.btn.svelte-gpg6ej.svelte-gpg6ej{border-top-left-radius:0 !important;border-bottom-left-radius:0 !important}";

const styleEl = document.createElement("style");
const codeEl = document.createTextNode(code);
styleEl.type = 'text/css';

styleEl.appendChild(codeEl);
document.head.appendChild(styleEl);