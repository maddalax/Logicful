<script lang="typescript">
  import { onMount } from 'svelte'
  import { me } from '@app/services/AuthService'

  onMount(() => {
    const user = me()
    if (!user.id) {
     window.location.replace('/account/login')
    }
  })
</script>
