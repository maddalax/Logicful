<script lang="typescript">
  import { onMount } from "svelte";

  import { link, Router } from "svelte-routing";
  export let useRouter: boolean = true;
</script>

<!-- svelte-ignore a11y-missing-attribute -->
{#if useRouter}
  <a use:link {...$$props}><slot /></a>
{:else}
  <a {...$$props}><slot /></a>
{/if}
