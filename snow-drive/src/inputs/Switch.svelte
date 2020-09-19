<script lang="typescript">
  import type { IField } from "@app/models/IField";
  import { onMount } from "svelte";
  import formStore from "@app/store/FormStore";
  import { subscribeFieldChange } from "@app/event/FieldEvent";
  import { firstNotEmpty } from "@app/util/Format";
  import { subscribeComponent } from "@app/event/EventBus";

  export let config: any;
  export let field: IField;

  export let value: boolean | undefined = undefined;
  let defaultValue = false;

  subscribeFieldChange(onMount, (newField, change) => {
    if (newField.id === field.id) {
      if (change.field === "defaultValue") {
        value = newField.defaultValue;
      } else {
        value = newField.value;
      }
    }
  });

  onMount(() => {
    value = formStore.getValue(field.configTarget ?? field.id);
  });
</script>

<div
  class="form-check form-switch"
  style="margin-bottom: 0; vertical-align: middle;">
  <input
    class="form-check-input"
    type="checkbox"
    id={`${field.id}`}
    checked={value}
    on:click|stopPropagation
    on:input={(e) => {
      e.preventDefault();
      e.stopPropagation();
      field.value = e.target.checked;
      formStore.set(field, {
        fromUser: true,
        value: field.value,
        field: 'value',
      });
      field.onChange?.(field.value);
    }} />
  <label
    class="form-check-label"
    for={`${field.id}`}
    style="padding-top: 0.16em;">{firstNotEmpty(field.label, field.name)}</label>
</div>
