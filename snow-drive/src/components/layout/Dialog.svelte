<script lang="typescript">
  import { afterUpdate, onMount, tick } from "svelte";
  import { subscribe, dispatch } from "@app/event/EventBus";
  import { subscribeFieldChange } from "@app/event/FieldEvent";
  import { randomString } from "@app/util/Generate";
  import type { ButtonAction } from "@app/components/models/ComponentProps";
  import { fade } from "svelte/transition";

  export let title: string = "";
  export let isOpen: boolean = false;
  export let onClose = () => {};
  export let actions: ButtonAction[] = [];
  export let getActions: (() => ButtonAction[]) | undefined = undefined
  export let width: string = "500px";

  let loaded = false;
  let processing = -1;
  let failed = false;
  let focusable: any = null;
  let error = "";

  onMount(() => {
    actions = getActions?.() ?? actions
    setTimeout(() => {
      loaded = true;
    }, 500);
    return () => {
      isOpen = false;
    };
  });

  afterUpdate(() => {
    actions = getActions?.() ?? actions
  })

  function open() {
    isOpen = true;
  }

  async function close() {
    if (!isOpen || !loaded) {
      return;
    }
    isOpen = false;
    loaded = false;
    await onClose?.();
  }

  afterUpdate(() => {
    if (focusable) {
      setTimeout(() => {
        try {
          focusable.focus();
        } catch {}
      }, 50);
    }
  });

  async function runAction(action: ButtonAction, index: number) {
    try {
      failed = false;
      error = "";
      processing = index;
      if (action && action.onClick) {
        await action.onClick();
      }
      processing = -1;
      close();
    } catch (ex) {
      console.error(ex);
      error = ex.message;
      failed = true;
    }
  }
</script>

<style>
  .modal-body {
    overflow: scroll;
    max-height: 80vh;
  }
</style>

{#if isOpen}
  <div class="modal-backdrop fade show" on:click={close} />
  <div
    transition:fade={{ duration: 300 }}
    class="modal show"
    tabindex="-1"
    aria-modal="true"
    role="dialog"
    style="display: block;">
    <div class="modal-dialog" style={`max-width: ${width}`}>
      <div class="modal-content" on:click|stopPropagation>
        <div class="modal-header">
          <h5 class="modal-title" id="app-dialog-label">{title}</h5>
          <button
            type="button"
            class="close"
            on:click={close}
            aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body">
          <slot />
        </div>
        {#if actions.length > 0}
          <div class="modal-footer">
            {#each actions as action, index}
              {#if processing === index}
                {#if failed}
                  <button
                    class={'btn btn-' + action.type}
                    on:click={() => runAction(action, index)}>Failed To Run,
                    Click To Try Again</button>
                {:else}
                  <button
                    class={'btn btn-' + action.type}
                    disabled={true}>Processing...</button>
                {/if}
              {:else if action.focus}
                <button
                  class={'btn btn-' + action.type}
                  bind:this={focusable}
                  on:click={() => runAction(action, index)}>{action.label}</button>
              {:else}
                <button
                  class={'btn btn-' + action.type}
                  on:click={() => runAction(action, index)}>{action.label}</button>
              {/if}
            {/each}
            {#if error}
              <p style="color: #c52433">Error: <strong>{error}</strong></p>
            {/if}
          </div>
        {/if}
      </div>
    </div>
  </div>
{/if}

<svelte:body on:click={close} />
