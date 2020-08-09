<script lang="ts">
    import type { IField } from 'entities/IField';
    import { formStore } from 'event/Store';
    import { dispatchFieldChange } from 'event/FieldEvent';
    import { select } from 'util/Selection';
    import Label from './Label.svelte';
    import { onMount } from 'svelte';
    import type Address from './Address.svelte';

    export let field: IField;
    export let value = '';

    onMount(() => {
        formStore.subscribe((values) => {
            value = select(values, field.id) ?? '';
        });
    });
</script>

<div>
    <Label {field} />
    <input
        on:input={(e) => {
            dispatchFieldChange(field, e.target.value);
            field.onChange?.(e.target.value);
        }}
        class={field.properties?.className ?? 'usa-input usa-input'}
        id={field.id}
        {value}
        name={field.name}
        type="text" />
</div>
