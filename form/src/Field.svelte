<script lang="ts">
  import type { IField } from "./entities/IField";
  export let field: IField;
  import { formStore } from "./event/Store";
  import TextInput from "./inputs/TextInput.svelte";
  import { onMount, beforeUpdate, afterUpdate } from "svelte";
  import ComboBox from "./inputs/ComboBox.svelte";
  import { LoadState } from "./entities/LoadState";
  import { FieldValueLoader } from "./loader/FieldValueLoader";
  import Address from "./inputs/Address.svelte";
  import { subscribeFieldChange } from "./event/FieldEvent";
  import { set } from "./util/Selection";

  let state = LoadState.NotStarted;
  let value: any;

  onMount(async () => {
    if (field.value) {
      state = LoadState.Loading;
      try {
        const loader = new FieldValueLoader();
        const result = await loader.load(field);
        value = result;
        if (result != null) {
          formStore.update((prev) => {
            prev[field.name] = result;
            prev.lastFieldChange = field.name;
            return prev;
          });
        }
        state = LoadState.Finished;
      } catch (e) {
        console.error(e);
        state = LoadState.Failed;
      }
    }
  });
</script>

<div>
  {#if field.type === 'name'}
    <TextInput {field} />
  {/if}
  {#if field.type === 'address'}
    <Address {field} {value} />
  {/if}
  {#if field.type === 'string'}
    <TextInput {field} />
  {/if}
  {#if field.type === 'combobox'}
    <ComboBox {field} />
  {/if}
</div>
