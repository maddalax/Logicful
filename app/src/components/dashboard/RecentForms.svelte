<script lang="typescript">
  import FormList from 'components/FormList.svelte'
  import type { IForm } from 'models/IForm'

  import { onMount } from 'svelte'

  let forms: IForm[] = []

  onMount(() => {
    forms = getRecentFroms()
  })

  function getRecentFroms() {

    return []
  }
</script>

<div style="width: 100%">
    <h5 class="h5">Recently Viewed Forms</h5>
</div>

<style>
    .h5{
        padding-bottom: 0.2em;
    }
</style>