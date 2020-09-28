import _set from "../../web_modules/lodash.set.js";
import _get from "../../web_modules/lodash.get.js";
import _has from "../../web_modules/lodash.has.js";
export function select(o, s) {
  return _get(o, s);
}
export function set(o, s, value) {
  _set(o, s, value);
}
export function assertExists(o, s, value) {
  if (!_has(o, s)) {
    _set(o, s, value);
    return true;
  }
  return false;
}
