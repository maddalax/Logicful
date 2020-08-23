<script lang="ts">
  import type { IField } from "models/IField";
  import { subscribeFieldChange } from "event/FieldEvent";
  import { onMount } from "svelte";
  import formStore from "store/FormStore";
  import {isString} from "guards/Guard";

  export let field: IField;
  let value = "";
  let lastUrl = "";

  onMount(async () => {

    let url = formStore.get(field.configTarget ?? field.id);

    subscribeFieldChange((newField) => {
      if (newField.id === field.id && lastUrl !== newField.value) {
        url = newField.value;
        load(url);
      }
    });

    load(url);
  });

  async function load(url: string) {
    if (!url) {
      return;
    }
    if(!isString(url)) {
      return;
    }
    if(url.startsWith("http")) {
      lastUrl = url;
      const response = await fetch(url);
      const html = await response.text();
      value = html ?? "";
    } else {
      value = url;
    }
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
