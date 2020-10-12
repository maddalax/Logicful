<script lang="typescript">
  import FormList from '@app/features/folders/FormList.svelte'
  import type { IForm } from '@app/models/IForm'

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
