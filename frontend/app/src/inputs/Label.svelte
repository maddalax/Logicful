<script lang="typescript">
  import type { IField } from "@app/models/IField";
  import { firstNotEmpty } from "@app/util/Format";
  export let field: IField;
  export let showOptional: boolean = true;
</script>

<label for={field.id} class="block text-sm font-medium leading-5 text-gray-700 mb-2">
  {firstNotEmpty(field.label, field.name)}
  {#if !field.required && showOptional}<span>(optional)</span>{/if}
</label>