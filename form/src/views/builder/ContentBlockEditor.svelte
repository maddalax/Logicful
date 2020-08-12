<script lang="ts">
    import type { IField } from 'entities/IField';
    import Field from 'Field.svelte'

    export let field: IField;
    export let expanded: boolean;
    export let id: string
</script>

<div class="usa-accordion" aria-multiselectable="false">
    <h2 class="usa-accordion__heading">
        <button class="usa-accordion__button" aria-expanded={expanded} aria-controls={`accordion-${field.name}`}>
            Content Block
        </button>
    </h2>
    <div id={`accordion-${field.name}`} class="usa-accordion__content usa-prose">

        <Field
        field={{ id: `${id}-contentBlock`, name: `${field.id}-builder-config-field-contentBlock`, label: 'Content Block', value: { type: 'local', value: field.value }, type: 'combobox', configFieldTarget: 'value', configTarget: field.id, options: { type: 'remote', value: 'http://localhost:8080/contents.json' } }} />
        <!--
        <Field
            field={{ id: `${id}-content-block`, name: `${field.id}-builder-config-field-content-block`, label: 'Content Block', required: true, value: field.value, type: 'block-editor', configFieldTarget: 'value', configTarget: field.id }} />
        -->
    </div>
</div>
