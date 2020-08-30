<script context="module">
  export async function preload(page: any, session: any) {
    const { formId } = page.params
    if (!formId) {
      return {}
    }
    return { formId }
  }
</script>

<script lang="typescript">
  import { onMount, tick } from 'svelte'
  import { LoadState } from 'models/LoadState'
  import Navbar from 'components/Navbar.svelte'
  import Preloader from 'components/Preloader.svelte'
  import RemoteTable from 'components/RemoteTable.svelte'
  import type { TableRow } from 'components/models/RemoteTableProps'
import { randomString } from 'util/Generate';

  export let formId = ''
  let state: LoadState = LoadState.NotStarted
  let container: any
  let submissions: any[] = []
  let filtered: any[] = []

  async function getRows(): Promise<TableRow[]> {
    const local = localStorage.getItem('submissions')!
    if (!local) {
      let response = await fetch(`http://localhost:3000/form/${formId}/submissions`)
      const submissions: any[] = await response.json()
      localStorage.setItem('submissions', JSON.stringify(submissions))
    }
    submissions = JSON.parse(localStorage.getItem('submissions')!)
    return submissions.map((d) => {
      d.details.id = randomString();
      return d.details
    })
  }
</script>

<Preloader />

<Navbar />

<div class="container-fluid clearfix" id="main-container" style="margin-top: 3.9em;">
  <div class="main">
    <h1>Submissions</h1>
    <div>
      <RemoteTable {getRows} />
    </div>
  </div>
</div>

<style>

</style>
