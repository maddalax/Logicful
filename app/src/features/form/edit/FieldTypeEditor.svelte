<script lang="typescript">
  import type { IField } from 'models/IField'
  import ComboBoxOptionsEditor from './ComboBoxOptionsEditor.svelte'
  import Field from './Field.svelte'
  import { randomString } from 'util/Generate'
  import AddressEditor from './AddressEditor.svelte'
  import CheckboxGroupEditor from './CheckboxGroupEditor.svelte'
  import RadioGroupEditor from './RadioGroupEditor.svelte'

  export let field: IField
</script>

<div>
  {#if field.type === 'string'}
    <Field field={{ id: randomString(), type: 'number', label: 'Rows', value: { type: 'local', value: field.rows || 1 }, configFieldTarget: 'rows', configTarget: field.id }} />
  {:else if field.type === 'combobox'}
    <ComboBoxOptionsEditor {field} />
  {:else if field.type === 'address'}
    <AddressEditor {field} expanded={field.expanded} />
  {:else if field.type === 'checkbox-group'}
    <CheckboxGroupEditor {field} expanded={field.expanded} />
  {:else if field.type === 'radio-group'}
    <RadioGroupEditor {field} expanded={field.expanded} />
  {:else if field.type === 'switch'}
    <Field
      field={{ id: randomString(), type: 'switch', label: 'Default Value', value: { type: 'local', value: field.defaultValue || false }, configFieldTarget: 'defaultValue', configTarget: field.id }}
    />
  {/if}
</div>
