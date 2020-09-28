import {nullOrEmpty} from "../util/Compare.js";
export function isString(value) {
  return typeof value === "string";
}
export function isObject(value) {
  return value != null && !isString(value) && typeof value === "object";
}
export function isFunction(value) {
  return typeof value === "function" && !isString(value) && !nullOrEmpty(value);
}
export function isLabelValue(value) {
  return !isString(value) && value?.label != null && value?.value != null;
}
