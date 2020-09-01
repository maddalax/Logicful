<script lang="typescript">
  import type { IField, LabelValue } from 'models/IField'
  import Field from './Field.svelte'
  import { randomString } from 'util/Generate'
  import Repeater from 'components/Repeater.svelte'
  import { dispatch, dispatchSingle } from 'event/EventBus'
  import { firstNotEmpty } from 'util/Format'
  import { onMount } from 'svelte'
import formStore from 'store/FormStore';
import GroupEditSidebar from './GroupEditSidebar.svelte';

  export let field: IField

    function getGroups(): LabelValue[] {
       let form = formStore.getForm();
       return form.groups ?? []
    }

    function onGroupSettings(){

        dispatch('show_right_sidebar', {component: GroupEditSidebar, groupId: field.groupId})
    }

  onMount(() => {

  })
</script>

<div>
<Field
config={{ search: true }}
field={{ id: randomString(), label: 'Specify Group', value: { type: 'local', value: field.groupId }, type: 'combobox', required: true, configFieldTarget: `groupId`, configTarget: field.id, options: { type: 'local', value: getGroups } }} />
<div class="d-flex bd-highlight justify-end" style="padding: .75em 0.6em;">
<button on:click={onGroupSettings} target="_blank" class="btn btn-sm btn-outline-dark">
    <span class="fas fa-cog" />
    Group Settings
</button>
</div>
</div>