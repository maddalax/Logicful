<script lang="ts">
  import type { IField } from "models/IField";
  import { onMount } from "svelte";
  import formStore from "store/FormStore";
  import { subscribeFieldChange } from "event/FieldEvent";
  import { dispatchFieldChange } from "event/FieldEvent";
  import { firstNotEmpty } from "util/Format";

  export let config: any;
  export let field: IField;

  export let value = true;

  onMount(() => {
    value = formStore.get(field.configTarget ?? field.id);
    value = value == null ? field.defaultValue ?? false : value;

    subscribeFieldChange((newField) => {
      if (newField.id === field.id) {
        value =
          newField.value == null ? field.defaultValue ?? false : newField.value;
      }
    });
  });
</script>

<div class="form-check form-switch">
  <input
    class="form-check-input"
    type="checkbox"
    id={`${field.id}`}
    checked={value}
    on:input={(e) => {
      field.value = e.target.checked;
      dispatchFieldChange(field, true);
      field.onChange?.(field.value);
    }}
  />
  <label class="form-check-label" for={`${field.id}`}>
    {firstNotEmpty(field.label, field.name)}
  </label>
</div>
