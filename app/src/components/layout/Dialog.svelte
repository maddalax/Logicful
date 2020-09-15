<script lang="typescript">
  import { afterUpdate, onMount, tick } from 'svelte'
  import { subscribe, dispatch } from 'event/EventBus'
  import { subscribeFieldChange } from 'event/FieldEvent'
  import { randomString } from 'util/Generate'
  import type { ButtonAction } from 'components/models/ComponentProps'
  export let title: string = ''
  export let isOpen: boolean = false
  export let onClose = () => {}
  export let actions: ButtonAction[] = []
  export let width: string = '500px'

  let container: any
  let modal: any
  let processing = -1
  let failed = false
  let focusable: any = null

  function initModal() {
    //@ts-ignore
    modal = new bootstrap.Modal(container)
    container!.addEventListener('hidden.bs.modal', function (e: any) {
      close()
    })
    if (isOpen) {
      open()
    }
  }

  afterUpdate(() => {
    console.log('on dialog update')
    if(isOpen) {
      if (!modal) {
      initModal()
    } else {
      open()
    }
    }
  })

  onMount(() => {
    console.log('on dialog mount')
    //@ts-ignore
    initModal()
    return () => {
      try {
        modal?.dispose()
        modal = null
      } catch {}
    }
  })

  function open() {
    isOpen = true
    try {
      modal.show()
    } catch {}
  }

  async function close() {
    try {
      modal.dispose()
      modal = null
    } catch {}
    isOpen = false
    await onClose?.()
    await tick()
  }

  afterUpdate(() => {
    if (focusable) {
      setTimeout(() => {
        try {
          focusable.focus()
        } catch {}
      }, 500)
    }
  })

  async function runAction(action: ButtonAction, index: number) {
    try {
      processing = index
      if (action && action.onClick) {
        await action.onClick()
      }
      processing = -1
      close()
    } catch (ex) {
      console.error(ex)
      failed = true
    }
  }
</script>

<div class="modal fade" bind:this={container} tabindex="-1" aria-labelledby="app-dialog-label" aria-hidden="true">
  <div class="modal-dialog" style={`max-width: ${width}`}>
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="app-dialog-label">{title}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">&times;</span> </button>
      </div>
      <div class="modal-body">
        {#if isOpen}
          <slot />
        {/if}
      </div>
      {#if actions.length > 0}
        <div class="modal-footer">
          {#each actions as action, index}
            {#if processing === index}
              {#if failed}
                <button class={'btn btn-' + action.type} on:click={() => runAction(action, index)}>Failed To Run, Click To Try Again</button>
              {:else}<button class={'btn btn-' + action.type} disabled={true}>Processing...</button>{/if}
            {:else if action.focus}
              <button class={'btn btn-' + action.type} bind:this={focusable} on:click={() => runAction(action, index)}>{action.label}</button>
            {:else}<button class={'btn btn-' + action.type} on:click={() => runAction(action, index)}>{action.label}</button>{/if}
          {/each}
        </div>
      {/if}
    </div>
  </div>
</div>
