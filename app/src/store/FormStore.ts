import { dispatch } from "event/EventBus";
import { dispatchFieldChange } from "event/FieldEvent";
import type { IField } from "models/IField";
import type { IForm } from "models/IForm";
import { fastClone, fastEquals } from "util/Compare";

let configStore: { [key: string]: IField } = {};

let store: {
    [key: string]: any
    fields: { [key: string]: IField }
} = {
    fields: {}
};

export class FormStore {
    setForm(form: IForm) {
        const copy: IForm = fastClone(form);
        store = { fields: {} };
        copy.fields.forEach(f => {
            store.fields[f.id] = f;
        });
        Object.keys(copy).forEach(f => {
            if (f === "fields") {
                return;
            }
            //@ts-ignore
            store[f] = copy[f];
        })
        dispatch("form_updated", {
            form: this.getForm()
        });
    }
    set(field: IField, userChange: boolean = false) {

        if (field.configTarget) {
            const isSame = fastEquals(configStore[field.id], field);

            if (isSame) {
                return;
            }
            const copy = fastClone(field);
            configStore[field.id] = copy;
            dispatchFieldChange(copy, true);
            return;
        }

        const isSame = fastEquals(field, store.fields[field.id]);

        if (isSame) {
            return;
        }

        const copy = fastClone(field)
        store.fields[field.id] = copy;
        dispatchFieldChange(copy, userChange);
    }
    get(fieldId: string) {
        const field = store.fields[fieldId];
        if (!field) {
            return undefined;
        }
        const copy = fastClone(field);
        return copy;
    }
    getValue(fieldId: string) {
        const copy = this.get(fieldId);
        return copy?.value ?? undefined
    }
    getForm(): IForm {
        const form: any = { fields: [] }
        Object.keys(store).forEach(k => {
            if (k === "fields") {
                return;
            }
            form[k] = store[k];
        });
        Object.keys(store.fields).forEach(fieldId => {
            const field = store.fields[fieldId];
            if (field.configTarget) {
                return;
            }
            form.fields.push(fastClone(field));
        })
        return form;
    }
}

const formStore = new FormStore();
export default formStore;