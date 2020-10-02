<script lang="typescript">
  import { dispatch, subscribe, subscribeComponent } from "@app/event/EventBus";
  import { navigate } from "svelte-routing";
  import type { IFolder } from "@app/models/IFolder";
  import { LoadState } from "@app/models/LoadState";
  import type { User } from "@app/models/User";
  import { postApi } from "@app/services/ApiService";
  import { me } from "@app/services/AuthService";
  import { onMount } from "svelte";
  import Dialog from "@app/components/layout/Dialog.svelte";
  import Loader from "@app/components/Loader.svelte";
  import Link from "@app/components/Link.svelte";
  import FolderList from "./FolderList.svelte";
  import { getFolders } from "@app/features/folders/FolderService";
  import Button from "@app/components/Button.svelte";

  let selected: IFolder | undefined = undefined;
  let folders: { [key: string]: IFolder } = {};
  let searchPlaceHolder = "Search for a form";
  let query = "";
  let creatingNewFolder = false;
  let newFolderName = "";
  let user: User;
  let state = LoadState.NotStarted;
  let contentLoaded = false;
  let parent = "";

  async function onFolderSelected() {
    if (contentLoaded && selected) {
      dispatch("folder_selected", { folder: selected });
    }
  }

  subscribeComponent("folder_deleted", async (folder) => {
    state = LoadState.Loading;
    await loadFolders();
  });

  subscribeComponent("folder_updated", async (folder) => {
    state = LoadState.Loading;
    await loadFolders();
    onSelected(folder);
  });

  onMount(async () => {
    user = me();
    state = LoadState.Loading;
    subscribe("folder_content_loaded", () => {
      contentLoaded = true;
    });
    await loadFolders();
  });

  async function loadFolders(cache: boolean = true) {
    folders = await getFolders(cache);
    onSelected(folders[Object.keys(folders)[0]]);
    state = LoadState.Finished;
  }

  function onSelected(folder: IFolder) {
    selected = folder;
    onFolderSelected();
  }

  function onNewFolder(parentFolder: string = "") {
    parent = parentFolder;
    creatingNewFolder = true;
  }

  async function createNewFolder() {
    await postApi("folder", {
      name: newFolderName,
      teamId: user.teamId,
      parent: parent,
    });
    newFolderName = "";
    await loadFolders(false);
    dispatch("folder_created", parent);
  }
</script>

{#if creatingNewFolder}
  <Dialog
    title={'Create New Folder'}
    isOpen={true}
    actions={[{ label: `Create Folder`, type: 'secondary', onClick: createNewFolder }, { label: 'Cancel', type: 'danger' }]}
    onClose={() => {
      creatingNewFolder = false;
    }}>
    <h6>Folder Name</h6>
    <input
      bind:value={newFolderName}
      class="form-control"
      type="text"
      id="folderName"
      name="folderName"
      placeholder="" />
  </Dialog>
{/if}

<div
  class="flex flex-col flex-grow border-r border-gray-200 pb-4 pt-2 bg-white
    overflow-y-auto">
  <div class="flex-grow flex flex-col">
    <nav class="flex-1 px-2 bg-white">
      <div
        class="mb-2 flex flex-col space-y-3 sm:space-y-0 sm:space-x-3 sm:flex-row
          xl:flex-col xl:space-x-0 xl:space-y-3">
        <span class="inline-flex rounded-md shadow-sm">
          <button
            type="button"
            class="w-full inline-flex items-center justify-center px-4 py-2
              border border-transparent text-sm leading-5 font-medium rounded-md
              text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none
              focus:border-indigo-700 focus:shadow-outline-indigo
              active:bg-indigo-700 transition ease-in-out duration-150">
            + New Form
          </button>
        </span>
      </div>
      <div>
        <FolderList
          {onNewFolder}
          {onSelected}
          {folders}
          selected={selected?.id} />
      </div>
    </nav>
  </div>
</div>

<!-- <div class="items-center">
  <Button
  href="/form/create"
  type="primary">
  <span class="fas fa-plus" />
  <span class="ml-2">Create New Form</span>
</Button>
</div>
<div class="card border-light p-2" style="padding-bottom: 1em !important;">
  <div class="container-fluid p-2 mt-3" style="padding-left: 0;">
    <input
      class="form-control search-bar container-fluid"
      placeholder={searchPlaceHolder}
      bind:value={query} />
  </div>
  <div
    class="card-header card-header-title bg-white border-0"
    style="display: flex; padding-left: 0.2em;">
    <span class="title">Your Folders</span>
  </div>
  {#if state === LoadState.Loading}
    <Loader />
  {/if}
  <FolderList {onNewFolder} {onSelected} {folders} selected={selected?.id} />
  <button
    on:click={() => {
      onNewFolder('');
    }}
    class="btn btn-outline-dark">
    <span class="fas fa-plus" style="font-size: 0.9em;" />
    <span style="font-weight: 400;">New Folder</span>
  </button>
</div>
 -->
