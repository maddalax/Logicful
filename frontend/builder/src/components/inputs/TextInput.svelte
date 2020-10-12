<script lang="typescript">
    export let label: string = "";
    export let rows: number = 0;
    export let help: string = "";
    export let value: string = "";
    export let onChange: (value: string) => any;
</script>

{#if label}
    <label
        for="about"
        class="block text-sm font-medium leading-5 text-gray-700">
        {label}
    </label>
{/if}
<div class="mt-1 rounded-md shadow-sm">
    {#if rows === 0}
        <input
            type="text"
            id="about"
            {rows}
            {value}
            on:change={(e) => onChange(e.target.value)}
            class="form-textarea block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
    {:else}
        <textarea
            id="about"
            {rows}
            {value}
            on:change={(e) => onChange(e.target.value)}
            class="form-textarea block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
    {/if}
</div>
{#if help}
    <p class="mt-2 text-sm text-gray-500">{help}</p>
{/if}
