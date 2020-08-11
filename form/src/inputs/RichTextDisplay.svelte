<script lang="ts">
    import type { IField } from 'entities/IField';
    import { richTextBlocksToHtml } from './formatters/RichTextOutputFormatter';
    import { subscribeFieldChange } from 'event/FieldEvent';
    import { onMount } from 'svelte';
import formStore from 'store/FormStore';
    export let field: IField;
    let value = '';

    onMount(() => {
        value = formStore.get(field.configTarget ?? field.id);
        subscribeFieldChange((newField) => {
            if(newField.id === field.id) {
                value = richTextBlocksToHtml(newField.value);
            }
        });
    });
</script>

<div>
    {@html value}
</div>
