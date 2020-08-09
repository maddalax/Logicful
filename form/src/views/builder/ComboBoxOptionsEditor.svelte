<script lang="ts">
    import type { IField } from "entities/IField";
    import Field from "Field.svelte"
    export let field : IField
    export let editorId : string
    </script>

<Field field={{
    id : `${editorId}-options`,
    required : true,
    label : 'Option Set',
    value: field.options,
    name: `${field.id}-builder-config-field-field_editor-options`,
    type : 'combobox',
    options : 'https://gist.githubusercontent.com/MaddoxDevelopment/b7ac8a0271cda60d6061c202213a1709/raw/186ce0531def0cd1d423865e001b4f4880b397f9/option_sets.json',
    configFieldTarget: 'options', 
    configTarget: field.id
}}/>