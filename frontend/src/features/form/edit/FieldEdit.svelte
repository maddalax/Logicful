<script lang="ts">
    import type {IField} from 'models/IField';
    import {afterUpdate, onMount} from 'svelte';
    import {subscribeFieldChange} from 'event/FieldEvent';
    import {randomString} from 'util/Generate';
    import FieldTypeEditor from './FieldTypeEditor.svelte';
    import ContentBlockEditor from "./ContentBlockEditor.svelte";
    import Accordion from "../../../components/Accordion.svelte";
    import type {FieldEditConfig} from 'views/builder/models/FieldEditConfig';
    import Field from "./Field.svelte";

    export let field: IField;
    export let config: FieldEditConfig;

    let accordion = {name: '', label: ''};
    let id = '';

    function toFieldName(selector: string) {
        return `${field.id}-builder-config-field-${selector}`;
    }

    onMount(() => {
        id = `${field.id}-${randomString()}`;
        accordion = {name: field.name, label: field.label};

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


<div>
    {#if field.type === 'spacer'}
        <Accordion buttonText="Spacer Block" id={`field-button-${field.id}`} open={field.expanded}>
            <Field
                    field={{ id: `${id}-spacer-block`, name: `${field.id}-builder-config-field-spacer-block`, label: 'Increase value to add more spacing between the previous and next field.', required: true, value: field.value, type: 'number', configFieldTarget: 'value', configTarget: field.id }}/>
        </Accordion>
    {:else if field.type === 'block'}
        <ContentBlockEditor id={id} field={field} expanded={field.expanded}/>
    {:else}
        <Accordion buttonText={accordion.label ?? accordion.name ?? ''} id="{`field-button-${field.id}`}" open={field.expanded}>
            <Field
                    field={{ id: `${id}-name`, name: `${field.id}-builder-config-field-name`,
                        label: 'Name', required: true,
                        value: field.name, type: 'string',
                        configFieldTarget: 'name',
                        configTarget: field.id }}/>
            <Field
                    field={{ id: `${id}-label`, name: `${field.id}-builder-config-field-label`, label: 'Label', value: field.label, type: 'string', configFieldTarget: 'label', configTarget: field.id }}/>
            <Field
                    field={{ id: `${id}-type`, name: `${field.id}-builder-config-field-fieldType`, label: 'Field Type', value: { type: 'local', value: field.type }, type: 'combobox', configFieldTarget: 'type', configTarget: field.id, options: { type: 'remote', value: 'http://localhost:8080/field-types.json' } }}/>
            <FieldTypeEditor {field} editorId={id}/>
        </Accordion>
    {/if}

</div>
