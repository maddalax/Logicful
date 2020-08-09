<script lang="ts">
    import type { IField } from 'entities/IField';
    import { formStore } from 'event/Store';
    import { dispatchFieldChange } from 'event/FieldEvent';
    import { select } from 'util/Selection';
    import Label from './Label.svelte';
    export let field: IField;

    let value = '';

    formStore.subscribe((values) => {
        value = select(values, field.id) ?? '';
    });
</script>

<div>
    <Label field={field} />
    <input
        on:input={(e) => dispatchFieldChange(field, e.target.value)}
        class={field.properties?.className ?? 'usa-input usa-input'}
        id={field.id}
        value={value}
        name={field.name}
        type="text" />
</div>
