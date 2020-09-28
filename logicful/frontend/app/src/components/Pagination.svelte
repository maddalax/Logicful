<script lang="typescript">
  import { subscribePrivate } from "@app/event/EventBus";

  import { afterUpdate, onMount } from "svelte";

  export let id = "";
  export let rowsPerPage = 10;
  export let page = 1;
  export let count = 0;
  export let onRangeChange: ({ min, max }: { min: number; max: number }) => any;
  let pages = 1;
  let hasNext = true;
  let hasPrevious = false;
  let rowsPerPageEntries = [10, 25, 50, 100];
  let showing = "";

  afterUpdate(() => {
    onChange();
  });

  onMount(() => {
    subscribePrivate(id, "on_sort", () => {
      page = 1;
    });
  });

  function onChange() {
    pages = Math.ceil(count / rowsPerPage);
    if (page > pages) {
      page = pages || 1;
    }
    hasNext = page < pages;
    hasPrevious = page > 1;
    let showingCount = Math.floor(page * rowsPerPage);
    showingCount = showingCount >= count ? Math.floor(count) : showingCount;
    showing = `Showing ${showingCount} / ${Math.floor(count)} Entries`;
    onRangeChange(range());
    console.log(
      "count",
      count,
      "pages",
      pages,
      "page",
      page,
      "hasNext",
      hasNext,
      "hasPrev",
      hasPrevious,
      "range",
      range()
    );
  }

  function setRowsPerPage(newValue: number) {
    rowsPerPage = newValue;
    page = 1;
  }

  function setPage(newPage: number) {
    page = newPage;
  }

  function range(): { min: number; max: number } {
    const max = rowsPerPage * page;
    const min = max - rowsPerPage;
    return { min, max };
  }
</script>

<nav aria-label="Table Pagination">
  <ul class="pagination justify-content-end">
    <li>
      <div class="dropdown" style="margin-right: .5em">
        <button
          class="btn btn-secondary dropdown-toggle rows-page-button"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-expanded="false">{showing}</button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          {#each rowsPerPageEntries as entry}
            <li>
              <a
                class="dropdown-item"
                href="javascript:void(0)"
                on:click={() => {
                  setRowsPerPage(entry);
                }}>
                Show {entry} Entries
              </a>
            </li>
          {/each}
        </ul>
      </div>
    </li>
    <li class="page-item">
      <button
        class="page-link btn"
        disabled={!hasPrevious}
        on:click={() => setPage(page - 1)}
        tabindex="-1"
        aria-disabled="true">Previous</button>
    </li>
    {#if hasPrevious && page - 2 >= 1}
      <li class="page-item">
        <button
          class="page-link btn"
          on:click={() => setPage(page - 2)}
          href="javascript:void(0)">{page - 2}</button>
      </li>
    {/if}
    {#if page > 1}
      <li class="page-item">
        <button
          class="page-link btn"
          on:click={() => setPage(page - 1)}
          href="javascript:void(0)">{page - 1}</button>
      </li>
    {/if}
    <li class="page-item active" aria-current="page">
      <button class="page-link btn" href="javascript:void(0)">{page}</button>
    </li>
    {#if hasNext}
      <li class="page-item">
        <button
          class="page-link btn"
          on:click={() => setPage(page + 1)}
          href="javascript:void(0)">{page + 1}</button>
      </li>
    {/if}
    {#if page + 2 <= pages}
      <li class="page-item">
        <button
          class="page-link btn"
          on:click={() => setPage(page + 2)}
          href="javascript:void(0)">{page + 2}</button>
      </li>
    {/if}
    <li class="page-item">
      <button
        class="page-link btn btn-primary"
        disabled={!hasNext}
        on:click={() => setPage(page + 1)}>Next</button>
    </li>
  </ul>
</nav>

<style>
  .rows-page-button {
    height: 40px;
    margin-left: 1em;
  }
</style>
