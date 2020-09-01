<script lang="typescript">
  import type { IForm } from 'models/IForm'

  let form: IForm
  import Field from './Field.svelte'
  import { randomString } from 'util/Generate'
  import { onMount } from 'svelte'
  import { subscribe } from 'event/EventBus'
  import formStore from 'store/FormStore'
import FormEditSettings from './FormEditSettings.svelte';

  onMount(() => {
    form = formStore.getForm()
    console.log(form);
    subscribe('form_updated', (props) => {
      form = props
    })
  })
</script>

{#if form}
  <div style="padding-left: 0.5em;">
    <h5 style="padding-bottom: 0.2em;">Form Settings</h5>
    <hr />
  </div>

  <div style="padding-right: 1.5em;">
    <FormEditSettings {form} />
    <Field
      field={{ id: randomString(), type: 'switch', label: 'Enable Logic For Preview', value: { type: 'local', value: form.enableLogic ?? true }, configFieldTarget: 'enableLogic', configTarget: 'form' }} />
  </div>
{:else}
  <div class="spinner" />
{/if}
