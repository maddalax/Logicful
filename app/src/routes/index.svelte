<script lang="typescript">
  import Footer from 'components/Footer.svelte'
  import Navbar from 'components/Navbar.svelte'
  import FormBuilder from 'features/form/edit/FormBuilder.svelte'
  import FormSidebar from 'features/form/edit/FormSidebar.svelte'
  import FieldEditSidebar from 'features/form/edit/FieldEditSidebar.svelte'
  import Dialog from 'components/Dialog.svelte'
  import { onMount } from 'svelte'
  import { subscribe } from 'event/EventBus'
  import Sidebar from 'components/Sidebar.svelte'
  import Preloader from 'components/Preloader.svelte'

  let main: any
  let rightSidebar: any

  onMount(() => {
    main = FormBuilder
    rightSidebar = FieldEditSidebar
    subscribe('show_main_content', (props) => {
      main = props.component
    })
    subscribe('show_right_sidebar', (props) => {
      rightSidebar = props.component
    })
  })
</script>

<Preloader />

<Navbar />

<div class="container-fluid clearfix" id="main-container" style="margin-top: 3.9em;">
  <div class="left-sidebar">
    <Sidebar>
      <FormSidebar />
    </Sidebar>
  </div>
  <div class="main">
    <!--    <LogicAccordion/>-->
    <svelte:component this={main} />
  </div>
  <div class="right-sidebar">
    <Sidebar>
      <svelte:component this={rightSidebar} />
    </Sidebar>
  </div>
</div>

<Dialog />

<style>
  .main {
    height: 100%;
    width: 53%;
    margin-top: 1em;
  }

  .left-sidebar {
    width: 15%;
    max-width: 400px;
    height: 100vh;
    overflow: auto;
    margin-left: -13px;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
  }
  #main-container {
    display: flex;
    justify-content: space-between;
  }

  .right-sidebar {
    width: 32%;
    min-height: 25vh;
    height: 100%;
    margin-right: -30px;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
  }
</style>
