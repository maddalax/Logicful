<script lang="typescript">
  import type { IField } from 'models/IField'
  import { firstNotEmpty } from 'util/Format'
  export let field: IField
</script>

<label for={field.id}>
  {firstNotEmpty(field.label, field.name)}
  {#if !field.required}
    <span>(optional)</span>
  {/if}
</label>
