import type { IField } from "models/IField";

export const store : {[key : string] : any}= {};

export class FormStore {
    set(field : IField) {
        store[field.id] = field.value;
    }
    get(fieldId : string) {
        return store[fieldId];
    }
}

const formStore = new FormStore();
export default formStore;