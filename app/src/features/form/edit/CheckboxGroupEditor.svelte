<script lang="typescript">
  import type { IField, LabelValue } from 'models/IField'
  import type { ContentBlock } from 'models/ContentBlock'

  import Field from './Field.svelte'
  import { randomString } from 'util/Generate'
  import { dispatch } from 'event/EventBus'
  import ContentBlockList from './ContentBlockList.svelte'
  import Repeater from 'components/Repeater.svelte'

  export let field: IField
  export let expanded: boolean

  function manageBlocks() {
    dispatch('dialog_show', {
      child: ContentBlockList,
      closeOnOutsideClick: false,
      confirmCloseOnDirty: true,
      title: 'Manage Content Blocks',
      save: false,
    })
  }

  function onOptionsChange(options: string[] | LabelValue[]) {
      console.log(field);
  }

  function loadTransformer(value: ContentBlock[]) {
    return value.map((v) => {
      return {
        label: v.name,
        value: v.value,
      }
    })
  }
</script>

<div>
  <Repeater
    onlyLabel={true}
    label={'Checkbox Options'}
    onChange={onOptionsChange} />
</div>
