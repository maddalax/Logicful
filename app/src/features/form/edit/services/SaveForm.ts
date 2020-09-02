import type { IForm } from "models/IForm";
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
  const saveUrl = `http://localhost:3000/api/form/save`;
  const response = await fetch(saveUrl, {
    method: form.id ? "PUT" : "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  });
  return await response.json();
}
