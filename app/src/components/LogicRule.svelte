<script lang="typescript">
  import type { LogicRule } from 'models/LogicBuilder'
  import type { IField } from 'models/IField'
  import type { LabelValue } from 'models/IField'
  import { dispatch } from 'event/EventBus'
  import { onMount } from 'svelte'
  import { dispatchSingle } from 'event/EventBus'
  import Field from 'features/form/edit/Field.svelte'
  import { randomString } from 'util/Generate'
  import { subscribeFieldChange } from 'event/FieldEvent'
  import { dispatchFieldChange } from 'event/FieldEvent'

  export let helperText: string = ''
  export let field: IField

  let fields: IField[] = []

  onMount(async () => {
    subscribeFieldChange((newField) => {
      if (field.id === newField.id) {
        field = newField
      }
    })

    fields = await dispatchSingle('get_form_fields', {})
    fields = fields.filter((w) => w.id !== field.id)
  })

  function remove(option: number) {
    const temp = [...field.logic!.rules]
    temp.slice(option, 1)
    field.logic!.rules = temp
    dispatchFieldChange(field, true)
  }

  function addNew() {
    field.logic!.rules = field.logic!.rules?.concat([
      {
        field: fields[0]?.id,
        value: '',
        condition: 'eq',
      },
    ])
  }

  function shouldShowValue(index: number) {
    const condition = field.logic?.rules?.[index]?.condition ?? ''
    const toNotShow = ['hasValue', 'isTrue', 'isFalse']
    if (toNotShow.includes(condition)) {
      return false
    }
    return true
  }

  function conditions(index: number): LabelValue[] {
    const targetFieldId = field.logic?.rules?.[index]?.field
    if (!targetFieldId) {
      return []
    }
    const targetField = fields.find((w) => w.id === targetFieldId)
    if (!targetField) {
      return []
    }
    if (targetField.type === 'string') {
      return [
        {
          label: 'Contains',
          value: 'contains',
        },
        {
          label: 'Starts With',
          value: 'startsWith',
        },
        {
          label: 'Ends With',
          value: 'endsWith',
        },
        {
          label: 'Equals',
          value: 'eq',
        },
        {
          label: 'Has Value',
          value: 'hasValue',
        },
      ]
    }
    if (targetField.type === 'switch') {
      return [
        {
          label: 'Is Toggled',
          value: 'isTrue',
        },
        {
          label: 'Is Not Toggled',
          value: 'isFalse',
        },
      ]
    }
    if (targetField.type === 'number') {
      return [
        {
          label: 'Greater Than',
          value: 'gt',
        },
        {
          label: 'Less Than',
          value: 'lt',
        },
        {
          label: 'Less Than or Equal To',
          value: 'lte',
        },
        {
          label: 'Greater Than or Equal To',
          value: 'gte',
        },
        {
          label: 'Equal To',
          value: 'eq',
        },
        {
          label: 'Has Value',
          value: 'hasValue',
        },
      ]
    }

    return []
  }
</script>

<div>
  <div class="container" style="padding-left: 0.4em; padding-right: 0.4em;">
    {#each field.logic?.rules ?? [] as option, i}
      <div class="row">
        <div class="col-11">
          <div class="row">
            <div class="col">
              <Field
                config={{ search: true }}
                field={{ id: randomString(), label: 'Field', value: { type: 'local', value: field.logic?.rules?.[i]?.field }, type: 'combobox', required: true, configFieldTarget: `logic.rules[${i}].field`, configTarget: field.id, options: { type: 'local', value: fields.map(
                      (w) => ({ label: w.label, value: w.id }),
                    ) } }} />
            </div>
          </div>
          <div class="row">
            {#if field.logic?.rules?.[i]?.field}
              <Field
                config={{ search: true }}
                field={{ id: randomString(), label: 'Condition', value: { type: 'local', value: field.logic?.rules?.[i]?.condition }, type: 'combobox', required: true, configFieldTarget: `logic.rules[${i}].condition`, configTarget: field.id, options: { type: 'local', value: conditions(i) } }} />
            {/if}

          </div>
          <div class="row">
            {#if field.logic?.rules?.[i]?.condition && shouldShowValue(i)}
              <Field
                field={{ id: randomString(), label: 'Value', value: { type: 'local', value: field.logic?.rules?.[i]?.value }, type: 'string', required: true, configFieldTarget: `logic.rules[${i}].value`, configTarget: field.id }} />
            {/if}
          </div>
        </div>
        <div class="col-1">
          <span class="icon baseline trash-icon" on:click={() => remove(i)}>
            <i class="fas fa-trash" />
          </span>
        </div>
      </div>
    {/each}
  </div>
  {#if helperText}
    <div class="helper-text">
      {@html helperText ?? ''}
    </div>
  {/if}
  <button class="btn-primary btn" style="margin-top: 1em" on:click={addNew}>New Rule</button>
</div>

<style>
  .trash-icon {
    height: 1.1em;
    width: 1.1em;
    margin-top: 3.3em;
    display: inline-block;
    cursor: pointer;
  }
</style>
