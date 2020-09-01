import formStore from "store/FormStore"
import Bowser from "bowser";
import traverse from 'traverse'
import set from "lodash.set";
import { isObject } from "guards/Guard";
import has from "lodash.has";
import { fastClone } from "util/Compare";

const excluded = ['block']

export async function submitForm() {
    const form = formStore.getForm();
    const clone = fastClone(form);
    console.log("FORM BEFORE EDIT", clone);
    const id = form.id;
    const results: { [key: string]: any } = {}
    const fieldMeta: { [key: string]: any } = {};
    const meta: { [key: string]: any } = {}

    const ignored = ['name', 'value', 'type']

    // Parse out the values of the form by deleting
    // any key that isn't in the ignored list.
    traverse(form).forEach(function (x: any) {
        //@ts-ignore
        if (!this.key || this.key === 'fields') {
            return;
        }

        if (isObject(x)) {
            let hasValue = false;
            Object.keys(x).forEach(k => {
                if (k === 'value') {
                    hasValue = true;
                }
            });
            if (hasValue) {
                Object.keys(x).forEach(k => {
                    const v = x[k];
                    if(k === "value") {
                        return;
                    }
                    if (isObject(v) || Array.isArray(v)) {
                        delete x[k];
                    }
                })
            }
        }

        if (isObject(x) || Array.isArray(x)) {
            return;
        }
        //@ts-ignore
        if (!ignored.includes(this.key)) {
            //@ts-ignore
            const last = this.path[this.path.length - 2];
            if(last === 'value') {
                return;
            }
            //@ts-ignore
            console.log(this.path, last, this.key)
            //@ts-ignore
            this.delete();
        }
    });

    form.fields.forEach(f => {
        if (f.name == null) {
            return;
        }
        if (excluded.includes(f.type)) {
            return;
        }
        results[f.name] = f.value ?? f.defaultValue ?? null;
        if (!fieldMeta[f.name]) {
            fieldMeta[f.name] = {};
        }
        if (f.value == null) {
            fieldMeta[f.name].userSelectedValue = false;
        }
        fieldMeta[f.name].type = f.type;
    });

    try {
        meta["env"] = Bowser.getParser(window.navigator.userAgent).getResult();
    } catch (ex) {

    }
    const submission = {
        formId: id!,
        details: results,
        fieldMeta,
        meta
    }
    
    const result = await fetch(`http://localhost:3000/form/${id}/submit`, {
        method : 'POST',
        body : JSON.stringify(submission),
        headers : {
            'Content-Type' : 'application/json'
        }
    });

    if(!result.ok) {
        const json = await result.json();
        throw new Error(json.message);
    }
}