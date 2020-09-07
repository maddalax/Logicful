import { subscribeComponent } from 'event/EventBus'
import { subscribeFieldChange } from 'event/FieldEvent'
import formStore from 'store/FormStore'
import { debounce } from 'util/Debounce'
import { saveToLocalStorage } from './SaveForm'
import { onMount } from 'svelte'

const debounceSave = debounce(() => {
  const form = formStore.getForm()
  saveToLocalStorage(form)
}, 300)

export function startPreviewSaver() {
  subscribeFieldChange(onMount, () => {
    debounceSave()
  })
  subscribeComponent('form_updated', () => {
    debounceSave()
  })
}

export function stopPreviewSaver() {}
