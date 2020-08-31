<script context="module">
  export async function preload(page: any, session: any) {
    const { formId } = page.params
    if (!formId) {
      return {}
    }
    const url = `https://json-data.s3.us-west-002.backblazeb2.com/${formId}.json`
    //@ts-ignore
    const res = await this.fetch(url)
    const form = await res.json();
    return { formId, form }
  }
</script>

<script lang="typescript">
  import { onMount, tick } from 'svelte'
  import { LoadState } from 'models/LoadState'
  import RemoteTable from 'components/RemoteTable.svelte'
  import type { TableRow } from 'components/models/RemoteTableProps'
  import { randomString, randomStringSmall } from 'util/Generate'
  import type { IForm } from 'models/IForm'
  import { isObject, isString } from 'guards/Guard'

  export let formId = ''
  export let form: IForm

  let state: LoadState = LoadState.NotStarted
  let container: any
  let types : {[key : string] : string} = {}
  let filtered: any[] = []

  async function getRows(): Promise<TableRow[]> {
    let response = await fetch(`http://localhost:3000/form/${formId}/submissions`)
    const submissions: any[] = await response.json()
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
          types[label] = form.fields.find(w => w.label === label)?.type ?? '';
          delete d.details[key]
        }
      })
      d.details["Submission Date"] = new Date(d.createTime).toLocaleString();
      d.details["submission_id"] = d.id;
      return d.details
    });
  }

  function sortColumns(columns : string[]) {
    return columns.sort((a, b) => {
      return form.fields.findIndex(f => f.label === a) - form.fields.findIndex(f => f.label === b)
    });
  }

  function format(column : string, value : any) {
    const type = types[column];
    if(type === 'address' && isObject(value)) {
      let result = ``;
      const results = [value?.address1?.value, value?.address2?.value, value?.state?.value, value?.city?.value, value?.zip?.value]
      return results.filter(r => r).join(" ");
    }
    return undefined;
  }

  async function onDelete(rows : any[]) {
    const ids = rows.map(r => r["submission_id"]).filter(r => r != null);
    const result = await fetch(`http://localhost:3000/form/${formId}/submissions/delete`, {
      method : 'DELETE',
      body : JSON.stringify(ids),
      headers : {
        'Content-Type' : 'application/json'
      }
    });
    if(!result.ok) {
      const body = await result.json();
      throw new Error(body.message);
    }
  }

</script>


<div class="container-fluid clearfix" id="main-container" style="margin-top: 3.9em;">
  <div class="main">
    <h1>Submissions</h1>
    <div>
      <RemoteTable {getRows} sortColumns={sortColumns} onDelete={onDelete} onFormat={format}/>
    </div>
  </div>
</div>

<style>

</style>
