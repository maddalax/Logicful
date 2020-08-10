<script lang="ts">
    import type { DropdownButtonAction } from './models/ComponentProps';

    export let label : string
    export let actions: DropdownButtonAction[] = [];

    let showing = false;

    function show() {
        showing = true;
    }

    function hide() {
        showing = false;
    }
</script>

<style>
    .dropdown {
        position: relative;
        display: inline-block;
    }

    .dropdown-content {
        display: none;
        position: absolute;
        background-color: #f2f2f2;
        min-width: 150px;
        box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
        border-radius: 0.25em;
        z-index: 1;
    }

    /* Links inside the dropdown */
    .dropdown-content button {
        color: black;
        padding: 12px 16px;
        border-radius: 0.25em;
        text-decoration: none;
        display: block;
    }

    /* Change color of dropdown links on hover */
    .dropdown-content button:hover {
        background-color: #ddd;
    }

    /* Show the dropdown menu (use JS to add this class to the .dropdown-content container when the user clicks on the dropdown button) */
    .show {
        display: block;
    }
</style>

<div class="dropdown">
    <button class="usa-button" style="min-width: 150px" on:mouseover={show} on:mouseout={hide}>{label}</button>
    <div class="dropdown-content" class:show={showing} on:mouseover={show} on:mouseout={hide}>
        {#each actions as action}
            <button class="usa-button usa-button--unstyled" style="width: 100%" on:click={action.onClick}>{action.label}</button>
        {/each}
    </div>
</div>
