import { nullOrEmpty } from "./Compare";

export function firstNotEmpty(...values : string[]) {
    for(let v of values) {
        if(!nullOrEmpty(v)) {
            return v;
        }
    }
    return '';
}