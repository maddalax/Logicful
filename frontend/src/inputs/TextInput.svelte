<script lang="ts">
  import type { IField } from "models/IField";
  import { subscribeFieldChange } from "event/FieldEvent";
  import Label from "./Label.svelte";
  import { onMount } from "svelte";
  import formStore from "store/FormStore";
  import { dispatchFieldChange } from "../event/FieldEvent";

  export let field: IField;
  export let value = "";
  export let type = "text";

  onMount(() => {
    value = formStore.get(field.configTarget ?? field.id) ?? "";

    subscribeFieldChange((newField) => {
      if (newField.id === field.id) {
        value = newField.value ?? "";
      }
    });
  });
</script>

<div class="form-group">
  <Label {field} />
  {#if field.rows && field.rows > 1}
    <textarea
      rows={field.rows}
      on:click|stopPropagation
      on:input={(e) => {
        field.value = e.target.value ?? '';
        dispatchFieldChange(field, true);
        field.onChange?.(e.target.value);
      }}
      class={field.properties?.className ?? 'form-control'}
      id={field.id}
      {value}
      name={field.name}
      {type}
    />
  {:else}
    <input
      on:click|stopPropagation
      on:input={(e) => {
        field.value = e.target.value ?? '';
        dispatchFieldChange(field, true);
        field.onChange?.(e.target.value);
      }}
      class={field.properties?.className ?? 'form-control'}
      id={field.id}
      {value}
      name={field.name}
      {type}
    />
  {/if}
  {#if field.helperText}
    <small class="form-text text-muted">
      {@html field.helperText ?? ''}
    </small>
  {/if}
</div>
