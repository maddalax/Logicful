<script lang="ts">
    import type { TableRow, TableButtonAction } from 'components/models/RemoteTableProps';
    import { onMount } from 'svelte';
    import Fuse from 'fuse.js';
    import { each } from 'svelte/internal';
    export let getRows: () => Promise<TableRow[]>;

    let caption: string = '';
    let searchPlaceHolder = 'Search';
    let rows: TableRow[] = [];
    let filtered: TableRow[] = [];
    let columns: string[] = [];
    let query = '';
    let fuse: Fuse<{}>;

    export let headerActions: TableButtonAction[];
    export let actions: { [key: string]: (row: any) => any };
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
        load();
    });

    $: {
        if (query === '') {
            filtered = rows;
        } else {
            const result = fuse.search(query);
            filtered = result.map((r) => r.item);
        }
    }

    async function load() {
        rows = await getRows();
        fuse = createFuse();
        filtered = rows;
        columns = Object.keys(rows[0] ?? {}).filter((w) => !hidden.has(w));
    }
</script>

<style>

</style>

<div>
    <input class="usa-input" placeholder={searchPlaceHolder} bind:value={query} />
    {#if headerActions}
        <ul class="usa-button-group" style="margin-top: 1em">
            {#each headerActions as action}
                <li class="usa-button-group__item">
                    <button class="usa-button" on:click={action.onClick}>{action.label}</button>
                </li>
            {/each}
        </ul>
    {/if}
    <table class="usa-table" style="width: 100%; margin: unset">
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
            {#each filtered as row}
                <tr>
                    {#each columns as column}
                        <th scope="row">{row[column]}</th>
                    {/each}
                    {#if actions}
                        <th scope="row">
                            <ul class="usa-button-group">
                                {#each Object.keys(actions) as action}
                                    <li class="usa-button-group__item">
                                        <button
                                            class="usa-button usa-button--outline usa-button--unstyled"
                                            on:click={() => actions[action](row)}>
                                            {action}
                                        </button>
                                    </li>
                                {/each}
                            </ul>
                        </th>
                    {/if}
                </tr>
            {/each}
        </tbody>
    </table>
</div>
