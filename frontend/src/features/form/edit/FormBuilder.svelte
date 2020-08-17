<script lang="ts">
    import FieldEdit from './FieldEdit.svelte';
    import type {IField} from 'models/IField';
    import {randomStringSmall, randomString} from 'util/Generate';
    import type {IForm} from 'models/IForm';
    import {afterUpdate, onMount, tick} from 'svelte';
    import {subscribeFieldChange, dispatchFieldChange} from 'event/FieldEvent';
    import DropdownButton from 'components/DropdownButton.svelte';
    import {DynamicFormMode} from "components/models/ComponentProps";
    import {fade} from 'svelte/transition';
    import Dragula from 'dragula'
    import {dispatch, subscribe} from "event/EventBus";
    import DynamicForm from "./DynamicForm.svelte";

    let form: IForm = null
    let previewForm: IForm = null
    let drake = null;
    let dropped = false;
    let active : IField
    let loadingActive : boolean = false;

    async function loadForm() {
        const response = await fetch("http://127.0.0.1:3000/form/list");
        const forms = await response.json();
        //const temp = forms.find(w => w.name === 'main');
        let temp = localStorage.getItem("form");
        if (!temp) {
            temp = JSON.stringify({fields: []})
        }
        console.log("FORM", temp);
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
            if (!form) {
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

        subscribeFieldChange(async (field: IField) => {
            if(!form) {
                return;
            }

            if(field.configTarget) {
                const toUpdate = form.fields.findIndex((w) => w.id === field.configTarget);
                const toUpdatePreview = previewForm.fields.findIndex((w) => w.id === field.configTarget);
                form.fields[toUpdate][field.configFieldTarget] = field.value;
                previewForm.fields[toUpdatePreview][field.configFieldTarget] = field.value;
                dispatchFieldChange(form.fields[toUpdate], true);
            }

            const index = form.fields.findIndex(w => w.id === field.id);

            if(field.hovered) {
                form.fields = form.fields.map((f, i) => {
                    if(i === index) {
                        return f;
                    }
                    f.hovered = false;
                    return f;
                });
                previewForm.fields = form.fields.map((f, i) => {
                    if(i === index) {
                        return f;
                    }
                    f.hovered = false;
                    return f;
                });
            }

            form.fields[index] = field;
            previewForm.fields[index] = field;

            if(!field.configTarget) {
                if(field.hovered) {
                    active = field;
                } else {
                    active = null;
                }
            }
        });
    });

    function saveDraft() {
        localStorage.setItem("form", JSON.stringify(form));
    }

    function saveAndPublish() {

    }

    function scrollToBottom() {

    }

    function addField(type: string = "string", value? : any) {
        const newField = {
            name: 'new-field-' + randomStringSmall(),
            label: 'New Field',
            type: type,
            value: value ? {type: 'local', value} : undefined,
            expanded: true,
            id: randomString(),
        }
        form.fields = form.fields.concat([newField]);
        previewForm.fields = previewForm.fields.concat([newField])
        scrollToBottom();
    }
</script>

<div>
    {#if form == null || previewForm == null}
        <div class="loader"/>
    {:else}
        <div class="container">
            <div class="row">
                <div class="col">
                    <button class="btn btn-success" on:click={saveDraft}>Save</button>
                    <DynamicForm form={previewForm} mode={DynamicFormMode.Preview} />
                </div>
                {#if loadingActive}
                   <div class="col" transition:fade={{duration: 200 }}>
                       <div class="spinner-border" role="status">
                           <span class="sr-only">Loading...</span>
                       </div>
                   </div>
                {:else if active != null}
                    <div class="col">
                        <div style="margin-top: 1em" transition:fade={{duration: 500 }}>
                            <FieldEdit field={active} />
                        </div>
                    </div>
                    {/if}
            </div>
        </div>
    {/if}
</div>
