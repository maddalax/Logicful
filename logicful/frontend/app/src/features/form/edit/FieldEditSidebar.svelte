<script lang="typescript">
  import { onMount } from "svelte";
  import FieldEdit from "./FieldEdit.svelte";
  import type { IField } from "@app/models/IField";
  import { subscribeComponent } from "@app/event/EventBus";
  import type { IForm } from "@app/models/IForm";
  import { fade, slide } from "svelte/transition";
  import FormEdit from "./FormEdit.svelte";
  import { dispatch } from "@app/event/EventBus";
  import { subscribeFieldChange } from "@app/event/FieldEvent";
  import { fastClone } from "@app/util/Compare";
  import RightSidebar from "./RightSidebar.svelte";

  let field: IField | undefined;
  let fieldId: string | undefined;

  subscribeFieldChange(onMount, (newField: IField) => {
    if (newField.id === fieldId && !newField.selected) {
      field = undefined;
      fieldId = undefined;
      return;
    }
    if (newField.selected) {
      field = fastClone(newField);
      fieldId = field!.id;
    }
  });
</script>

<div>
  {#if field}
    {#each [field] as f (fieldId)}
      <div transition:slide={{ duration: 50 }}>
        <FieldEdit field={f} />
      </div>
    {/each}
  {:else}
    <FormEdit />
  {/if}
</div>
