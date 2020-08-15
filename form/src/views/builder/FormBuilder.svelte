<script lang="ts">
    import DynamicForm from 'DynamicForm.svelte';
    import FieldEdit from './FieldEdit.svelte';
    import type { IField } from 'models/IField';
    import { randomStringSmall, randomString } from 'util/Generate';
    import type { IForm } from 'models/IForm';
    import { onMount } from 'svelte';
    import { subscribeFieldChange, dispatchFieldChange } from 'event/FieldEvent';
    import DropdownButton from 'components/DropdownButton.svelte';
    import {DynamicFormMode} from "components/models/ComponentProps";


    let form: IForm = null

    async function loadForm() {
        const response = await fetch("http://127.0.0.1:3000/form/list");
        const forms = await response.json();
        form = forms.find(w => w.name === 'main');
    }

    onMount(async () => {

        loadForm();

        subscribeFieldChange((field: IField) => {
            if (!form || !field.configTarget) {
                return;
            }
            const toUpdate = form.fields.findIndex((w) => w.id === field.configTarget);
            form.fields[toUpdate][field.configFieldTarget] = field.value;
            dispatchFieldChange(form.fields[toUpdate], true);
        });
    });

    function saveDraft() {
        localStorage.setItem("form", JSON.stringify(form));
    }

    function saveAndPublish() {

    }

    function addField(type : string = "string", value? : any) {
        form.fields = form.fields.concat([
            {
                name: 'new-field-' + randomStringSmall(),
                label: 'New Field',
                type: type,
                value : value ? {type : 'local', value} : undefined,
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

    {#if form == null}
        <div class="loader"/>
    {:else}
        <div class="grid-container" style="margin-top: 1em; margin-bottom: 2em;">
            <div class="grid-row grid-gap">
                <div class="margin-top-3">
                    <DropdownButton
                            label={'Save Form'}
                            actions={[{ label: 'Save as Draft', onClick: saveDraft }, { label: 'Save and Publish', onClick: saveAndPublish }, { label: 'Delete', onClick: () => {} }]} />
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
                        <button class="usa-button usa-button--outline" on:click={() => addField("spacer", 1)}>Add Spacer</button>
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
    {/if}
</div>
