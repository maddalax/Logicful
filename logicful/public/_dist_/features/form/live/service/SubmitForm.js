import formStore from "../../../../store/FormStore.js";
import Bowser from "../../../../../web_modules/bowser.js";
import traverse2 from "../../../../../web_modules/traverse.js";
import {isObject} from "../../../../guards/Guard.js";
import {postApi} from "../../../../services/ApiService.js";
import {dispatch} from "../../../../event/EventBus.js";
const excluded = ["block"];
export async function submitForm() {
  const form = formStore.getForm();
  await uploadFiles(form);
  const id = form.id;
  const results = {};
  const fieldMeta = {};
  const meta = {};
  const ignored = ["name", "value", "type", "id"];
  traverse2(form).forEach(function(x) {
    if (!this.key || this.key === "fields") {
      return;
    }
    if (isObject(x)) {
      let hasValue = false;
      Object.keys(x).forEach((k) => {
        if (k === "value") {
          hasValue = true;
        }
      });
      if (hasValue) {
        Object.keys(x).forEach((k) => {
          const v = x[k];
          if (k === "value") {
            return;
          }
          if (isObject(v) || Array.isArray(v)) {
            delete x[k];
          }
        });
      }
    }
    if (isObject(x) || Array.isArray(x)) {
      return;
    }
    if (!ignored.includes(this.key)) {
      const last = this.path[this.path.length - 2];
      if (last === "value") {
        return;
      }
      this.delete();
    }
  });
  form.fields.forEach((f) => {
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
    formId: id,
    details: results,
    fieldMeta,
    meta
  };
  await postApi(`form/${id}/submission`, submission);
}
export async function uploadFiles(form) {
  dispatch("submission_uploading_files", {});
  const fileFields = form.fields.filter((w) => w.type === "file" && w.value);
  const promises = await fileFields.map((f) => {
    const file = formStore.getFile(f.value.id);
    if (!file) {
      throw new Error("Failed to get file for " + f.name);
    }
    return postApi(`s3/put?length=${file.size}`, {});
  });
  const responses = await Promise.all(promises);
  const upload = responses.map((r, i) => {
    const id = fileFields[i].id;
    const file = formStore.getFile(fileFields[i].value.id);
    if (!file) {
      throw new Error("Failed to get file for " + fileFields[i].name);
    }
    const index = form.fields.findIndex((w) => w.id === id);
    form.fields[index].value.id = r.key;
    return new Promise((resolve, reject) => {
      fetch(r.url, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": "application/octet-stream"
        }
      }).then((result) => {
        if (!result.ok) {
          return reject("Failed to upload file, please try again.");
        }
        resolve();
      }).catch((error) => {
        reject(error);
      });
    });
  });
  await Promise.all(upload);
  dispatch("submission_uploading_files_finished", {});
}
