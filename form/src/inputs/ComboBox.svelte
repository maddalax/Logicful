<script lang="ts">
    import type { IField, LabelValue } from 'entities/IField';
    import { formStore } from 'event/Store';
    import { onMount, afterUpdate } from 'svelte';
    import { LoadState } from 'entities/LoadState';
    import { select } from 'util/Selection';
    import { stringEquals } from 'util/Compare';
    import { dispatchFieldChange } from 'event/FieldEvent';
    import Label from 'inputs/Label.svelte';
    import { isString } from 'guards/Guard';
    import StateSelector from './StateSelector.svelte';
    import { subscribe } from 'event/EventBus';
    export let field: IField;

    let prevOptions = null;

    onMount(setup);

    $: {
        if (prevOptions !== field.options) {
            prevOptions = field.options;
            setup();
        }
    }

    afterUpdate(() => {
        normalizeValue(value);
    });

    async function setup() {
        state = LoadState.Loading;
        try {
            console.log('OTPIONS', field.options);
            if (field.options.type === 'remote') {
                const url = field.options.value;
                const result = await fetch(url);
                const data = await result.json();
                const parsed = [];
                Object.keys(data).forEach((key) => {
                    parsed.push({ value: key, label: data[key] });
                });
                options = parsed;
            } else {
                options = field.options.value;
            }
            normalizeValue(value);
            state = LoadState.Finished;
        } catch (ex) {
            state = LoadState.Failed;
        }
    }

    let state: LoadState = LoadState.Loading;
    let value = '';
    let options: LabelValue[] = [];

    function normalizeValue(v) {
        const option = options.find((w) => stringEquals(w.label, v) || stringEquals(w.value, v));
        if (option && option.value && option.value != value) {
            value = option.value;
        }
    }

    formStore.subscribe((values) => {
        normalizeValue(select(values, field.id) ?? '');
    });
</script>

<!-- svelte-ignore a11y-no-onchange -->
<div>
    <label class="usa-label" for={field.name}>{field.label}</label>
    {#if state === LoadState.Loading}
        <p>Loading...</p>
    {:else if state === LoadState.Failed}
        <span>
            Failed to load this field.
            <button on:click={setup} class="usa-button usa-button--unstyled">Click here to retry.</button>
        </span>
    {:else}
        <select
            class="usa-select"
            name={field.name}
            id={field.id}
            required
            value={value}
            on:change={(e) => {
                dispatchFieldChange(field, e.target.value);
            }}>
            <option value />
            {#each options as option}
                <option value={option.value}>{option.label}</option>
            {/each}
        </select>
    {/if}
</div>
