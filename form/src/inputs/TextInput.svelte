<script lang="ts">
    import type { IField } from 'entities/IField';
    import { dispatchFieldChange, subscribeFieldChange } from 'event/FieldEvent';
    import { select } from 'util/Selection';
    import Label from './Label.svelte';
    import { onMount } from 'svelte';
    import type Address from './Address.svelte';

    export let field: IField;
    export let value = '';
    export let type = 'text';

    onMount(() => {
        subscribeFieldChange((newField) => {
            if(newField.id === field.id) {
                value = newField.value ?? "";
            }
        })
    });
</script>

<div>
    <Label {field} />
    <input
        on:input={(e) => {
            field.value = e.target.value ?? "";
            dispatchFieldChange(field, true);
            field.onChange?.(e.target.value);
        }}
        class={field.properties?.className ?? 'usa-input usa-input'}
        id={field.id}
        {value}
        name={field.name}
        type={type} />
</div>
