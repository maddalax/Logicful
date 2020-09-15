<script lang="typescript">
  import { onMount } from 'svelte'
  import { me } from '@app/services/AuthService'
import Navbar from './layout/Navbar.svelte'
import Preloader from './layout/Preloader.svelte'


  onMount(() => {
    const user = me()
    if (!user.id) {
     window.location.replace('/account/login')
    }
  })
</script>

<Navbar/>
<Preloader/>
<slot></slot>
