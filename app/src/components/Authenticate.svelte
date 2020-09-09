<script lang="typescript">
  import { onMount } from 'svelte'
  import { goto } from '@sapper/app'
  import { me } from 'services/AuthService'

  onMount(() => {
    const user = me()
    if (!user.id) {
      goto('/account/login')
    }
  })
</script>
