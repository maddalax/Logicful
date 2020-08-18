<script lang="ts">
  import { onMount } from "svelte";
  import { subscribe, dispatch } from "event/EventBus";
  import CloseIcon from "@fortawesome/fontawesome-free/svgs/regular/window-close.svg";
  import type { DialogOptions } from "./models/ComponentProps";
  import { subscribeFieldChange } from "event/FieldEvent";

  let isOpen = false;
  let props: DialogOptions;
  let confirm = false;
  let dirty = false;
  let saving: boolean = false;

  subscribe("dialog_show", (p: DialogOptions) => {
    props = p;
    open();
  });

  subscribe("user_change", () => {
    if (isOpen && props.confirmCloseOnDirty) {
      dirty = true;
    }
  });

  onMount(() => {
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
    props.child = null;
    isOpen = false;
    confirm = false;
    dirty = false;
  }
</script>

<div class="modal fade" class:show={isOpen} id="exampleModalLive" tabindex="-1" aria-labelledby="exampleModalLiveLabel" aria-modal="true" role="dialog" style="display: hidden;">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLiveLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div class="modal-body">
        <p>Woohoo, you're reading this text in a modal!</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
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
    width: 90%;
    max-width: 1000px;
  }

  .modal {
    background: rgba(0, 0, 0, 0.6);
  }
</style>
