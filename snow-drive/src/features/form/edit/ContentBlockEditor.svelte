<script lang="typescript">
  import type { IField } from '@app/models/IField'
  import type { ContentBlock } from '@app/models/ContentBlock'

  import Field from './Field.svelte'
  import { randomString } from '@app/util/Generate'
  import { dispatch } from '@app/event/EventBus'
  import ContentBlockList from './ContentBlockList.svelte'

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
  <div style="padding-left: 0.5em;">
    <h5 style="padding-bottom: 0.2em;">Content Block Settings</h5>
    <hr />
  </div>
  <Field editor={true} padding={false} field={{ id: randomString(), type: 'block-editor', value: field.value, configTarget: field.id, configFieldTarget: 'value' }} />
  <div class="flex"><button class="blocks-button btn btn-light" type="button"> Select Block </button> <button class="blocks-button btn btn-light" type="button"> Save Block </button></div>
</div>

<style>
  .blocks-button {
    margin-top: 0.8em;
  }
</style>
