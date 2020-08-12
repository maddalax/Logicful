<script lang="ts">
    import type { IField } from 'entities/IField';
    import Field from 'Field.svelte';
    import Dialog from 'components/Dialog.svelte';
    import { dispatch } from 'event/EventBus';
    import ManageOptionSets from './ManageOptionSets.svelte';
    import { onMount, afterUpdate } from 'svelte';
    export let field: IField;
    export let editorId: string;

    afterUpdate(() => {
        console.log('EDITOR FIELD', field);
    });

    function manageSets() {
        dispatch('dialog_show', {
            child: ManageOptionSets,
            closeOnOutsideClick: false,
            confirmCloseOnDirty: true,
        });
    }

    function loadTransformer(value: any[]) {
        return value.map((v) => {
            return {
                label: v.name,
                value: v.value,
            };
        });
    }
</script>

<div>
    <Field
        field={{ id: `${editorId}-options`, loadTransformer: loadTransformer, required: true, label: 'Option Set', value: field.options, name: `${field.id}-builder-config-field-field_editor-options`, type: 'combobox', options: { type: 'remote', value: 'http://localhost:8080/option-sets.json' }, configFieldTarget: 'options', configTarget: field.id }} />
    <button on:click={manageSets} class="usa-button usa-button--unstyled">Manage Option Sets</button>
</div>
