<script lang="typescript">
  import { dispatch, subscribe, subscribeComponent } from "@app/event/EventBus";
  import { navigate } from "svelte-routing";
  import type { IFolder } from "@app/models/IFolder";
  import { LoadState } from "@app/models/LoadState";
  import type { User } from "@app/models/User";
  import { getApi, postApi } from "@app/services/ApiService";
  import { me } from "@app/services/AuthService";
  import { afterUpdate, onMount } from "svelte";
  import Dialog from "./layout/Dialog.svelte";
  import Loader from "./Loader.svelte";
  import { getUrlParameter } from "@app/util/Http";
  import Link from "./Link.svelte";
  import FolderList from "./FolderList.svelte";
  import { fastClone } from "@app/util/Compare";
  import { set } from "@app/util/Selection";

  export let selected: IFolder;
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
    if (!selected) {
      selected = folders[0];
    }
    if (contentLoaded && selected) {
      dispatch("folder_selected", { folder: selected });
    }
  }

  onMount(async () => {
    user = me();
    state = LoadState.Loading;
    subscribe("folder_content_loaded", () => {
      contentLoaded = true;
    });
    await loadFolders();
    await onFolderSelected();
    state = LoadState.Finished;
  });

  async function loadFolders(cache: boolean = true) {
    const current = await getApi<IFolder[]>("folder", cache);
    const selectedId = getUrlParameter("folderId") ?? "";
    current.unshift({
      name: "Uncategorized",
      id: `${user.teamId}:uncategorized`,
    });
    selected = current[0];

    let results: { [key: string]: IFolder } = {};
    let parentMap: { [key: string]: string | undefined } = {};
    let folderIdMap: { [key: string]: IFolder } = {};

    current.forEach((f) => {
      if (f.id === selectedId) {
        selected = f;
      }
      parentMap[f.id] = f.parent;
      folderIdMap[f.id] = fastClone(f);
      if (!f.parent) {
        results[f.id] = f;
      }
    });

    current.forEach((f) => {
      if (f.parent) {
        let root: string | undefined = f.parent;
        let paths: Set<string> = new Set([f.id, root]);
        while (true) {
          if (!root) {
            break;
          }
          root = parentMap[root];
          if (!root) {
            break;
          }
          paths.add(root);
        }
        const fullPath = Array.from(paths)
          .map((p) => folderIdMap[p])
          .reverse();

        let path = "";
        fullPath.forEach((folder, i) => {
          path += folder.id;
          set(results, path, folder);
          path += `.children.`;
        });
      }
    });
    folders = results;
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
    await loadFolders(false);
  }
</script>

<style>
  .card-header-title {
    padding-left: 0.9em;
    padding-right: 1em;
    padding-top: 1em;
    padding-bottom: 0.5em;
  }

  .card {
    border-radius: 0.3em;
  }

  .title {
    font-weight: 600;
    line-height: 1.3;
    color: #1c2540;
    padding-left: 0.5em;
    font-size: 1em;
  }

  .btn-outline-dark {
    margin-right: 0.9em;
    margin-left: 0.9em;
    padding-top: 0.4em;
    padding-bottom: 0.4em;
    margin-top: 1em;
  }
</style>

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
<Link
  href="/form/create"
  class="btn btn-primary"
  style="width:100%;margin-top:1em;margin-bottom:1em;">
  <span class="fas fa-plus" />
  <span>Create New Form</span>
</Link>
<div class="card border-light p-2" style="padding-bottom: 1em !important;">
  <div class="container-fluid p-2 mt-3" style="padding-left: 0em;">
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
