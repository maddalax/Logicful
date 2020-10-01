<script lang="typescript">
  import { afterUpdate, onMount } from "svelte";

  export let type: "primary" | "secondary" | "warn" | "danger";
  export let submit: boolean = false;
  export let size: 'regular' | 'large' | 'small' = 'regular'
  export let onClick: () => any = () => {};
  export let disabled: boolean = false;
  export let focus: boolean = false;
  export let href = "";
  export let hrefTarget = "";
  let focusable: any = null;

  afterUpdate(() => {
    if (focus && focusable) {
      setTimeout(() => {
        try {
          focusable.focus();
        } catch {}
      }, 100);
    }
  });
</script>

{#if type === 'danger'}
  <button
    type={submit ? 'submit' : 'button'}
    {disabled}
    bind:this={focusable}
    on:click|stopPropagation={onClick}
    class="inline-flex justify-center w-full rounded-md border
      border-transparent px-4 py-2 bg-indigo-600 text-base leading-6 font-medium
      text-white shadow-sm hover:bg-indigo-500 focus:outline-none
      focus:border-indigo-700 focus:shadow-outline-indigo transition ease-in-out
      duration-150 sm:text-sm sm:leading-5">
    <slot />
  </button>
{:else if type === 'primary'}
  {#if href}
    <a
      type="button"
      target={hrefTarget || '_blank'}
      {href}
      {disabled}
      bind:this={focusable}
      class="inline-flex items-center px-4 py-2 border border-transparent
        text-sm leading-5 font-medium rounded-md text-white bg-indigo-600
        hover:bg-indigo-500 focus:outline-none focus:border-indigo-700
        focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out
        duration-150">
      <slot />
    </a>
  {:else}
    <button
      type={submit ? 'submit' : 'button'}
      on:click|stopPropagation={onClick}
      {disabled}
      bind:this={focusable}
      class="inline-flex items-center px-4 py-2 border border-transparent
        text-sm leading-5 font-medium rounded-md text-white bg-indigo-600
        hover:bg-indigo-500 focus:outline-none focus:border-indigo-700
        focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out
        duration-150">
      <slot />
    </button>
  {/if}
{:else if type === 'secondary'}
  {#if href}
    <a
      type="button"
      target={hrefTarget || '_blank'}
      {href}
      {disabled}
      bind:this={focusable}
      class="inline-flex items-center px-4 py-2 border border-transparent
        text-sm leading-5 font-medium rounded-md text-indigo-700 bg-indigo-100
        hover:bg-indigo-50 focus:outline-none focus:border-indigo-300
        focus:shadow-outline-indigo active:bg-indigo-200 transition ease-in-out
        duration-150">
      <slot />
    </a>
  {:else}
    <button
      type={submit ? 'submit' : 'button'}
      on:click|stopPropagation={onClick}
      {disabled}
      bind:this={focusable}
      class="inline-flex items-center px-4 py-2 border border-transparent
        text-sm leading-5 font-medium rounded-md text-indigo-700 bg-indigo-100
        hover:bg-indigo-50 focus:outline-none focus:border-indigo-300
        focus:shadow-outline-indigo active:bg-indigo-200 transition ease-in-out
        duration-150">
      <slot />
    </button>
  {/if}
{/if}
