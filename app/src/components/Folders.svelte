<script lang="typescript">
import { dispatch, subscribe } from 'event/EventBus';

import type { IFolder } from 'models/IFolder';
import { getApi, postApi, putApi } from 'services/ApiService';
  import { afterUpdate, onMount } from 'svelte'
import { randomString } from 'util/Generate';
import { v1 } from 'uuid';
import Dialog from './layout/Dialog.svelte';

  export let selected: string = ''
  let folders: IFolder[] = []
  let searchPlaceHolder = 'Search for a form'
  let query = ''
  let creatingNewFolder = false
  let newFolderName = ''


  onMount(async () => {
    folders = await getFolders()
    subscribe('folder_content_loaded', ()=>{
      const s = selectedFolder();
      if(s){
       dispatch('folder_selected', {folderId: selected})
      }
    })
  })

  function selectedFolder(): IFolder | undefined {
     let selectedFolder = folders.find((folder)=>{
       return folder.id === selected
     })
     return selectedFolder;
  }

  async function getFolders(): Promise<IFolder[]> {

    // /api/folder GET
    // /api/folder POST
    // /api/folder/:id PUT

    const response = await getApi<IFolder[]>("folder?team=maddox");
    return response;
  }

  afterUpdate(() => {
    const s = selectedFolder();
    if(s){
      dispatch('folder_selected', {folder: s})
    }
  })

  function newFolderClick() {
    creatingNewFolder = true

  }

  async function creatNewFolder() {
    await postApi("folder", {
      name: newFolderName,
      teamId: 'maddox'
    });
  }
</script>


{#if creatingNewFolder}
  <Dialog
    title={'Create New Folder'}
    isOpen={true}
    actions={[{ label: `Create Folder`, type: 'secondary', onClick: creatNewFolder }, { label: 'Cancel', type: 'danger' }]}
    onClose={() => {
      creatingNewFolder = false
    }}
  >
  <h6>Folder Name</h6>
  <input bind:value={newFolderName} class="form-control" type="text" id="folderName" name="folderName" placeholder="">
  </Dialog>
{/if}
<div class="card border-light p-2" style="padding-bottom: 1em !important;">
  <div class="container-fluid p-2 mt-3" style="padding-left: 0em;"><input class="form-control search-bar container-fluid" placeholder={searchPlaceHolder} bind:value={query} /></div>
  <div class="card-header card-header-title bg-white border-0" style="display: flex;"><span class="title">Your Folders</span></div>
  {#each folders as folder}
    <div class="card-body p-2">
      <div class="list-group dashboard-menu list-group-sm">
        <a href="/folder?folderId={folder.id}" class="d-flex list-group-item border-0 list-group-item-action {folder.id === selected ? 'active' : ''}" style="padding-bottom: 0.5em; padding-top: 0.5em;">
          {#if folder.id === selected}
          <div>

            <span class="fas fa-folder" style="font-size: 1.2em; font-weight: 375;" />
          </div>
          {:else}
          <div>
            <span class="far fa-folder" style="font-size: 1.2em; font-weight: 375;" />
          </div>
          {/if} 
          <span style="padding-left: 0.5em; font-weight: 375;">{folder.name}</span>
          {#if folder.id === selected}
          <span class="icon icon-xs ml-auto"> <span class="fas fa-chevron-right" /> </span>
          {/if}
        </a>
      </div>
    </div>
  {/each}
  <button on:click={newFolderClick} class="btn btn-outline-dark"> <span class="fas fa-folder-plus" style="font-size: 1.2em;" /> <span style="font-weight: 400;">New Folder</span> </button>
</div>

<style>
  .card-header-title {
    padding-left: 0.9em;
    padding-right: 1em;
    padding-top: 1em;
    padding-bottom: 0.5em;
  }
  .list-group.dashboard-menu .list-group-item:hover {
    border-radius: 0.3em;
  }

  .active {
    color: #26304c !important;
    border-radius: 0.3em;
  }

  .card {
    border-radius: 0.3em;
  }

  .title {
    font-weight: 600;
    line-height: 1.3;
    color: #1c2540;
    padding-left: 0.5em;
    font-size: 1em;
  }

  .list-group-item {
    color: #26304c !important;
  }

  .p-2 {
    padding-left: 0.5rem !important;
    padding-top: 0rem !important;
    padding-bottom: 0rem !important;
  }

  .btn-outline-dark {
    margin-right: 0.9em;
    margin-left: 0.9em;
    padding-top: 0.4em;
    padding-bottom: 0.4em;
    margin-top: 1em;
  }
</style>
