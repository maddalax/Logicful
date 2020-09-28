<script lang="typescript">
  import type { IField, LabelValue } from '@app/models/IField'
  import type { ContentBlock } from '@app/models/ContentBlock'

  import Field from './Field.svelte'
  import { randomString } from '@app/util/Generate'
  import { dispatch } from '@app/event/EventBus'
  import ContentBlockList from './ContentBlockList.svelte'
  import Repeater from '@app/components/Repeater.svelte'
  import formStore from '@app/store/FormStore'
  import { isEmptyOrNull } from '@app/util/Compare'

  export let field: IField
  export let expanded: boolean

  function onOptionsChange(options: string[] | LabelValue[]) {
    if (options.length === 0) {
      options = ['Checkbox Item 1']
    }
    field.options = options
    formStore.set(field, {
      fromUser: true,
      field: 'options',
      value: options,
    })
  }

  function loadTransformer(value: ContentBlock[]) {
    return value.map((v) => {
      return {
        label: v.name,
        value: v.value,
      }
    })
  }

  function options(): LabelValue[] {
    if (isEmptyOrNull(field.options)) {
      return [{ label: 'Checkbox Item 1', value: 'Checkbox Item 1' }]
    }
    return field.options?.map((w: string) => {
      return { label: w, value: w }
    })
  }
</script>

<div>
  <Repeater options={options()} onlyLabel={true} label={'Checkbox Options'} onChange={onOptionsChange} />
  <Field
    field={{ id: randomString(), type: 'switch', label: "Include 'Other' Option", value: { type: 'local', value: field.includeOther || false }, configFieldTarget: 'includeOther', configTarget: field.id }}
  />
</div>
