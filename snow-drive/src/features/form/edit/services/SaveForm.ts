import type { IForm } from '@app/models/IForm'
import { postApi, putApi } from '@app/services/ApiService'
import formStore from '@app/store/FormStore'
import { fastClone } from '@app/util/Compare'
import { dispatch } from '@app/event/EventBus'

export async function saveForm(options: {
  dispatchEvent: boolean
} = { dispatchEvent: true }, form? : IForm) {
  if(!form) {
    form = formStore.getForm()
  }
  const clone = fastClone(form);
  removeValues(clone)
  await save(clone)
  saveToLocalStorage(clone)
  if (!options.dispatchEvent) {
    return;
  }
  dispatch("form_saved", form)
}

export function saveToLocalStorage(form: IForm) {
  let copy = fastClone(form)
  copy = removeValues(copy)
  localStorage.setItem("form", JSON.stringify(copy))
}

function removeValues(form: IForm): IForm {
  if(!form.fields) {
    return form;
  }
  form.fields = form.fields.map((f) => {
    delete f.value
    return f
  })
  return form
}

async function save(form: IForm): Promise<IForm> {
  return await (form.id ? putApi(`form/${form.id}`, form) : postApi('form', form))
}
