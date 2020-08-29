<script lang="typescript">
  import type { LogicConditional, LogicRule, LogicRuleOptions } from 'models/LogicBuilder'
  import type { IField } from 'models/IField'
  import type { LabelValue } from 'models/IField'
  import { dispatch } from 'event/EventBus'
  import { onMount } from 'svelte'
  import { dispatchSingle } from 'event/EventBus'
  import Field from 'features/form/edit/Field.svelte'
  import { randomString } from 'util/Generate'
  import { subscribeFieldChange } from 'event/FieldEvent'
  import formStore from 'store/FormStore'
  import { isObject } from 'guards/Guard'
  import Label from 'inputs/Label.svelte'
  import { firstNotEmpty } from 'util/Format'
  import { assertExists } from 'util/Selection'
  import { isEmptyOrNull } from 'util/Compare'

  export let helperText: string = ''
  export let field: IField
  let options : LogicRuleOptions[] = [];

  onMount(async () => {
    subscribeFieldChange((newField, change) => {
      if (change.field === 'value') {
        return
      }
      if (field.id === newField.id) {
        field = newField
        if (field.logic?.action && isEmptyOrNull(field.logic?.rules)) {
          addNew()
        }
        if(field.logic?.rules) {
          field.logic.rules.forEach((f, i) => {
            options[i] = getOptions(i);
          })
        }
      }
    })
  })

  function getFields(): IField[] {
    let fields = dispatchSingle<IField[]>('get_form_fields', {})
    fields = fields.filter((w) => w.id !== field.id && w.type !== 'spacer')
    return fields
  }

  function remove(option: number) {
    const temp = [...field.logic!.rules]
    temp.slice(option, 1)
    field.logic!.rules = temp
    formStore.set(field)
  }

  function addNew() {
    if (!field.logic?.rules) {
      field.logic = field.logic ?? { rules: [], action: '' }
      field.logic.rules = []
    }
    field.logic!.rules = field.logic!.rules.concat([
      {
        field: '',
        value: '',
        condition: '',
      },
    ])
    formStore.set(field)
  }

  function shouldShowValue(index : number) {
    const condition = field.logic?.rules?.[index]?.condition ?? ''
    const toNotShow = ['hasValue', 'isTrue', 'isFalse', 'notHaveValue']
    if (toNotShow.includes(condition)) {
      return false
    }
    return true
  }

  function getOptions(index : number) : LogicRuleOptions {
    const value = field.logic?.rules?.[index]?.condition
    const condition = conditions(index).find((w) => w.value === value);
    if(!condition) {
      return {
        valueType : 'text',
        showValue : false,
        options : () => Promise.resolve([]),
        helperText : '',
        placeholder : ''
      }
    }
    return {
      valueType : condition.valueInput ?? 'text',
      showValue : shouldShowValue(index),
      options : () => loadOptions(index),
      helperText : condition.helper ?? '',
      placeholder : condition.placeholder ?? ''
    }
  }

  function loadOptions(index: number): Promise<LabelValue[]> {
    const id = field.logic?.rules?.[index]?.field
    if (!id) {
      return Promise.resolve([])
    }
    return dispatchSingle('combobox_get_options', {
      id,
    })
  }


  function conditions(index: number): LogicConditional[] {
    const targetFieldId = field.logic?.rules?.[index]?.field
    if (!targetFieldId) {
      return []
    }
    const fields = getFields()
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
    if (targetField.type === 'combobox') {
      return [
        {
          label: 'Equals',
          value: 'eq',
          valueInput: 'combobox',
          options: loadOptions,
        },
        {
          label: 'Not Equals',
          value: 'notEq',
          valueInput: 'combobox',
          options: loadOptions,
        },
        {
          label : 'Has Selected Option',
          value : 'hasValue'
        }
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
    if (targetField.type === 'file') {
      return [
        {
          label: 'Has Chosen File',
          value: 'hasValue',
        },
        {
          label: 'Has Not Chosen File',
          value: 'notHaveValue',
        },
        {
          label: 'Is File Extension',
          value: 'isFileExtension',
          helper: 'You can include multiple extensions by seperating with a comma.',
          placeholder: 'pdf, txt, png',
        },
        {
          label: 'Is Not File Extension',
          helper: 'You can include multiple extensions by seperating with a comma.',
          value: 'isNotFileExtension',
          placeholder: 'pdf, txt, png',
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

  function fieldsTransformer(fields: IField[]): LabelValue[] {
    return fields.map((f) => {
      return {
        label: `${firstNotEmpty(f.label, f.name)} - ${f.type}`,
        value: f.id,
      }
    })
  }
</script>

<div>
  <div class="container" style="padding-left: 0.4em; padding-right: 0.4em;">
    {#each field.logic?.rules ?? [] as option, i}
      <div class="row" style="background-color: rgb(245 249 253)">
        <div class="col-12">
          <div class="row">
            <div class="col">
              <Field
                config={{ search: true }}
                field={{ id: randomString(), loadTransformer: fieldsTransformer, helperText: 'Select which field the conditional should be ran against.', label: 'Select Field', value: { type: 'local', value: field.logic?.rules?.[i]?.field }, type: 'combobox', required: true, configFieldTarget: `logic.rules[${i}].field`, configTarget: field.id, options: { type: 'local', value: getFields } }} />
            </div>
          </div>
          <div class="row">
            {#if field.logic?.rules?.[i]?.field}
              <Field
                config={{ search: true }}
                field={{ id: randomString(), label: 'Select Your Condition', value: { type: 'local', value: field.logic?.rules?.[i]?.condition }, type: 'combobox', required: true, configFieldTarget: `logic.rules[${i}].condition`, configTarget: field.id, options: { type: 'local', value: conditions(i) } }} />
            {/if}

          </div>
          <div class="row">
            {#if field.logic?.rules?.[i]?.condition && options[i]?.showValue}
              {#if options[i].valueType === "text"}
                <Field
                  field={{ id: randomString(), helperText: options[i].helperText, placeholder: options[i].placeholder, label: 'Provide Value For Conditional', value: { type: 'local', value: field.logic?.rules?.[i]?.value }, type: 'string', required: true, configFieldTarget: `logic.rules[${i}].value`, configTarget: field.id }} />
              {:else if options[i].valueType === "combobox"}
                <Field
                  field={{ id: randomString(), helperText: options[i].helperText, placeholder: options[i].placeholder, label: 'Provide Value For Conditional', value: { type: 'local', value: field.logic?.rules?.[i]?.value }, type: 'combobox', required: true, configFieldTarget: `logic.rules[${i}].value`, configTarget: field.id, options: { type: 'local', value: options[i].options } }} />
              {/if}
            {/if}
          </div>
        </div>
      </div>
      <br />
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

</style>
