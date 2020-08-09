<script lang="ts">
    import type { IField } from 'entities/IField';
    export let field: IField;
</script>

<label class="usa-label" for={field.name}>
    {field.label ?? field.name ?? ''}
    {#if !field.required}
        <span class="usa-hint">(optional)</span>
    {/if}
</label>
