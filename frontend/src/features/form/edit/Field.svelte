<script lang="ts">
  import type { IField } from "models/IField";

  export let field: IField;
  import TextInput from "inputs/TextInput.svelte";
  import { onMount } from "svelte";
  import ComboBox from "inputs/ComboBox.svelte";
  import { LoadState } from "models/LoadState";
  import { FieldValueLoader } from "loader/FieldValueLoader";
  import Address from "inputs/Address.svelte";
  import { dispatchFieldChange } from "event/FieldEvent";
  import TextArea from "inputs/TextArea.svelte";
  import Spacer from "inputs/Spacer.svelte";
  import formStore from "store/FormStore";
  import { fade } from "svelte/transition";
  import RichTextDisplay from "inputs/RichTextDisplay.svelte";
  import { dispatch } from "event/EventBus";
  import Switch from "./Switch.svelte";
  import { subscribe } from "event/EventBus";
  import DatePicker from "../../../components/DatePicker.svelte";

  let state = LoadState.NotStarted;
  let value: any;
  let lastValue: any;
  export let config: any;

  onMount(load);

  function select() {
    if (field.configTarget) {
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
        if (result != null) {
          dispatchFieldChange(field, false);
        }
        state = LoadState.Finished;
      } catch (e) {
        console.error(e);
        state = LoadState.Failed;
      }
    }
  }
</script>

<div
  on:click={select}
  style="margin-top: .3em"
  class:wrapper={!field.configTarget}
  class:selected={field.selected}
>
  <div style="padding: .75em 0.6em; border-radius: 1em;">
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
      <TextArea {field} />
    {:else if field.type === 'spacer'}
      <Spacer {field} />
    {:else if field.type === 'switch'}
      <Switch {field} {...config} />
    {:else if field.type === 'date'}
      <DatePicker {field} {...config} />
    {:else}
      <p>No field found for field. {JSON.stringify(field, null, 2)}</p>
    {/if}
  </div>
</div>

<style>
  .wrapper:hover {
    background-color: #f0f0f0;
    cursor: pointer;
    border-radius: 0.45rem;
  }

  .selected {
    background-color: #f0f0f0;
    cursor: pointer;
    border-radius: 0.45rem;
  }
</style>
