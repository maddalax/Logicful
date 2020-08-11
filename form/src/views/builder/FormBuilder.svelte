<script lang="ts">
    import DynamicForm from 'DynamicForm.svelte';
    import exampleForm from 'exampleForm';
    import FieldEdit from './FieldEdit.svelte';
    import type { IField } from 'entities/IField';
    import { randomStringSmall, randomString } from 'util/Generate';
    import type { IForm } from 'entities/IForm';
    import { onMount } from 'svelte';
    import { subscribeFieldChange, dispatchFieldChange } from 'event/FieldEvent';
    import DropdownButton from 'components/DropdownButton.svelte';
    import { DynamicFormMode } from 'components/models/ComponentProps';

    let form: IForm = exampleForm as IForm;

    onMount(() => {
        subscribeFieldChange((field: IField) => {
            if (!field.configTarget) {
                return;
            }
            const toUpdate = form.fields.findIndex((w) => w.id === field.configTarget);
            form.fields[toUpdate][field.configFieldTarget] = field.value;
            dispatchFieldChange(form.fields[toUpdate], true);
        });
    });

    function addField(type : string = "string") {
        form.fields = form.fields.map(m => {
            m.expanded = false;
            return m;
        })
        form.fields = form.fields.concat([
            {
                name: 'new-field-' + randomStringSmall(),
                label: 'New Field',
                type: type,
                expanded: true,
                id: randomString(),
            },
        ]);
        setTimeout(() => {
            console.log("scrolling")
            const ele = document.getElementById(form.fields[form.fields.length - 1].id);
            const preview = document.getElementById("form-live-preview");
            preview.scrollTop = preview.scrollHeight;
            ele.scrollIntoView({behavior : 'smooth'})
        }, 200)
    }
</script>

<style>
    .grid-container {
        max-width: 75em;
    }
</style>

<div>

    <div class="grid-container" style="margin-top: 1em; margin-bottom: 2em;">
        <div class="grid-row grid-gap">
            <div class="margin-top-3">
                <DropdownButton
                    label={'Save Form'}
                    actions={[{ label: 'Save as Draft', onClick: () => {} }, { label: 'Save and Publish', onClick: () => {} }, { label: 'Delete', onClick: () => {} }]} />
            </div>
        </div>
        <div class="grid-row grid-gap">
            <div class="grid-col-7" style="overflow: scroll; height: 100vh" id="form-builder">
                {#each form.fields as field}
                    <div style="margin-top: 1em" id={field.id}>
                        <FieldEdit {field} />
                    </div>
                {/each}
                <div class="margin-top-2">
                    <button class="usa-button usa-button--outline" on:click={() => addField()}>Add Field</button>
                    <button class="usa-button usa-button--outline" on:click={() => addField("block")}>Add Content Block</button>
                    <button class="usa-button usa-button--outline" on:click={() => addField("spacer")}>Add Spacer</button>
                </div>
            
            </div>
            <div class="grid-col-5" style="overflow: scroll; height: 100vh" id="form-live-preview">
                <h3>Live Preview</h3>
                    <p>This preview shows how your form will look and act to a live user filling it out.</p>
                    <hr />
                    <DynamicForm {form} mode={DynamicFormMode.Preview} />
            </div>
        </div>
    </div>
</div>
