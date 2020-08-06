<script lang="ts">
  import type { IField } from "src/entities/IField";
  import { formStore } from "src/event/Store";
  import { dispatchFieldChange } from "src/event/FieldEvent";
import { select } from "src/util/Selection";
  export let field: IField;

  let value = "";

  formStore.subscribe((values) => {
    value = select(values, field.name) ?? "";
  });
</script>

<div>
  <label class="usa-label" for={field.name}>
    {field.label ?? field.name}
    {#if !field.required}
      <span class="usa-hint">(optional)</span>
    {/if}
  </label>
  <input
    on:input={(e) => dispatchFieldChange(field, e.target.value)}
    class={field.properties?.className ?? "usa-input usa-input"}
    id={field.name}
    {value}
    name={field.name}
    type="text" />
</div>
