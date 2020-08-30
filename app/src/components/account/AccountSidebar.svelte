<script>
    export let page = ''
</script>

<div class="card border-light p-2">
    <div class="card-header bg-white border-0 text-center">
        <h2 class="h5 mt-3">Hi, Sydne!</h2>
        <a href="#" class="btn btn-gray btn-xs"><span class="mr-2"><span class="fas fa-sign-out-alt"></span></span>Sign Out</a>
    </div>
    <div class="card-body p-2">
        <div class="list-group dashboard-menu list-group-sm">
            <a href="./account-settings" class="d-flex list-group-item border-0 list-group-item-action {page === 'settings' ? 'active' : ''}">Settings<span class="icon icon-xs ml-auto"><span class="fas fa-chevron-right"></span></span> </a>
            <a href="./account-settings/security" class="d-flex list-group-item border-0 list-group-item-action {page === 'security' ? 'active' : ''}">Security<span class="icon icon-xs ml-auto"><span class="fas fa-chevron-right"></span></span> </a>
            <a href="./account-settings/billing" class="d-flex list-group-item border-0 list-group-item-action {page === 'billing' ? 'active' : ''}">Billing<span class="icon icon-xs ml-auto"><span class="fas fa-chevron-right"></span></span> </a>
        </div>
    </div>
</div>