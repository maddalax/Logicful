<script lang="typescript">
  import type { IField } from 'models/IField'
  import { subscribeFieldChange } from 'event/FieldEvent'
  import Label from './Label.svelte'
  import { afterUpdate, onMount } from 'svelte'
  import formStore from 'store/FormStore'
  import { firstNotEmpty } from 'util/Format'
import has from 'lodash.has';
import { randomString } from 'util/Generate';

  export let field: IField
  let files: FileList | undefined
  let placeholder = 'Choose a file...'
  let hasFile = false
  let fileId = '';

  onMount(() => {
    placeholder = firstNotEmpty(field.placeholder, 'Choose a file...')
  })

  function clear() {
    if (files) {
      hasFile = false;
      placeholder = firstNotEmpty(field.placeholder, 'Choose a file...')
      files = undefined
      formStore.clearFile(fileId);
      fileId = '';
      field.value = undefined;
      formStore.set(field, {
          field : 'value',
          value : undefined,
          fromUser : true
      });
    }
  }

  afterUpdate(() => {
    if (files && files[0] && !hasFile) {
      hasFile = true
      placeholder = files[0].name
      fileId = randomString();
      formStore.setFile(fileId, files[0]);
      field.value = fileId;
      formStore.set(field, {
          field : 'value',
          value : fileId,
          fromUser : true
      });
    }
  })
</script>

<Label {field} />
{#if hasFile} 
<div class="input-group" on:click|stopPropagation>
    <input type="text" class="form-control" placeholder={placeholder} value={placeholder} readonly aria-label={"Uploaded file"} aria-describedby="basic-addon2">
    <span class="input-group-text form-file-button" on:click|stopPropagation={clear}>Clear File</span>
  </div>
{:else}
<div class="form-file" on:click|stopPropagation>
    <input bind:files type="file" class="form-file-input" id={`${field.id}-file-input`} />
    <label class="form-file-label" for="customFile">
      <span class="form-file-text">{placeholder}</span>
      <span class="form-file-button">Browse</span>
    </label>
  </div>
{/if}

