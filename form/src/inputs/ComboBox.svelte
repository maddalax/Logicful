<script lang="ts">
    import type {IField, LabelValue} from 'models/IField';
    import {onMount} from 'svelte';
    import { LoadState } from 'models/LoadState';
    import {stringEquals, shallowEquals} from 'util/Compare';
    import {subscribeFieldChange} from 'event/FieldEvent';
    import {isString} from 'guards/Guard';
    import {subscribe} from "../event/EventBus";


    export let field: IField;

    let prevOptions = null;

    onMount(async () => {

        subscribe("option_set_modified", (set) => {
            if(set.value === field.options) {
                setup();
            }
        })

        subscribeFieldChange((newField) => {
            if (newField.id === field.id) {
                value = newField.value;
                normalizeValue();
            }
        });
        await setup();
    });

    $: {
        if (!shallowEquals(prevOptions, field.options)) {
            prevOptions = field.options;
            setup();
        }
    }

    async function setup() {
        state = LoadState.Loading;
        try {
            if (field.options.type === 'remote' || isString(field.options) || (field.options.type === 'local' && isString(field.options.value))) {
                const url = field.options.value || field.options;
                const result = await fetch(url);
                const data = await result.json();
                const parsed = [];
                if (field.loadTransformer) {
                    options = field.loadTransformer(data);
                } else {
                    Object.keys(data).forEach((key) => {
                        parsed.push({value: data[key], label: key});
                    });
                    options = parsed;
                }
            } else {
                options = field.options.value;
            }
            normalizeValue();
            state = LoadState.Finished;
        } catch (ex) {
            state = LoadState.Failed;
        }
    }

    let state: LoadState = LoadState.Loading;
    let value = '';
    let options: LabelValue[] = [];

    function normalizeValue() {
        const option = options.find((w) => stringEquals(w.label, value) || stringEquals(w.value, value));
        if (option) {
            value = option.value;
        }
    }
</script>

<!-- svelte-ignore a11y-no-onchange -->
<div>
    <label class="usa-label" for={field.name}>{field.label}</label>
    {#if state === LoadState.Loading}
        <div class="loader"/>
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
                {value}
                on:change={(e) => {
                field.value = e.target.value;
                dispatchFieldChange(field, true);
                field.onChange?.(e.target.value);
            }}>
            <option value/>
            {#each options as option}
                <option value={option.value}>{option.label}</option>
            {/each}
        </select>
        {#if field.helperText}
            <div class="helper-text">
                {@html field.helperText ?? ""}
            </div>
        {/if}
    {/if}
</div>
