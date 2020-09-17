<script lang="typescript">
  import { dispatch } from '@app/event/EventBus'

  import { onMount } from 'svelte'

  export let id = ''
  export let message = ''
  export let title = ''
  let component: any

  onMount(() => {
  })
</script>

<div aria-live="polite" aria-atomic="true" class="toast-container">
  <div class="toast" bind:this={component} style="position: absolute; top: 0; right: 0;">
    <div class="toast-header">
      <strong class="mr-auto">{title}</strong>
      <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close"> <span aria-hidden="true">&times;</span> </button>
    </div>
    <div class="toast-body">{message}</div>
  </div>
</div>

<style>
  .toast-container {
    position: fixed;
    max-height: 0px;
    right: 15px;
    left: 0;
    top: 85px;
    z-index: 100000;
  }

  .toast {
    display: block;
    background-color: #424767;
    opacity: 1;
    color: white;
    font-size: 12pt !important;
    min-width: 250px;
  }

  :global(.toast-header) {
    color: #ffffff !important;
    background-color: #52547a !important;
  }
</style>
