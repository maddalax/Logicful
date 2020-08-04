<script lang="ts">
  import Field from "./Field.svelte";
  import type { IForm } from "./entities/IForm";
  import type { IField } from "./entities/IField";
  import { formStore } from "./Store";

  export let form: IForm;
  export let values: {[key : string] : any} = {}

  formStore.subscribe(v => {
    values = v;
    const index = form.fields.findIndex(w => w.name === v.lastFieldChange);
    if(index != -1) {
      form.fields[index].updated = !form.fields[index].updated;
    }
  })

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
</script>

<form class="usa-form">
  <fieldset class="usa-fieldset">
    {#each form.fields.filter((w) => display(w)) as field}
      {#if field.type === 'repeating'}
        {#each field.fields as child}
          <Field field={child} />
        {/each}
      {:else}
        <Field {field} />
      {/if}
    {/each}
  </fieldset>
</form>
