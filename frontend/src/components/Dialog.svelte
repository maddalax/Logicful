<script lang="ts">
  import { onMount } from "svelte";
  import { subscribe, dispatch } from "event/EventBus";
  import type { DialogOptions } from "./models/ComponentProps";
  import { subscribeFieldChange } from "event/FieldEvent";

  let isOpen = false;
  let propsContainer: DialogOptions[] = [];
  let propsIndex : number = 0;
  let confirm = false;
  let dirty = false;
  let saving: boolean = false;
  let props : DialogOptions

  subscribe("dialog_show", (p: DialogOptions) => {
    propsContainer = [];
    propsContainer = propsContainer.concat([p]);
    propsIndex = 0;
    props = propsContainer[propsIndex];
    open();
  });

  subscribe("dialog_push", (p: DialogOptions) => {
    propsContainer = propsContainer.concat([p])
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
    modal = new bootstrap.Modal(document.getElementById("exampleModal"));

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
    propsContainer = []
    propsIndex = 0;
    props = null
    isOpen = false;
    confirm = false;
    dirty = false;
  }

  function onBack() {
    propsContainer.splice(propsIndex, 1);
    propsIndex--;
    props = propsContainer[propsIndex];
  }

</script>

<div
  class="modal fade"
  id="exampleModal"
  tabindex="-1"
  aria-labelledby="exampleModalLabel"
  aria-hidden="true"
>
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">
          {#if propsContainer.length > 1 && propsIndex > 0}
            <span class="fas fa-arrow-left" id="dialog-back" on:click={onBack}></span>
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
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">
          Close
        </button>
        {#if props?.save}
          <button type="button" class="btn btn-primary">Save changes</button>
        {/if}
      </div>
    </div>
  </div>
</div>

<style>
  .modal-title {
    padding-top: 0.4em;
    padding-bottom: 0.4em;
  }

  .modal-dialog {
    width: 80%;
    max-width: 1000px;
  }

  #dialog-back {
    cursor: pointer;
  }
</style>
