<script lang="ts">
    import Navbar from "./components/Navbar.svelte";
    import Footer from "./components/Footer.svelte";
    import Preloader from "./components/Preloader.svelte";
    import Sidebar from "./features/form/edit/FormSidebar.svelte";
    import FormBuilderOld from "./features/form/edit/FormBuilder.svelte";
    import Dialog from 'components/Dialog.svelte';


    export let name: string;
</script>

<style>
    #main-container {
       margin-top: 6em;
       min-height: 41.5vh;
    }
</style>

<Navbar/>

    <Preloader/>

    <div class="container-fluid" id="main-container" style="margin-top: 6em;">
        <div class="row">
            <Sidebar/>
            <main class="col-md-9 col-lg-10">
                <FormBuilderOld/>
            </main>
        </div>
    </div>

<Dialog />
<Footer/>