<script lang="ts">
  import type { IField } from "models/IField";
  import { richTextBlocksToHtml } from "./formatters/RichTextOutputFormatter";
  import { subscribeFieldChange } from "event/FieldEvent";
  import { onMount } from "svelte";
  import formStore from "store/FormStore";

  export let field: IField;
  let value = "";
  let lastUrl = "";

  onMount(async () => {
    subscribeFieldChange((newField) => {
      if (newField.id === field.id && lastUrl !== newField.value) {
        url = newField.value;
        load(url);
      }
    });

    let url = formStore.get(field.configTarget ?? field.id);
    await load(url);
  });

  async function load(url: string) {
    if (!url) {
      return;
    }
    lastUrl = url;
    const response = await fetch(url);
    const json = await response.json();
    value = richTextBlocksToHtml(json) ?? "";
  }
</script>

<div>
  {#if value === '' || value == null}
    <h5>Content Placeholder</h5>
    <p>
      From the field configuration settings, select a content block to display.
    </p>
  {:else}
    {@html value}
  {/if}
</div>
