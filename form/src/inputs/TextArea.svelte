<script lang="ts">
    import type { IField } from 'entities/IField';
    import { dispatchFieldChange, subscribeFieldChange } from 'event/FieldEvent';
    import { select } from 'util/Selection';
    import Label from './Label.svelte';
    import { onMount } from 'svelte';
    import type Address from './Address.svelte';
    import EditorJS from '@editorjs/editorjs';
    import Header from '@editorjs/header'
    import {richTextBlocksToHtml} from "inputs/formatters/RichTextOutputFormatter"

    export let field: IField;
    export let value = '';

    onMount(() => {
        setTimeout(() => {
            const editor = new EditorJS({
                onChange : () => {
                    editor.save().then((data) => {
                        field.value = richTextBlocksToHtml(data);
                        dispatchFieldChange(field, true);
                    })
                },
                placeholder: 'Click here and start typing your content. You will see the live preview of how it will be formatted on the right side.',
                holder: `${field.id}-content-block-editor`,
                tools: {
                    header: {
                        class: Header,
                        inlineToolbar: true,
                    },
                },
            });
        }, 200);
    });
</script>

<div>
    <div id={`${field.id}-content-block-editor`} />
</div>
