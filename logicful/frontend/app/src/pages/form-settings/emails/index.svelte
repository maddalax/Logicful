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
  import { onMount } from 'svelte'
  import type { IForm } from '@app/models/IForm'
  import formStore from '@app/store/FormStore'
  import FormSettings from '@app/components/form_settings/FormSettings.svelte'
import { getApi } from '@app/services/ApiService';

  export let form: IForm
  let selected: string = 'emails'

  onMount(() => {
  })

</script>

<div>
  <FormSettings {form} {selected} />
</div>
