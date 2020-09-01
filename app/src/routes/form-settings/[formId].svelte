<script lang="typescript">
  import { dispatch, subscribe } from 'event/EventBus'
  import { afterUpdate, onMount } from 'svelte'
  import type { IForm } from 'models/IForm'
  import FormSettingsSidebar from 'components/form_settings/FormSettingsSidebar.svelte'
  import formStore from 'store/FormStore'
  import FormEditSettings from 'features/form/edit/FormEditSettings.svelte'
  import FormSettingsDetails from 'components/form_settings/FormSettingsDetails.svelte'
  import type { IField } from 'models/IField'
import { saveForm } from 'features/form/edit/services/SaveForm';

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

<div style=" background-color: #f5f9fe;">
  <div class="section section-lg pt-6 pt-md-6 bg-soft">
    <div class="container">
      <div class="row pt-3 pt-md-0">
        <div class="col-12 col-md-4 d-none d-lg-block">
          {#if form != null}
            <FormSettingsSidebar {form} {selected} />
          {/if}
        </div>
        <div class="col-12 col-lg-8">
          {#if form != null}
            <FormSettingsDetails {form} />
          {/if}
        </div>
      </div>
    </div>
  </div>
</div>

<style>

</style>
