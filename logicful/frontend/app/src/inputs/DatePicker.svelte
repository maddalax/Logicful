<script lang="typescript">
  import { subscribeFieldChange } from "@app/event/FieldEvent";

  import type { IField } from "@app/models/IField";
  import formStore from "@app/store/FormStore";
  import { debounce } from "@app/util/Debounce";
  import { onMount } from "svelte";
  import Label from "../inputs/Label.svelte";
  export let field: IField;

  let date: string;
  let time: string;
  let value: Date | undefined;

  let debouncedOnChange: any;

  subscribeFieldChange(onMount, (newField) => {
    if (newField.id === field.id) {
      if (newField.value) {
        console.log("VAL", newField.value)
        value = new Date(newField.value);
      } else {
        value = undefined;
      }
      if (value) {
        date = value.toLocaleDateString('en-CA');
        time = `${value.getHours()}:${value.getMinutes()}`;
      }
    }
  });

  onMount(() => {
    debouncedOnChange = debounce((date: Date) => {
      field.value = date.getTime();
      formStore.set(field, {
        fromUser: true,
        field: "value",
        value: field.value,
      });
      field.onChange?.(date);
    }, 300);

    console.log("FIELD VAL", field.value)
    if (field.value) {
      value = new Date(field.value);
    } else {
      value = undefined;
    }
  });

  function onDateChange() {
    console.log("DATE CHANGE")
    if (debouncedOnChange) {
      const d = new Date(date);
      if (time) {
        const split = time.split(":");
        const hour = split[0];
        const minute = split[1];
        d.setHours(parseInt(hour, 10));
        d.setMinutes(parseInt(minute, 10));
      }
      debouncedOnChange(d);
    }
  }
</script>

<Label {field} />

<div class="grid grid-cols-6 gap-2">
  {#if field.showDate}
    <div class="col-span-6 sm:col-span-3">
      <input
        type="date"
        required
        on:click|stopPropagation
        on:change={(e) => {
          date = e.target.value;
          onDateChange();
        }}
        class="form-input block w-full sm:text-sm sm:leading-5" />
    </div>
  {/if}
  {#if field.showTime}
    <div class="col-span-6 sm:col-span-3">
      <input
        type="time"
        required
        on:click|stopPropagation
        data-date-inline-picker="true"
        on:change={(e) => {
          time = e.target.value;
          onDateChange();
        }}
        class="form-input block w-full sm:text-sm sm:leading-5" />
    </div>
  {/if}
</div>
