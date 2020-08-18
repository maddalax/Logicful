<script>

    import Footer from 'components/Footer.svelte'
    import Navbar from 'components/Navbar.svelte'
    import FormBuilder from "./features/form/edit/FormBuilder.svelte";
    import FormSidebar from "./features/form/edit/FormSidebar.svelte";
    import FieldEdit from "./features/form/edit/FieldEdit.svelte";
    import FieldEditSidebar from "./features/form/edit/FieldEditSidebar.svelte";
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
        <FormSidebar/>
    </div>
    <div class="main">
        <FormBuilder/>
    </div>
    <div class="right-sidebar">
       <FieldEditSidebar/>
    </div>
</div>

<Footer/>
