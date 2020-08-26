import { nullOrEmpty } from "util/Compare";

export function isString(value : any) : value is string {
    return typeof value === "string";
}

export function isObject(value : any) : value is any {
    return !isString(value) && typeof value === "object";
}

export function isFunction(value : any) : value is () => any {
    return typeof value === "function" 
    && !isString(value) && !nullOrEmpty(value)
}