<script lang="typescript">
  import type { IForm } from 'models/IForm'

  let form: IForm
  import Field from './Field.svelte'
  import { randomString } from 'util/Generate'
  import { onMount } from 'svelte'
  import { dispatch, subscribe } from 'event/EventBus'
  import formStore from 'store/FormStore'
  import FormEditSettings from './FormEditSettings.svelte'
  import GroupEditSidebar from './GroupEditSidebar.svelte'

  onMount(() => {
    form = formStore.getForm()
    console.log(form)
    subscribe('form_updated', (props) => {
      form = props
    })
  })

  function onGroupSettings() {
    dispatch('show_right_sidebar', { component: GroupEditSidebar, groupId: '123' })
  }
</script>

{#if form}
  <div style="padding-left: 0.5em;">
    <h5 style="padding-bottom: 0.2em;">Form Settings</h5>
    <!-- <button on:click={onGroupSettings} target="_blank" class="btn btn-sm btn-outline-dark">
      <span class="fas fa-cog" />
      Group Settings
    </button> -->
    <hr />
  </div>

  <div style="padding-right: 1.5em;">
    <Field
      field={{ id: randomString(), type: 'switch', label: 'Enable Logic For Preview', value: { type: 'local', value: form.enableLogic ?? true }, configFieldTarget: 'enableLogic', configTarget: 'form' }} />
    <FormEditSettings {form} />
  </div>
{:else}
  <div class="spinner" />
{/if}
