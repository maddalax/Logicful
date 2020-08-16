<script>
    import Navbar from "./Navbar.svelte";
    import Footer from "./Footer.svelte";
    import Preloader from "./Preloader.svelte";
    import Sidebar from "./Sidebar.svelte";
    import Content from "./Content.svelte";

    export let name;
</script>

<Navbar/>

    <Preloader/>

    <div class="container-fluid" style="margin-top: 6em">
        <div class="row">
            <Sidebar/>
            <main class="col-md-9 col-lg-10">
                <Content/>
            </main>
        </div>
    </div>




<Footer/>