<script lang="ts">
  import Field from "./Field.svelte";
  import type { IForm } from "models/IForm";
  import type { IField } from "models/IField";
  import { subscribeFieldChange } from "event/FieldEvent";
  import { DynamicFormMode } from "components/models/ComponentProps";
  import { flip } from "svelte/animate";
  import { dndzone } from "svelte-dnd-action";
  import { dispatchSync } from "event/EventBus";

  export let form: IForm;
  export let fields: IField[];
  let shadow = ([] = []);
  export let mode: DynamicFormMode = DynamicFormMode.Live;
  let values: { [key: string]: any } = {};

  function handler(e) {
    const items = e.detail.items;
    const index = items.findIndex((w) => w.isDndShadowItem);
    if (index !== -1) {
      shadow[index] = true;
    }
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
  <h4>Form Preview</h4>
  <hr>
</div>
<form
  on:submit|preventDefault={onSubmit}
  class="preview-padding"
>
  <div
    style="padding-bottom: 1em"
    use:dndzone={{ items: form.fields, flipDurationMs: 300,       transformDraggedElement : (el, data) => {
          if(data.name === 'string') {
            el.innerHTML = "<label>New Text Input</label><input class='form-control shadow'/>";
          }
          if(data.name === 'combobox') {
             el.innerHTML = "<label>New Dropdown</label><select class='form-control shadow'><option>Dropdown Value</option></select>";
          }
          if(data.name === 'switch') {
            el.innerHTML = `<div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault">
            <label class="form-check-label" for="flexSwitchCheckDefault">New Toggle</label>
            </div>`
          }
          if(data.name === 'date') {
             el.innerHTML = "<label>New Date</label><input type='date' class='form-control shadow'></input>";
          }
          if(data.name === 'block') {
            el.innerHTML = "<div style='background-color: #f0f0f0;margin-top:5px;padding: 10px 10px 3px;border-radius: 0.45em'><h5>New Content Block</h5><p>Content will display here.</p></div>"
          }
          return el
        }, dropTargetStyle: { outline: 'white solid 0px' } }}
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
