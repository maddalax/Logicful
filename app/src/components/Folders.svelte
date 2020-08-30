<script lang="typescript">
  import { afterUpdate, onMount } from 'svelte'

  export let selected: string
  let folders: string[] = []
  let searchPlaceHolder = 'Search'
  let query = ''

  onMount(() => {
    folders = getFolders()
  })

  function getFolders() {
    return ['uncategorized', 'Job Listings', 'Surveys']
  }

  afterUpdate(() =>{
    console.log(selected)
  })
</script>

<style>
    .list-group.dashboard-menu .list-group-item:hover {
        border-radius: .3em;
    }

    .active{
        color: #26304c !important;
        border-radius: .3em;
    }

    .card{
        border-radius: .3em;
    }

    .p-2{
        padding-left: 0.5rem !important;
        padding-top: 0.2rem !important;
        padding-bottom: 0.2rem !important;
    }
</style>


<div class="card border-light p-2" style="padding-bottom: 1em !important;">
    <div class="card-header bg-white border-0">
        <h2 class="h5 mt-3">Your Folders</h2>
    </div>
    <div class="container-fluid p-2" style="padding-left: 0em;">
        <input class="form-control search-bar container-fluid" placeholder={searchPlaceHolder} bind:value={query} />
    </div>
    {#each folders as folder}
        <div class="card-body p-2">
            <div class="list-group dashboard-menu list-group-sm">
                <a href="./folder/{folder}" class="d-flex list-group-item border-0 list-group-item-action {folder === selected ? 'active' : ''}">{folder}
                    {#if folder === selected}
                    <span class="icon icon-xs ml-auto">
                        <span class="fas fa-chevron-right">
                        </span>
                    </span> 
                    {/if}
                </a>
            </div>
        </div>
    {/each}
</div>
