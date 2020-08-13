<script lang="ts">
    import { IField } from 'models/IField';
    import { subscribeFieldChange } from 'event/FieldEvent';
    import { onMount } from 'svelte';
    import { toNumberOrDefault } from 'util/Compare';

    export let field: IField;
    export let value = 0;

    onMount(() => {
        subscribeFieldChange((newField) => {
            if (newField.id === field.id) {
                value = toNumberOrDefault(field.value);
            }
        });
    });
</script>

<div style={`margin-bottom:${value}em`}></div>
