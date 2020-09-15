<script lang="typescript">
  import { subscribeFieldChange } from 'event/FieldEvent'

  import Field from 'features/form/edit/Field.svelte'
  import LiveField from 'features/form/live/LiveField.svelte'

  import TextInput from 'inputs/TextInput.svelte'
  import type { IField } from 'models/IField'
  import formStore from 'store/FormStore'
  import { onMount } from 'svelte'
  import { randomString } from 'util/Generate'
  import Label from './Label.svelte'
  export let field: IField
  export let value: { [key: string]: any }

  let config = {
    prefix: true,
    first: true,
    middle: true,
    middleInitial: false,
    last: true,
    suffix: true,
  }

  subscribeFieldChange(onMount, (newField) => {
    if (newField.id === field.id) {
      value = newField.value
      console.log(value)
    }
  })

  onMount(() => {
    value = formStore.get(field.id)
    console.log(value)
  })
</script>

<Label field={{ label: 'Name', type: 'name', id: randomString(), required : field.required }} />
<div class="d-flex flex-row bd-highlight" style="margin-bottom: -1.5em !important">
  {#if config.prefix}
    <div class="bd-highlight pr-2 flex-shrink-1">
      <LiveField field={{ required: true, name: `${field.name}.prefix`, id: `${field.id}.value.prefix`, helperText: 'Prefix', hideLabel: true, value: value?.prefix?.value ?? '', type: 'string' }} />
    </div>
  {/if}
  {#if config.first}
    <div class="bd-highlight flex-grow-1 pr-2">
      <LiveField field={{ required: true, name: `${field.name}.first`, id: `${field.id}.value.first`, helperText: 'First Name', hideLabel: true, value: value?.first?.value ?? '', type: 'string' }} />
    </div>
  {/if}
  {#if config.middle}
    <div class="bd-highlight flex-grow-1 pr-2">
      <LiveField
        field={{ required: true, name: `${field.name}.middle`, id: `${field.id}.value.middle`, helperText: 'Middle Name', hideLabel: true, value: value?.middle?.value ?? '', type: 'string' }}
      />
    </div>
  {/if}
  {#if config.middleInitial}
    <div class="bd-highlight pr-2">
      <LiveField
        field={{ required: true, name: `${field.name}.middleInitial`, id: `${field.id}.value.middleInitial`, helperText: 'M.I.', hideLabel: true, value: value?.middleInitial?.value ?? '', type: 'string' }}
      />
    </div>
  {/if}
  {#if config.last}
    <div class="bd-highlight flex-grow-1 pr-2">
      <LiveField field={{ required: true, name: `${field.name}.last`, id: `${field.id}.value.last`, helperText: 'Last Name', hideLabel: true, value: value?.last?.value ?? '', type: 'string' }} />
    </div>
  {/if}
  {#if config.suffix}
    <div class="bd-highlight p-right-2 flex-shrink-1">
      <LiveField field={{ required: true, name: `${field.name}.suffix`, id: `${field.id}.value.suffix`, helperText: 'Suffix', hideLabel: true, value: value?.suffix?.value ?? '', type: 'string' }} />
    </div>
  {/if}
</div>