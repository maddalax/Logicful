<script lang="typescript">
  import { onMount } from 'svelte'
  import FieldEdit from './FieldEdit.svelte'
  import type { IField } from 'models/IField'
  import { subscribe } from 'event/EventBus'
  import type { IForm } from 'models/IForm'
  import { fade, slide } from 'svelte/transition'
  import FormEdit from './FormEdit.svelte'
  import { dispatch } from 'event/EventBus'
  import { subscribeFieldChange } from 'event/FieldEvent'
  import { fastClone } from 'util/Compare'

  let field: IField | undefined
  let fieldId: string | undefined

  onMount(() => {
    subscribeFieldChange((newField: IField) => {
      if(newField.id === fieldId && !newField.selected) {
        field = undefined;
        fieldId = undefined;
        return;
      }
      if (newField.selected) {
        field = fastClone(newField)
        fieldId = field!.id
      }
    })
  })
</script>

<div>
  <div class="col-md no-gutters" style="padding-left: 0.55em; padding-right: 0.55em;">

  {#if field}
  {#each [field] as f (fieldId)}
      <div transition:slide={{ duration: 500 }}>
        <FieldEdit field={f} />
      </div>
  {/each}
{:else}
      <FormEdit />
  {/if}
  </div>

</div>
