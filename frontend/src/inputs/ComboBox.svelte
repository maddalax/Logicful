<script lang="ts">
    import type {IField, LabelValue} from 'models/IField';
    import {afterUpdate, onMount, tick} from 'svelte';
    import {LoadState} from 'models/LoadState';
    import {stringEquals, shallowEquals} from 'util/Compare';
    import {subscribeFieldChange} from 'event/FieldEvent';
    import {isString} from 'guards/Guard';
    import {randomString} from "../util/Generate";
    import {dispatchFieldChange} from "../event/FieldEvent";
    import {subscribe} from "../event/EventBus";


    let initialized = false;
    let dropdownId;
    let open = false;

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
                value = newField.value ?? '';
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
            field.options = {
                type : 'remote',
                value : 'https://gist.githubusercontent.com/mshafrir/2646763/raw/8b0dbb93521f5d6889502305335104218454c2bf/states_hash.json'
            }
            if (field.options?.type === 'remote' || isString(field.options) || (field.options?.type === 'local' && isString(field.options.value))) {
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
                options = field.options?.value;
            }
            console.log("OPTIOONS", options)
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
        const option = options?.find((w) => stringEquals(w.label, value) || stringEquals(w.value, value));
        if (option) {
            value = option.value ?? '';
        }
    }

    function select(option : LabelValue) {
        test = option.value;
        open = false;
    }

    let test = ''
</script>

<style>
    .dropdown {
        position: absolute;
    }

    .search {
        border: 0.0625rem solid #e6e6e6;
        border-radius: 0;
        margin-top: -9px;
    }

</style>

<div class="dropdown">
    <input class="form-select" on:click={() => open = true} placeholder="Select State" value={test}/>
    {#if options != null}
        <div class="dropdown-menu" class:show={open}>
            <input class="form-control search" placeholder="Search..."/>
            <div style="max-height: 200px; overflow: auto">
                {#each options as option}
                    <a class="dropdown-item" href="javascript:void(0)" on:click={() => select(option)}>{option.label}</a>
                {/each}
            </div>
        </div>
    {/if}
</div>
