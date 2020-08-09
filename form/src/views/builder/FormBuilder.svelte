<script lang="ts">
  import DynamicForm from "DynamicForm.svelte";
  import exampleForm from "exampleForm";
  import FieldEdit from "./FieldEdit.svelte";
  import type { IField } from "entities/IField";
  import { randomStringSmall, randomString } from "util/Generate";
  import type { IForm } from "entities/IForm";
  import { onMount } from "svelte";
  import { subscribeFieldChange } from "event/FieldEvent";

  let form: IForm = exampleForm as IForm;
  let initialized: boolean = false;

  onMount(() => {
    subscribeFieldChange((field: IField, value: any) => {
      if (!field.configTarget) {
        return;
      }
      console.log(field, value);
      const toUpdate = form.fields.findIndex(
        (w) => w.id === field.configTarget
      );
      form.fields[toUpdate][field.configFieldTarget] = value;
      form = JSON.parse(JSON.stringify(form))
    });

    initialized = true;
  });

  function addField() {
    form.fields = form.fields.concat([
      {
        name: "new-field-" + randomStringSmall(),
        label: "New Field",
        type: "string",
        expanded: true,
        id: randomString(),
      },
    ]);
  }
</script>

<style>
  .grid-container {
    max-width: 75em;
  }
</style>

<div>

  <div class="grid-container" style="margin-top: 1em">
    <div class="grid-row grid-gap">
      <div class="grid-col-8" style="margin-top: 3.2em">
        {#each form.fields as field}
          <div style="margin-top: 1em">
            {#if initialized}
              <FieldEdit {field} />
            {/if}
          </div>
        {/each}
        <div class="margin-top-2">
          <button class="usa-button" on:click={addField}>Add Field</button>
        </div>
      </div>
      <div class="grid-col-4">
        {#if initialized}
          <DynamicForm {form} />
        {/if}
      </div>
    </div>
  </div>
</div>
