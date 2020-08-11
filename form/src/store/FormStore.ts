import type { IField } from "entities/IField";

export const store : {[key : string] : any}= {};

export class FormStore {
    set(field : IField) {
        store[field.id] = field.value;
        console.log("store_updated", store);
    }
    get(fieldId : string) {
        return store[fieldId];
    }
}

const formStore = new FormStore();
export default formStore;