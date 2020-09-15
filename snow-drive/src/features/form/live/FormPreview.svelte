<script>
  import { dispatch } from '@app/event/EventBus'

  import LiveForm from '@app/features/form/live/LiveForm.svelte'
  import type { IField } from '@app/models/IField'
  import type { IForm, ISubmission } from '@app/models/IForm'
  import { getApi } from '@app/services/ApiService'
  import formStore from '@app/store/FormStore'
  import { afterUpdate, onDestroy, onMount, tick } from 'svelte'
  import { getUrlParameter } from '@app/util/Http'
  export let submission: ISubmission | undefined = undefined
  export let form: IForm

  let formId: string = ''
  let mode: string = ''

  onDestroy(() => {
    formStore.setForm({ fields: [] })
    form = { fields: [] }
  })

  async function loadForm() {
    formId = getUrlParameter('formId') ?? ''
    if (!formId) {
      return
    }
    mode = getUrlParameter('mode') || ''
    if (mode === 'local') {
      const item = localStorage.getItem('form')
      if (!item) {
        return
      }
      form = JSON.parse(item)
      window.onstorage = (e: any) => {
        if (e.key === 'form' && e.newValue) {
          form = JSON.parse(e.newValue)
        }
      }
    } else {
      form = await getApi<IForm>(`form/${formId}`)
    }
  }

  onMount(async () => {
    formStore.setForm({ fields: [] })
    await tick();

    if (!form) {
      await loadForm()
    }

    if (submission) {
      Object.keys(submission.details).forEach((k) => {
        const index = form.fields.findIndex((f) => f.label === k || f.name === k)
        if (index !== -1) {
          form.fields[index].value = submission!.details[k]
        }
      })
    }

    await tick();

    formStore.setForm(form)
  })
</script>

{#if mode === 'local'}
  <div class="alert alert-info alert-dismissible fade show" style="border-radius: 0;" role="alert">
    You are viewing a live preview of how your form will display and act once it is published. This preview will <strong>live update</strong> when changes are made from the form builder, no save neeed.
    <button type="button" class="close" data-dismiss="alert" aria-label="Close"> <span aria-hidden="true">&times;</span> </button>
  </div>
{/if}
<div class="container">
  <div>
    <div class="container" style="margin-top: 2em">
      {#if form?.fields?.length > 0}
        <LiveForm {form} {mode} />
      {:else}
        <div class="d-flex justify-content-center">
          <div class="spinner-border text-dark" style="width: 3rem; height: 3rem;" role="status"><span class="sr-only">Loading...</span></div>
        </div>
      {/if}
    </div>
  </div>
</div>
