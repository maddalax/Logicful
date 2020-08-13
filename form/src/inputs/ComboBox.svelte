<script lang="ts">
    import type {IField, LabelValue} from 'models/IField';
    import {afterUpdate, onMount} from 'svelte';
    import { LoadState } from 'models/LoadState';
    import {stringEquals, shallowEquals} from 'util/Compare';
    import {subscribeFieldChange} from 'event/FieldEvent';
    import {isString} from 'guards/Guard';
    import {subscribe} from "../event/EventBus";
    import {dispatchFieldChange} from "../event/FieldEvent";
    import {randomString} from "../util/Generate";
    let elementId;

    export let field: IField;

    let prevOptions = null;

    onMount(async () => {

        elementId = randomString();

        subscribe("option_set_modified", (set) => {
            if(set.value === field.options) {
                setup();
            }
            if(field.configTarget) {
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

    afterUpdate(() => {
        if(state === LoadState.Finished) {
            new Choices(document.getElementById(elementId));
        }
    })

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
                class="form-control"
                data-trigger
                name="choices-single-default"
                id={elementId}
                placeholder="This is a search placeholder"
        >
            <option value="">This is a placeholder</option>
            <option value="Choice 1">Choice 1</option>
            <option value="Choice 2">Choice 2</option>
            <option value="Choice 3">Choice 3</option>
        </select>
        {#if field.helperText}
            <div class="helper-text">
                {@html field.helperText ?? ""}
            </div>
        {/if}
    {/if}
</div>
