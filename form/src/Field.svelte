<script lang="ts">
    import type { IField } from './entities/IField';
    export let field: IField;
    import TextInput from './inputs/TextInput.svelte';
    import { onMount, beforeUpdate, afterUpdate } from 'svelte';
    import ComboBox from './inputs/ComboBox.svelte';
    import { LoadState } from './entities/LoadState';
    import { FieldValueLoader } from './loader/FieldValueLoader';
    import Address from './inputs/Address.svelte';
    import { subscribeFieldChange, dispatchFieldChange } from './event/FieldEvent';
    import { set } from './util/Selection';
    import { shallowEquals } from 'util/Compare';
    import { dispatch } from 'event/EventBus';
    import TextArea from 'inputs/TextArea.svelte';
    import Spacer from 'inputs/Spacer.svelte';
    import { richTextBlocksToHtml } from 'inputs/formatters/RichTextOutputFormatter';
    import formStore from 'store/FormStore';
    import RichTextDisplay from 'inputs/RichTextDisplay.svelte';

    let state = LoadState.NotStarted;
    let value: any;
    let lastValue: any;

    onMount(load);

    async function load() {
        lastValue = field.value;
        if (field.value) {
            console.log('V', field.value);
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

<div>
    {#if field.type === 'address'}
        <Address {field} {value} />
    {/if}
    {#if field.type === 'string'}
        <TextInput {field} />
    {/if}
    {#if field.type === 'number'}
        <TextInput {field} type={'number'} />
    {/if}
    {#if field.type === 'combobox'}
        <ComboBox {field} />
    {/if}
    {#if field.type === 'block'}
        <RichTextDisplay {field} />
    {/if}
    {#if field.type === 'block-editor'}
        <TextArea {field} />
    {/if}
    {#if field.type === 'spacer'}
        <Spacer {field} />
    {/if}
</div>
