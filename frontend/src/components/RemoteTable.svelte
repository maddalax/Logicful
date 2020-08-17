<script lang="ts">
    import type {TableRow, TableButtonAction} from 'components/models/RemoteTableProps';
    import {onMount} from 'svelte';
    import Fuse from 'fuse.js';
    import {LoadState} from "models/LoadState";
    import {randomString} from "../util/Generate";

    export let getRows: () => Promise<TableRow[]>;

    let caption: string = '';
    let searchPlaceHolder = 'Search';
    let rows: TableRow[] = [];
    let filtered: TableRow[] = [];
    let columns: string[] = [];
    let query = '';
    let fuse: Fuse<{}>;
    let state = LoadState.Loading;
    let lastSelectedIndex = -1;

    export let headerActions: TableButtonAction[];
    export let actions: { [key: string]: (row: any) => any };
    export let hidden = new Set <string> ();

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
        hidden.add('table_meta_id');
        load();
    });

    $: {
        if(rows.length === 0) {
            filtered = rows;
        }
        else if (query === '') {
            filtered = rows;
        } else {
            const result = fuse.search(query);
            filtered = result.map((r) => r.item);
        }
    }

    async function load() {
        try {
            rows = await getRows();
            rows.map(w => {
                w.table_meta_id = randomString();
                return w;
            })
            fuse = createFuse();
            filtered = rows;
            columns = Object.keys(rows[0] ?? {}).filter((w) => !hidden.has(w));
            state = LoadState.Finished;
        } catch(ex) {
            state = LoadState.Failed;
        }
    }

    function onRowClick(row : any, index : number) {
      if(lastSelectedIndex !== -1) {
          filtered[lastSelectedIndex]?.meta_selected = false;
      }
      lastSelectedIndex = index;
      filtered[index].meta_selected = true;
    }

</script>

<style>
    .table tbody tr:hover td {
        background-color: #f0f0f0 !important;
        cursor: pointer;
        border-radius: 0.45rem;
    }

    td.active {
        background-color: #f0f0f0 !important;
        border-radius: 0.45rem;
    }

    td {
        max-width: 350px;
    }

    .usa-table td {
        border-width: 0.5px;
        border-color: #ccc;
    }

    .usa-table thead th {
        background-color: #e8e8e8;
    }

    .text {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2; /* number of lines to show */
        -webkit-box-orient: vertical;
    }

</style>

<div>
    <input class="form-control" placeholder={searchPlaceHolder} bind:value={query}/>
    {#if headerActions}
        {#each headerActions as action}
            <button class="btn btn-primary" on:click={action.onClick}>{action.label}</button>
        {/each}
    {/if}
    {#if state === LoadState.Loading}
        <div class="loader"/>
    {:else if state === LoadState.Finished}
        <table class="table table-hover" style="width: 100%; margin: unset">
            <caption>{caption}</caption>
            <thead>
            <tr>
                {#each columns as column}
                    <th scope="col">{column}</th>
                {/each}
                {#if actions}
                    <th scope="col"></th>
                {/if}
            </tr>
            </thead>
            <tbody>
            {#each filtered as row, index}
                <tr on:click={() => onRowClick(row, index)}>
                    {#each columns as column}
                        <td scope="row" class:active={row.meta_selected}><div class="text">{row[column]}</div></td>
                    {/each}
                    {#if actions}
                        <td scope="row" class:active={row.meta_selected}>
                            {#each Object.keys(actions) as action}
                                <button
                                        class="usa-button usa-button--outline usa-button--unstyled"
                                        on:click={() => actions[action](row)}>
                                    {action}
                                </button>
                            {/each}
                        </td>
                    {/if}
                </tr>
            {/each}
            </tbody>
        </table>
    {:else if state === LoadState.Failed}
        <p>Failed to load rows, please try refreshing the page.</p>
    {/if}
</div>
