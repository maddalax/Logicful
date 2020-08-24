<script lang="ts">
  import type {
    TableRow,
    TableButtonAction,
  } from "components/models/RemoteTableProps";
  import { onMount } from "svelte";
  import Fuse from "fuse.js";
  import { LoadState } from "models/LoadState";
  import { randomString } from "util/Generate";
  import Accordion from "./Accordion.svelte";

  export let getRows: () => Promise<TableRow[]>;

  let caption: string = "";
  let searchPlaceHolder = "Search";
  let rows: TableRow[] = [];
  let filtered: TableRow[] = [];
  let columns: string[] = [];
  let query = "";
  let fuse: Fuse<{}>;
  let state = LoadState.Loading;
  let lastSelectedIndex = -1;

  export let headerActions: TableButtonAction[];
  export let onEdit: (row: any) => any;
  export let onDelete: (row: any) => any;
  export let hidden = new Set<string>();

  function createFuse(): Fuse<{}> {
    const list = rows.map((r) => {
      const result = {};
      Object.keys(r).forEach((key) => {
        result[key] = r[key];
      });
      return result;
    });
    return new Fuse(list, {
      keys: Object.keys(rows[0]),
    });
  }

  onMount(() => {
    hidden.add("table_meta_id");
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

  async function load() {
    try {
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
      columns = Object.keys(rows[0] ?? {}).filter((w) => !hidden.has(w));
      state = LoadState.Finished;
    } catch (ex) {
      state = LoadState.Failed;
    }
  }

  function onRowClick(row: any, index: number) {
    if (lastSelectedIndex !== -1) {
      filtered[lastSelectedIndex]?.meta_selected = false;
    }
    lastSelectedIndex = index;
    filtered[index].meta_selected = true;
  }
</script>

<div>
  <div class="d-flex container-fluid">
    <div class="container-fluid" style="padding-left: 0em;">
      <input
        class="form-control search-bar container-fluid"
        placeholder={searchPlaceHolder}
        bind:value={query}
      />
    </div>
    <div class="text-right button">

      {#if headerActions}
        {#each headerActions as action}
          <button
            class="btn btn-primary"
            style="padding-left: 1em; width: 200px;"
            on:click={action.onClick}
          >
            {action.label}
          </button>
        {/each}
      {/if}
    </div>

  </div>

  {#if state === LoadState.Loading}
    <div style="text-align: center; padding-top: 1em; padding-bottom: 1em;">
      <div class="spinner-border text-secondary" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  {:else if state === LoadState.Finished}
    {#if rows.length === 0}
      <div style="text-align: center; padding-top: 1em; padding-bottom: 1em;">
        <div class="text-secondary">
          <p>No results to display.</p>
        </div>
      </div>
    {:else}
      <table class="table table-hover" style="width: 100%; margin: unset">
        <caption>{caption}</caption>
        <tbody>
          <tr>
            {#each columns as column}
              <th scope="col">{column}</th>
            {/each}
            {#if onDelete || onEdit}
              <th scope="col" />
            {/if}
          </tr>
          {#each filtered as row, index}
            <tr
              class:active={row.meta_selected}
              on:click={() => onRowClick(row, index)}
              style="vertical-align: middle;"
            >
              {#each columns as column}
                <td>
                  <div class="text">{row[column]}</div>
                </td>
              {/each}
              {#if onEdit}
                <button class="btn" on:click={() => onEdit(row)}>
                  <div class="icon icon-sm icon-secondary">
                    <span class="fas fa-pencil-alt" />
                  </div>
                </button>
              {/if}
              {#if onDelete}
                <button class="btn" on:click={() => onDelete(row)}>
                  <div class="icon icon-sm icon-secondary">
                    <span class="fas fa-trash" />
                  </div>
                </button>
              {/if}
            </tr>
          {/each}
        </tbody>
      </table>
    {/if}
  {:else if state === LoadState.Failed}
    <div style="padding-top:1em; padding-left: 1em;">
      <p>Failed to load rows, please try refreshing the page.</p>
    </div>
  {/if}
</div>

<style>
  .table-hover {
    width: 95% !important;
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
    max-width: 350px;
  }

  .text {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1; /* number of lines to show */
    -webkit-box-orient: vertical;
  }
  .save-btn {
  }
</style>
