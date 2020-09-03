<script lang="typescript">
  import TextInput from 'inputs/TextInput.svelte'
  import type { IField } from 'models/IField'
  import { randomString } from 'util/Generate'
  import Label from './Label.svelte'
  export let field: IField
  export let value: { [key: string]: string }
  //   export let config: { [key: string]: string }

  let config = {
    prefix: true,
    first: true,
    middle: true,
    middleInitial: false,
    last: true,
    suffix: true,
  }
</script>

<Label field={{ label: 'Name', type: 'name', id: randomString() }} />
<div class="row" style="padding-top: 0.3em; width: 100%;">
  {#if config.prefix}
    <div class="col-1 padding">
      <TextInput field={{ required: true, name: `${field.name}.prefix`, id: `${field.id}.value.prefix`, helperText: 'Prefix', hideLabel: true, value: value?.prefix ?? '', type: 'string' }} />
    </div>
  {/if}
  {#if config.first}
    <div class="col-3 padding">
      <TextInput field={{ required: true, name: `${field.name}.first`, id: `${field.id}.value.first`, helperText: 'First Name', hideLabel: true, value: value?.first ?? '', type: 'string' }} />
    </div>
  {/if}
  {#if config.middle}
    <div class="col-3 padding">
      <TextInput field={{ required: true, name: `${field.name}.middle`, id: `${field.id}.value.middle`, helperText: 'Middle Name', hideLabel: true, value: value?.middle ?? '', type: 'string' }} />
    </div>
  {/if}
  {#if config.middleInitial}
    <div class="col-1 padding">
      <TextInput
        field={{ required: true, name: `${field.name}.middleInitial`, id: `${field.id}.value.middleInitial`, helperText: 'M.I.', hideLabel: true, value: value?.middleInitial ?? '', type: 'string' }}
      />
    </div>
  {/if}
  {#if config.last}
    <div class="col-3 padding">
      <TextInput field={{ required: true, name: `${field.name}.last`, id: `${field.id}.value.last`, helperText: 'Last Name', hideLabel: true, value: value?.last ?? '', type: 'string' }} />
    </div>
  {/if}
  {#if config.suffix}
    <div class="col-1 padding">
      <TextInput field={{ required: true, name: `${field.name}.suffix`, id: `${field.id}.value.suffix`, helperText: 'Suffix', hideLabel: true, value: value?.suffix ?? '', type: 'string' }} />
    </div>
  {/if}
</div>

<style>
  .padding {
    padding-right: 0em;
  }
</style>
