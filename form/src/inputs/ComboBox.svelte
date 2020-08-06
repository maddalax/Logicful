<script lang="ts">
  import type { IField, LabelValue } from "src/entities/IField";
  import { formStore } from "src/event/Store";
  import { onMount, afterUpdate } from "svelte";
  import { LoadState } from "src/entities/LoadState";
  import { select } from "src/util/Selection";
  import {stringEquals} from "src/util/Compare"
  import {dispatchFieldChange} from "src/event/FieldEvent"
  export let field: IField;

  onMount(setup);

  afterUpdate(() => {
    console.log("COMBO FIELLDL", field);
    normalizeValue(value);
  })

  async function setup() {
    state = LoadState.Loading;
    try {
      const url = field.options;
      const result = await fetch(url);
      const data = await result.json();
      const parsed = [];
      Object.keys(data).forEach((key) => {
        parsed.push({ value: key, label: data[key] });
      });
      options = parsed;
      normalizeValue(value);
      state = LoadState.Finished;
    } catch (ex) {
      state = LoadState.Failed;
    }
  }

  let state: LoadState = LoadState.Loading;
  let value = "";
  let options: LabelValue[] = [];

  function normalizeValue(v) {
    const option = options.find(w => stringEquals(w.label, v) || stringEquals(w.value, v));
    if(option && option.value != value) {
      value = option.value;
    }
  }

  formStore.subscribe((values) => {
    normalizeValue(select(values, field.name) ?? "");
  });

</script>

<!-- svelte-ignore a11y-no-onchange -->
<div>
  <label class="usa-label" for={field.name}>{field.label}</label>
  <div class="usa-combo-box" data-default-value={value}>
    {#if state === LoadState.Loading}
      <p>Loading...</p>
    {:else if state === LoadState.Failed}
      <span>Failed to load this field. <button on:click={setup} class="usa-button usa-button--unstyled">Click here to retry.</button></span>
    {:else}
      <select
        class="usa-select"
        name={field.name}
        id={field.name}
        required
        {value}
        on:change={(e) => {
          dispatchFieldChange(field, e.target.value);
        }}>
        {#each options as option}
          <option value={option.value}>{option.label}</option>
        {/each}
      </select>
    {/if}
  </div>
</div>
