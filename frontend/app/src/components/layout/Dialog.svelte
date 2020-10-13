<script lang="typescript">
  import { afterUpdate, onMount } from "svelte";
  import type { ButtonAction } from "@app/components/models/ComponentProps";
  import Button from "../Button.svelte";

  export let title: string = "";
  export let isOpen: boolean = false;
  export let onClose = () => {};
  export let actions: ButtonAction[] = [];
  export let getActions: (() => ButtonAction[]) | undefined = undefined;

  let loaded = false;
  let processing = -1;
  let failed = false;
  let error = "";

  onMount(() => {
    actions = getActions?.() ?? actions;
    setTimeout(() => {
      loaded = true;
    }, 500);
    return () => {
      isOpen = false;
    };
  });

  afterUpdate(() => {
    actions = getActions?.() ?? actions;
  });

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

  async function runAction(action: ButtonAction, index: number) {
    try {
      failed = false;
      error = "";
      processing = index;
      if (action && action.onClick) {
        await action.onClick();
      }
      processing = -1;
      if (action.onClose == null || action.onClose) {
        close();
      }
    } catch (ex) {
      console.error(ex);
      error = ex.message;
      failed = true;
    }
  }
</script>


{#if isOpen}
  <div class="fixed z-10 inset-0 overflow-y-auto">
    <div
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20
        text-center sm:block sm:p-0">
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-500 opacity-75" />
      </div>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" />&#8203;
    
      <div
        class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4
          text-left overflow-hidden shadow-xl transform transition-all sm:my-8
          sm:align-middle w-auto sm:p-6"
        role="dialog"
        on:click|stopPropagation
        aria-modal="true"
        aria-labelledby="modal-headline">
        <div class="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
          <button
            on:click={close}
            type="button"
            class="text-gray-400 hover:text-gray-500 focus:outline-none
              focus:text-gray-500 transition ease-in-out duration-150"
            aria-label="Close">
            <svg
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="sm:flex sm:items-start">
      
          <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3
              class="text-lg leading-6 font-medium text-gray-900"
              id="modal-headline">
              {title}
            </h3>
            <div class="mt-3">
              <slot />
            </div>
          </div>
        </div>
        <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
          {#if actions.length > 0}
            {#each actions as action, index}
              <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                {#if processing === index}
                  {#if failed}
                    <Button
                      type={action.type}
                      onClick={() => runAction(action, index)}>
                      Failed To Run, Click To Try Again
                    </Button>
                  {:else}
                    <Button type={action.type} disabled={true}>
                      Processing...
                    </Button>
                  {/if}
                {:else if action.focus}
                  <Button
                    type={action.type}
                    focus={true}
                    onClick={() => runAction(action, index)}>
                    {action.label}
                  </Button>
                {:else}
                  <Button
                    type={action.type}
                    onClick={() => runAction(action, index)}>
                    {action.label}
                  </Button>
                {/if}
              </span>
            {/each}
            {#if error}
              <p style="color: #c52433">Error: <strong>{error}</strong></p>
            {/if}
          {/if}
        </div>
      </div>
    </div>
  </div>
{/if}

<svelte:body on:click={close} />