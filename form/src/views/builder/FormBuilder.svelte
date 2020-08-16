<script lang="ts">
    import DynamicForm from 'DynamicForm.svelte';
    import FieldEdit from './FieldEdit.svelte';
    import type { IField } from 'models/IField';
    import { randomStringSmall, randomString } from 'util/Generate';
    import type { IForm } from 'models/IForm';
    import {afterUpdate, onMount} from 'svelte';
    import { subscribeFieldChange, dispatchFieldChange } from 'event/FieldEvent';
    import DropdownButton from 'components/DropdownButton.svelte';
    import {DynamicFormMode} from "components/models/ComponentProps";
    import { fade } from 'svelte/transition';
    import Dragula from 'dragula'
    import {subscribe} from "../../event/EventBus";

    let form: IForm = null
    let previewForm : IForm = null
    let drake = null;
    let dropped = false;

    async function loadForm() {
        //const response = await fetch("http://127.0.0.1:3000/form/list");
        //const forms = await response.json();
        //const temp = forms.find(w => w.name === 'main');
        let temp = localStorage.getItem("form");
        if(!temp) {
          temp = JSON.stringify({fields : []})
        }
        previewForm = JSON.parse(temp);
        form = JSON.parse(temp);
        form.fields = form.fields.map(w => {
            w.expanded = false;
            return w;
        })
        scrollToBottom();
        setTimeout(() => {
            loadDragula();
        }, 500)
    }

    function loadDragula() {
        drake.containers.push(document.getElementById("fields"));
    }

    function initDragula() {
        drake = new Dragula();
        drake.on('drop', (el, target, source, sibling) => {
            if(!form) {
                return;
            }
            const container = [].slice.call(target.childNodes);
            let ids = container.map(w => w.childNodes[0]).map(w => w.childNodes[0]).map(w => w.childNodes[0]).map(w => w.childNodes[0])
                .map(w => w.id).map(w => w.replace("field-button-", ""));
            previewForm.fields = ids.map(i => form.fields.find(f => f.id === i));
        });
    }

    onMount(async () => {

        initDragula();
        loadForm();

        subscribe("accordion_toggle", (props) => {
            const index = form.fields.findIndex(w => w.id === props.id.replace("field-button-", ""));
            form.fields[index].expanded = props.open;
        })

        subscribeFieldChange((field: IField) => {
            if (!form || !field.configTarget || !previewForm) {
                return;
            }
            console.log("FIELD", field);
            const toUpdate = form.fields.findIndex((w) => w.id === field.configTarget);
            const toUpdatePreview = previewForm.fields.findIndex((w) => w.id === field.configTarget);
            console.log(toUpdate, toUpdatePreview)
            form.fields[toUpdate][field.configFieldTarget] = field.value;
            previewForm.fields[toUpdatePreview][field.configFieldTarget] = field.value;
            dispatchFieldChange(form.fields[toUpdate], true);
        });
    });

    function saveDraft() {
        localStorage.setItem("form", JSON.stringify(form));
    }

    function saveAndPublish() {

    }

    function scrollToBottom() {
        setTimeout(() => {
            const ele = document.getElementById('form-builder-action-buttons');
            ele?.scrollIntoView({behavior : 'smooth'})
            const preview = document.getElementById("form-live-preview");
            preview.scrollTop = preview.scrollHeight;
        }, 300)
    }

    function addField(type : string = "string", value? : any) {
        const newField = {
            name: 'new-field-' + randomStringSmall(),
            label: 'New Field',
            type: type,
            value : value ? {type : 'local', value} : undefined,
            expanded: true,
            id: randomString(),
        }
        form.fields = form.fields.concat([newField]);
        previewForm.fields = previewForm.fields.concat([newField])
        scrollToBottom();
    }
</script>

<style>
    .grid-container {
        max-width: 75em;
    }
</style>

<div>

    {#if form == null || previewForm == null}
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
                   <div id="fields">
                       {#each form.fields as field}
                           <div style="margin-top: 1em" transition:fade={{duration: 500 }}>
                               <FieldEdit {field} />
                           </div>
                       {/each}
                   </div>
                    <div class="margin-top-2" id="form-builder-action-buttons">
                        <button class="usa-button usa-button--outline" on:click={() => addField()}>Add Field</button>
                        <button class="usa-button usa-button--outline" on:click={() => addField("block")}>Add Content Block</button>
                        <button class="usa-button usa-button--outline" on:click={() => addField("spacer", 1)}>Add Spacer</button>
                    </div>

                </div>
                <div class="grid-col-5" style="overflow: scroll; height: 100vh" id="form-live-preview">
                    <h3>Live Preview</h3>
                    <p>This preview shows how your form will look and act to a live user filling it out.</p>
                    <hr />
                    <DynamicForm form={previewForm} mode={DynamicFormMode.Preview} />
                </div>
            </div>
        </div>
    {/if}
</div>
