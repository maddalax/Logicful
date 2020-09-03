<script context="module">
  import { getUrlParameter } from 'util/Http'

  export async function preload(page: any, session: any) {
    const folder = getUrlParameter('folder')
    if (!folder) {
      return 'uncategorized'
    }
    return { folderName: folder }
  }
</script>

<script lang="typescript">
  import Sidebar from '../../components/Sidebar.svelte'
  import Folders from '../../components/Folders.svelte'
  import { afterUpdate, onMount } from 'svelte'
  import FolderContent from '../../components/FolderContent.svelte'
  import type { IFolder } from 'models/IFolder'
  import type { IForm } from 'models/IForm'

  export let folderName: string

  let folder: IFolder

  onMount(() => {
    folder = getFolder(folderName)
  })

  afterUpdate(() => {
    folder = getFolder(folderName)
  })

  function getFolder(folderName: string) {
    return { name: folderName, forms: [], id: '12345' }
  }
</script>

<div style=" background-color: #f5f9fe;">
  <div class="section section-lg pt-6 pt-md-6 bg-soft">
    <div class="container">
      <div class="row pt-3 pt-md-0">
        <div class="col-12 col-md-4 d-none d-lg-block">
          <Folders selected={folderName} />
        </div>
        <div class="col-12 col-lg-8">
          {#if folder != null}
            <FolderContent {folder} />
          {/if}
        </div>
      </div>
    </div>
  </div>
</div>

<style>
</style>
