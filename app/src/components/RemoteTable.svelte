<script lang="typescript">
  import type { TableRow, TableButtonAction } from 'components/models/RemoteTableProps'
  import { onMount, tick } from 'svelte'
  import Fuse from 'fuse.js'
  import { LoadState } from 'models/LoadState'
  import { randomString } from 'util/Generate'
  import Pagination from './Pagination.svelte'
  import { dispatchPrivate } from 'event/EventBus'
  import { fastEquals } from 'util/Compare'
  import Dialog from './Dialog.svelte'

  export let getRows: () => Promise<TableRow[]>

  let id: string = ''
  let caption: string = ''
  let searchPlaceHolder = 'Search'
  let rows: TableRow[] = []
  let filtered: TableRow[] = []
  let columns: string[] = []
  let filteredColumns: string[] = []
  let query = ''
  let fuse: Fuse<{}>
  let state = LoadState.Loading
  let lastSelectedIndex = -1
  let range: { min: number; max: number } = { min: 1, max: 1 }
  let widths: { [key: string]: number } = {}
  let canvasContext: any
  let sort = ''
  let sortDirection = ''
  let editingColumns = false

  export let headerActions: TableButtonAction[] = []
  export let onEdit: ((row: any) => any) | undefined = undefined
  export let onDelete: ((row: any) => any) | undefined = undefined
  export let hidden: Set<string> = new Set<string>()
  export let sortColumns: ((columns: string[]) => string[]) | undefined = undefined

  function createFuse(): Fuse<{}> {
    const list = rows.map((r) => {
      const result: any = {}
      Object.keys(r).forEach((key) => {
        result[key] = r[key]
      })
      return result
    })
    return new Fuse(list, {
      keys: Object.keys(rows[0]),
    })
  }

  onMount(() => {
    id = randomString()
    hidden.add('table_meta_id')
    const element = document.createElement('canvas')
    canvasContext = element.getContext('2d')
    load()
  })

  $: {
    if (rows.length === 0) {
      filtered = rows
    } else if (query === '') {
      filtered = rows
    } else {
      const result = fuse.search(query)
      filtered = result.map((r) => r.item)
    }
  }

  async function load() {
    try {
      rows = await getRows()
      if (rows.length === 0) {
        state = LoadState.Finished
        return
      }
      rows.map((w) => {
        w.table_meta_id = randomString()
        return w
      })
      fuse = createFuse()
      filtered = rows
      columns = Object.keys(rows[rows.length - 1] ?? {})
      columns = sortColumns?.(columns) ?? columns
      filteredColumns = columns.filter((w) => !hidden.has(w))
      state = LoadState.Finished
    } catch (ex) {
      console.error(ex)
      state = LoadState.Failed
    }
  }

  function sortColumn(column: string) {
    if (sort === column) {
      sort = column
      sortDirection = sortDirection === 'asc' ? 'desc' : 'asc'
    } else {
      sort = column
      sortDirection = 'desc'
    }
    dispatchPrivate(id, 'on_sort', { sort, sortDirection })
    filtered = filtered.sort(function (a, b) {
      var nameA = a[sort]?.toString()?.toUpperCase()
      var nameB = b[sort]?.toString()?.toUpperCase()
      if (nameA == null && nameB == null) {
        return 0
      }
      if (nameA == null) {
        return 1
      }
      if (nameB == null) {
        return 1
      }
      if (nameA < nameB) {
        return 1
      }
      if (nameA > nameB) {
        return -1
      }
      return 0
    })
    if (sortDirection === 'asc') {
      filtered = filtered.reverse()
    }
  }

  function headerStyle(column: string) {
    if (widths[column]) {
      return 'width: ' + widths[column] + 'px;'
    }
  }

  function setWidths() {
    let values = filtered.slice(range.min, range.max)
    widths = {}
    values.forEach((value) => {
      columns.forEach((c) => {
        const v = value[c]
        let width = getTextWidth(v, '')
        console.log(v, width)
        if (width < 150) {
          width = 150
        }
        if (width > 400) {
          width = 400
        }
        if ((widths[c] ?? 0) < width) {
          widths[c] = width
        }
      })
    })
  }

  function renderValue(row: any, column: string) {
    const value = row[column] ?? ''
    return value
  }

  function getTextWidth(text: string, font: string) {
    canvasContext.font = 'bold 1em arial'
    return canvasContext.measureText(text).width
  }

  function showHideColumns() {
    editingColumns = true
  }

  function toggleColumn(checked: boolean, column: string) {
    checked ? hidden.delete(column) : hidden.add(column)
    filteredColumns = columns.filter((w) => !hidden.has(w))
  }

  function onRowClick(row: any, index: number) {
    if (lastSelectedIndex !== -1) {
      filtered[lastSelectedIndex].meta_selected = false
    }
    lastSelectedIndex = index
    filtered[index].meta_selected = true
  }
</script>

<div>
  <div class="d-flex bd-highlight mb-3">
    <div class="mr-auto p-2 bd-highlight">
      <input class="form-control" placeholder={searchPlaceHolder} bind:value={query} style="width: 300px" />
    </div>
    <div class="p-2 bd-highlight">
      <div style="pointer: cursor;" on:click={showHideColumns}>
        <i class="fas fa-cog" />
      </div>
    </div>
    <div class="p-2 bd-highlight">
      <div style="pointer: cursor;" on:click={showHideColumns}>
        <i class="fas fa-columns" />
      </div>
    </div>
  </div>
  {#if state === LoadState.Loading}
    <div style="text-align: center; padding-top: 1em; padding-bottom: 1em;">
      <div class="spinner-border text-secondary" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  {:else if state === LoadState.Finished}
    <canvas id="canvas" style="display: none" />
    {#if rows.length === 0}
      <div style="text-align: center; padding-top: 1em; padding-bottom: 1em;">
        <div class="text-secondary">
          <p>No results to display.</p>
        </div>
      </div>
    {:else}
      <div class="table-responsive">
        <table class="table table-hover" style="table-layout: fixed;">
          <!-- svelte-ignore empty-block -->
          <tbody>
            <tr>
              {#each filteredColumns as column (column)}
                <th scope="col" style={headerStyle(column)} on:click={() => sortColumn(column)}>
                  {column}
                  <span>
                    {#if sort === column && sortDirection === 'asc'}
                      <span>
                        <span class="fas fa-chevron-up" />
                      </span>
                    {:else if sort === column && sortDirection === 'desc'}
                      <span>
                        <span class="fas fa-chevron-down" />
                      </span>
                    {/if}
                  </span>
                </th>
              {/each}
              {#if onDelete || onEdit}
                <th scope="col" />
              {/if}
            </tr>
            {#each filtered as row, index}
              {#if index >= range.min && index <= range.max}
                <tr class:active={row.meta_selected} on:click={() => onRowClick(row, index)} style="vertical-align: middle;">
                  {#each filteredColumns as column}
                    <td>
                      <div class="text">{renderValue(row, column)}</div>
                    </td>
                  {/each}
                  {#if onEdit}
                    <button class="btn" on:click={() => onEdit?.(row)}>
                      <div class="icon icon-sm icon-secondary">
                        <span class="fas fa-pencil-alt" />
                      </div>
                    </button>
                  {/if}
                  {#if onDelete}
                    <button class="btn" on:click={() => onDelete?.(row)}>
                      <div class="icon icon-sm icon-secondary">
                        <span class="fas fa-trash" />
                      </div>
                    </button>
                  {/if}
                </tr>
              {/if}
            {/each}
          </tbody>
        </table>
      </div>
      <Pagination
        {id}
        count={filtered.length}
        onRangeChange={(r) => {
          console.log(r, range)
          if (fastEquals(r, range)) {
            return
          }
          range = r
          setWidths()
          columns = columns
        }} />
    {/if}
  {:else if state === LoadState.Failed}
    <div style="padding-top:1em; padding-left: 1em;">
      <p>Failed to load rows, please try refreshing the page.</p>
    </div>
  {/if}
  {#if editingColumns}
    <Dialog
      props={{ title: 'Toggle Column Visibility' }}
      isOpen={true}
      onClose={() => {
        editingColumns = false
      }}>
      {#each columns as column}
        {#if column !== 'table_meta_id'}
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              checked={!hidden.has(column)}
              on:change={(e) => {
                toggleColumn(e.target.checked, column)
              }}
              id={'toggle-' + column} />
            <label class="form-check-label" for={'toggle-' + column}>{column}</label>
          </div>
        {/if}
      {/each}
    </Dialog>
  {/if}
</div>

<style>
  .table-hover {
    margin-top: 1em !important;
    margin-right: auto !important;
    margin-left: auto !important;
  }

  table tr:hover td:first-child {
    border-top-left-radius: 0.45rem;
    border-bottom-left-radius: 0.45rem;
  }
  table tr:hover td:last-child {
    border-top-right-radius: 0.45rem;
    border-bottom-right-radius: 0.45rem;
  }

  tr.active {
    background-color: #f5f5f5 !important;
    border-radius: 0.45rem;
  }

  td {
    max-width: 500px;
    width: 500px !important;
  }

  .text {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* number of lines to show */
    -webkit-box-orient: vertical;
  }

  :global(th) {
    cursor: pointer;
  }

  .fa-columns {
    cursor: pointer;
    height: 1.5em;
    width: 1.5em;
  }

  .fa-cog {
    cursor: pointer;
    height: 1.5em;
    width: 1.5em;
  }
</style>
