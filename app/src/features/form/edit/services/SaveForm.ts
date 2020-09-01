import { dispatch } from "event/EventBus";
import type { IForm } from "models/IForm";
import formStore from "store/FormStore";
import { fastClone } from "util/Compare";

export async function saveForm() {
  const form = formStore.getForm();
  removeValues(form);
  const url = await save(form);
  const id = url.replace('https://json-data.s3.us-west-002.backblazeb2.com/', "").replace(".json", "");
  form.id = id;
  saveToLocalStorage(form);
}

export async function saveToLocalStorage(form: IForm) {
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

async function save(form: IForm): Promise<string> {
  const saveId = form.id
  const qs = saveId ? `?id=${saveId}` : "";
  const saveUrl = `http://localhost:3000/s3/json/set${qs}`;
  const response = await fetch(saveUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  });
  const { message } = await response.json();
  return message;
}