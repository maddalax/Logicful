<script lang="typescript">
  import type { IField } from "@app/models/IField";
  import { dispatch } from "@app/event/EventBus";
  import OptionSetsList from "./OptionSetsList.svelte";
  import { randomString } from "@app/util/Generate";
  import { apiEndpoint } from "@app/services/ApiService";
  import ConfigField from "./ConfigField.svelte";

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
  <ConfigField
    field={{ id: randomString(), loadTransformer: loadTransformer, required: true, label: 'Option Set', value: field.options, name: `${field.id}-builder-config-field-field_editor-options`, type: 'combobox', options: { type: 'remote', value: `${apiEndpoint()}option-set` }, configFieldTarget: 'options', configTarget: field.id }} />
  <button
    on:click={manageSets}
    class="manage-button btn btn-light"
    type="button">
    Manage Option Sets
  </button>
</div>
