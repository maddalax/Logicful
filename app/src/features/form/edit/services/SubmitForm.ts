import type { IForm } from "models/IForm";
import formStore from "store/FormStore";

export async function submitForm() {
    const form = formStore.getForm();
    const url = await save(form);
    const id = url.replace('https://logicful.nyc3.digitaloceanspaces.com/', "").replace(".json", "");
    form.id = id;
    localStorage.setItem("form", JSON.stringify(form));
    window.open("http://localhost:5000/preview/" + id);
}

async function save(form : IForm): Promise<string> {
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