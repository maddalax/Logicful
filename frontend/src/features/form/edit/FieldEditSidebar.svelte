<script lang="ts">
    import {onMount} from "svelte";
    import FieldEdit from "./FieldEdit.svelte";
    import type { IField } from "models/IField";
    import {subscribe} from "event/EventBus";
    import type {IForm} from "models/IForm";
    import { fade, slide } from "svelte/transition";


    let form: IForm;
    let active : number = -1;

    onMount(() => {
        subscribe("edit_field", props => {
            console.log(props);
            form = props.form;
            active = props.active;
        })
    })
</script>

<nav
        id="fieldEditMenu"
        class="d-md-block sidebar collapse"
        style="background-color: #f5f9fe;"
>
    <div style="margin-left: .5em">
        <ul class="nav flex-column" id="blocks">
            {#if active !== -1}
                <div class="col-md no-gutters">
                    {#each form.fields as field, i}
                        {#if i === active}
                            <div transition:slide={{ duration: 500 }}>
                                <FieldEdit field={field} />
                            </div>
                        {/if}
                    {/each}
                </div>
            {:else}
                <div style="margin-left: 1em">
                    <h4>Field Configuration</h4>
                    <p>Select a field to modify its configuration.</p>
                </div>
            {/if}
        </ul>
    </div>
</nav>

<style>
    #fieldEditMenu {
        padding-bottom: 3em;
        padding-top: 1em;
        min-height: 100vh;
    }
</style>
