<script>
    import {fade} from 'svelte/transition';
    import FormPreview from "./FormPreview.svelte";
    import FieldConfiguration from "./FieldConfiguration.svelte";

    let editing = false;
</script>


{#if editing}
    <div class="container">
        <div class="row">
            <div class="col">
                <FormPreview onEdit={() => editing = !editing} editing={editing}/>
            </div>
            <div class="col">
                <FieldConfiguration/>
            </div>
        </div>
    </div>
{:else}
    <FormPreview onEdit={() => editing = !editing} editing={editing}/>
{/if}

