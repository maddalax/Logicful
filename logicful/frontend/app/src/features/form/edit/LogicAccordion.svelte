<script lang="typescript">
  import LogicBuilder from "./LogicBuilder.svelte";
  import type { IField } from "@app/models/IField";
  import FlyoutPanel from "./FlyoutPanel.svelte";
  export let field: IField;
  let visible = false;
</script>

<span class="inline-flex rounded-md shadow-sm">
  <button
    on:click={() => (visible = true)}
    type="button"
    class="inline-flex items-center px-3 py-2 border border-transparent text-sm
      leading-4 font-medium rounded-md text-white bg-indigo-600
      hover:bg-indigo-500 focus:outline-none focus:border-indigo-700
      focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out
      duration-150">
    Manage Logic
  </button>
</span>

{#if visible}
  <FlyoutPanel
    title="Manage Field Logic"
    description={'Add rules to change the behavior of when your field should show or hide.'}
    onClose={() => (visible = false)}>
    <LogicBuilder {field} />
  </FlyoutPanel>
{/if}
