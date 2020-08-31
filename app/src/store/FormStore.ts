import { dispatch } from "event/EventBus";
import { dispatchFieldChange } from "event/FieldEvent";
import type { IField } from "models/IField";
import type { IForm } from "models/IForm";
import { fastClone, fastEquals } from "util/Compare";
import { set } from "util/Selection";

let configStore: { [key: string]: IField } = {};

let files: { [key: string]: File } = {}

let store: {
    [key: string]: any
    fields: { [key: string]: IField }
} = {
    fields: {}
};

export type FieldChange = {
    field: string,
    value: any,
    fromUser: boolean
}

export class FormStore {
    setForm(form: IForm) {
        const copy: IForm = fastClone(form);
        store = { fields: {} };
        copy.fields.forEach(f => {
            formStore.set(f, {
                fromUser: false,
                field: '',
                value: ''
            })
        })
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
    set(field: IField, change: FieldChange = { field: '', value: '', fromUser: false }) {
        if (field.configTarget === 'form') {
            set(store, field.configFieldTarget, field.value);
            dispatch("form_updated", {
                form: this.getForm()
            })
            return
        }

        if (field.configTarget) {
            const isSame = fastEquals(configStore[field.id], field);

            if (isSame) {
                return;
            }

            set(store.fields[field.configTarget], field.configFieldTarget, field.value)
            const copy = fastClone(field);
            configStore[field.id] = copy;
            dispatchFieldChange(copy, change);
            const newField = store.fields[field.configTarget];
            dispatchFieldChange(fastClone(newField), {
                field: field.configFieldTarget,
                value: field.value,
                fromUser: change.fromUser
            })
            return;
        }

        const isSame = fastEquals(field, store.fields[field.id]);

        if (isSame) {
            return;
        }

        const copy = fastClone(field)
        store.fields[field.id] = copy;
        dispatchFieldChange(copy, change);
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
    setFile(id: string, file: File) {
        files[id] = file;
    }
    clearFile(id: string) {
        delete files[id]
    }
    getFile(id: string): File | undefined {
        return files[id];
    }
}

const formStore = new FormStore();
export default formStore;