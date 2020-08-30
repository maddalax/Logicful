import formStore from "store/FormStore"
import Bowser from "bowser";

const excluded = ['block']

export async function submitForm() {
    const form = formStore.getForm();
    const results : {[key : string] : any} = {}
    const fieldMeta : {[key : string] : any} = {};
    const meta : {[key : string] : any} = {}
    form.fields.forEach(f => {
        if(f.name == null) {
            return;
        }
        if(excluded.includes(f.type)) {
            return;
        }
        results[f.name] = f.value ?? f.defaultValue ?? null;
        if(!fieldMeta[f.name]) {
            fieldMeta[f.name] = {};
        }
        if(f.value == null) {
            fieldMeta[f.name].userSelectedValue = false;
        }
        fieldMeta[f.name].type = f.type;
    });
    
    try {
        meta["env"] = Bowser.getParser(window.navigator.userAgent).getResult();
    } catch(ex) {

    }
    const submission = {
        formId : form.id!,
        details : results,
        fieldMeta,
        meta
    }
    const result = await fetch(`http://localhost:3000/form/${form.id}/submit`, {
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