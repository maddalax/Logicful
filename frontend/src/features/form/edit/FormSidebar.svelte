<script>
    import {onMount} from "svelte";
    import Dragula from 'dragula';
    import {dispatch} from "../../../event/EventBus";
    import { flip } from 'svelte/animate';
    import { dndzone } from 'svelte-dnd-action';

    let items = [
        {id: 5, name: "item5"},
        {id: 6, name: "item6"},
        {id: 7, name: "item7"},
        {id: 8, name: "item8"}
    ];

    function handler(e) {
        items = e.detail.items;
    }

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
        dispatch("save_form", {
            status : 'draft'
        })
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
            <div use:dndzone="{{items}}" on:consider={handler} on:finalize={handler}>
                {#each items as item(item.id)}
                    <div style="margin-top: 1em" animate:flip="{{duration: 1000}}">
                        {item.name}
                    </div>
                {/each}
            </div>
        </ul>
    </div>
</nav>