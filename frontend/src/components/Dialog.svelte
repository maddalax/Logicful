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

  const FOCUSABLE_SELECTORS =
    "a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]";

  function open() {
    const main = document.querySelector("main") as any;
    const modal = document.querySelector(".modal") as any;

    // show the modal
    modal.style.display = "flex";

    // Trap the tab focus by disable tabbing on all elements outside of your modal.  Because the modal is a sibling of main, this is easier. Make sure to check if the element is visible, or already has a tabindex so you can restore it when you untrap.
    const focusableElements = main.querySelectorAll(FOCUSABLE_SELECTORS);
    focusableElements.forEach((el) => el.setAttribute("tabindex", "-1"));

    // Trap the screen reader focus as well with aria roles. This is much easier as our main and modal elements are siblings, otherwise you'd have to set aria-hidden on every screen reader focusable element not in the modal.
    modal.removeAttribute("aria-hidden");
    main.setAttribute("aria-hidden", "true");
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

    const main = document.querySelector("main") as any;
    const modal = document.querySelector(".modal") as any;
    // hide the modal
    modal.style.display = "none";

    // Untrap the tab focus by removing tabindex=-1. You should restore previous values if an element had them.
    const focusableElements = main.querySelectorAll(FOCUSABLE_SELECTORS);
    focusableElements.forEach((el) => el.removeAttribute("tabindex"));

    // Untrap screen reader focus
    modal.setAttribute("aria-hidden", "true");
    main.removeAttribute("aria-hidden");
    dispatch("dialog_close", {});
    props.child = null;
    isOpen = false;
    confirm = false;
    dirty = false;
  }
</script>

<div class="modal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title" style="padding-left: 0.8em;">{props?.title}</h4>
        <button
          type="button"
          class="close"
          on:click={close}
          data-dismiss="modal"
          aria-label="Close"
        >
          <span style="font-size: 2rem;" aria-hidden="true">&times;</span>
        </button>
      </div>
      {#if props?.confirmCloseOnDirty && confirm}
        <div
          class="alert alert-warning alert-dismissible fade show"
          role="alert"
        >
          <span class="alert-inner--icon">
            <span class="fas fa-exclamation-circle" />
          </span>
          <span class="alert-inner--text">
            <strong>Warning!</strong>
            You have unsaved changes, click the X again to close this dialog and
            discard your changes.
          </span>
          <button
            type="button"
            class="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
      {/if}
      <div class="modal-body">
        <svelte:component this={props?.child} {...props?.props} />
      </div>
      {#if props?.save}
        <div class="modal-footer">
          <button
            disabled={saving}
            on:click={save}
            type="button"
            class="btn btn-secondary"
            data-dismiss="modal"
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      {/if}

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
