<script lang="typescript">
  import type { IField } from "@app/models/IField";

  export let field: IField;
  import TextInput from "@app/inputs/TextInput.svelte";
  import { onMount } from "svelte";
  import ComboBox from "@app/inputs/ComboBox.svelte";
  import { LoadState } from "@app/models/LoadState";
  import { FieldValueLoader } from "@app/loader/FieldValueLoader";
  import Address from "@app/inputs/Address.svelte";
  import FullName from "@app/inputs/FullName.svelte";

  import TextArea from "@app/inputs/TextArea.svelte";
  import CheckboxGroup from "@app/inputs/CheckboxGroup.svelte";
  import Spacer from "@app/inputs/Spacer.svelte";
  import RadioGroup from "@app/inputs/RadioGroup.svelte";

  import formStore from "@app/store/FormStore";
  import { fade } from "svelte/transition";
  import RichTextDisplay from "@app/inputs/RichTextDisplay.svelte";
  import { dispatch } from "@app/event/EventBus";
  import Switch from "../../../inputs/Switch.svelte";
  import DatePicker from "@app/components/DatePicker.svelte";
  import { firstNotEmpty } from "@app/util/Format";
  import FileUpload from "@app/inputs/FileUpload.svelte";

  let state = LoadState.NotStarted;
  let value: any;
  let lastValue: any;
  export let editor: boolean = false;
  export let config: any = {};
  export let hidden: boolean = false;
  export let padding: boolean = true;
  let deleting = false;

  onMount(load);

  function onClone() {
    dispatch("field_clone", {
      field,
    });
  }

  function select() {
    if (field.configTarget || editor) {
      return;
    }
    field.selected = !field.selected;
    formStore.set(field, {
      field: "selected",
      value: field.selected,
      fromUser: false,
    });
  }

  async function load() {
    lastValue = field.value;
    if ((field.value ?? field.defaultValue) != null) {
      state = LoadState.Loading;
      try {
        const loader = new FieldValueLoader();
        const result = await loader.load(field);
        value = result;
        field.value = result;
        formStore.set(field, {
          value: result,
          field: "value",
          fromUser: false,
        });
        state = LoadState.Finished;
      } catch (e) {
        console.error(e);
        state = LoadState.Failed;
      }
    }
  }

  let isConfigInput =
    field.configTarget || editor || field.type === "placeholder";
</script>

<div
  on:click|stopPropagation={select}
  class:hidden
  class:bg-gray-100={!isConfigInput && field.selected}
  class={isConfigInput ? 'p-3' : `hover:bg-gray-100 p-3`}>
  {#if field.selected}
    <div class="btn-group float-right" role="group" aria-label="Selected">
      <button
        on:click|stopPropagation={onClone}
        type="button"
        class="btn btn-secondary">
        <span class="icon-brand"> <span class="far fa-clone" /> </span>
      </button>
      <button
        on:click|stopPropagation={() => dispatch('confirm_field_deletion', {})}
        type="button"
        class="btn btn-secondary">
        <span class="icon-brand"> <span class="fas fa-trash" /> </span>
      </button>
    </div>
  {/if}
  <div>
    {#if hidden}
      <p>
        {firstNotEmpty(field.label, field.name)} is hidden by rules defined in logic.
        This message is only displayed on this preview.
      </p>
    {:else if field.type === 'address'}
      <Address {field} {value} />
    {:else if field.type === 'string'}
      <TextInput {field} />
    {:else if field.type === 'number'}
      <TextInput {field} type={'number'} />
    {:else if field.type === 'combobox'}
      <ComboBox {field} {...config} />
    {:else if field.type === 'block'}
      <RichTextDisplay {field} isPreview={true} />
    {:else if field.type === 'block-editor'}
      <TextArea {field} {...config} isPreview={true} />
    {:else if field.type === 'spacer'}
      <Spacer {field} />
    {:else if field.type === 'switch'}
      <Switch {field} {...config} />
    {:else if field.type === 'date'}
      <DatePicker {field} {...config} />
    {:else if field.type === 'placeholder'}
      <div class="placeholder">
        <i class="fas fa-grip-horizontal" />
        <p>
          You have no fields, drag one from the left sidebar to get started.
        </p>
      </div>
    {:else if field.type === 'file'}
      <FileUpload {field} />
    {:else if field.type === 'checkbox-group'}
      <CheckboxGroup {field} />
    {:else if field.type === 'radio-group'}
      <RadioGroup {field} />
    {:else if field.type === 'full-name'}
      <FullName {field} {value} />
    {:else}
      <p>No field found for field. {JSON.stringify(field, null, 2)}</p>
    {/if}
  </div>
</div>
