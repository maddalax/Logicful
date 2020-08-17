<script lang="ts">
    import type { IField } from 'models/IField';
    export let field: IField;
    import TextInput from 'inputs/TextInput.svelte';
    import { onMount } from 'svelte';
    import ComboBox from 'inputs/ComboBox.svelte';
    import { LoadState } from 'models/LoadState';
    import { FieldValueLoader } from 'loader/FieldValueLoader';
    import Address from 'inputs/Address.svelte';
    import { dispatchFieldChange } from 'event/FieldEvent';
    import TextArea from 'inputs/TextArea.svelte';
    import Spacer from 'inputs/Spacer.svelte';
    import formStore from 'store/FormStore';
    import { fade } from 'svelte/transition';
    import RichTextDisplay from 'inputs/RichTextDisplay.svelte';

    let state = LoadState.NotStarted;
    let value: any;
    let lastValue: any;

    onMount(load);

    function select() {
        if(field.configTarget) {
           return;
        }
        field.hovered = !field.hovered;
        dispatchFieldChange(field, true);
    }

    async function load() {
        lastValue = field.value;
        if (field.value) {
            state = LoadState.Loading;
            try {
                const loader = new FieldValueLoader();
                const result = await loader.load(field);
                value = result;
                field.value = result;
                formStore.set(field);
                if (result != null) {
                    dispatchFieldChange(field, false);
                }
                state = LoadState.Finished;
            } catch (e) {
                console.error(e);
                state = LoadState.Failed;
            }
        }
    }
</script>

<style>
    .wrapper:hover {
        background-color: #f0f0f0;
        cursor: pointer;
    }

    .selected {
        background-color: #f0f0f0;
        cursor: pointer;
    }
</style>

<div on:click={select} style="margin-top: .5em" transition:fade={{duration: 500 }} class:wrapper={!field.configTarget} class:selected={field.hovered}>
    <div style="padding: .85em 1em; border-radius: 1em;">
    {#if field.type === 'address'}
        <Address {field} {value} />
    {:else if field.type === 'string'}
        <TextInput {field} />
    {:else if field.type === 'number'}
        <TextInput {field} type={'number'} />
    {:else if field.type === 'combobox'}
        <ComboBox {field} />
    {:else if field.type === 'block'}
        <RichTextDisplay {field} />
    {:else if field.type === 'block-editor'}
        <TextArea {field} />
    {:else if field.type === 'spacer'}
        <Spacer {field} />
    {/if}
    </div>
</div>
