<script lang="typescript">
  import type { IField } from "models/IField";

  export let field: IField;
  import TextInput from "inputs/TextInput.svelte";
  import { onMount } from "svelte";
  import ComboBox from "inputs/ComboBox.svelte";
  import { LoadState } from "models/LoadState";
  import { FieldValueLoader } from "loader/FieldValueLoader";
  import Address from "inputs/Address.svelte";
  import TextArea from "inputs/TextArea.svelte";
  import Spacer from "inputs/Spacer.svelte";
  import formStore from "store/FormStore";
  import { fade } from "svelte/transition";
  import RichTextDisplay from "inputs/RichTextDisplay.svelte";
  import { dispatch } from "event/EventBus";
  import Switch from "./Switch.svelte";
  import { subscribe } from "event/EventBus";
  import DatePicker from "components/DatePicker.svelte";
  import {promptConfirm} from "util/Confirm";
  import {firstNotEmpty} from "util/Format";

  let state = LoadState.NotStarted;
  let value: any;
  let lastValue: any;
  export let editor : boolean = false;
  export let config: any = {};
  export let hidden : boolean = false;

  onMount(load);

  function onDelete() {
    promptConfirm({
      title : "Confirm Deletion",
      message : `Are you sure you want to delete field <strong>${firstNotEmpty(field.label, field.name)}</strong>?`,
      confirmText : 'Delete',
      callback : () => {
        dispatch("field_delete", {
          field
        });
      }
    });
  }

  function onClone() {
    dispatch("field_clone", {
      field
    })
  }

  function select() {
    if (field.configTarget || editor) {
      return;
    }
    field.selected = !field.selected;
    dispatch("field_selected_change", {
      field,
    });
  }

  async function load() {
    lastValue = field.value;
    if (field.value != null) {
      state = LoadState.Loading;
      try {
        const loader = new FieldValueLoader();
        const result = await loader.load(field);
        value = result;
        field.value = result;
        formStore.set(field);
        state = LoadState.Finished;
      } catch (e) {
        console.error(e);
        state = LoadState.Failed;
      }
    }
  }
</script>

{#if field.configTarget && field.customCss}
    {#if field.type === 'switch'}
      <div style="{field.customCss} padding-left: 0.6em">
        <Switch {field} {...config} />
      </div>
    {/if}

{:else}
  <div
      on:click={select}
      style="margin-top: .3em"
      class:hidden={hidden}
      class:wrapper={!field.configTarget && !editor}
      class:selected={field.selected}
  >
    {#if field.selected}
      <div class="btn-group float-right" role="group" aria-label="Selected" style="top: -0.5em; right: 1em;">
        <button on:click={onClone} type="button" class="btn btn-secondary" style="font-size: 0.5rem; padding: 0.25rem 0.5rem;">
          <span class="icon-brand"><span class="far fa-clone"></span></span>
        </button>
        <button on:click={onDelete} type="button" class="btn btn-secondary" style="font-size: 0.5rem; padding: 0.25rem 0.5rem;">
          <span class="icon-brand"><span class="fas fa-trash"></span></span>
        </button>
      </div>
    {/if}
    <div style="padding: .75em 0.6em; border-radius: 1em;">
      {#if hidden}
        <p>
          {firstNotEmpty(field.label, field.name)} is hidden by rules defined in logic.
          This message is only displayed on this preview.
        </p>
      {:else}
      {#if field.type === 'address'}
        <Address {field} {value} />
      {:else if field.type === 'string'}
        <TextInput {field} />
      {:else if field.type === 'number'}
        <TextInput {field} type={'number'} />
      {:else if field.type === 'combobox'}
        <ComboBox {field} {...config} />
      {:else if field.type === 'block'}
        <RichTextDisplay {field} />
      {:else if field.type === 'block-editor'}
        <TextArea {field} {...config}/>
      {:else if field.type === 'spacer'}
        <Spacer {field} />
      {:else if field.type === 'switch'}
        <Switch {field} {...config} />
      {:else if field.type === 'date'}
        <DatePicker {field} {...config} />
      {:else}
        <p>No field found for field. {JSON.stringify(field, null, 2)}</p>
      {/if}
     {/if}
    </div>
  </div>
{/if}


<style>
  .wrapper:hover {
    background-color: #f5f5f5;
    cursor: pointer;
    border-radius: 0.45rem;
  }

  .selected {
    background-color: #f5f5f5;
    cursor: pointer;
    border-radius: 0.45rem;
  }

  .hidden {
    opacity: .7;
  }
</style>
