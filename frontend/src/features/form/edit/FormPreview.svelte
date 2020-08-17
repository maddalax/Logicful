<script lang="ts">
    import {onMount} from "svelte";
    import {subscribe} from "../../../event/EventBus";

    export let onEdit = () => any;
    export let editing : boolean

</script>


<style>
    .mb-3:hover {
        background-color: #f0f0f0;
        cursor: pointer;
        border-radius: 0.45rem;
    }

    .hovered {
        background-color: #f0f0f0;
        cursor: pointer;
        border-radius: 0.45rem;

    }
</style>

<div id="form-preview">
    <h4>Form Preview</h4>
    <div class="mb-3" class:hovered={editing} on:click={onEdit}>
        <div style="padding: .85em 1em; border-radius: 1em">
            <label class="form-label">Another label</label>
            <input type="text" class="form-control"  placeholder="Another input placeholder">
        </div>
    </div>
    <div class="mb-3" class:hovered={editing} on:click={onEdit}>
        <div style="padding: .85em 1em; border-radius: 1em">
            <label class="form-label">Another input</label>
            <input type="text" class="form-control" placeholder="Another input placeholder">
        </div>
    </div>
</div>