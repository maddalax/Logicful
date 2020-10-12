<script lang="typescript">
    import { onMount } from "svelte/internal";

    import { stores } from "../store";

    export let id: string;
    let selected = false;

    onMount(() => {
        stores.selectedField.subscribe((s) => {
            selected = s === id;
        });
    });

    function select() {
        stores.selectedField.set(id);
    }
</script>

<div
    class="sm:col-span-6 hover:bg-gray-200 p-3"
    on:click|preventDefault={select}
    class:bg-gray-200={selected}>
    <slot />
</div>
