<script lang="typescript">
  import { onMount, tick } from 'svelte'
  import { LoadState } from 'models/LoadState'
  import RemoteTable from 'components/RemoteTable.svelte'
  import type { TableRow } from 'components/models/RemoteTableProps'
  import { randomString, randomStringSmall } from 'util/Generate'
  import type { IForm } from 'models/IForm'
  import { isObject, isString } from 'guards/Guard'
  import { deleteApi, getApi } from 'services/ApiService'
  import { getUrlParameter } from 'util/Http'

  export let formId = ''
  export let form: IForm

  let state: LoadState = LoadState.NotStarted
  let container: any
  let types: { [key: string]: string } = {}
  let filtered: any[] = []
  let hidden = new Set(['submission_id'])

  async function getRows(): Promise<TableRow[]> {
    formId = getUrlParameter('formId') ?? ''
    if (!formId) {
      return []
    }
    form = await getApi<IForm>(`form/${formId}`)
    const url: {message : string} = await getApi(`form/${formId}/submission`)
    const response = await fetch(url.message)
    let submissions = []
    if(response.ok) {
      submissions = await response.json();
    }
    const labels: { [key: string]: string } = {}

    if(!form.fields || form.fields?.length === 0) {
      return []
    }

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
          types[label] = form.fields.find((w) => w.label === label)?.type ?? ''
          delete d.details[key]
        } else {
          const fieldByName = form.fields.find((w) => w.name === key)?.type
          if (fieldByName) {
            types[key] = fieldByName
          }
        }
      })
      d.details['Submission Date'] = new Date(d.creationDate).toLocaleString()
      d.details['submission_id'] = d.id
      return d.details
    })
  }

  function sortColumns(columns: string[]) {
    return columns.sort((a, b) => {
      return form.fields.findIndex((f) => f.label === a) - form.fields.findIndex((f) => f.label === b)
    })
  }

  function format(column: string, value: any) {
    const type = types[column]
    if (type === 'address' && isObject(value)) {
      let result = ``
      const results = [value?.address1?.value, value?.address2?.value, value?.state?.value, value?.city?.value, value?.zip?.value]
      return results.filter((r) => r).join(' ')
    }
    if (type === 'checkbox-group' && isObject(value)) {
      return Object.values(value)
        .filter((v) => v != null)
        .join(', ')
    }
    if (type === 'radio-group' && isObject(value)) {
      return Object.values(value).find((v) => v != null)
    }
    return undefined
  }

  async function onDelete(rows: any[]) {
    const ids = rows.map((r) => r['submission_id']).filter((r) => r != null)
    await deleteApi(`form/${formId}/submission`, ids)
  }
</script>

<div class="container-fluid clearfix" id="main-container" style="margin-top: 5em;">
  <div class="main">
    <h1>Submissions</h1>
    <hr />
    <div>
      <RemoteTable {getRows} {sortColumns} {onDelete} onFormat={format} {hidden} />
    </div>
  </div>
</div>

<style type="text/scss">

</style>
