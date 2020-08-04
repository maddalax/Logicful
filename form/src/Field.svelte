<script lang="ts">
import type { IField } from "./entities/IField";
export let field : IField;
import { formStore } from './Store';

function onInput(e) {
  const value = e.target.value;
  formStore.update(prev => {
    if(value === "" || value == null) {
      delete prev[field.name];
    } else {
      prev[field.name] = value;
    }
    prev.lastFieldChange = field.name;
    return prev;
  });
}

</script>

<div>
    {#if field.type === "name" }
    <label class="usa-label" for="title">
        {field.name}
        <span class="usa-hint">(optional)</span>
      </label>
      <input
        class="usa-input usa-input"
        on:input="{onInput}"
        id="title"
        name="title"
        type="text" />
    {/if}
    {#if field.type === "address"}
    <label class="usa-label" for="title">
        {field.name}
        <span class="usa-hint">(optional)</span>
      </label>
      <input
        on:input="{onInput}"
        class="usa-input usa-input"
        id="title"
        name="title"
        type="text" />
    {/if}
    {#if field.type === "string"}
    <label class="usa-label" for="title">
        {field.name}
        <span class="usa-hint">(optional)</span>
      </label>
      <input
        on:input="{onInput}"
        class="usa-input usa-input"
        id="title"
        name="title"
        type="text" />
    {/if}
</div>