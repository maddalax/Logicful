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
import { getUrlParameter } from '@app/util/Http';

  export let form: IForm
  let selected: string = 'general'

  onMount(async () => {
    const formId = getUrlParameter("formId")
    form= await getApi(`form/${formId}`)
    form.id = formId
    formStore.setForm(form)
  })

</script>

<div style="background-color: #f5f9fe;">
  <FormSettings {form} {selected} />
</div>
