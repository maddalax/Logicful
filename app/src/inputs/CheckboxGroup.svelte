<script lang="typescript">
    import type { IField } from 'models/IField'
    import { subscribeFieldChange } from 'event/FieldEvent'
    import Label from './Label.svelte'
    import { onMount } from 'svelte'
    import formStore from 'store/FormStore'

    export let field: IField
    export let value = ''
    export let type = 'text'

    onMount(() => {
        value = formStore.getValue(field.configTarget ?? field.id) ?? ''

        subscribeFieldChange((newField) => {
            if (newField.id === field.id) {
                value = newField.value ?? ''
            }
        })
    })
</script>

{#if !field.hideLabel}
    <Label {field} />
{/if}
<div class="form-check">
    <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
    <label class="form-check-label" for="defaultCheck1">
        Default checkbox
    </label>
</div>
<div class="form-check">
    <input class="form-check-input" type="checkbox" value="" id="defaultCheck2" disabled>
    <label class="form-check-label" for="defaultCheck2">
        Disabled checkbox
    </label>
</div>