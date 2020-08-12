<script lang="ts">
    import Field from './Field.svelte';
    import type { IForm } from './entities/IForm';
    import type { IField } from './entities/IField';
    import { AddressService } from './services/AddressService';
    import { subscribeFieldChange } from './event/FieldEvent';
    import { set } from './util/Selection';
    import { afterUpdate, beforeUpdate } from 'svelte';
    import { DynamicFormMode } from 'components/models/ComponentProps';
    import formStore from 'store/FormStore'

    export let form: IForm;
    export let mode : DynamicFormMode = DynamicFormMode.Live; 
    let values: { [key: string]: any } = {};

    beforeUpdate(() => {
        console.log("FORM", form);
    })

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

<form class="usa-form" style="max-width: 100em" on:submit|preventDefault={onSubmit}>
    <fieldset class="usa-fieldset">
        {#each form.fields as field}
            {#if !display(field)}
                <span />
            {:else}
                <Field field={field} />
            {/if}
        {/each}
    </fieldset>
    {#if mode === DynamicFormMode.Live}
        <button class="usa-button" type="submit">Submit Form</button>
    {/if}
</form>
