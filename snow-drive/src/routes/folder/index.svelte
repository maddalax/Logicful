<script context="module">
  import { getUrlParameter } from '@app/util/Http'

  export async function preload(page: any, session: any) {
    const folderId: string = page.query.folderId
    return { folderId: folderId }
  }
</script>

<script lang="typescript">
  import Sidebar from '../../components/Sidebar.svelte'
  import Folders from '../../components/Folders.svelte'
  import { afterUpdate, onMount } from 'svelte'
  import FolderContent from '../../components/FolderContent.svelte'
  import { IFolder } from '@app/models/IFolder'
  import type { IForm } from '@app/models/IForm'
  import { randomString } from '@app/util/Generate'

  export let folderId: string

  onMount(() => {
    // folder = getFolder(folderName)
  })

  afterUpdate(() => {
    console.log('after update')
    // folder = getFolder(folderName)
  })

  function getFolder(folderName: string) {
    return { name: folderName, forms: [], id: folderName }
  }
</script>

<div class="section section-lg pt-6 pt-md-6 bg-soft">
  <div class="container">
    <div class="row pt-3 pt-md-0">
      <div class="col-12 col-md-4 d-none d-lg-block">
        <Folders selected={folderId} />
      </div>
      <div class="col-12 col-lg-8">
        <FolderContent />
      </div>
    </div>
  </div>
</div>

<style>

</style>
