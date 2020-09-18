import formStore from '@app/store/FormStore'
import Bowser from 'bowser'
import traverse from 'traverse'
import { isObject } from "@app/guards/Guard"
import { postApi } from '@app/services/ApiService'
import type { IForm } from '@app/models/IForm'
import { dispatch } from '@app/event/EventBus'

const excluded = ['block']

export async function submitForm() {
  const form = formStore.getForm();

  await uploadFiles(form);

  const id = form.id
  const results: { [key: string]: any } = {}
  const fieldMeta: { [key: string]: any } = {}
  const meta: { [key: string]: any } = {}

  const ignored = ['name', 'value', 'type', 'id']

  // Parse out the values of the form by deleting
  // any key that isn't in the ignored list.
  traverse(form).forEach(function (x: any) {
    //@ts-ignore
    if (!this.key || this.key === 'fields') {
      return
    }

    if (isObject(x)) {
      let hasValue = false
      Object.keys(x).forEach((k) => {
        if (k === 'value') {
          hasValue = true
        }
      })
      if (hasValue) {
        Object.keys(x).forEach((k) => {
          const v = x[k]
          if (k === 'value') {
            return
          }
          if (isObject(v) || Array.isArray(v)) {
            delete x[k]
          }
        })
      }
    }

    if (isObject(x) || Array.isArray(x)) {
      return
    }
    //@ts-ignore
    if (!ignored.includes(this.key)) {
      //@ts-ignore
      const last = this.path[this.path.length - 2]
      if (last === 'value') {
        return
      }
      //@ts-ignore
      this.delete()
    }
  })

  form.fields.forEach((f) => {
    if (f.name == null) {
      return
    }
    if (excluded.includes(f.type)) {
      return
    }
    results[f.name] = f.value ?? f.defaultValue ?? null
    if (!fieldMeta[f.name]) {
      fieldMeta[f.name] = {}
    }
    if (f.value == null) {
      fieldMeta[f.name].userSelectedValue = false
    }
    fieldMeta[f.name].type = f.type
  })

  try {
    meta['env'] = Bowser.getParser(window.navigator.userAgent).getResult()
  } catch (ex) {}
  const submission = {
    formId: id!,
    details: results,
    fieldMeta,
    meta,
  }

  await postApi(`form/${id}/submission`, submission)
}

export async function uploadFiles(form : IForm) {
  dispatch("submission_uploading_files", {})
  const fileFields = form.fields.filter(w => w.type === "file" && w.value);
  const promises = await fileFields.map(f => {
    return postApi(`s3/put`, {})
  });
  const responses : any[] = await Promise.all(promises);
  const upload = responses.map((r : {url : string, key : string}, i : number) => {
    const id = fileFields[i].id;
    const file = formStore.getFile(fileFields[i].value);
    const index = form.fields.findIndex(w => w.id === id);
    form.fields[index].value.id = r.key;
    return fetch(r.url, {
      method: 'PUT',
      body: file
    });
  });
  await Promise.all(upload);
  dispatch("submission_uploading_files_finished", {})
}