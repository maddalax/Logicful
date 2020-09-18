<script context="module">
  let types: { [key: string]: string } = {}

  export function formatSubmissionItem(column: string, value: any) {
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
    if (type === 'full-name' && isObject(value)) {
      const results = [value?.prefix?.value, value?.first?.value, value?.middle?.value, value?.last?.value]
      return results.filter((r) => r).join(' ')
    }
    if(type === 'file' && isObject(value)) {
      if(!value) {
        return 'No file submitted'
      }
      return `${value.name ?? value.id}, ${value.type}`
    }
    return undefined
  }
</script>

<script lang="typescript">
  import { onMount, tick } from 'svelte'
  import { LoadState } from '@app/models/LoadState'
  import RemoteTable from '@app/components/RemoteTable.svelte'
  import type { TableRow } from '@app/components/models/RemoteTableProps'
  import { randomString, randomStringSmall } from '@app/util/Generate'
  import type { IForm, ISubmission } from '@app/models/IForm'
  import { isObject, isString } from "@app/guards/Guard"
  import { deleteApi, getApi } from '@app/services/ApiService'
  import { getUrlParameter } from '@app/util/Http'
  import Dialog from '@app/components/layout/Dialog.svelte'
  import SubmissionPreview from '@app/features/submissions/SubmissionPreview.svelte'
  import FormPreview from '@app/features/form/live/FormPreview.svelte'
  import { fastClone } from '@app/util/Compare'

  export let formId = ''
  export let form: IForm | undefined = undefined

  let state: LoadState = LoadState.NotStarted
  let container: any
  let filtered: any[] = []
  let hidden = new Set(['submission_id', 'full_submission_data'])
  let preview: ISubmission | undefined = undefined

  async function getRows(): Promise<TableRow[]> {
    formId = getUrlParameter('formId') ?? ''
    if (!formId) {
      return []
    }
    form = await getApi<IForm>(`form/${formId}`)
    const url: { message: string } = await getApi(`form/${formId}/submission`)
    const response = await fetch(url.message)
    let submissions: any[] = []
    if (response.ok) {
      submissions = await response.json()
    }
    const labels: { [key: string]: string } = {}

    if (!form.fields || form.fields?.length === 0) {
      return []
    }

    form.fields.forEach((f) => {
      if (f.name) {
        labels[f.name] = f.label ?? f.name
      }
    })

    const deleted = JSON.parse(sessionStorage.getItem('deleted_submissions') || JSON.stringify({}))

    return submissions
      .filter((d) => !deleted[d.id])
      .map((d) => {
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
        d.details['full_submission_data'] = JSON.stringify(d)
        return d.details
      })
  }

  function sortColumns(columns: string[]) {
    return columns.sort((a, b) => {
      return form.fields.findIndex((f) => f.label === a) - form.fields.findIndex((f) => f.label === b)
    })
  }

  function onRowClick(row: any) {
    const submission = JSON.parse(row['full_submission_data'])
    console.log('SUBM', submission)
    preview = fastClone(submission)
  }

  async function onDelete(rows: any[]) {
    const ids = rows.map((r) => r['submission_id']).filter((r) => r != null)
    await deleteApi(`form/${formId}/submission`, ids)
    const deleted = JSON.parse(sessionStorage.getItem('deleted_submissions') || JSON.stringify({}))
    ids.forEach((i) => {
      deleted[i] = true
    })
    sessionStorage.setItem('deleted_submissions', JSON.stringify(deleted))
  }
</script>

<div class="container-fluid clearfix" id="main-container" style="margin-top: 5em;">
  <div class="main">
    <h1>Submissions</h1>
    <hr />
    <div>
      <RemoteTable 
        defaultSortColumn={"Submission Date"}
        searchPlaceHolder={"Search Anything..."}
        {getRows} {sortColumns} {onDelete} {onRowClick} onFormat={formatSubmissionItem} {hidden} />
    </div>
  </div>
</div>

{#if preview && form}
  <Dialog
    isOpen={true}
    width={'960px'}
    title={`Viewing Submission Details`}
    onClose={async () => {
      console.log('closed')
      preview = undefined
      await tick();
    }}
  >
    <div>
      <FormPreview submission={preview} form={form} mode={'submission_preview'}/>
    </div>
  </Dialog>
{/if}

<style>

</style>
