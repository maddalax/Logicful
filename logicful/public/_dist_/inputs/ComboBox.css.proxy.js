
const code = ".item.active{background:var(--itemIsActiveBG, #cddaec) !important;color:var(--itemIsActiveColor, #cddaec) !important}.themed.svelte-3dptv7{--border:1px solid #cddaec;--borderRadius:0.3em;--placeholderColor:#515479;--itemIsActiveColor:#515479;--clearSelectColor:#cddaec;--clearSelectFocusColor:#cddaec;--clearSelectHoverColor:#515479;--indicatorColor:#cddaec;--inputColor:#cddaec;--itemColor:#424767;--listEmptyColor:#cddaec;--multiItemActiveColor:#cddaec;--spinnerColor:#cddaec;--borderFocusColor:#cddaec;--disabledColor:#cddaec;--disabledPlaceholderColor:#cddaec;--groupTitleColor:#cddaec}";

const styleEl = document.createElement("style");
const codeEl = document.createTextNode(code);
styleEl.type = 'text/css';

styleEl.appendChild(codeEl);
document.head.appendChild(styleEl);