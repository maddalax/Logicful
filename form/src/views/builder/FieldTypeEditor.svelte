<script lang="ts">
import type { IField } from "entities/IField";
import Field from "Field.svelte"
export let field : IField
export let editorId : string
</script>

<div>
    {#if field.type === 'string'}
        <p>Text Input</p>
    {:else if field.type === 'combobox'}
       <Field field={{
           id : `${editorId}-options`,
           required : true,
           label : 'Options',
           value: field.options,
           name: `${field.id}-builder-config-field-field_editor-options`,
           type : 'string',
           configFieldTarget: 'options', 
           configTarget: field.id
       }}/>
    {:else if field.type === 'address'}
        <p>Address</p>
    {/if}
</div>