export function isString(value : any) : value is string {
    return typeof value === "string";
}

export function isObject(value : any) : value is any {
    return !isString(value) && typeof value === "object";
}