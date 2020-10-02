<script lang="typescript">
  import { onMount } from "svelte";
  import { dispatch, subscribeComponent } from "@app/event/EventBus";
  import type { IFolder } from "@app/models/IFolder";
  import type { IForm } from "@app/models/IForm";
  import { getApi } from "@app/services/ApiService";
  import type { User } from "@app/models/User";
  import { me } from "@app/services/AuthService";
  import { LoadState } from "@app/models/LoadState";
  import { debounce } from "@app/util/Debounce";
  import FormList from "@app/features/folders/FormList.svelte";
  import Link from "@app/components/Link.svelte";
  import Loader from "@app/components/Loader.svelte";
  import { cacheClear } from "@app/util/Cache";
  import FolderSettings from "./FolderSettings.svelte";

  let forms: IForm[] = [];
  let user: User;
  let folder: IFolder;
  let state: LoadState = LoadState.NotStarted;
  let editing = false;

  function onSettings() {
    editing = true;
  }

  subscribeComponent("forms_moved", (newFolder) => {
    forms = [];
    state = LoadState.Loading;
    cacheClear(`api-request-form?folderId=${newFolder}`);
    setForms(false);
  });

  subscribeComponent(
    "folder_selected",
    async (e: { folder: IFolder; showForms: any }) => {
      forms = [];
      state = LoadState.Loading;
      folder = e.folder;
      debounceSetForms();
    }
  );

  async function setForms(cache: boolean = true) {
    forms = await getApi(`form?folderId=${folder.id}`);
    state = LoadState.Finished;
  }

  const debounceSetForms = debounce(async () => {
    setForms();
  }, 300);

  onMount(() => {
    user = me();
    dispatch("folder_content_loaded", {});
  });
</script>

{#if editing}
  <FolderSettings
    {folder}
    onClose={() => {
      editing = false;
    }} />
{/if}
<!-- 
<div class="row mb-5">
  <div class="col-12 mb-4" style="margin-top: 1em">
    <div class="card card-body bg-white border-light p-0 p-md-4">
      {#if folder}
        <div class="card-header bg-white border-0 p-2" style="display: flex">
          <div class="row">
            <div class="col">
              <div style="display: flex">
                <span class="h5">{folder.name}</span>
                {#if !folder.isUncategorized}
                  <div
                    style="padding-left: 0.5em; font-size: 1.2em; cursor: pointer"
                    on:click={onSettings}
                    class="">
                    <span class="fas fa-cog" />
                  </div>
                {/if}
              </div>
              <p class="small">{forms?.length ?? 0} Forms</p>
            </div>
            <div class="col-auto">
              <div
                class="align-items-center"
                style="padding-bottom: 0.3em; text-align: right !important;" />
              <Link
                href={`/form/create?folder=${folder?.id}`}
                classes="btn btn-xs btn-outline-dark">
                <span class="fas fa-plus" /><span style="padding-left: 0.4em; font-weight: 400;">Create
                  Form In This Folder</span>
              </Link>
            </div>
          </div>
        </div>
        <hr />
        {#if state === LoadState.Loading}
          <Loader />
        {/if}
        {#if forms}
          <FormList {forms} />
        {:else}
          <p class="pl-4">Folder Empty</p>
        {/if}
      {/if}
    </div>
  </div>
</div> -->

{#if state === LoadState.Loading}
  <Loader />
{/if}
{#if forms}
  <FormList {forms} />
{:else}
  <p class="pl-4">Folder Empty</p>
{/if}
