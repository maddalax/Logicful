<script lang="typescript">
    import TextInput from "./components/inputs/TextInput.svelte";

    export let id: string;
    export let type: "text" | "" = "";

    function onChange(value: any) {
        
    }
</script>

{#if type === 'text'}
    <TextInput {onChange} />
{/if}
