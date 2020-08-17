<script lang="ts">
    import Field from './Field.svelte';
    import type { IForm } from 'models/IForm';
    import type { IField } from 'models/IField';
    import { subscribeFieldChange } from 'event/FieldEvent';
    import {DynamicFormMode} from "components/models/ComponentProps";
    import { flip } from 'svelte/animate';
    import { dndzone } from 'svelte-dnd-action';
    import {dispatch} from "event/EventBus";

    export let form: IForm;
    export let mode : DynamicFormMode = DynamicFormMode.Live; 
    let values: { [key: string]: any } = {};

    function handler(e) {
        dispatch("block_dropped", e);
    }

    subscribeFieldChange((updatedField: IField) => {
        const index = form.fields.findIndex(w => w.id === updatedField.id);
        if(index === -1) {
            return;
        }
        form.fields[index].updated = !form.fields[index].updated;
    });

    function display(field: IField): boolean {
        if (!field.display) {
            return true;
        }
        if (field.display.target === 'form') {
            return onFormConditional(field);
        }
    }

    function onFormConditional(field: IField): boolean {
        switch (field.display.condition) {
            case 'hasValue': {
                return values[field.display.parameter] != null;
            }
        }
    }

    function onSubmit() {
        console.log('SUBMIT', values);
        //const validator = new AddressService();
        //validator.normalize(values.address);
    }
</script>
<style>

</style>
<div style="padding-left: 0.5em;">
    <h4>Preview</h4>
</div>
<div use:dndzone="{{items : form.fields, dropTargetStyle: {outline: 'rgba(153, 204, 255, 3) solid 2px'}}}" on:consider={handler} on:finalize={handler}>
    <div class="container" style="height: 70vh">

<form on:submit|preventDefault={onSubmit} class="preview-padding">
    <div>
        {#each form.fields as field(field.id)}
            <div animate:flip="{{duration: 300}}">
                <Field field={field} />
            </div>
        {/each}
    </div>

    {#if mode === DynamicFormMode.Live}
        <button class="btn btn-primary" type="submit">Submit Form</button>
    {/if}
</form>
</div>
</div>
