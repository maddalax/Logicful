import type { IForm } from "models/IForm";
import { postApi, putApi } from "services/ApiService";
import formStore from "store/FormStore";
import { fastClone } from "util/Compare";

export async function saveForm() {
  const form = formStore.getForm();
  removeValues(form);
  const saved : IForm = await save(form);
  form.id = saved.id;
  saveToLocalStorage(form);
}

export function saveToLocalStorage(form: IForm) {
  let copy = fastClone(form);
  copy = removeValues(copy);
  localStorage.setItem("form", JSON.stringify(copy));
}

function removeValues(form : IForm) : IForm {
  form.fields = form.fields.map(f => {
    delete(f.value)
    return f;
  })
  return form;
}

async function save(form: IForm): Promise<IForm> {
  return await (form.id ? putApi("form", form) : postApi("form", form))
}
