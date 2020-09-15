<script>
    import { dispatch } from 'event/EventBus'
  
    import LiveForm from 'features/form/live/LiveForm.svelte'
    import type { IField } from 'models/IField'
    import type { IForm, ISubmission } from 'models/IForm'
    import { getApi } from 'services/ApiService'
    import formStore from 'store/FormStore'
    import { onMount } from 'svelte'
    import { getUrlParameter } from 'util/Http'
    export let submission : ISubmission | undefined = undefined
    
    let form: IForm
    let formId: string
    let mode: string = ''
  
    onMount(async () => {
      formId = getUrlParameter('formId') ?? ""
      if (!formId) {
        return
      }
      mode = getUrlParameter('mode') || ""
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
      if(submission) {
        Object.keys(submission.details).forEach(k => {
          const index = form.fields.findIndex(f => f.label === k || f.name === k);
          if(index !== -1) {
            form.fields[index].value = submission!.details[k]
          }
        })
      }
      if (form) {
        formStore.setForm(form)
      }
    })
  </script>
  
  {#if mode === 'local'}
    <div class="alert alert-info alert-dismissible fade show" style="border-radius: 0;" role="alert">
      You are viewing a live preview of how your form will display and act once it is published. This preview will <strong>live update</strong> when changes are made from the form builder, no save neeed.
      <button type="button" class="close" data-dismiss="alert" aria-label="Close"> <span aria-hidden="true">&times;</span> </button>
    </div>
  {/if}
  <div class="container">
    <div style="padding-right: 8em; padding-left: 8em;">
      <div class="container" style="margin-top: 2em">
        {#if form}
          <LiveForm {form} {mode} />
        {:else}
          <div class="d-flex justify-content-center">
            <div class="spinner-border text-dark" style="width: 3rem; height: 3rem;" role="status"><span class="sr-only">Loading...</span></div>
          </div>
        {/if}
      </div>
    </div>
  </div>
  