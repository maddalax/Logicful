import { subscribe } from "event/EventBus";
import { subscribeFieldChange } from "event/FieldEvent";
import formStore from "store/FormStore";
import { debounce } from "util/Debounce";
import { saveToLocalStorage } from "./SaveForm";

const debounceSave = debounce(() => {
    const form = formStore.getForm();
    saveToLocalStorage(form);
}, 500)

export function startPreviewSaver() {
    subscribeFieldChange(() => {
        debounceSave();
    })
    subscribe("form_updated", () => {
        debounceSave();
    })
}

export function stopPreviewSaver() {

}