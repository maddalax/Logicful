<script lang="ts">
  import Field from "./Field.svelte";
  import type { IForm } from "./entities/IForm";
  import type { IField } from "./entities/IField";
  import { AddressService } from "./services/AddressService";
  import { formStore } from "./event/Store";
  import { subscribeFieldChange } from "./event/FieldEvent";
  import { set } from "./util/Selection";

  export let form: IForm;
  let values: { [key: string]: any } = {};

  subscribeFieldChange((updatedField: IField, value: any) => {
    onInput(updatedField, value);
  });

  function onInput(field: IField, value: any) {
    formStore.update((prev) => {
      if (value === "" || value == null) {
        set(prev, field.name, undefined);
      } else {
        set(prev, field.name, value);
      }
      prev.lastFieldChange = field.name;
      return prev;
    });
  }

  formStore.subscribe((v) => {
    values = v;
    const index = form.fields.findIndex((w) => w.name === v.lastFieldChange);
    if (index != -1) {
      form.fields[index].updated = !form.fields[index].updated;
    }
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
    console.log("VALUES", values);
    const validator = new AddressService();
    validator.normalize(values.address);
  }
</script>

<form class="usa-form" on:submit|preventDefault={onSubmit}>
  <fieldset class="usa-fieldset">
    {#each form.fields as field}
      {#if !display(field)}
        <span />
      {:else}
        <Field {field} />
      {/if}
    {/each}
  </fieldset>
  <button class="usa-button" type="submit">Submit Form</button>
</form>
