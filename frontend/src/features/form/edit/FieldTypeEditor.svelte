<script lang="ts">
    import type {IField} from 'models/IField';
    import ComboBoxOptionsEditor from "./ComboBoxOptionsEditor.svelte";

    export let field: IField;
    export let editorId: string;
</script>

<div>
    {#if field.type === 'string'}
        <p>Text Input</p>
    {:else if field.type === 'combobox'}
        <ComboBoxOptionsEditor {field} {editorId} />
    {:else if field.type === 'address'}
        <p>Address</p>
    {/if}
</div>
