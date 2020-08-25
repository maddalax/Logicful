<script lang="typescript">
  import type { IForm } from 'models/IForm'

  let form: IForm
  import Field from './Field.svelte'
  import { randomString } from 'util/Generate'
  import { onMount } from 'svelte'
  import { subscribe } from 'event/EventBus'
  import formStore from 'store/FormStore'

  onMount(() => {
    form = formStore.getForm()
    subscribe('form_updated', (props) => {
      form = props.form
    })
  })
</script>

{#if form}
  <div style="padding-left: 0.5em;">
    <h5 style="padding-bottom: 0.2em;">Form Configurations</h5>
    <hr />
  </div>

  <div style="padding-right: 1.5em;">
    <Field field={{ id: randomString(), required: true, label: 'Form Title', value: { type: 'local', value: form.title }, type: 'string', configFieldTarget: 'title', configTarget: 'form' }} />
    <Field
      field={{ id: randomString(), type: 'switch', label: 'Enable Logic For Preview', value: { type: 'local', value: form.enableLogic ?? true }, configFieldTarget: 'enableLogic', configTarget: 'form' }} />
  </div>
{:else}
  <div class="spinner" />
{/if}
