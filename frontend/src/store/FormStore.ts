import type { IField } from "models/IField";

export const store : {[key : string] : any}= {};

export class FormStore {
    set(field : IField) {
        store[field.id] = field.value;
        console.log("store_updated", store);
    }
    get(fieldId : string) {
        console.log("STORE", store)
        return store[fieldId];
    }
}

const formStore = new FormStore();
export default formStore;