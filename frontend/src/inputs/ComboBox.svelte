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
    import Fuse from "fuse.js";
    import formStore from "../store/FormStore";
    import Label from 'inputs/Label.svelte'


    let initialized = false;
    let dropdownId;
    let open = false;
    let fuse: Fuse<{}>;
    let query = ''

    export let field: IField;

    let prevOptions = null;
    let lastFieldId = ''

    onMount(async () => {

        subscribe("show_field_config", (props) => {
            value = '';
            options = []
            setup();
        })

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

    function createFuse(): Fuse<{}> {
        if(!options) {
            return new Fuse([]);
        }
        options = options.filter(w => isString(w.value));
        return new Fuse(options, {
            keys: ['label', 'value'],
        });
    }

    async function setup() {
        state = LoadState.Loading;
        options = [];
        try {
            if (field.options?.type === 'remote' || isString(field.options) || (field.options?.type === 'local' && isString(field.options.value))) {
                const url = field.options.value || field.options;
                const result = await fetch(url);
                const data = await result.json();
                if(!data) {
                    return;
                }
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
            filtered = options;
            fuse = createFuse();
            normalizeValue();
            state = LoadState.Finished;
        } catch (ex) {
            console.log(ex);
            options = [];
            state = LoadState.Failed;
        }
    }

    let state: LoadState = LoadState.Loading;
    let value = '';
    let options: LabelValue[] = [];
    let filtered: LabelValue[] = []

    function normalizeValue() {
        const option = options?.find((w) => stringEquals(w.label, value) || stringEquals(w.value, value));
        if (option) {
            value = option.value ?? '';
        }
    }

    function select(option : LabelValue) {
        console.log("SELECT", option);
        value = option.value;
        field.value = option.value;
        dispatchFieldChange(field, true);
        field.onChange?.(e.target.value);
        open = false;
    }

    function onBodyClick() {
        open = false;
    }


    function onSearch(e) {
        if(options.length === 0) {
            filtered = options;
        }
        else if (query === '') {
            filtered = options;
        } else {
            const result = fuse.search(query);
            filtered = result.map((r) => r.item);
        }
    }

    function onKeyDown(e) {
      if(e.key === 'ArrowDown') {
          const options = document.getElementById(`${field.id}-combobox-options`);
          if(options.childNodes.length === 0) {
              return;
          }
          options.childNodes[0].focus();
          setTimeout(() => {
              options.scrollTop = 0;
          }, 50)
      }
    }

    function inputOnKeyDown(e) {
        if(e.key === 'ArrowDown') {
            if(open) {
                const input = document.getElementById(`${field.id}-search-input`);
                input.focus();
            } else {
                open = true;
            }
        }
    }

    function optionOnKeyPress(e, option) {
        if(e.key === 'Enter') {
            select(option)
        }
    }

</script>

<style>
    .search {
        border: 0.0625rem solid #e6e6e6;
        border-radius: 0;
        margin-top: -9px;
    }

</style>

<svelte:body on:click={onBodyClick}/>

<Label {field} />

{#if state === LoadState.Loading}
    <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
    </div>
{:else if state === LoadState.Failed}
    <p>Failed to load.</p>
{:else}
    <div class="form-group dropdown">
        <input class="form-select" readonly on:click|stopPropagation={() => open = !open} placeholder={field.label} on:keydown={inputOnKeyDown} value={options?.find(w => w.value === value)?.label ?? ''}/>
        {#if filtered != null}
            <div class="dropdown-menu" class:show={open}>
                <input class="form-control search" id={`${field.id}-search-input`} placeholder="Search..." bind:value={query} on:keypress={onSearch} on:keydown={onKeyDown} on:click|stopPropagation/>
                <div style="max-height: 200px; overflow: auto" id={`${field.id}-combobox-options`}>
                    {#each filtered as option, i}
                        <div class="dropdown-item" tabindex={0} on:keypress={(e) => optionOnKeyPress(e, option)} on:click={() => select(option)}>{option.label}</div>
                    {/each}
                </div>
            </div>
        {/if}
    </div>
{/if}


