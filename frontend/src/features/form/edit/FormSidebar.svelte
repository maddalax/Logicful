<script>
    import {onMount} from "svelte";
    import Dragula from 'dragula';
    import {dispatch} from "../../../event/EventBus";

    onMount(() => {
        Dragula([document.querySelector("#blocks"), document.querySelector("#form-preview")], {
            copy : true
        }).on('drop', function (el) {
            dispatch("block_dropped", {
                type : el.id
            });
            el.innerHTML = ''
            el.style.display = 'none'
        })
    })

    function saveDraft() {
        localStorage.setItem("form", JSON.stringify(form));
    }

    function saveAndPublish() {

    }
</script>

<style>
    #sidebarMenu {
        padding-bottom: 3em;
        padding-top: 1em;
    height: 75vh;
    }

    .block {
        margin-bottom: 1em;
    }

    .save-button{
        width: 90%;
    }
</style>


<nav id="sidebarMenu" class="col-md-3 col-lg-2 col-sm d-md-block sidebar collapse" style="background-color: #f5f9fe;">
    <div class="position-sticky">
        <ul class="nav flex-column" id="blocks">
            <div class="block align-items-center">
                <button class="btn btn-tertiary animate-up-2 ml-2 save-button" on:click={saveDraft}>Save</button>
             </div>
            <div class="block" id="text-input">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                Text Input
            </div>
            <div class="block">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                Add Spacer
            </div>
        </ul>
    </div>
</nav>