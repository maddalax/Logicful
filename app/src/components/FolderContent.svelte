<script lang="typescript">
  import type { IFolder } from '../models/IFolder'
  import FormList from './FormList.svelte'

  export let folder: IFolder

  function onSettings(folderId: string) {}

  function onImportForm() {}
</script>

<div class="row mb-5">
  <div class="col-12 mb-4">
    <div class="card card-body bg-white border-light p-0 p-md-4">
      <div class="card-header bg-white border-0 p-2" style="display: flex">
        <div class="row">
          <div class="col">
            <span class="h5">{folder.name}</span>
            {#if folder.name === 'uncategorized'}
              <p class="small">Uncategorized forms have not been assigned a folder yet.</p>
            {:else}
              <p class="small">{folder.forms.length} Submissions</p>
            {/if}
          </div>
          <div class="col-auto">
            <div class="align-items-center" style="padding-bottom: 0.3em; text-align: right !important;">
              <button
                on:click={() => {
                  onSettings(folder.id)
                }}
                class="btn btn-xs btn-outline-dark">
                <span class="fas fa-cog" />
              </button>
            </div>
            <button on:click={onImportForm} class="btn btn-xs btn-outline-dark"> <span class="fas fa-file-import" /> <span>Import Form</span> </button>
            <a href="/builder/new" class="btn btn-xs btn-outline-dark"> <span class="fas fa-plus" /><span>Create Form</span></a>
          </div>
        </div>
      </div>
      <FormList {folder} />
    </div>
  </div>
</div>

<style>
  .card {
    border-radius: 0.3em;
  }
</style>
