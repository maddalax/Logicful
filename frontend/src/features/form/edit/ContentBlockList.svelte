<script lang="ts">
    import RemoteTable from "components/RemoteTable.svelte";
    import type { TableRow } from "components/models/RemoteTableProps";
    import type { ContentBlock } from "models/ContentBlock";
    import { dispatch } from "event/EventBus";
    import ManageContentBlock from "./ManageContentBlock.svelte";

    export let type = "Selector";

    function createNew() {
        dispatch("dialog_show", {
            child: ManageContentBlock,
            title: "New Content Block",
            save: false,
            props: {
                isNew: true,
            },
        });
    }

    async function getRows(): Promise<TableRow[]> {
        const response = await fetch("http://localhost:3000/content-block/list");
        const blocks: ContentBlock[] = await response.json();
        return blocks.map((block) => {
            return {
                id : block.id,
                Name: block.name,
                Value: block.value,
                "Last Updated": new Date(block.changeTime).toLocaleString(),
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
      dispatch('dialog_show', {
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
