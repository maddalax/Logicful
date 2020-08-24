<script lang="typescript">
  import Field from "./Field.svelte";
  import type { IForm } from "models/IForm";
  import type { IField } from "models/IField";
  import { subscribeFieldChange } from "event/FieldEvent";
  import { DynamicFormMode } from "components/models/ComponentProps";
  import { dndzone } from "svelte-dnd-action";
  import { dispatchSync } from "event/EventBus";
  import {transformDraggedElement} from "./util/Draggable";
  import formStore from "store/FormStore";
  import {LogicBuilder} from "services/LogicBuilder";

  export let form: IForm;
  export let mode: DynamicFormMode = DynamicFormMode.Live;
  let values: { [key: string]: any } = {};

  function handler(e : any) {
    dispatchSync("block_dropped", e);
  }

  subscribeFieldChange((updatedField: IField) => {
    const index = form.fields.findIndex((w) => w.id === updatedField.id);
    if (index === -1) {
      return;
    }
    form.fields[index].updated = !form.fields[index].updated;
    const fieldsWithRules = form.fields.filter(w => {
      if(!w.logic) {
        return false;
      }
      const hasRule = w.logic.rules.find(rule => rule.field === updatedField.id);
      return hasRule != null;
    });
    for (let fieldWithRule of fieldsWithRules) {
      let ruleIndex = form.fields.findIndex(w => w.id === fieldWithRule.id);
      form.fields[ruleIndex].updated = !form.fields[ruleIndex].updated;
    }
  });

  function display(field: IField): boolean {
    if(!form.enableLogic) {
      return true;
    }
    if (!field.logic) {
      return true;
    }
    const builder = new LogicBuilder();
    return builder.evaluate(field);
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
    use:dndzone={{ items: form.fields, flipDurationMs: 300, transformDraggedElement, dropTargetStyle: { outline: 'white solid 0px' } }}
    on:consider={handler}
    on:finalize={handler}
  >
    {#each form.fields as field (field.id)}
      {#if display(field)}
        <div>
          <Field {field} />
        </div>
      {:else}
        <div>
          <Field {field} hidden={true} />
        </div>
      {/if}
    {/each}
  </div>
  <button style="margin-left: 0.5em" class="btn btn-primary" type="submit">Submit</button>
</form>

<style>

</style>
