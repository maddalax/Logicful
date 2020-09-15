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
import { getUrlParameter } from 'util/Http';

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
