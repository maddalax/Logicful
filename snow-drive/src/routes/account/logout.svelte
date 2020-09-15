<script lang="typescript">
  import Loader from '@app/components/Loader.svelte'
  import { onMount } from 'svelte'

  function signOut() {
    //@ts-ignore
    if (!window.gapi) {
      setTimeout(signOut, 100)
      return
    }
    //@ts-ignore
    window.gapi.load('auth2', function () {
      //@ts-ignore
      window.gapi.auth2.init()
      //@ts-ignore
      var auth2 = window.gapi.auth2.getAuthInstance()
      setTimeout(() => {
        auth2.signOut().then(function () {
          localStorage.removeItem('token')
          window.location.replace('/account/login')
        })
      }, 500)
    })
  }

  onMount(() => {
    setTimeout(() => {
      signOut()
    }, 500)
  })
</script>

<svelte:head>
  <meta name="google-signin-client_id" content="507014281135-ff3semdge1t7iu6jdi63h3ido0ch4k4q.apps.googleusercontent.com" />
  <script src="https://apis.google.com/js/platform.js" async defer>

  </script>
</svelte:head>

<div style="margin-top: 5em;margin-left:3em">
  <Loader />
  <h3>Signing out... please wait.</h3>
</div>
