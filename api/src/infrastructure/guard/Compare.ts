export function isNull(value) : boolean {
    return value == null
        || value?.toString() === 'undefined' || value?.toString() === 'null'
}