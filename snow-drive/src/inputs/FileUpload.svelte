<script lang="typescript">
  import type { IField } from '@app/models/IField'
  import { subscribeFieldChange } from '@app/event/FieldEvent'
  import Label from './Label.svelte'
  import { afterUpdate, onMount } from 'svelte'
  import formStore from '@app/store/FormStore'
  import { firstNotEmpty } from '@app/util/Format'
  import has from 'lodash.has'
  import { randomString } from '@app/util/Generate'

  export let field: IField
  let files: FileList | undefined
  let placeholder = 'Choose a file...'
  let hasFile = false
  let fileId = ''

  onMount(() => {
    placeholder = firstNotEmpty(field.placeholder ?? field.value?.name, 'Choose a file...')
  })

  subscribeFieldChange(onMount, (newField : IField) => {
    if(newField.id === field.id) {
      placeholder = firstNotEmpty(field.placeholder ?? field.value?.name, 'Choose a file...') 
    }
  });

  function clear() {
    if (files) {
      hasFile = false
      placeholder = firstNotEmpty(field.placeholder, 'Choose a file...')
      files = undefined
      formStore.clearFile(fileId)
      field.value = undefined
      formStore.set(field, {
        field: 'value',
        value: undefined,
        fromUser: true,
      })
    }
  }

  afterUpdate(() => {
    if (files && files[0] && !hasFile) {
      const file = files[0];
      hasFile = true
      placeholder = file.name
      fileId = field.id
      formStore.setFile(fileId, file)
      field.value = {
        name : placeholder,
        id : fileId,
        size : file.size,
        type : file.type
      }
      formStore.set(field, {
        field: 'value',
        value: field.value,
        fromUser: true,
      })
    }
  })
</script>

<Label {field} />
{#if hasFile}
  <div class="input-group" on:click|stopPropagation>
    <input type="text" class="form-control" {placeholder} value={placeholder} readonly aria-label={'Uploaded file'} aria-describedby="basic-addon2" />
    <span class="input-group-text form-file-button" on:click|stopPropagation={clear}>Clear File</span>
  </div>
{:else}
  <div class="form-file" on:click|stopPropagation>
    <input bind:files type="file" class="form-file-input" id={`${field.id}-file-input`} on:click|stopPropagation />
    <label class="form-file-label" for="customFile"> <span class="form-file-text">{placeholder}</span> <span class="form-file-button">Browse</span> </label>
  </div>
{/if}