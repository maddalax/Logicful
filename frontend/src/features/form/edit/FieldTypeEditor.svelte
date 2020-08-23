<script lang="ts">
  import type { IField } from "models/IField";
  import ComboBoxOptionsEditor from "./ComboBoxOptionsEditor.svelte";
  import Field from "./Field.svelte";
  import { randomString } from "util/Generate";

  export let field: IField;
</script>

<div>
  {#if field.type === 'string'}
    <Field
      field={{ id: randomString(), type: 'number', label: 'Rows', value: { type: 'local', value: field.rows || 1 }, configFieldTarget: 'rows', configTarget: field.id }}
    />
  {:else if field.type === 'combobox'}
    <ComboBoxOptionsEditor {field} />
  {:else if field.type === 'address'}
    <p>Address</p>
  {:else if field.type === 'switch'}
    <Field
      field={{ id: randomString(), type: 'switch', label: 'Default Value', value: { type: 'local', value: field.defaultValue || false }, configFieldTarget: 'defaultValue', configTarget: field.id }}
    />
  {/if}
</div>
