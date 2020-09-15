<script context="module">
  import { getUrlParameter } from '@app/util/Http'

  export async function preload(this: any, page: any, session: any) {
    const formId = page.query.formId
    if (!formId || formId == 'undefined' || formId == 'null') {
      return this.error(400, 'Invalid Form Id')
    }
    //@ts-ignore
    const form: IForm = await getApi(`form/${formId}`, this.fetch)
    form.id = formId
    formStore.setForm(form)

    return { form:form }
  }
</script>


<script lang="typescript">
  import { dispatch, subscribeComponent } from '@app/event/EventBus'
  import { afterUpdate, onMount } from 'svelte'
  import type { IForm } from '@app/models/IForm'
  import FormSettingsSidebar from '@app/components/form_settings/FormSettingsSidebar.svelte'
  import formStore from '@app/store/FormStore'
  import FormEditSettings from '@app/features/form/edit/FormEditSettings.svelte'
  import FormSettingsDetails from '@app/components/form_settings/FormSettingsDetails.svelte'
  import type { IField } from '@app/models/IField'
  import { saveForm } from '@app/features/form/edit/services/SaveForm'
  import FormSettings from '@app/components/form_settings/FormSettings.svelte'
import { getApi } from '@app/services/ApiService';

  export let form: IForm
  let selected: string = 'scoring'

  onMount(() => {
  })

</script>

<div style="background-color: #f5f9fe;">
  <FormSettings {form} {selected} />
</div>
