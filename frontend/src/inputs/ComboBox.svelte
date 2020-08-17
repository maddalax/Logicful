<script lang="ts">
    import type {IField, LabelValue} from 'models/IField';
    import {afterUpdate, onMount} from 'svelte';
    import {LoadState} from 'models/LoadState';
    import {stringEquals, shallowEquals} from 'util/Compare';
    import {subscribeFieldChange} from 'event/FieldEvent';
    import {isString} from 'guards/Guard';
    import {randomString} from "../util/Generate";
    import Choices from 'choices.js'
    import {dispatchFieldChange} from "../event/FieldEvent";
    import {subscribe} from "../event/EventBus";


    let choices : Choices;
    let initialized = false;
    let dropdownId;

    export let field: IField;

    let prevOptions = null;

    onMount(async () => {
        dropdownId = `${field.name}-${randomString()}`;
        initialized = false;
        subscribe("option_set_modified", (set) => {
            if (set.value === field.options) {
                setup();
            }
            if (field.configTarget) {
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
        if(!document.getElementById(dropdownId)) {
            setTimeout(setup, 100);
            return;
        }
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
            if(choices == null) {
                choices = new Choices(document.getElementById(dropdownId), {
                    searchPlaceholderValue: 'Search Options...',
                    callbackOnInit: () => {
                        initialized = true;
                    }
                });
            }
            console.log("O", options);
            choices.clearChoices();
            choices.setChoices(options, 'value',
                'label', true);
            normalizeValue();
            state = LoadState.Finished;
        } catch (ex) {
            console.log(ex);
            state = LoadState.Failed;
        }
    }

    let state: LoadState = LoadState.Loading;
    let value = '';
    let options: LabelValue[] = [];

    function normalizeValue() {
        if(!choices) {
            return;
        }
        const option = options.find((w) => stringEquals(w.label, value) || stringEquals(w.value, value));
        if (option) {
            //value = option.value;
            choices.setChoiceByValue(option.value)
        }
    }
</script>

<!-- svelte-ignore a11y-no-onchange -->
<div>
    <label class="usa-label" for="{dropdownId}">{field.label}</label>
    {#if !initialized}
        <div class="loader"/>
    {/if}
    <div>
        <select
                style="{initialized ? 'display: unset' : 'display: none'}"
                class="form-control"
                id={dropdownId}
                required
                data-trigger
                name="choices-single-default"
                on:change={
(e) => {
                    field.value = e.target.value;
                    dispatchFieldChange(field, true);
                    field.onChange?.(e.target.value);
            }}>
        </select>
    </div>
    {#if field.helperText}
        <div class="helper-text">
            {@html field.helperText ?? ""}
        </div>
    {/if}
</div>
