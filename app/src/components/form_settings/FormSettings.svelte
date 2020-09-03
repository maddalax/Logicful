<script>
  import type { IForm } from 'models/IForm'
  import FormSettingsDetails from './FormSettingsDetails.svelte'
  import FormSettingsSidebar from './FormSettingsSidebar.svelte'

  export let form: IForm
  export let selected: string
</script>

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
          <FormSettingsDetails {form} {selected} />
        {/if}
      </div>
    </div>
  </div>
</div>
