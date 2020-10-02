<script lang="typescript">
  import Folders from "@app/features/folders/Folders.svelte";
  import FolderContent from "@app/features/folders/FolderContent.svelte";
  import Shell from "@app/components/Shell.svelte";
  import { subscribeComponent } from "@app/event/EventBus";
  import type { IFolder } from "@app/models/IFolder";

  let header: string = "My Forms";

  subscribeComponent(
    "folder_selected",
    async (e: { folder: IFolder; showForms: any }) => {
      header = e.folder.name;
    }
  );
</script>

<Shell header={header}>
  <div slot="sidebar" class="mt-2">
    <Folders />
  </div>
  <FolderContent />
</Shell>
