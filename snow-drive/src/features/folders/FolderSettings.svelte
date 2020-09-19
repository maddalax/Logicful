<script lang="typescript">
  import Dialog from "@app/components/layout/Dialog.svelte";
  import type { ButtonAction } from "@app/components/models/ComponentProps";
  import { dispatch } from "@app/event/EventBus";
  import type { IFolder } from "@app/models/IFolder";
  import { putApi } from "@app/services/ApiService";
  export let folder: IFolder;
  export let onClose: () => any;

  let actions: ButtonAction[] = [
    {
      label: "Save",
      onClick: save,
      type: "primary",
    },
  ];

  async function save() {
    await putApi(`folder/${folder.id}`, folder);
    dispatch("folder_updated", folder);
  }
</script>

{#if folder}
  <Dialog isOpen={true} {actions} title={`Editing ${folder.name}`} {onClose}>
    <label for="name">Name</label>
    <input
      type="text"
      class="form-control"
      name="name"
      bind:value={folder.name} />
  </Dialog>
{/if}
