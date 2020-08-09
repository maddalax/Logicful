<script lang="ts">
    import { onMount } from 'svelte';
    import Field from 'Field.svelte';
    import { fields } from 'exampleForm';
    import type { OptionSet } from 'entities/OptionSet';
    import type { set } from 'util/Selection';

    let sets: OptionSet[] = [];

    onMount(async () => {
        const response = await fetch(
            'https://gist.githubusercontent.com/MaddoxDevelopment/11f3de2a8435228f5bd4d5bb387a943c/raw/b63725ad2111491b78025251afe30f8cf7f28a8a/option_sets.json',
        );
        const data = await response.json();
        sets = data;
    });
</script>

<div class="usa-accordion">
    {#each sets as set}
        <div style="margin-top: 1em">
            <h2 class="usa-accordion__heading">
                <button class="usa-accordion__button" aria-controls={set.name}>{set.name}</button>
            </h2>
            <div id={set.name} class="usa-accordion__content usa-prose">
                <Field
                    field={{ id: `${set.name}-type`, type: 'combobox', value: set.type, options: { type: 'local', value: [{ label: 'Inline', value: 'inline' }, { label: 'Remote', value: 'remote' }] }, name: 'type', label: 'Type' }} />

                <Field field={{ id: `${set.name}-url`, type: 'string', value: set.value, name: 'url', label: 'Url' }} />
            </div>

        </div>
    {/each}

</div>
