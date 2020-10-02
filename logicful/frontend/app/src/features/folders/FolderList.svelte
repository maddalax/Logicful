<script lang="typescript">
  import { subscribeComponent } from "@app/event/EventBus";

  import type { IFolder } from "@app/models/IFolder";
  import { onMount, tick } from "svelte";
  export let folders: { [key: string]: IFolder };
  export let selected: string = "";
  export let onSelected: (folder: IFolder) => any;
  export let onNewFolder: (parent: string) => any;
  export let padding: boolean = false;
  let expanded: { [key: string]: boolean } = {};

  subscribeComponent("folder_created", async (parent) => {
    if (parent) {
      await tick();
      expanded[parent] = true;
    }
  });
</script>

{#each Object.values(folders) as folder}
  <div class="pt-1" class:pl-2={padding}>
    <div>
      <button
        on:click={() => {
          expanded[folder.id] = !expanded[folder.id] ?? true;
          if (selected === folder.id) {
            return;
          }
          onSelected(folder);
        }}
        class="group w-full flex items-center pl-2 pr-1 py-2 text-sm leading-5
          font-medium rounded-md bg-white text-gray-600 hover:text-gray-900
          hover:bg-gray-50 focus:outline-none focus:text-gray-900
          focus:bg-gray-50 transition ease-in-out duration-150">
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
        <p class="pl-1 pr-1">{folder.name}</p>
        {#if folder.id === selected}
          <div>
            <span
              class="icon icon-xs ml-auto"
              on:click={async () => {
                await onNewFolder(folder.id);
              }}>
              <span class="fas fa-plus" />
            </span>
          </div>
        {/if}
      </button>
      <div>
        {#if expanded[folder.id]}
          <svelte:self
            padding={true}
            folders={folder.children ?? {}}
            {selected}
            {onSelected}
            {onNewFolder} />
        {/if}
      </div>
    </div>
  </div>
{/each}
