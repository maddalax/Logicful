<script lang="typescript">
  import RemoteTable from '@app/components/RemoteTable.svelte'
  import type { TableRow } from '@app/components/models/RemoteTableProps'
  import type { OptionSet } from '@app/models/OptionSet'
  import { dispatch } from '@app/event/EventBus'
  import ManageOptionSets from './ManageOptionSets.svelte'
  import { getApi } from '@app/services/ApiService'

  export let type = 'Selector'

  function createNew() {
    dispatch('dialog_show', {
      child: ManageOptionSets,
      title: 'Create Option Set',
      save: false,
      props: {
        isNew: true,
      },
    })
  }

  async function getRows(): Promise<TableRow[]> {
    const data: OptionSet[] = await getApi('option-set', true)
    return data.map((d) => {
      return {
        id: d.id,
        Name: d.name,
        Value: d.value,
        Type: d.type === 'local' ? 'Inline' : 'Remote',
        'Last Updated': new Date(d.changeTime).toLocaleString(),
        'Modified By': d.changeBy,
        'Forms Using': 3,
        Status: 'Published',
      }
    })
  }

  const hidden = new Set(['Value', 'id'])
</script>

<RemoteTable
  headerActions={[{ label: '+ New Option Set', onClick: createNew }]}
  {getRows}
  {hidden}
  onEdit={async (row) => {
    dispatch('dialog_show', { child: ManageOptionSets, title: 'Modifying Option Set', save: false, props: { name: row.Name } })
  }}
  onDelete={() => {
    alert('delete')
  }}
/>
