<script lang="typescript">
  import { goto } from '@sapper/app'
  import { onMount } from 'svelte'

  onMount(() => {
    goto('/builder/new')
  })
</script>
