<script lang="ts">

  import Footer from 'components/Footer.svelte'
  import Navbar from 'components/Navbar.svelte'
  import FormBuilder from "./features/form/edit/FormBuilder.svelte";
  import FormSidebar from "./features/form/edit/FormSidebar.svelte";
  import FieldEditSidebar from "./features/form/edit/FieldEditSidebar.svelte";
  import Dialog from 'components/Dialog.svelte'
  import {onMount} from "svelte";
  import {subscribe} from "event/EventBus";
  import Sidebar from "./components/Sidebar.svelte";

  let main: any;
  let rightSidebar: any;

  onMount(() => {
    subscribe("show_main_content", (props) => {
      main = props.component;
    });
    subscribe("show_right_sidebar", (props) => {
      rightSidebar = props.component;
    });
  })

</script>

<style>

  .main {
    height: 150vh;
    width: 50%;
    margin-top: 1em;
  }

  .left-sidebar {
    width: 20%;
    height: 25vh;
    margin-left: -13px;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
  }


  .right-sidebar {
    width: 30%;
    height: 25vh;
    margin-right: -30px;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
  }

  #main-container {
    display: flex;
    justify-content: space-between;
  }

</style>

<Navbar/>

<div class="container-fluid clearfix" id="main-container" style="margin-top: 3.9em;">
  <div class="left-sidebar">
    <Sidebar>
      <FormSidebar/>
    </Sidebar>
  </div>
  <div class="main">
    <FormBuilder/>
  </div>
  <div class="right-sidebar">
    <Sidebar>
      <FieldEditSidebar/>
    </Sidebar>
  </div>
</div>

<Dialog/>
<Footer/>
