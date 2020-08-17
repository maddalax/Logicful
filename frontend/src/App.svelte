<script lang="ts">
    import Navbar from "./components/Navbar.svelte";
    import Footer from "./components/Footer.svelte";
    import Preloader from "./components/Preloader.svelte";
    import Sidebar from "./features/form/edit/FormSidebar.svelte";
    import FormBuilderOld from "./features/form/edit/FormBuilderOld.svelte";
    import Dialog from 'components/Dialog.svelte';


    export let name: string;
</script>

<Navbar/>

    <Preloader/>

    <div class="container-fluid" style="margin-top: 6em">
        <div class="row">
            <Sidebar/>
            <main class="col-md-9 col-lg-10">
                <FormBuilderOld/>
            </main>
        </div>
    </div>

<Dialog />
<Footer/>