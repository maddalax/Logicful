<script lang="typescript">
  import type { IField } from '@app/models/IField'
  import { afterUpdate, onMount } from 'svelte'
  import { randomString } from '@app/util/Generate'
  import FieldTypeEditor from './FieldTypeEditor.svelte'
  import LogicAccordion from './LogicAccordion.svelte'
  import ContentBlockEditor from './ContentBlockEditor.svelte'
  import AddressEditor from './AddressEditor.svelte'
  import CheckboxGroupEditor from './CheckboxGroupEditor.svelte'
  import RadioGroupEditor from './RadioGroupEditor.svelte'
  import Field from './Field.svelte'
  import Button from '../../../components/Button.svelte'
  import LogicBuilder from './LogicBuilder.svelte'
  import type { FieldEditConfig } from './models/FieldEditConfig'
  import GroupAccordion from './GroupAccordion.svelte'

  export let field: IField
  export let config: FieldEditConfig = {}
  let cantBeRequired = ['switch']
</script>

<div>
  <div style="max-height: 95vh; overflow: auto;">
    {#if field.type === 'spacer'}
      <Field
        field={{ id: randomString(), label: 'Increase value to add more spacing between the previous and next field.', required: true, value: field.options?.spacer ?? 1, type: 'number', configFieldTarget: 'options.spacer', configTarget: field.id }}
      />
    {:else if field.type === 'block'}
      <ContentBlockEditor {field} expanded={field.expanded} />
    {:else}
      <div style="padding-left: 0.5em;">
        <h5 style="padding-bottom: 0.2em;">Field Settings</h5>
        <hr />
      </div>
      <div id={`field-button-${field.id}`}>
        {#if !cantBeRequired.includes(field.type)}
          <Field
            config={{ search: false }}
            field={{ id: randomString(), customCss: 'padding-bottom: 0em;', label: 'Required', value: { type: 'local', value: field.required }, type: 'switch', configFieldTarget: 'required', configTarget: field.id, options: { type: 'local', value: [{ label: 'Yes', value: true }, { label: 'No', value: false }] } }}
          />
        {/if}
        <Field field={{ id: randomString(), label: 'Name', required: true, value: field.name, type: 'string', configFieldTarget: 'name', configTarget: field.id }} />
        <Field field={{ id: randomString(), label: 'Label', value: field.label, type: 'string', configFieldTarget: 'label', configTarget: field.id }} />
        <Field field={{ id: randomString(), label: 'Helper Text', value: field.helperText, type: 'string', configFieldTarget: 'helperText', configTarget: field.id }} />
        <Field
          field={{ id: randomString(), label: 'Field Type', value: { type: 'local', value: field.type }, type: 'combobox', required: true, configFieldTarget: 'type', configTarget: field.id, options: { type: 'remote', value: 'http://localhost:8080/field-types.json' } }}
        />
        <FieldTypeEditor {field} />
      </div>
    {/if}
    <LogicAccordion {field} />
    <GroupAccordion {field} />
  </div>
</div>
