<script lang="ts">
  // @ts-nocheck
  export let getSelectionLabel = undefined;
  export let item = undefined;
</script>

<div class="selection">
  {@html getSelectionLabel(item)}
</div>

<style>
  .selection {
    text-overflow: ellipsis;
    overflow-x: hidden;
    white-space: nowrap;
  }
</style>
