import {postApi, putApi} from "../../../../services/ApiService.js";
import formStore from "../../../../store/FormStore.js";
import {fastClone} from "../../../../util/Compare.js";
import {dispatch} from "../../../../event/EventBus.js";
export async function saveForm(options = {dispatchEvent: true}, form) {
  if (!form) {
    form = formStore.getForm();
  }
  const clone = fastClone(form);
  removeValues(clone);
  await save(clone);
  saveToLocalStorage(clone);
  if (!options.dispatchEvent) {
    return;
  }
  dispatch("form_saved", form);
}
export function saveToLocalStorage(form) {
  let copy = fastClone(form);
  copy = removeValues(copy);
  localStorage.setItem("form", JSON.stringify(copy));
}
const skipRemoveValue = ["block"];
function removeValues(form) {
  if (!form.fields) {
    return form;
  }
  form.fields = form.fields.map((f) => {
    if (skipRemoveValue.includes(f.type)) {
      return f;
    }
    delete f.value;
    return f;
  });
  return form;
}
async function save(form) {
  return await (form.id ? putApi(`form/${form.id}`, form) : postApi("form", form));
}
