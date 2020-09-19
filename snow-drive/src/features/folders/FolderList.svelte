<script lang="typescript">
import { subscribeComponent } from "@app/event/EventBus";

  import type { IFolder } from "@app/models/IFolder";
  import { onMount, tick } from "svelte";
  export let folders: { [key: string]: IFolder };
  export let selected: string = "";
  export let onSelected: (folder: IFolder) => any;
  export let onNewFolder: (parent: string) => any;
  let expanded: { [key: string]: boolean } = {};

  subscribeComponent('folder_created', async (parent) => {
    if(parent) {
        await tick();
        expanded[parent] = true
    }
  })
  
</script>

<style>
  .p-2 {
    padding-left: 0.5rem !important;
    padding-top: 0rem !important;
    padding-bottom: 0rem !important;
  }

  .list-group-item {
    color: #26304c !important;
  }

  .list-group.dashboard-menu .list-group-item:hover {
    border-radius: 0.3em;
  }

  .active {
    color: #26304c !important;
    border-radius: 0.3em;
  }
</style>

{#each Object.values(folders) as folder}
  <div class="card-body p-2">
    <div class="list-group dashboard-menu list-group-sm">
      <button
        on:click={() => {
          expanded[folder.id] = !expanded[folder.id] ?? true;
          if (selected === folder.id) {
            return;
          }
          onSelected(folder);
        }}
        class="d-flex list-group-item border-0 list-group-item-action {folder.id === selected ? 'active' : ''}"
        style="padding-bottom: 0.5em; padding-top: 0.5em;">
        {#if folder.id === selected}
          <div>
            <span
              class="fas fa-folder-open"
              style="font-size: 1.2em; font-weight: 375;" />
          </div>
        {:else}
          <div>
            <span
              class="far fa-folder"
              style="font-size: 1.2em; font-weight: 375;" />
          </div>
        {/if}
        <span
          style="padding-left: 0.5em; font-weight: 375;">{folder.name}</span>
        {#if folder.id === selected}
          <span
            class="icon icon-xs ml-auto"
            on:click={async () => {
              await onNewFolder(folder.id);
            }}>
            <span class="fas fa-plus" />
          </span>
        {/if}
      </button>
      {#if expanded[folder.id]}
        <svelte:self
          folders={folder.children ?? {}}
          {selected}
          {onSelected}
          {onNewFolder} />
      {/if}
    </div>
  </div>
{/each}
