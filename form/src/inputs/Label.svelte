<script lang="ts">
    import { IField } from 'models/IField';
    import { firstNotEmpty } from 'util/Format';
    export let field: IField;
</script>

<label class="usa-label" for={field.name}>
    {firstNotEmpty(field.label, field.name)}
    {#if !field.required}
        <span class="usa-hint">(optional)</span>
    {/if}
</label>
