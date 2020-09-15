<script lang="typescript">
  import { onMount } from 'svelte'
  import { dispatch, subscribe, subscribeComponent } from '@app/event/EventBus'
  import type { IFolder } from '../models/IFolder'
  import Folders from './Folders.svelte'
  import FormList from './FormList.svelte'
  import type { IForm } from '@app/models/IForm'
  import { getApi, postApi } from '@app/services/ApiService'
  import Dialog from './layout/Dialog.svelte'
  import type { User } from '@app/models/User'
  import { me } from '@app/services/AuthService'
  import { LoadState } from '@app/models/LoadState'
  import Loader from './Loader.svelte'

  let forms: IForm[] = []
  let folderId: string = ''
  let folder: IFolder
  let newFormTitle = ''
  let user: User
  let state: LoadState = LoadState.NotStarted

  function onSettings(folderId: string) {}

  function onImportForm() {}

  subscribeComponent('folder_selected', async (e: { folder: IFolder; showForms: any }) => {
    forms = []
    state = LoadState.Loading
    folder = e.folder
    await setForms(e.folder.id)
    state = LoadState.Finished
  })

  async function setForms(folderId: string) {
    forms = await getApi(`form?folderId=${folderId}`)
  }

  onMount(() => {
    user = me()
    dispatch('folder_content_loaded', {})
  })
</script>

<div class="row mb-5">
  <div class="col-12 mb-4">
    <div class="card card-body bg-white border-light p-0 p-md-4">
      {#if folder}
        <div class="card-header bg-white border-0 p-2" style="display: flex">
          <div class="row">
            <div class="col">
              <div style="display: flex">
                <span class="h5">{folder.name}</span>
                <div
                  style="padding-left: 0.5em; font-size: 1.2em;"
                  on:click={() => {
                    onSettings(folder.id)
                  }}
                  class=""
                >
                  <span class="fas fa-cog" />
                </div>
              </div>
              <p class="small">{forms?.length ?? 0} Forms</p>
            </div>
            <div class="col-auto">
              <div class="align-items-center" style="padding-bottom: 0.3em; text-align: right !important;" />
              <a href={`/form/create?folder=${folder?.id}`} class="btn btn-xs btn-outline-dark">
                <span class="fas fa-plus" /><span style="padding-left: 0.4em; font-weight: 400;">Create Form In This Folder</span>
              </a>
            </div>
          </div>
        </div>
        <hr />
        {#if state === LoadState.Loading}
          <Loader />
        {/if}
        {#if forms}
          <FormList {forms} />
        {:else}
          <p style="padding-left: 0.7em;">Folder Empty</p>
        {/if}
      {/if}
    </div>
  </div>
</div>

<style>
  .card {
    border-radius: 0.3em;
  }
</style>
