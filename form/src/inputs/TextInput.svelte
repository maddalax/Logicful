<script lang="ts">
    import type { IField } from 'entities/IField';
    import { dispatchFieldChange, subscribeFieldChange } from 'event/FieldEvent';
    import { select } from 'util/Selection';
    import Label from './Label.svelte';
    import { onMount } from 'svelte';
    import type Address from './Address.svelte';
    import formStore from 'store/FormStore';

    export let field: IField;
    export let value = '';
    export let type = 'text';

    onMount(() => {
        value = formStore.get(field.configTarget ?? field.id) ?? '';

        subscribeFieldChange((newField) => {
            if (newField.id === field.id) {
                value = newField.value ?? '';
            }
        });
    });
</script>

<div>
    <Label {field} />
    <input
        on:input={(e) => {
            field.value = e.target.value ?? '';
            dispatchFieldChange(field, true);
            field.onChange?.(e.target.value);
        }}
        class={field.properties?.className ?? 'usa-input usa-input'}
        id={field.id}
        {value}
        name={field.name}
        {type} />
    {#if field.helperText}
        <div class="helper-text">
            {@html field.helperText ?? ''}
        </div>
    {/if}
</div>
