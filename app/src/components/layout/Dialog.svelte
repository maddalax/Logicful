<script lang="typescript">
  import { afterUpdate, onMount } from 'svelte'
  import { subscribe, dispatch } from 'event/EventBus'
  import { subscribeFieldChange } from 'event/FieldEvent'
  import { randomString } from 'util/Generate'
  import type { ButtonAction } from 'components/models/ComponentProps'
  export let title: string = ''
  export let isOpen: boolean = false
  export let onClose = () => {}
  export let actions: ButtonAction[] = []
  let container: any
  let modal: any
  let processing = -1
  let failed = false
  let focusable: any = null

  onMount(() => {
    //@ts-ignore
    modal = new bootstrap.Modal(container)
    container!.addEventListener('hidden.bs.modal', function (e: any) {
      close()
    })
    if (isOpen) {
      open()
    }
  })

  function open() {
    isOpen = true
    modal.show()
  }

  function close() {
    isOpen = false
    modal.hide()
    onClose?.()
  }

  afterUpdate(() => {
    if (focusable) {
      setTimeout(() => {
        focusable.focus()
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
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="app-dialog-label">{title}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">&times;</span> </button>
      </div>
      <div class="modal-body">
        <slot />
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
