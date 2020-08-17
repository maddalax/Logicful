<script lang="ts">
    import Navbar from "./components/Navbar.svelte";
    import Footer from "./components/Footer.svelte";
    import Sidebar from "./features/form/edit/FormSidebar.svelte";
    import Dialog from 'components/Dialog.svelte';
    import FormBuilder from "./features/form/edit/FormBuilder.svelte";


    export let name: string;
</script>

<style>
    #main-container {
       min-height: 41.5vh;
    }
</style>

<Navbar/>


    <div class="container-fluid" id="main-container" style="margin-top: 3.9em;">
        <div class="row" style="margin-top: .9em;">
            <Sidebar/>
            <div class="col-md-9 col-lg-10" style="margin-top: .7em;">
                <FormBuilder/>
            </div>
        </div>
    </div>
    
<Dialog />
<Footer/>