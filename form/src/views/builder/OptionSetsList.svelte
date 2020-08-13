<script lang="ts">
    import RemoteTable from 'components/RemoteTable.svelte';
    import type {TableRow} from 'components/models/RemoteTableProps';
    import type {OptionSet} from 'models/OptionSet';
    import {dispatch} from 'event/EventBus';
    import ManageOptionSets from './ManageOptionSets.svelte';

    export let type = "Selector"

    function createNew() {
        dispatch("dialog_show", {
            child: ManageOptionSets,
            title: 'Create Option Set',
            save: false,
            props: {
                isNew: true
            }
        })
    }

    async function getRows(): Promise<TableRow[]> {
        const response = await fetch('https://gqe4ib85md.execute-api.us-east-1.amazonaws.com/dev/option_sets/list');
        const data: OptionSet[] = await response.json();
        return data.map((d) => {
            return {
                id : d.id,
                'Name': d.name,
                'Value': d.value,
                'Type': d.type === 'local' ? 'Inline' : 'Remote',
                'Last Updated': new Date(parseInt(d.lastModified)).toLocaleString(),
                'Modified By': 'Maddox',
                'Forms Using': 3,
                'Status': 'Published'
            };
        });
    }

    const hidden = new Set(['Value', "id"]);
</script>

<RemoteTable
        headerActions={[{
            label : '+ New Option Set',
            onClick : createNew
        }]}
        {getRows}
        {hidden}
        actions={{ Edit: async (row) => {
        dispatch("dialog_show", {
            child : ManageOptionSets,
            title : 'Modifying Option Set',
            save : false,
            props : {
                name : row.Name
            }
        })
    }, Delete: async (row) => {
            console.log(row);
    } }}/>
