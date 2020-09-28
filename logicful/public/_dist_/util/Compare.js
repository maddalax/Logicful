import {isObject, isString} from "../guards/Guard.js";
export function stringEquals(str1, str2) {
  if (str1 == null && str2 == null) {
    return true;
  }
  if (isString(str1) && isString(str2)) {
    return str1.toLowerCase().trim() === str2.toLowerCase().trim();
  }
  return str1 === str2;
}
export function toNumberOrDefault(value) {
  const parsed = parseFloat(value);
  return isNaN(parsed) ? 0 : parsed;
}
export function isEmptyOrNull(value) {
  if (value == null) {
    return true;
  }
  if (!Array.isArray(value)) {
    return true;
  }
  return value.length === 0;
}
export function isNullString(value) {
  return value == null || value == "null" || value == "undefined" || value == void 0;
}
export function nullOrEmpty(str) {
  return str == null || str === "";
}
export function fastEquals(any, any2) {
  return JSON.stringify(any) === JSON.stringify(any2);
}
export function fastClone(any) {
  if (any == null || !isObject(any)) {
    return any;
  }
  return JSON.parse(JSON.stringify(any));
}
