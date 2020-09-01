<script lang="typescript">
  import type { IForm } from 'models/IForm'
  import { dispatch, subscribe } from 'event/EventBus'

  import FormEdit from 'features/form/edit/FormEdit.svelte'
  import FormEditSettings from 'features/form/edit/FormEditSettings.svelte'
  import { goto } from '@sapper/app'
import { saveForm } from 'features/form/edit/services/SaveForm';
  let saving = false

  export let form: IForm

  function onEditForm() {
    goto(`./builder/${form.id}`)
  }

  function onPreviewForm() {
    goto(`./preview/${form.id}`)
  }

  function onViewSubmissions() {
    goto(`./submissions/${form.id}`)
  }

  async function saveDraft() {
    saving = true
    await dispatch('save_form', {
      status: 'draft',
    })
    saving = false
  }

  subscribe('save_form', async (params) => {
      await saveForm()
    })
</script>

<div class="row mb-5">
  <div class="col-12 mb-4">
    <div class="d-flex justify-content-end" style="padding-bottom: 1em; padding-left: 0; display: flex; text-align: right;">
      <div style="text-align: right;">
        <button on:click={onViewSubmissions} target="_blank" class="btn btn-outline-dark">View Submissions</button>
      </div>
      <div style="text-align: right; padding-left: 0.5em;">
        <button on:click={onEditForm} target="_blank" class="btn btn-outline-dark">
          <span class="fas fa-pencil-alt" />
          Edit Form
        </button>
      </div>
      <div style="text-align: right; padding-left: 0.5em;">
        <button on:click={onPreviewForm} target="_blank" class="btn btn-outline-dark">Preview Form</button>
      </div>
    </div>
    <form action="#" method="post" class="card border-light p-3 mb-4">
      <div class="card-header bg-white border-light p-3 mb-4 mb-md-0" style="display: flex; padding-top: 0.2em !important;">
        <h3 class="h5 mb-0" style="padding-top: 0.4em;">General</h3>
        <div class="d-flex justify-content-end ml-auto">
            {#if saving}
              <button class="btn btn-primary" type="button" disabled>Saving...</button>
            {:else}
              <button class="btn btn-primary" type="button" on:click={saveDraft}>Save Changes</button>
            {/if}
          </div>
      </div>
      <div class="card-body p-0 p-md-4">
        <div class="row justify-content-center">
          {#if form}
            <FormEditSettings {form} />
          {:else}
            <div class="spinner" />
          {/if}
         
        </div>
      </div>
    </form>
  </div>
</div>
