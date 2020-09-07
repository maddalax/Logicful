<script lang="typescript">
  import { onMount } from 'svelte'
  import { dispatch, subscribe, subscribeComponent } from 'event/EventBus'
  import type { IFolder } from '../models/IFolder'
import Folders from './Folders.svelte';
  import FormList from './FormList.svelte'
import type { IForm } from 'models/IForm';
import { getApi, postApi } from 'services/ApiService';
import Dialog from './layout/Dialog.svelte';
import { goto } from '@sapper/app';


  let forms: IForm[] = []
  let folderId: string =''
  let folder: IFolder
  let creatingNewForm = false
  let newFormTitle =''

  function onSettings(folderId: string) {}

  function onImportForm() {}
  
  subscribeComponent('folder_selected', async (e: {folder : IFolder, showForms : any})=>{
    console.log("folder selected", e)
    folder = e.folder
    await getForms(e.folder.id)
  })

  async function getForms(folderId: string){
    forms = await getApi(`form?folderId=${folderId}`)
    console.log(forms)
  }

  onMount(() => {
    dispatch("folder_content_loaded", {})
  })

  // function loadFolder(folder: IFolder) {
  //   folder = folder
  //   forms = showForms
  // }

  function createNewFormClick() {
    creatingNewForm = true
  }

  async function creatNewFolder() {
    const response: IForm = await postApi("form", {
      "title" : newFormTitle,
      "fields" : [],
      "teamId" : "maddox",
      "folder" : folder.id
    });

    goto(`/form/builder?formId=${response.id}`)

  }


</script>


{#if creatingNewForm}
  <Dialog
    title={'Create New Form'}
    isOpen={true}
    actions={[{ label: `Create New Form`, type: 'secondary', onClick: creatNewFolder }, { label: 'Cancel', type: 'danger' }]}
    onClose={() => {
      creatingNewForm = false
    }}
  >
  <h6>Form Title</h6>
  <input bind:value={newFormTitle} class="form-control" type="text" id="folderName" name="folderName" placeholder="">
  </Dialog>
{/if}
<div class="row mb-5">
  <div class="col-12 mb-4">
    <div class="card card-body bg-white border-light p-0 p-md-4">
      {#if folder}
      <div class="card-header bg-white border-0 p-2" style="display: flex">
        <div class="row">
          <div class="col" >
            <div style="display: flex">
            <span class="h5">{folder.name}</span>
            <div style="padding-left: 0.5em; font-size: 1.2em;"
            on:click={() => {
              onSettings(folder.id)
            }}
            class=""
          >
            <span class="fas fa-cog" />
          </div>
          </div>
            {#if folder.id === 'Uncategorized'}
              <p class="small">Uncategorized forms have not been assigned a folder yet.</p>
            {:else}
              <p class="small">{forms?.length ?? 0} Forms</p>
            {/if}
          </div>
          <div class="col-auto">
            <div class="align-items-center" style="padding-bottom: 0.3em; text-align: right !important;">

            </div>
            <!-- <a href="/form/form/builder" class="btn btn-xs btn-outline-dark"> <span class="fas fa-file-import" /><span style="padding-left: 0.5em">Import Form</span></a> -->
            <button on:click={createNewFormClick} class="btn btn-xs btn-outline-dark" target="_blank"> <span class="fas fa-plus" /><span style="padding-left: 0.4em; font-weight: 400;">Create Form</span></button>
          </div>
        </div>
      </div>
      <hr/>
      {#if forms}
      <FormList forms={forms} />
      {:else}
      <p style="padding-left: 0.7em;">Folder Empty</p>
      {/if}
      {:else}
      <div class="spinner-border" style="width: 2rem; height: 2rem;" role="status"><span class="sr-only">Loading...</span></div>
      {/if}
    </div>
  </div>
</div>



<style type="text/scss">
  .card {
    border-radius: 0.3em;
  }
</style>
