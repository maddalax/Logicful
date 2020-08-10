import { isString } from 'guards/Guard';

export function stringEquals(str1 : string, str2 : string) {
    if(str1 == null && str2 == null) {
        return true;
    }
    if(isString(str1) && isString(str2)) {
        return str1.toLowerCase().trim() === str2.toLowerCase().trim();
    }
    return false;
}

export function shallowEquals(any : string, any2 : string) {
    return JSON.stringify(any) === JSON.stringify(any2);
}