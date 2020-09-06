<script context="module">
  import { getUrlParameter } from 'util/Http'

  export async function preload(this: any, page: any, session: any) {
    const formId = page.query.formId
    if (!formId || formId == 'undefined' || formId == 'null') {
      return this.error(400, 'Invalid Form Id')
    }
    //@ts-ignore
    const form: IForm = await getApi(`/form/${formId}`, this.fetch)
    form.id = formId
    formStore.setForm(form)

    return { form:form }
  }
</script>

<script lang="typescript">
  import { dispatch, subscribeComponent } from 'event/EventBus'
  import { afterUpdate, onMount } from 'svelte'
  import type { IForm } from 'models/IForm'
  import FormSettingsSidebar from 'components/form_settings/FormSettingsSidebar.svelte'
  import formStore from 'store/FormStore'
  import FormEditSettings from 'features/form/edit/FormEditSettings.svelte'
  import FormSettingsDetails from 'components/form_settings/FormSettingsDetails.svelte'
  import type { IField } from 'models/IField'
  import { saveForm } from 'features/form/edit/services/SaveForm'
  import FormSettings from 'components/form_settings/FormSettings.svelte'
import { getApi } from 'services/ApiService';

  export let form: IForm
  let selected: string = 'general'

  onMount(() => {
    getForm()
  })

  function getForm() {
    let temp = localStorage.getItem('form')
    if (!temp) {
      temp = JSON.stringify({ fields: [] })
    }
    form = JSON.parse(temp)
    form.fields = form.fields.map((w: IField) => {
      w.selected = false
      return w
    })

    formStore.setForm(form)
    dispatch('form_loaded', {
      form,
    })

    form
  }
</script>

<div style="background-color: #f5f9fe;">
  <FormSettings {form} {selected} />
</div>
