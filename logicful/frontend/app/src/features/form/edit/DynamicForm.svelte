<script lang="typescript">
  // @ts-nocheck
  import Field from "./Field.svelte";
  import type { IForm } from "@app/models/IForm";
  import type { IField } from "@app/models/IField";
  import { subscribeFieldChange } from "@app/event/FieldEvent";
  import { DynamicFormMode } from "@app/components/models/ComponentProps";
  import { dispatch, subscribeComponent } from "@app/event/EventBus";
  import { LogicBuilder } from "@app/services/LogicBuilder";
  import { fastClone } from "@app/util/Compare";
  import { onMount } from "svelte";
  import Dialog from "@app/components/layout/Dialog.svelte";

  export let form: IForm;
  export let mode: DynamicFormMode = DynamicFormMode.Live;
  let deleting = false;

  subscribeComponent("confirm_field_deletion", () => {
    deleting = true;
  });

  subscribeFieldChange(onMount, (updatedField: IField) => {
    if (!form || !form.fields) {
      return;
    }
    const index = form.fields.findIndex((w) => w.id === updatedField.id);
    if (index === -1) {
      return;
    }
    form.fields[index].updated = !form.fields[index].updated;
    const fieldsWithRules = form.fields.filter((w) => {
      if (!w.logic || !w.logic.rules) {
        return false;
      }
      const hasRule = w.logic.rules.find(
        (rule) => rule.field === updatedField.id
      );
      return hasRule != null;
    });
    for (let fieldWithRule of fieldsWithRules) {
      let ruleIndex = form.fields.findIndex((w) => w.id === fieldWithRule.id);
      form.fields[ruleIndex].updated = !form.fields[ruleIndex].updated;
    }
  });

  function display(field: IField): boolean {
    if (!form.enableLogic) {
      return true;
    }
    if (!field.logic) {
      return true;
    }
    const builder = new LogicBuilder();
    return builder.evaluate(field);
  }

  function onDelete() {
    const selected = form.fields.find((w) => w.selected);
    if (selected) {
      dispatch("field_delete", {
        field: selected,
      });
    }
  }
</script>

<style>
  :global(.ex-over) {
    background-color: #f5f5f5;
    height: 100%;
    min-height: 25vh;
    margin-top: 1em;
    margin-bottom: 1em;
  }
</style>

{#if deleting}
  <Dialog
    title={'Confirm Deletion'}
    isOpen={true}
    actions={[{ label: `Delete Field`, type: 'danger', onClick: onDelete, focus: true }, { label: 'Cancel', type: 'secondary' }]}
    onClose={() => {
      deleting = false;
    }}>
    <p>
      Are you sure you want to delete this field? Deletion is permanent and
      cannot be reversed.
    </p>
    <p>Changes will be applied after the form is saved.</p>
  </Dialog>
{/if}
<div
  class="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center
    sm:justify-between sm:px-6 lg:px-8">
  <div class="flex-1 min-w-0">
    <h1 class="text-lg font-medium leading-6 text-gray-900 sm:truncate">
      {form.title}
    </h1>
  </div>
  <div class="mt-4 flex sm:mt-0 sm:ml-4">
    <span class="order-1 ml-3 shadow-sm rounded-md sm:order-0 sm:ml-0">
      <button
        type="button"
        class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm
          leading-5 font-medium rounded-md text-gray-700 bg-white
          hover:text-gray-500 focus:outline-none focus:shadow-outline-blue
          focus:border-blue-300 active:text-gray-800 active:bg-gray-50
          transition duration-150 ease-in-out">
        Share
      </button>
    </span>
    <span class="order-0 sm:order-1 sm:ml-3 shadow-sm rounded-md">
      <button
        type="button"
        class="inline-flex items-center px-4 py-2 border border-transparent
          text-sm leading-5 font-medium rounded-md text-white bg-indigo-800
          hover:bg-indigo-700 focus:outline-none focus:shadow-outline-purple
          focus:bg-indigo-700 active:bg-indigo-700 transition duration-150
          ease-in-out">
        Create
      </button>
    </span>
  </div>
</div>

<div class="mt-8 sm:mx-auto sm:w-full">
  <div class="py-8 px-4 sm:rounded-lg sm:px-2">
    <form action="#" method="POST" id="form-preview">
      <div id="form-preview-fields">
        {#each form.fields as field (field.id)}
          {#if display(field)}
            <div id={`form-field-${field.id}`}>
              <Field field={fastClone(field)} />
            </div>
          {:else}
            <div id={`form-field-${field.id}`}>
              <Field field={fastClone(field)} hidden={true} />
            </div>
          {/if}
        {/each}
      </div>
    </form>
  </div>
</div>
