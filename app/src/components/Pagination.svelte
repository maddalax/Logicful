<script lang="typescript">
  import { afterUpdate } from 'svelte'

  export let rowsPerPage = 10
  export let page = 1
  export let count = 0
  export let onRangeChange: ({ min, max }: { min: number; max: number }) => any
  let pages = 1
  let hasNext = true
  let hasPrevious = false
  let rowsPerPageEntries = [10, 25, 50, 100]
  let showing = '';

  afterUpdate(() => {
    onChange()
  })

  function onChange() {
    pages = Math.ceil(count / rowsPerPage)
    if(page > pages) {
        page = pages || 1;
    }
    hasNext = page < pages
    hasPrevious = page > 1
    let showingCount = Math.floor(page * rowsPerPage);
    showingCount = showingCount >= count ? Math.floor(count) : showingCount
    showing = `Showing ${showingCount} / ${Math.floor(count)} Entries`
    onRangeChange(range())
    console.log('count', count, 'pages', pages, 'page', page, 'hasNext', hasNext, 'hasPrev', hasPrevious, 'range', range())
  }

  function setRowsPerPage(newValue : number) {
    rowsPerPage = newValue;
    page = 1;
  }

  function setPage(newPage: number) {
    page = newPage
  }

  function range(): { min: number; max: number } {
    const max = rowsPerPage * page
    const min = max - rowsPerPage
    return { min, max }
  }
</script>

<nav aria-label="Table Pagination">
  <ul class="pagination justify-content-end">
    <li>
      <div class="dropdown" style="margin-right: .5em">
        <button class="btn btn-secondary dropdown-toggle rows-page-button" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-expanded="false">
            {showing}
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          {#each rowsPerPageEntries as entry}
            <li>
              <a class="dropdown-item" href="javascript:void(0)" on:click={() => {
                setRowsPerPage(entry)    
            }}>Show {entry} Entires</a>
            </li>
          {/each}
        </ul>
      </div>
    </li>
    {#if hasPrevious}
      <li class="page-item">
        <a class="page-link" on:click={() => setPage(page - 1)} href="javascript:void(0)" tabindex="-1" aria-disabled="true">Previous</a>
      </li>
    {/if}
    {#if !hasNext && hasPrevious && page - 2 != 0}
      <li class="page-item">
        <a class="page-link" on:click={() => setPage(page - 2)} href="javascript:void(0)">{page - 2}</a>
      </li>
    {/if}
    {#if page > 1}
      <li class="page-item">
        <a class="page-link" on:click={() => setPage(page - 1)} href="javascript:void(0)">{page - 1}</a>
      </li>
    {/if}
    <li class="page-item active" aria-current="page">
      <a class="page-link" href="javascript:void(0)">{page}</a>
    </li>
    {#if hasNext}
      <li class="page-item">
        <a class="page-link" on:click={() => setPage(page + 1)} href="javascript:void(0)">{page + 1}</a>
      </li>
    {/if}
    {#if page === 1 && pages >= 3}
      <li class="page-item">
        <a class="page-link" on:click={() => setPage(page + 2)} href="javascript:void(0)">{page + 2}</a>
      </li>
    {/if}
    {#if hasNext}
      <li class="page-item">
        <a class="page-link" on:click={() => setPage(page + 1)} href="javascript:void(0)">Next</a>
      </li>
    {/if}
  </ul>
</nav>

<style>
  .rows-page-button {
    height: 40px;
    margin-left: 1em;
  }
</style>
