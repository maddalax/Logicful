<script lang="ts">
    import StateSelector from 'inputs/StateSelector.svelte';
    import { afterUpdate } from 'svelte';
    import TextInput from 'inputs/TextInput.svelte';
    import { IField } from 'models/IField';
    export let field: IField;
    export let value: { [key: string]: string };
</script>

<TextInput
    field={{ required: true, name: `${field.id}.address1`, id: `${field.id}.address1`, label: 'Address', value: value?.address1 ?? '', type: 'text' }} />

<TextInput
    field={{ required: true, name: `${field.id}.address2`, id: `${field.id}.address2`, label: 'Address 2', value: value?.address2 ?? '', type: 'text' }} />

<div class="grid-row grid-gap">
    <div class="mobile-lg:grid-col-8">
        <TextInput
            field={{ required: true, name: `${field.id}.city`, id: `${field.id}.city`, label: 'City', value: value?.city ?? '', type: 'text' }} />
    </div>
    <div class="mobile-lg:grid-col-4">
        <StateSelector value={value?.state ?? ''} id={`${field.id}.state`} name={`${field.id}.state`} />
    </div>
</div>

<TextInput
    field={{ required: true, name: `${field.id}.zip`, id: `${field.id}.zip`, label: 'ZIP', value: value?.zip ?? '', type: 'text', properties: { pattern: '[d]{5}(-[d]{4})?', className: 'usa-input usa-input--medium' } }} />
