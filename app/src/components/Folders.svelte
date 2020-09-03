<script lang="typescript">
  import { afterUpdate, onMount } from 'svelte'

  export let selected: string
  let folders: string[] = []
  let searchPlaceHolder = 'Search for a form'
  let query = ''

  onMount(() => {
    folders = getFolders()
  })

  function getFolders() {
    return ['uncategorized', 'Job Listings', 'Surveys']
  }

  afterUpdate(() => {
    console.log(selected)
  })

  function newFolder() {}
</script>

<div class="card border-light p-2" style="padding-bottom: 1em !important;">
  <div class="container-fluid p-2 mt-3" style="padding-left: 0em;"><input class="form-control search-bar container-fluid" placeholder={searchPlaceHolder} bind:value={query} /></div>
  <div class="card-header card-header-title bg-white border-0" style="display: flex;"><span class="title">Your Folders</span></div>
  {#each folders as folder}
    <div class="card-body p-2">
      <div class="list-group dashboard-menu list-group-sm">
        <a href="./folder/{folder}" class="d-flex list-group-item border-0 list-group-item-action {folder === selected ? 'active' : ''}" style="padding-bottom: 0.5em; padding-top: 0.5em;">
          {#if folder === 'uncategorized'}<span class="fas fa-folder-minus" style="font-size: 1.3em;" />{:else}<span class="far fa-folder" style="font-size: 1.2em;" />{/if}
          <span style="padding-left: 0.5em;">{folder}</span>
          {#if folder === selected}<span class="icon icon-xs ml-auto"> <span class="fas fa-chevron-right" /> </span>{/if}
        </a>
      </div>
    </div>
  {/each}
  <button on:click={newFolder} class="btn btn-outline-dark"> <span class="fas fa-folder-plus" style="font-size: 1.2em;" /> <span style="font-weight: 400;">New Folder</span> </button>
</div>

<style>
  .card-header-title {
    padding-left: 0.9em;
    padding-right: 1em;
    padding-top: 1em;
    padding-bottom: 0.5em;
  }
  .list-group.dashboard-menu .list-group-item:hover {
    border-radius: 0.3em;
  }

  .active {
    color: #26304c !important;
    border-radius: 0.3em;
  }

  .card {
    border-radius: 0.3em;
  }

  .title {
    font-weight: 600;
    line-height: 1.3;
    color: #1c2540;
    padding-left: 0.5em;
    font-size: 1em;
  }

  .list-group-item {
    color: #26304c !important;
  }

  .p-2 {
    padding-left: 0.5rem !important;
    padding-top: 0rem !important;
    padding-bottom: 0rem !important;
  }

  .btn-outline-dark {
    margin-right: 0.9em;
    margin-left: 0.9em;
    padding-top: 0.4em;
    padding-bottom: 0.4em;
    margin-top: 1em;
  }
</style>
