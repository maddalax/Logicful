<script lang="typescript">
  import type { IField } from 'models/IField'
  import { subscribeFieldChange } from 'event/FieldEvent'
  import { onMount } from 'svelte'
  import formStore from 'store/FormStore'
  import { isString } from 'guards/Guard'
  import { LoadState } from 'models/LoadState'

  export let field: IField
  export let isPreview = false
  let value = ''
  let lastUrl = ''
  let state = LoadState.NotStarted

  onMount(async () => {
    let url = formStore.getValue(field.configTarget ?? field.id)

    subscribeFieldChange((newField) => {
      if (newField.id === field.id && lastUrl !== newField.value) {
        url = newField.value
        load(url)
      }
    })

    load(url)
  })

  async function load(url: string) {
    state = LoadState.Loading
    try {
      if (!url) {
        return
      }
      if (!isString(url)) {
        return
      }
      if (url.startsWith('http')) {
        lastUrl = url
        const response = await fetch(url)
        const html = await response.text()
        value = html ?? ''
      } else {
        value = url
      }
    } catch (ex) {
      state = LoadState.Failed;
    } finally {
      if(state !== LoadState.Failed) {
        state = LoadState.Finished;
      }
    }
  }
</script>

<div>
  {#if isPreview && (value === '' || value == null)}
    <h5>Content Placeholder</h5>
    <p style="margin-block-end: 0;">From the field configuration settings, select a content block to display.</p>
  {:else if state === LoadState.Finished}
    {@html value}
  {:else if state === LoadState.Failed}
    <p>Failed to load content.</p>
  {:else}
  <div class="d-flex justify-content-center">
    <div class="spinner-border text-dark" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
  {/if}
</div>

<style>
  :global(p) {
    margin-block-end: 0;
  }
</style>
