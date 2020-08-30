import formStore from "store/FormStore"

export async function submitForm() {
    const form = formStore.getForm();
    console.log("FORM", form);
    const results : {[key : string] : any} = {}
    form.fields.forEach(f => {
        if(!f.name) {
            return;
        }
        results[f.name] = f.value
    });
    const submission = {
        formId : form.id!,
        details : results
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