<script lang="ts">
    import DynamicForm from 'DynamicForm.svelte';
    import exampleForm from 'exampleForm';
    import FieldEdit from './FieldEdit.svelte';
    import type { IField } from 'entities/IField';
    import { randomStringSmall, randomString } from 'util/Generate';
    import type { IForm } from 'entities/IForm';
    import { onMount } from 'svelte';
    import { subscribeFieldChange } from 'event/FieldEvent';
    import DropdownButton from 'components/DropdownButton.svelte';
    import { DynamicFormMode } from 'components/models/ComponentProps';

    let form: IForm = exampleForm as IForm;
    let initialized: boolean = false;

    onMount(() => {
        subscribeFieldChange((field: IField, value: any) => {
            if (!field.configTarget) {
                return;
            }
            console.log(field, value);
            const toUpdate = form.fields.findIndex((w) => w.id === field.configTarget);
            form.fields[toUpdate][field.configFieldTarget] = value;
        });

        initialized = true;
    });

    function addField() {
        form.fields = form.fields.concat([
            {
                name: 'new-field-' + randomStringSmall(),
                label: 'New Field',
                type: 'string',
                expanded: true,
                id: randomString(),
            },
        ]);
    }
</script>

<style>
    .grid-container {
        max-width: 75em;
    }
</style>

<div>

    <div class="grid-container" style="margin-top: 1em">
        <div class="grid-row grid-gap">
            <div class="margin-top-3">
                <DropdownButton
                    label={'Save Form'}
                    actions={[{ label: 'Save as Draft', onClick: () => {} }, { label: 'Save and Publish', onClick: () => {} }, { label: 'Delete', onClick: () => {} }]} />
            </div>
        </div>
        <div class="grid-row grid-gap">
            <div class="grid-col-7">
                {#each form.fields as field}
                    <div style="margin-top: 1em">
                        {#if initialized}
                            <FieldEdit {field} />
                        {/if}
                    </div>
                {/each}
                <div class="margin-top-2">
                    <button class="usa-button usa-button--outline" on:click={addField}>Add Field</button>
                </div>
            </div>
            <div class="grid-col-5">
                {#if initialized}
                    <h3>Live Preview</h3>
                    <p>This preview shows how your form will look and act to a live user filling it out.</p>
                    <hr />
                    <DynamicForm {form} mode={DynamicFormMode.Preview} />
                {/if}
            </div>
        </div>
    </div>
</div>
