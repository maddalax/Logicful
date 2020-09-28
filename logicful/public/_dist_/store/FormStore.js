import {dispatch} from "../event/EventBus.js";
import {dispatchFieldChange} from "../event/FieldEvent.js";
import get from "../../web_modules/lodash.get.js";
import {fastClone, fastEquals} from "../util/Compare.js";
import {set} from "../util/Selection.js";
let configStore = {};
let files = {};
let store = {
  fields: {}
};
export class FormStore {
  initialized() {
    return this.getForm().initialized === true;
  }
  setForm(form) {
    const copy = fastClone(form);
    store = {fields: {}};
    copy.fields.forEach((f) => {
      formStore.set(f, {
        fromUser: false,
        field: "",
        value: ""
      });
    });
    Object.keys(copy).forEach((f) => {
      if (f === "fields") {
        return;
      }
      store[f] = copy[f];
    });
    store.initialized = true;
    dispatch("form_updated", this.getForm());
  }
  set(field, change = {field: "", value: "", fromUser: false}) {
    console.log("formstore_set", field, change);
    if (field.configTarget === "form") {
      const isSame2 = fastEquals(configStore[field.id], field);
      if (isSame2) {
        return;
      }
      set(store, field.configFieldTarget, field.value);
      dispatch("form_updated", this.getForm());
      dispatchFieldChange(fastClone(field), {
        field: field.configFieldTarget,
        value: field.value,
        fromUser: change.fromUser
      });
      return;
    }
    if (field.configTarget) {
      const isSame2 = fastEquals(configStore[field.id], field);
      if (isSame2) {
        return;
      }
      set(store.fields[field.configTarget], field.configFieldTarget, field.value);
      const copy2 = fastClone(field);
      configStore[field.id] = copy2;
      dispatchFieldChange(copy2, change);
      const newField = get(store.fields, field.configTarget);
      dispatchFieldChange(fastClone(newField), {
        field: field.configFieldTarget,
        value: field.value,
        fromUser: change.fromUser
      });
      return;
    }
    const isSame = fastEquals(field, get(store.fields, field.id));
    if (isSame) {
      return;
    }
    const copy = fastClone(field);
    set(store.fields, field.id, copy);
    dispatchFieldChange(copy, change);
  }
  get(fieldId) {
    const field = store.fields[fieldId];
    if (!field) {
      return void 0;
    }
    const copy = fastClone(field);
    return copy;
  }
  getValue(fieldId) {
    const copy = this.get(fieldId);
    return copy?.value ?? void 0;
  }
  getForm() {
    const form = {fields: []};
    Object.keys(store).forEach((k) => {
      if (k === "fields") {
        return;
      }
      form[k] = store[k];
    });
    Object.keys(store.fields).forEach((fieldId) => {
      const field = store.fields[fieldId];
      if (field.configTarget) {
        return;
      }
      form.fields.push(fastClone(field));
    });
    return form;
  }
  setFile(id, file) {
    files[id] = file;
  }
  clearFile(id) {
    delete files[id];
  }
  getFile(id) {
    return files[id];
  }
}
const formStore = new FormStore();
export default formStore;
