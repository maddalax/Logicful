<script lang="typescript">
  import type { IField, LabelValue } from '@app/models/IField'
  import Field from './Field.svelte'
  import { randomString } from '@app/util/Generate'
  import Repeater from '@app/components/Repeater.svelte'
  import { dispatch, dispatchSingle } from '@app/event/EventBus'
  import { firstNotEmpty } from '@app/util/Format'
  import { onMount } from 'svelte'
  import formStore from '@app/store/FormStore'
  import GroupEditSidebar from './GroupEditSidebar.svelte'
import ConfigField from './ConfigField.svelte';

  export let field: IField

  function getGroups(): LabelValue[] {
    let form = formStore.getForm()
    return form.groups ?? []
  }

  function onGroupSettings() {
    dispatch('show_right_sidebar', { component: GroupEditSidebar, groupId: field.groupId })
  }

  onMount(() => {})
</script>

<div>
  <ConfigField
    config={{ search: true }}
    field={{ id: randomString(), label: 'Specify Group', helperText: 'Link fields together via a group', value: { type: 'local', value: field.groupId }, type: 'combobox', required: true, configFieldTarget: `groupId`, configTarget: field.id, options: { type: 'local', value: getGroups } }}
  />
  <div class="d-flex bd-highlight justify-end" style="padding: .75em 0.6em;">
    <button on:click={onGroupSettings} target="_blank" class="btn btn-sm btn-outline-dark"> <span class="fas fa-cog" /> Group Settings </button>
  </div>
</div>
