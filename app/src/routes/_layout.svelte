<script context="module">
  import { setConfig } from 'store/ConfigStore'
  export const preload = (page: any, session: any) => {
    setConfig('API_ENDPOINT', session['API_ENDPOINT'])
  }
</script>

<script>
  import { stores } from '@sapper/app'
  import Footer from 'components/layout/Footer.svelte'
  import Navbar from 'components/layout/Navbar.svelte'
  import Preloader from 'components/layout/Preloader.svelte'
  import Dialog from '../components/layout/Dialog.svelte'
  import '../scss/pixel.scss'
  import { dispatch } from 'event/EventBus'
  import Authenticate from 'components/Authenticate.svelte'

  // You may not want to use `segment`, but it is passed for the time being and will
  // create a warning if not expected: https://github.com/sveltejs/sapper-template/issues/210
  // https://github.com/sveltejs/sapper/issues/824
  export let segment: string = ''
  // Silence unused export property warning
  if (segment) {
  }

  const { page, preloading, session } = stores()

  page.subscribe(({ path, params, query }: any) => {
    dispatch('page_change', {
      path,
      params,
      query,
    })
  })

  let path: string
  $: path = $page.path.slice(1)
</script>

<svelte:head>
  <title>{path ? path.charAt(0).toUpperCase() + path.slice(1) : 'Index'}</title>
</svelte:head>

{#if path === 'form/preview' || path === 'account/register' || path === 'account/login'}
  <slot />
{:else}
  <Authenticate />
  <Preloader />
  <Navbar />
  <slot />

  <!--<Footer />-->

  <Dialog />
{/if}

<style type="text/scss">

</style>
