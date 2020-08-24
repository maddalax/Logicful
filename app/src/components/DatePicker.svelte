<script lang="typescript">
  import { onMount } from "svelte";
  import type { IField } from "models/IField";
  import Label from "../inputs/Label.svelte";

  export let field: IField;
  let value: string = "";
  let picker: any;

  onMount(() => {
    const flatpickr = require("flatpickr");
    require("flatpickr/dist/flatpickr.min.css");
    picker = flatpickr(document.getElementById(field.id!)!, {
      onChange: (selectedDates: any, dateStr: any, instance: any) => {
        console.log(selectedDates, dateStr, instance);
        value = dateStr;
      },
      altInput: true,
      altFormat: "F j, Y h:i K",
      dateFormat: "Y-m-d h:i K",
      enableTime: true,
    });
  });

  function clearDate() {
    picker.clear();
  }
</script>

<Label {field} />
<div class="input-group">
  <input
    id={field.id}
    type="text"
    class="form-control date-input-hidden"
    value={value ?? ''}
    placeholder="Select a date..." />
  <span on:click={clearDate} class="input-group-text">
    <i class="fas fa-times" />
  </span>
</div>

<style>
  .date-input-hidden {
    background-color: white !important;
    opacity: 1;
  }
</style>
