<script context="module">
  import { getUrlParameter } from 'util/Http'

  export async function preload(page: any, session: any) {
    const formId = getUrlParameter('formId')
    const mode = page.query?.mode
    if (mode === 'local') {
      return { mode }
    }
    if (!formId) {
      return {}
    }
    const url = `https://json-data.s3.us-west-002.backblazeb2.com/${formId}.json`
    //@ts-ignore
    const res = await this.fetch(url)
    const form = await res.json()
    form.id = formId
    formStore.setForm(form)
    dispatch('form_loaded', {
      form,
    })

    return { form }
  }
</script>

<script>
  import { dispatch } from 'event/EventBus'

  import LiveForm from 'features/form/live/LiveForm.svelte'
  import type { IField } from 'models/IField'
  import type { IForm } from 'models/IForm'
  import formStore from 'store/FormStore'
  import { onMount } from 'svelte'

  export let form: IForm
  export let mode: 'local' | '' = ''

  onMount(() => {
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
    }
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
