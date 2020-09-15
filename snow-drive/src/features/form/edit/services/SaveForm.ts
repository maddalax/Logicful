import type { IForm } from '@app/models/IForm'
import { postApi, putApi } from '@app/services/ApiService'
import formStore from '@app/store/FormStore'
import { fastClone } from '@app/util/Compare'
import { dispatch } from '@app/event/EventBus'

export async function saveForm(options: {
  dispatchEvent: boolean
} = { dispatchEvent: true }) {
  const form = formStore.getForm()
  const isNew = form.id == null
  removeValues(form)
  const saved: IForm = await save(form)
  form.id = saved.id
  saveToLocalStorage(form)
  if (!options.dispatchEvent) {
    return;
  }
  formStore.setForm(form)
  if (isNew) {
    window.location.replace('/form/builder?formId=' + form.id)
  }
  dispatch("form_saved", form)
}

export function saveToLocalStorage(form: IForm) {
  let copy = fastClone(form)
  copy = removeValues(copy)
  localStorage.setItem("form", JSON.stringify(copy))
}

function removeValues(form: IForm): IForm {
  form.fields = form.fields.map((f) => {
    delete f.value
    return f
  })
  return form
}

async function save(form: IForm): Promise<IForm> {
  return await (form.id ? putApi(`form/${form.id}`, form) : postApi('form', form))
}
