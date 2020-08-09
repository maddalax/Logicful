<script lang="ts">
import type { IField } from "entities/IField";
import Field from "Field.svelte"
import ComboBoxOptionsEditor from "views/builder/ComboBoxOptionsEditor.svelte";
export let field : IField
export let editorId : string
</script>

<div>
    {#if field.type === 'string'}
        <p>Text Input</p>
    {:else if field.type === 'combobox'}
      <ComboBoxOptionsEditor field={field} editorId={editorId}/>
    {:else if field.type === 'address'}
        <p>Address</p>
    {/if}
</div>