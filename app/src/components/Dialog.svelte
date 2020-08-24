<script lang="ts">
  import { onMount } from "svelte";
  import { subscribe, dispatch } from "event/EventBus";
  import type { DialogOptions } from "./models/ComponentProps";
  import { subscribeFieldChange } from "event/FieldEvent";

  let isOpen = false;
  let propsContainer: DialogOptions[] = [];
  let propsIndex: number = 0;
  let confirm = false;
  let dirty = false;
  let saving: boolean = false;
  let props: DialogOptions;

  subscribe("dialog_show", (p: DialogOptions) => {
    propsContainer = [];
    propsContainer = propsContainer.concat([p]);
    propsIndex = 0;
    props = propsContainer[propsIndex];
    open();
  });

  subscribe("dialog_push", (p: DialogOptions) => {
    propsContainer = propsContainer.concat([p]);
    propsIndex++;
    props = propsContainer[propsIndex];
  });

  subscribe("user_change", () => {
    if (isOpen && props.confirmCloseOnDirty) {
      dirty = true;
    }
  });

  let modal: bootstrap.Modal;

  onMount(() => {
    modal = new bootstrap.Modal(document.getElementById("app-dialog"));

    subscribeFieldChange((_, userChange) => {
      if (isOpen && props.confirmCloseOnDirty && userChange) {
        dirty = true;
      }
    });
    subscribe("document_click", (e) => {
      if (e.target?.id === "dialog" && isOpen && !dirty) {
        close();
      }
    });
  });

  function open() {
    isOpen = true;
    modal.show();
  }

  async function save() {
    saving = true;
    await dispatch("dialog_save", {});
    saving = false;
    dirty = false;
    close();
  }

  function close() {
    if (props.confirmCloseOnDirty && !confirm && dirty) {
      confirm = true;
      return;
    }
    dispatch("dialog_close", {});
    propsContainer = [];
    propsIndex = 0;
    props = null;
    isOpen = false;
    confirm = false;
    dirty = false;
    modal.hide();
  }

  function onBack() {
    propsContainer.splice(propsIndex, 1);
    propsIndex--;
    props = propsContainer[propsIndex];
  }

  async function executeButton(button) {
    await button.onClick();
    close();
  }
</script>

{#if process.browser}
  <div
          class="modal fade"
          id="app-dialog"
          tabindex="-1"
          aria-labelledby="app-dialog-label"
          aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="app-dialog-label">
            {#if propsContainer.length > 1 && propsIndex > 0}
            <span
                    class="fas fa-arrow-left"
                    id="dialog-back"
                    on:click={onBack}
            />
            {/if}
            {props?.title ?? ''}
          </h5>
          <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <svelte:component this={props?.child} {...props?.props} />
        </div>
        {#if props?.buttons?.length > 0}
          <div class="modal-footer">
            {#each props.buttons as button}
              <button
                      type="button"
                      class={`btn ${button.type}`}
                      on:click={() => executeButton(button)}
              >
                {button.label}
              </button>
            {/each}
          </div>
        {/if}
      </div>
    </div>
  </div>
{/if}



<style>
  #dialog-back {
    cursor: pointer;
  }
</style>
