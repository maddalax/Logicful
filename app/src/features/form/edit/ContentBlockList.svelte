<script lang="typescript">
    import RemoteTable from "components/RemoteTable.svelte";
    import type { TableRow } from "components/models/RemoteTableProps";
    import type { ContentBlock } from "models/ContentBlock";
    import { dispatch } from "event/EventBus";
    import ManageContentBlock from "./ManageContentBlock.svelte";
import { getApi } from "services/ApiService";

    export let type = "Selector";

    function createNew() {
        dispatch("dialog_push", {
            child: ManageContentBlock,
            title: "New Content Block",
            save: false,
            props: {
                isNew: true,
            },
        });
    }

    async function getRows(): Promise<TableRow[]> {
        const blocks: ContentBlock[] = await getApi("content-block");
        return blocks.map((block) => {
            return {
                id : block.id,
                Name: block.name,
                Value: block.value,
                "Last Updated": new Date(block.changeTime ?? new Date()).toLocaleString(),
                "Modified By": block.changeBy,
                "Forms Using": 3,
                Status: "Published",
            };
        });
    }

    const hidden = new Set(["Value", "id"]);
</script>

<RemoteTable
        headerActions={[{ label: '+ New Content Block', onClick: createNew }]}
        {getRows}
        {hidden}
        onEdit={async (row) => {
      dispatch('dialog_push', {
        child: ManageContentBlock,
        title: 'Modifying Content Block',
        save: false,
        props: {
          id: row.id,
        },
      });
    }}
     onDelete={() => {alert('delete')}
  }
/>
