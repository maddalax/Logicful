<script lang="typescript">
  import type {
    TableRow,
    TableButtonAction,
  } from "@app/components/models/RemoteTableProps";
  import { afterUpdate, onMount, tick } from "svelte";
  import Fuse from "fuse.js";
  import { LoadState } from "@app/models/LoadState";
  import { randomString } from "@app/util/Generate";
  import Pagination from "@app/components/Pagination.svelte";
  import { dispatch, dispatchPrivate } from "@app/event/EventBus";
  import { fastClone, fastEquals } from "@app/util/Compare";
  import Dialog from "@app/components/layout/Dialog.svelte";
  import ToastManager from "@app/components/ToastManager.svelte";
  import { isObject } from "@app/guards/Guard";
  import type { Dictionary } from "@app/models/Utility";
  export let getRows: () => Promise<TableRow[]>;
  export let defaultSortColumn = "";
  export let searchPlaceHolder: string = "Search";
  export let columnMeta: { [key: string]: { type: string } } = {};

  let id: string = "";
  let rows: TableRow[] = [];
  let filtered: TableRow[] = [];
  let columns: string[] = [];
  let filteredColumns: string[] = [];
  let query = "";
  let fuse: Fuse<{}>;
  let state = LoadState.Loading;
  let range: { min: number; max: number } = { min: 1, max: 1 };
  let widths: { [key: string]: number } = {};
  let canvasContext: any;
  let sort = "";
  let sortDirection = "";
  let allRowsSelected = false;
  let selectedCount = 0;
  let modal: "delete" | "toggle_column" | "preview" | "" | "filter" = "";
  let filters: Dictionary<any> = {
    onlyUnread: false,
  };
  let lastFilters: Dictionary<any> = {};
  let appliedFilters = 0;

  export let headerActions: TableButtonAction[] = [];
  export let onEdit: ((row: any) => any) | undefined = undefined;
  export let onDelete: ((rows: any[]) => any) | undefined = undefined;
  export let onRead:
    | ((rows: any[], value: boolean) => any)
    | undefined = undefined;
  export let hidden: Set<string> = new Set<string>();
  export let sortColumns:
    | ((columns: string[]) => string[])
    | undefined = undefined;
  export let onFormat: (column: string, row: any) => any = () => undefined;
  export let onRowClick: (row: any) => any = () => {};

  afterUpdate(() => {
    console.log("after update", filters);
    if (!fastEquals(filters, lastFilters)) {
      lastFilters = fastClone(filters);
      applyFilters();
    }
  });

  function applyFilters() {
    appliedFilters = 0;
    filtered = rows;
    if (filters.onlyUnread) {
      appliedFilters++;
      filtered = filtered.filter((f) => {
        return isUnread(f);
      });
    }
  }

  function createFuse(): Fuse<{}> {
    const list = rows.map((r) => {
      const result: any = {};
      Object.keys(r).forEach((key) => {
        result[key] = isObject(r[key]) ? JSON.stringify(r[key]) : r[key];
      });
      return result;
    });
    return new Fuse(list, {
      keys: Object.keys(rows[0]),
    });
  }

  onMount(() => {
    id = randomString();
    hidden.add("table_meta_id");
    const element = document.createElement("canvas");
    canvasContext = element.getContext("2d");
    load();
  });

  $: {
    if (rows.length === 0) {
      filtered = rows;
    } else if (query === "") {
      filtered = rows;
    } else {
      const result = fuse.search(query);
      filtered = result.map((r) => r.item);
    }
  }

  function selectAllRows() {
    for (let i = 0; i < filtered.length; i++) {
      if (i >= range.min && i <= range.max) {
        filtered[i].meta_selected = allRowsSelected ? false : true;
      }
    }
    allRowsSelected = !allRowsSelected;
    let count = 0;
    for (let i = 0; i < filtered.length; i++) {
      if (filtered[i].meta_selected) {
        count++;
      }
    }
    selectedCount = count;
  }

  async function load() {
    try {
      state = LoadState.Loading;
      rows = await getRows();
      if (rows.length === 0) {
        state = LoadState.Finished;
        return;
      }
      rows.map((w) => {
        w.table_meta_id = randomString();
        return w;
      });
      fuse = createFuse();
      filtered = rows;
      let allColumns = new Set<string>();
      rows.forEach((r) => {
        Object.keys(r).forEach((c) => allColumns.add(c));
      });
      columns = Array.from(allColumns);
      columns = sortColumns?.(columns) ?? columns;
      filteredColumns = columns.filter((w) => !hidden.has(w));
      state = LoadState.Finished;
      if (defaultSortColumn) {
        sortColumn(defaultSortColumn);
      }
    } catch (ex) {
      console.error(ex);
      state = LoadState.Failed;
    }
  }

  function sortColumn(column: string) {
    if (sort === column) {
      sort = column;
      sortDirection = sortDirection === "asc" ? "desc" : "asc";
    } else {
      sort = column;
      sortDirection = "desc";
    }
    let isDate = columnMeta[column]?.type === "date";
    dispatchPrivate(id, "on_sort", { sort, sortDirection });
    filtered = filtered.sort(function (a, b) {
      var nameA = a[sort]?.toString()?.toUpperCase();
      var nameB = b[sort]?.toString()?.toUpperCase();
      if (nameA == null && nameB == null) {
        return 0;
      }
      if (nameA == null) {
        return 1;
      }
      if (nameB == null) {
        return 1;
      }
      if (isDate) {
        if (new Date(nameA).getTime() < new Date(nameB).getTime()) {
          return 1;
        }
        if (new Date(nameA).getTime() > new Date(nameB).getTime()) {
          return -1;
        }
      }
      if (nameA < nameB) {
        return 1;
      }
      if (nameA > nameB) {
        return -1;
      }
      return 0;
    });
    if (sortDirection === "asc") {
      filtered = filtered.reverse();
    }
  }

  function headerStyle(column: string) {
    if (widths[column]) {
      return "width: " + widths[column] + "px;";
    }
  }

  function setWidths() {
    let values = filtered.slice(range.min, range.max);
    widths = {};
    values.forEach((value) => {
      columns.forEach((c) => {
        const v = value[c];
        let width = getTextWidth(v, "");
        if (width < 150) {
          width = 150;
        }
        if (width > 400) {
          width = 400;
        }
        if ((widths[c] ?? 0) < width) {
          widths[c] = width;
        }
      });
    });
  }

  function isUnread(row: any) {
    return row["meta_unread"] === true;
  }

  function renderValue(row: any, column: string) {
    let value = row[column] ?? "";
    value = onFormat(column, row[column]) ?? value;
    return isObject(value) || Array.isArray(value)
      ? JSON.stringify(value)
      : value;
  }

  function getTextWidth(text: string, font: string) {
    canvasContext.font = "bold 1em arial";
    return canvasContext.measureText(text).width;
  }

  function toggleColumn(checked: boolean, column: string) {
    checked ? hidden.delete(column) : hidden.add(column);
    filteredColumns = columns.filter((w) => !hidden.has(w));
  }

  function onRowSelected(row: any) {
    const index = filtered.findIndex(
      (w) => w.table_meta_id === row.table_meta_id
    );
    if (filtered[index].meta_selected) {
      selectedCount--;
      filtered[index].meta_selected = false;
    } else {
      selectedCount++;
      filtered[index].meta_selected = true;
    }
  }

  async function markRead(value: boolean) {
    const selected = filtered.filter((w) => w.meta_selected);
    const ids = new Set(selected.map((s) => s.table_meta_id));
    await onRead?.(selected, value);
    filtered = filtered.map((f) => {
      const id = f.table_meta_id;
      if (ids.has(id)) {
        f.meta_unread = !value;
      }
      return f;
    });
    dispatch("show_toast", {
      message: `Item(s) marked as ${value ? "read" : "unread"}.`,
    });
  }

  async function deleteEntries() {
    const selected = filtered.filter((w) => w.meta_selected);
    if (selected.length !== selectedCount) {
      throw new Error(
        "Selection count did not match actual selected, please try reloading the page."
      );
    }
    await onDelete?.(selected);
    dispatch("show_toast", {
      title: "Deletion Started",
      message: "Your entries have been queued for deletion.",
    });
    modal = "";
    const toRemove = new Set(selected.map((w) => w.table_meta_id));
    filtered = filtered.filter((w) => {
      return !toRemove.has(w.table_meta_id);
    });
    filtered = filtered.map((f) => {
      f.meta_selected = false;
      return f;
    });
    rows = rows.filter((w) => {
      return !toRemove.has(w.table_meta_id);
    });
    dispatch("show_toast", {
      message: `Item(s) deleted.'}.`,
    });
  }
</script>

<style>
  .text {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* number of lines to show */
    -webkit-box-orient: vertical;
  }

  td {
    max-width: 500px;
    width: 500px !important;
  }
</style>

<div class="flex flex-col">
  <div class="-my-2 overflow-x-scroll sm:-mx-6 lg:-mx-8">
    <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
      <div
        class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table class="min-w-full divide-y divide-gray-200 table-fixed">
          <thead>
            <tr>
              <th
                class="px-6 py-3 bg-gray-50 text-left text-xs leading-4
                  font-medium text-gray-500 uppercase tracking-wider">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    checked={allRowsSelected}
                    on:change={selectAllRows}
                    id={'row-toggle-all'} />
                </div>
              </th>
              {#each filteredColumns as column (column)}
                <th
                  style={headerStyle(column)}
                  class="px-6 py-3 bg-gray-50 text-left text-xs leading-4
                    font-medium text-gray-500 uppercase tracking-wider"
                  on:click={() => sortColumn(column)}>
                  {column}
                  <span>
                    {#if sort === column && sortDirection === 'asc'}
                      <span> <span class="fas fa-chevron-up" /> </span>
                    {:else if sort === column && sortDirection === 'desc'}
                      <span> <span class="fas fa-chevron-down" /> </span>
                    {/if}
                  </span>
                </th>
              {/each}
            </tr>
          </thead>
          <tbody>
            {#each filtered as row, index}
              {#if index >= range.min && index <= range.max}
                <tr
                  class:active={row.meta_selected}
                  style="vertical-align: middle; cursor: pointer;"
                  on:click={() => {
                    onRowClick(row);
                    row['meta_unread'] = false;
                  }}>
                  <td
                    class:unread={isUnread(row)}
                    class="px-6 py-4 whitespace-no-wrap text-sm leading-5
                      font-medium text-gray-900">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        checked={row.meta_selected}
                        on:click|stopPropagation
                        on:change|stopPropagation={(e) => {
                          onRowSelected(row);
                        }}
                        id={'row-toggle-' + index} />
                      {#if isUnread(row)}
                        <div>
                          <i
                            class="fas fa-circle"
                            style="width: .5em;margin-left:4px" />
                        </div>
                      {/if}
                    </div>
                  </td>
                  {#each filteredColumns as column}
                    <td
                      class:font-bold={isUnread(row)}
                      class:text-gray-800={isUnread(row)}
                      class="px-6 py-4 text-sm leading-5 text-gray-500">
                      <div class="text" class:text-unread={isUnread(row)}>
                        {renderValue(row, column)}
                      </div>
                    </td>
                  {/each}
                </tr>
              {/if}
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
<Pagination
  {id}
  count={filtered.length}
  onRangeChange={(r) => {
    if (fastEquals(r, range)) {
      return;
    }
    range = r;
    setWidths();
    columns = columns;
  }} />

<!-- <div>
  <ToastManager />
  <div class="d-flex bd-highlight mb-3">
    <div class="p-2 bd-highlight">
      <input
        class="form-control"
        placeholder={searchPlaceHolder}
        bind:value={query}
        style="width: 300px" />
    </div>
    <div class="p-2 bd-highlight" class:mr-auto={appliedFilters === 0}>
      <div on:click={() => (modal = 'filter')} style="margin-top: 7px;">
        <i class="fas fa-filter" />
      </div>
    </div>
    {#if appliedFilters > 0}
      <div class="mr-auto p-2 bd-highlight" style="margin-top: 7px;">
        <span class="badge bg-primary">{appliedFilters} Filter(s) Applied</span>
      </div>
    {/if}
    {#if selectedCount > 0}
      <div class="p-2 bd-highlight">
        <div style="margin-top: 5px;">
          Selected: <strong>{selectedCount} of {filtered.length}</strong>
        </div>
      </div>
      <div class="p-2 bd-highlight">
        <div style="pointer: cursor;" on:click={() => markRead(true)}>
          <i class="fas fa-eye" />
        </div>
      </div>
      <div class="p-2 bd-highlight">
        <div style="pointer: cursor;" on:click={() => markRead(false)}>
          <i class="fas fa-eye-slash" />
        </div>
      </div>
      <div class="p-2 bd-highlight">
        <div style="pointer: cursor;" on:click={() => (modal = 'delete')}>
          <i class="fas fa-trash-alt" />
        </div>
      </div>
    {/if}
    <div class="p-2 bd-highlight">
      <div style="pointer: cursor;" on:click={() => (modal = 'toggle_column')}>
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
          <tbody>
            <tr>
              <th scope="col" style="width: 50px">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    checked={allRowsSelected}
                    on:change={selectAllRows}
                    id={'row-toggle-all'} />
                </div>
              </th>
              {#each filteredColumns as column (column)}
                <th
                  scope="col"
                  style={headerStyle(column)}
                  on:click={() => sortColumn(column)}>
                  {column}
                  <span>
                    {#if sort === column && sortDirection === 'asc'}
                      <span> <span class="fas fa-chevron-up" /> </span>
                    {:else if sort === column && sortDirection === 'desc'}
                      <span> <span class="fas fa-chevron-down" /> </span>
                    {/if}
                  </span>
                </th>
              {/each}
            </tr>
            {#each filtered as row, index}
              {#if index >= range.min && index <= range.max}
                <tr
                  class:active={row.meta_selected}
                  style="vertical-align: middle; cursor: pointer;"
                  on:click={() => {
                    onRowClick(row);
                    row['meta_unread'] = false;
                  }}>
                  <td class:unread={isUnread(row)}>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        checked={row.meta_selected}
                        on:click|stopPropagation
                        on:change|stopPropagation={(e) => {
                          onRowSelected(row);
                        }}
                        id={'row-toggle-' + index} />
                      {#if isUnread(row)}
                        <div>
                          <i
                            class="fas fa-circle"
                            style="width: .5em;margin-left:4px" />
                        </div>
                      {/if}
                    </div>
                  </td>
                  {#each filteredColumns as column}
                    <td class:unread={isUnread(row)}>
                      <div class="text" class:text-unread={isUnread(row)}>
                        {renderValue(row, column)}
                      </div>
                    </td>
                  {/each}
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
          if (fastEquals(r, range)) {
            return;
          }
          range = r;
          setWidths();
          columns = columns;
        }} />
    {/if}
  {:else if state === LoadState.Failed}
    <div style="padding-top:1em; padding-left: 1em;">
      <p>Failed to load rows, please try refreshing the page.</p>
    </div>
  {/if}
  {#if modal === 'toggle_column'}
    <Dialog
      title={'Toggle Column Visibility'}
      isOpen={true}
      onClose={() => {
        modal = '';
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
                toggleColumn(e.target.checked, column);
              }}
              id={'toggle-' + column} />
            <label
              class="form-check-label"
              for={'toggle-' + column}>{column}</label>
          </div>
        {/if}
      {/each}
    </Dialog>
  {:else if modal === 'delete'}
    <Dialog
      title={'Confirm Deletion'}
      isOpen={true}
      actions={[{ label: `Delete ${selectedCount} Entries`, type: 'danger', onClick: deleteEntries }, { label: 'Cancel', type: 'secondary' }]}
      onClose={() => {
        modal = '';
      }}>
      <p>Are you sure you want to delete {selectedCount} entries?</p>
    </Dialog>
  {:else if modal === 'filter'}
    <Dialog
      title={'Manage Filters'}
      isOpen={true}
      onClose={() => {
        modal = '';
      }}>
      <div class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          bind:checked={filters.onlyUnread}
          on:click|stopPropagation />
        <label class="form-check-label">Only Show Unread Items</label>
      </div>
    </Dialog>
  {/if}
</div> -->
