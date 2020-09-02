<script lang="typescript">
  import type { IField } from "models/IField";
  import { dispatch } from "event/EventBus";
  import OptionSetsList from "./OptionSetsList.svelte";
  import Field from "./Field.svelte";
  import { randomString } from "util/Generate";

  export let field: IField;

  function manageSets() {
    dispatch("dialog_show", {
      child: OptionSetsList,
      closeOnOutsideClick: false,
      confirmCloseOnDirty: true,
      title: "Manage Option Sets",
      save: false,
    });
  }

  function loadTransformer(value: any[]) {
    return value.map((v) => {
      return {
        label: v.name,
        value: v.value,
      };
    });
  }
</script>

<div>
  <Field
    field={{ id: randomString(), loadTransformer: loadTransformer, required: true, label: 'Option Set', value: field.options, name: `${field.id}-builder-config-field-field_editor-options`, type: 'combobox', options: { type: 'remote', value: 'http://localhost:3000/api/option-set' }, configFieldTarget: 'options', configTarget: field.id }}
  />
  <button
    on:click={manageSets}
    class="manage-button btn btn-light"
    type="button"
  >
    Manage Option Sets
  </button>
</div>

<style>
  .manage-button {
    margin-top: 0.5em;
    margin-left: 0.6em;
  }
</style>
