<script context="module">
  // the (optional) preload function takes a
  // `{ path, params, query }` object and turns it into
  // the data we need to render the page
  export async function preload(page: any, session: any) {
    const { folder } = page.params
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
    let form1: IForm = { title: 'Bad', id: 'yeet', lastUpdated: 'Oct 2 3:30 PM', fields: [] }
    let form2: IForm = { title: 'Bad', id: 'yeet', lastUpdated: 'Oct 12 3:30 PM', fields: [] }
    let form3: IForm = { title: 'Bad', id: 'yeet', lastUpdated: 'Oct 22 3:30 PM', fields: [] }

    if (folderName === 'uncategorized') {
      form1 = { title: 'Form 1a', id: 'yeet', lastUpdated: 'Oct 2 3:30 PM', fields: [] }
      form2 = { title: 'Form 2a', id: 'yeet', lastUpdated: 'Oct 12 3:30 PM', fields: [] }
      form3 = { title: 'Form 3a', id: 'yeet', lastUpdated: 'Oct 22 3:30 PM', fields: [] }
    } else if (folderName === 'Job Listings') {
      form1 = { title: 'Form 1b', id: 'yeet', lastUpdated: 'Oct 2 3:30 PM', fields: [] }
      form2 = { title: 'Form 2b', id: 'yeet', lastUpdated: 'Oct 12 3:30 PM', fields: [] }
      form3 = { title: 'Form 3b', id: 'yeet', lastUpdated: 'Oct 22 3:30 PM', fields: [] }
    } else if (folderName === 'Surveys') {
      form1 = { title: 'Form 1c', id: 'yeet', lastUpdated: 'Oct 2 3:30 PM', fields: [] }
      form2 = { title: 'Form 2c', id: 'yeet', lastUpdated: 'Oct 12 3:30 PM', fields: [] }
      form3 = { title: 'Form 3c', id: 'yeet', lastUpdated: 'Oct 22 3:30 PM', fields: [] }
    }
    return { name: folderName, forms: [form1, form2, form3], id: '12345' }
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
