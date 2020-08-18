<script lang="ts">
  import type { IField } from "models/IField";
  import { dispatch } from "event/EventBus";
  import OptionSetsList from "./OptionSetsList.svelte";
  import Field from "./Field.svelte";

  export let field: IField;
  export let editorId: string;

  function manageSets() {
    dispatch("show_main_content", {
      component: OptionSetsList
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
    field={{ id: `${editorId}-options`, loadTransformer: loadTransformer, required: true, label: 'Option Set', value: field.options, name: `${field.id}-builder-config-field-field_editor-options`, type: 'combobox', options: { type: 'remote', value: 'http://localhost:3000/option-set/list' }, configFieldTarget: 'options', configTarget: field.id }}
  />
  <button on:click={manageSets} class="btn btn-link">Manage Option Sets</button>
</div>
