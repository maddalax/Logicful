<script lang="ts">
  import Navbar from "./components/Navbar.svelte";
  import Footer from "./components/Footer.svelte";
  import Sidebar from "./features/form/edit/FormSidebar.svelte";
  import Dialog from "components/Dialog.svelte";
  import FormBuilder from "./features/form/edit/FormBuilder.svelte";
  import { dispatch } from "./event/EventBus";
  import OptionSetsList from "./features/form/edit/OptionSetsList.svelte";
  import { onMount } from "svelte";
  import Preloader from "./components/Preloader.svelte";

  export let name: string;

  onMount(() => {});
</script>

<Preloader/>

<Navbar />
<div class="container-fluid" id="main-container" style="margin-top: 3.9em;">
  <div class="row d-flex" style="margin-top: .9em;">
    <div class="col-md-3 col-lg-3">
      <Sidebar />
    </div>
    <div class="col-md-9 col-lg-9" style="margin-top: .7em; ">
      <FormBuilder />
    </div>
  </div>
</div>
<Footer />
<Dialog/>

<style>
  #main-container {
    min-height: 41.5vh;
  }
</style>
