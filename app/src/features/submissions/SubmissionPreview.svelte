<script lang="typescript">
  import { isObject, isString } from 'guards/Guard'

  import type { ISubmission } from 'models/IForm'
  import { formatSubmissionItem } from 'routes/form/submissions.svelte'
  import { isEmptyOrNull, isNullString } from 'util/Compare'

  export let submission: ISubmission

  let hidden = ["submission_id"]

  function formatDetail(detail: string) {
    let value = submission.details[detail]
    value = formatSubmissionItem(detail, value) ?? value
    if (isObject(value) || Array.isArray(value)) {
      return JSON.stringify(value, null, 2)
    }
    return value ?? ''
  }
</script>

{#each Object.keys(submission.details).filter(k => !hidden.includes(k)) as d}
  <p><strong>{d ?? ''}</strong></p>
  <p>{formatDetail(d)}</p>
  <hr />
{/each}
<h4><strong>Environment Information</strong></h4>
<p><strong>Browser: </strong>{submission.meta?.env?.browser?.name} {submission.meta?.env?.browser?.version}</p>
<p><strong>OS: </strong> {submission.meta?.env?.os?.name} {submission.meta?.env?.os?.versionName ?? submission.meta?.env?.os?.version}</p>
<p><strong>Platform: </strong> {submission.meta?.env?.platform?.vendor} {submission.meta?.env?.platform?.type}</p>
