<script lang="ts">
    import type { IField } from 'entities/IField';
    import TextInput from 'inputs/TextInput.svelte';
    import Field from 'Field.svelte';
    import type { FieldEditConfig } from 'views/builder/models/FieldEditConfig';
    import { onMount, afterUpdate } from 'svelte';
    import { subscribeFieldChange, dispatchFieldChange } from 'event/FieldEvent';
    import { randomString } from 'util/Generate';
    import FieldTypeEditor from './FieldTypeEditor.svelte';
    import ContentBlockEditor from "./ContentBlockEditor.svelte";

    export let field: IField;
    export let config: FieldEditConfig;

    let expanded = false;
    let accordion = { name: '', label: '' };
    let id = '';

    function toFieldName(selector: string) {
        return `${field.id}-builder-config-field-${selector}`;
    }

    onMount(() => {
        id = `${field.id}-${randomString()}`;
        accordion = { name: field.name, label: field.label };
        expanded = field.expanded;

        subscribeFieldChange((field: IField) => {
            if (!field.configTarget) {
                return;
            }
            if (field.name === toFieldName('label')) {
                accordion.label = field.value;
            }
            if (field.name === toFieldName('name')) {
                accordion.name = field.value;
            }
        });
    });
</script>

<style>
    .no-accordion-button {
        background-image: none !important;
    }
</style>

<div>
    {#if field.type === 'spacer'}
    <div class="usa-accordion" aria-multiselectable="false">
        <h2 class="usa-accordion__heading">
            <button
                class="usa-accordion__button"
                aria-expanded={expanded}
                aria-controls={`accordion-${field.name}`}>
                Spacer Block
            </button>
        </h2>
        <div id={`accordion-${field.name}`} class="usa-accordion__content usa-prose">
            <Field
                field={{ id: `${id}-spacer-block`, name: `${field.id}-builder-config-field-spacer-block`, label: 'Increase value to add more spacing between the previous and next field.', required: true, value: field.value, type: 'number', configFieldTarget: 'value', configTarget: field.id }} />
        </div>
    </div>
    {:else if field.type === 'block'}
       <ContentBlockEditor id={id} field={field} expanded={expanded}/>
    {:else}
        <div class="usa-accordion" aria-multiselectable="false">
            <h2 class="usa-accordion__heading">
                <button
                    class="usa-accordion__button"
                    aria-expanded={expanded}
                    aria-controls={`accordion-${field.name}`}>
                    {accordion.label ?? accordion.name ?? ''}
                </button>
            </h2>
            <div id={`accordion-${field.name}`} class="usa-accordion__content usa-prose">
                <Field
                    field={{ id: `${id}-name`, name: `${field.id}-builder-config-field-name`, label: 'Name', required: true, value: field.name, type: 'string', configFieldTarget: 'name', configTarget: field.id }} />
                <Field
                    field={{ id: `${id}-label`, name: `${field.id}-builder-config-field-label`, label: 'Label', value: field.label, type: 'string', configFieldTarget: 'label', configTarget: field.id }} />
                <Field
                    field={{ id: `${id}-type`, name: `${field.id}-builder-config-field-fieldType`, label: 'Field Type', value: { type: 'local', value: field.type }, type: 'combobox', configFieldTarget: 'type', configTarget: field.id, options: { type: 'remote', value: 'http://localhost:8080/field-types.json' } }} />
                <FieldTypeEditor {field} editorId={id} />
            </div>
        </div>
    {/if}

</div>
