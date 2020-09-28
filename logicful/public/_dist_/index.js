import __SNOWPACK_ENV__ from '../__snowpack__/env.js';
import.meta.env = __SNOWPACK_ENV__;

import App2 from "./App.js";
import "../web_modules/@fortawesome/fontawesome-free/css/all.min.css.proxy.js";
import "../web_modules/@fortawesome/fontawesome-free/js/all.min.js";
import "../web_modules/popperjs/dist/popper.min.js";
import {initSentry} from "./services/Sentry.js";
initSentry();
var app = new App2({
  target: document.body
});
export default app;
if (import.meta.hot) {
  import.meta.hot.accept();
  import.meta.hot.dispose(() => {
    app.$destroy();
  });
}
