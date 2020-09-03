<script lang="typescript">
  export let page: string = ''
</script>

<div class="card border-light p-2">
  <div class="card-header bg-white border-0">
    <h2 class="h5 mt-3">Sydne Anschutz</h2>
  </div>
  <div class="card-body p-2">
    <div class="list-group dashboard-menu list-group-sm">
      <a href="./account-settings" class="d-flex list-group-item border-0 list-group-item-action {page === 'settings' ? 'active' : ''}">Settings<span class="icon icon-xs ml-auto"><span
            class="fas fa-chevron-right"
          /></span>
      </a>
      <a href="./account-settings/security" class="d-flex list-group-item border-0 list-group-item-action {page === 'security' ? 'active' : ''}">Security<span class="icon icon-xs ml-auto"><span
            class="fas fa-chevron-right"
          /></span>
      </a>
      <a href="./account-settings/billing" class="d-flex list-group-item border-0 list-group-item-action {page === 'billing' ? 'active' : ''}">Billing<span class="icon icon-xs ml-auto"><span
            class="fas fa-chevron-right"
          /></span>
      </a>
    </div>
  </div>
</div>

<style>
  .active {
    color: #26304c !important;
    border-radius: 0.3em;
  }

  .card {
    border-radius: 0.3em;
  }

  .list-group.dashboard-menu .list-group-item:hover {
    border-radius: 0.3em;
  }
</style>
