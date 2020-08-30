<script context="module">
  export async function preload(page: any, session: any) {
    const { formId } = page.params
    if (!formId) {
      return {}
    }
    const url = `https://logicful-forms.s3.us-west-002.backblazeb2.com/${formId}.json`
    //@ts-ignore
    const res = await this.fetch(url)
    const form = await res.json();
    return { formId, form }
  }
</script>

<script lang="typescript">
  import { onMount, tick } from 'svelte'
  import { LoadState } from 'models/LoadState'
  import Navbar from 'components/Navbar.svelte'
  import Preloader from 'components/Preloader.svelte'
  import RemoteTable from 'components/RemoteTable.svelte'
  import type { TableRow } from 'components/models/RemoteTableProps'
  import { randomString, randomStringSmall } from 'util/Generate'
  import type { IForm } from 'models/IForm'
  import { isString } from 'guards/Guard'

  export let formId = ''
  export let form: IForm

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
    const labels: { [key: string]: string } = {}

    form.fields.forEach((f) => {
      if (f.name) {
        labels[f.name] = f.label ?? f.name
      }
    })

    return submissions.map((d) => {
      Object.keys(d.details).forEach((key) => {
        if (labels[key]) {
          const label = labels[key]
          d.details[label] = d.details[key]
          delete d.details[key]
        }
      })
      return d.details
    });
  }

  function sortColumns(columns : string[]) {
    return columns.sort((a, b) => {
      return form.fields.findIndex(f => f.label === a) - form.fields.findIndex(f => f.label === b)
    });
  }
</script>

<Preloader />

<Navbar />

<div class="container-fluid clearfix" id="main-container" style="margin-top: 3.9em;">
  <div class="main">
    <h1>Submissions</h1>
    <div>
      <RemoteTable {getRows} sortColumns={sortColumns} />
    </div>
  </div>
</div>

<style>

</style>
