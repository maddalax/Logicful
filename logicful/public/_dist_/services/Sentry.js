import * as Sentry from "../../web_modules/@sentry/browser.js";
import {Integrations} from "../../web_modules/@sentry/tracing.js";
export function initSentry() {
  Sentry.init({
    dsn: "https://a325b288e9964eeaad6b2e2718c2d11b@o453689.ingest.sentry.io/5442669",
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1
  });
}
