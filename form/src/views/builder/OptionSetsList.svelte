<script lang="ts">
    import RemoteTable from 'components/RemoteTable.svelte';
    import {TableRow} from 'components/models/RemoteTableProps';
    import {OptionSet} from 'models/OptionSet';
    import {dispatch} from 'event/EventBus';
    import ManageOptionSets from './ManageOptionSets.svelte';

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
        const response = await fetch('http://localhost:8080/option-sets.json');
        const data: OptionSet[] = await response.json();
        return data.map((d) => {
            return {
                'Name': d.name,
                'Value': d.value,
                'Type': d.type,
                'Last Updated': new Date().toLocaleDateString(),
                'Modified By': 'Maddox',
                'Forms Using': 3,
                'Status': 'Published'
            };
        });
    }

    const hidden = new Set(['Value']);
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
