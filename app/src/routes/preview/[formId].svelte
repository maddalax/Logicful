<script context="module">
  // the (optional) preload function takes a
  // `{ path, params, query }` object and turns it into
  // the data we need to render the page
  export async function preload(page: any, session: any) {
    const { formId } = page.params
    if (!formId) {
      return {}
    }
    const url = `https://logicful-forms.s3.us-west-002.backblazeb2.com/${formId}.json`
    //@ts-ignore
    console.log(url);
    const res = await this.fetch(url)
    const form = await res.json();
    form.id = formId;
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

  onMount(() => {
    formStore.setForm(form);
  })
</script>

<div class="container" style="margin-top: 2em">
  {#if form}
    <LiveForm {form} />
  {:else}
    <div class="d-flex justify-content-center">
      <div class="spinner-border text-dark" style="width: 3rem; height: 3rem;" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  {/if}
</div>
