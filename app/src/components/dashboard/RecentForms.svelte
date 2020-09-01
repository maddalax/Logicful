<script lang="typescript">
  import FormList from 'components/FormList.svelte'
  import type { IForm } from 'models/IForm'

  import { onMount } from 'svelte'

  let forms: IForm[] = []

  onMount(() => {
    forms = getRecentFroms()
  })

  function getRecentFroms() {
    let form1: IForm = { title: 'Form 1', id: 'yeet', lastUpdated: 'Oct 2 3:30 PM', fields: [] }
    let form2: IForm = { title: 'Form 2', id: 'yeet', lastUpdated: 'Oct 12 3:30 PM', fields: [] }
    let form3: IForm = { title: 'Form 3', id: 'yeet', lastUpdated: 'Oct 22 3:30 PM', fields: [] }

    return [form1, form2, form3]
  }
</script>

<div style="width: 100%">
    <h5 class="h5">Recently Viewed Forms</h5>
    <FormList {forms} />
</div>

<style>
    .h5{
        padding-bottom: 0.2em;
    }
</style>