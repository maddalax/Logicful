<script lang="ts">
  import Field from "./Field.svelte";
  import type { IForm } from "models/IForm";
  import type { IField } from "models/IField";
  import { subscribeFieldChange } from "event/FieldEvent";
  import { DynamicFormMode } from "components/models/ComponentProps";
  import { flip } from "svelte/animate";
  import { dndzone } from "svelte-dnd-action";
  import { dispatchSync } from "event/EventBus";
  import {transformDraggedElement} from "./util/Draggable";

  export let form: IForm;
  export let fields: IField[];
  export let mode: DynamicFormMode = DynamicFormMode.Live;
  let values: { [key: string]: any } = {};

  function handler(e) {
    dispatchSync("block_dropped", e);
  }

  subscribeFieldChange((updatedField: IField) => {
    const index = form.fields.findIndex((w) => w.id === updatedField.id);
    if (index === -1) {
      return;
    }
    form.fields[index].updated = !form.fields[index].updated;
  });

  function display(field: IField): boolean {
    if (!field.display) {
      return true;
    }
    if (field.display.target === "form") {
      return onFormConditional(field);
    }
  }

  function onFormConditional(field: IField): boolean {
    switch (field.display.condition) {
      case "hasValue": {
        return values[field.display.parameter] != null;
      }
    }
  }

  function onSubmit() {
    console.log("SUBMIT", values);
    //const validator = new AddressService();
    //validator.normalize(values.address);
  }
</script>

<div style="padding-left: 0.5em;">
  <h4>{form.title ?? 'Form Title'}</h4>
  <hr>
</div>
<form
  on:submit|preventDefault={onSubmit}
  class="preview-padding"
>
  <div
    style="padding-bottom: 1em"
    use:dndzone={
{ items: form.fields, flipDurationMs: 300, transformDraggedElement, dropTargetStyle: { outline: 'white solid 0px' } }}
    on:consider={handler}
    on:finalize={handler}
  >
    {#each form.fields as field (field.id)}
      <div>
        <Field {field} />
      </div>
    {/each}
  </div>
  <button style="margin-left: 0.5em" class="btn btn-primary" type="submit">Submit</button>
</form>

<style>

</style>
