import { dispatchFieldChange } from "event/FieldEvent";
import type { IField } from "models/IField";
import { shallowEquals } from "util/Compare";

export const store : {[key : string] : any}= {};

export class FormStore {
    set(field : IField, userChange : boolean = false) {
        const isSame = shallowEquals(store[field.id], field.value);
        if(isSame) {
            return;
        }
        store[field.id] = field.value;
        dispatchFieldChange(field, userChange);
    }
    get(fieldId : string) {
        return store[fieldId];
    }
}

const formStore = new FormStore();
export default formStore;