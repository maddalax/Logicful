import {subscribe} from "../../../../event/EventBus.js";
import formStore from "../../../../store/FormStore.js";
import {debounce} from "../../../../util/Debounce.js";
import {saveToLocalStorage} from "./SaveForm.js";
let initialized = false;
const debounceSave = debounce(() => {
  const form = formStore.getForm();
  saveToLocalStorage(form);
}, 300);
export function startPreviewSaver() {
  if (initialized) {
    return;
  }
  initialized = true;
  console.log("start saver");
  subscribe("field_changed", () => {
    console.log("f change");
    debounceSave();
  });
  subscribe("form_updated", () => {
    console.log("f updated");
    debounceSave();
  });
  subscribe("form_loaded", () => {
    console.log("f loaded");
    debounceSave();
  });
}
export function stopPreviewSaver() {
}
