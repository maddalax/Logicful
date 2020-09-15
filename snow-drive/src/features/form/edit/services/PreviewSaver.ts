import { subscribe } from '@app/event/EventBus'
import formStore from '@app/store/FormStore'
import { debounce } from '@app/util/Debounce'
import { saveToLocalStorage } from './SaveForm'

let initialized = false;

const debounceSave = debounce(() => {
  const form = formStore.getForm()
  saveToLocalStorage(form)
}, 300)

export function startPreviewSaver() {
  if(initialized) {
    return;
  }
  initialized = true;
  console.log("start saver")
  subscribe('field_changed', () => {
    console.log("f change")
    debounceSave()
  })
  subscribe('form_updated', () => {
    console.log("f updated")
    debounceSave()
  })
  subscribe('form_loaded', () => {
    console.log("f loaded")
    debounceSave()
  })
}

export function stopPreviewSaver() {
}
