import type { LabelValue } from "@app/models/IField";
import { nullOrEmpty } from "@app/util/Compare";

export function isString(value: any): value is string {
  return typeof value === "string";
}

export function isObject(value: any): value is any {
  return value != null && !isString(value) && typeof value === "object";
}

export function isFunction(value: any): value is () => any {
  return typeof value === "function" && !isString(value) && !nullOrEmpty(value);
}

export function isLabelValue(value: any): value is LabelValue {
  return !isString(value) && value?.label != null && value?.value != null;
}

export function isEmail(value : any) : boolean {
  return value && value.toString().includes("@");
}