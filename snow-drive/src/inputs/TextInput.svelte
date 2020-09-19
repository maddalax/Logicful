<script lang="typescript">
  import type { IField } from "@app/models/IField";
  import { subscribeFieldChange } from "@app/event/FieldEvent";
  import Label from "./Label.svelte";
  import { afterUpdate, onMount } from "svelte";
  import formStore from "@app/store/FormStore";
  import { debounce } from "@app/util/Debounce";

  export let field: IField;
  export let value = "";
  export let type = "text";
  let debouncedOnChange: any;

  subscribeFieldChange(onMount, (newField) => {
    if (newField.id === field.id) {
      value = newField.value ?? value ?? "";
    }
  });

  onMount(() => {
    debouncedOnChange = debounce((e: any) => {
      field.value = e.target.value ?? "";
      formStore.set(field, {
        fromUser: true,
        field: "value",
        value: field.value,
      });
      field.onChange?.(field.value);
    }, 500);

    value =
      field.value ?? formStore.getValue(field.configTarget ?? field.id) ?? "";
  });
</script>

<div class="form-group">
  {#if !field.hideLabel}
    <Label {field} />
  {/if}
  {#if field.rows && field.rows > 1}
    <textarea
      rows={field.rows}
      on:click|stopPropagation
      on:input={debouncedOnChange}
      class={field.properties?.className ?? 'form-control'}
      id={field.id}
      {value}
      placeholder={field.placeholder ?? ''}
      name={field.name}
      {type} />
  {:else}
    <input
      on:click|stopPropagation
      on:input={debouncedOnChange}
      class={field.properties?.className ?? 'form-control'}
      id={field.id}
      {value}
      placeholder={field.placeholder ?? ''}
      name={field.name}
      {type} />
  {/if}
  {#if field.helperText}
    <small class="form-text text-muted">
      {@html field.helperText ?? ''}
    </small>
  {/if}
</div>
