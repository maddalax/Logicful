<script lang="typescript">
  import { subscribe } from 'event/EventBus'
  import type { IForm } from 'models/IForm'
  import { onMount } from 'svelte'

  export let form: IForm
  export let selected: string

  onMount(() => {
    subscribe('form_loaded', (updatedForm) => {
      form = updatedForm
    })
    subscribe('form_updated', (updatedForm) => {
      form = updatedForm
    })
  })
</script>

<div class="card border-light p-2">
  <div class="card-header bg-white border-0" style="padding-bottom: 0.5em;">
    <div style="display: flex;">
      <h2 class="h4 mt-3">Form Settings</h2>
      <div class="ml-auto" style="padding-top: 1.1em;">
        <span class="h4 fas fa-cogs" />
      </div>
    </div>
    <hr />
    <h2 class="h5">{form.title} Form</h2>
  </div>
  <div class="card-body p-2">
    <div class="list-group dashboard-menu list-group-sm">
      <a href="./form-settings" class="d-flex list-group-item border-0 list-group-item-action {selected === 'general' ? 'active' : ''}">
        General
        <span class="icon icon-xs ml-auto">
          <span class="fas fa-chevron-right" />
        </span>
      </a>
      <a href="./submissions/{form.id}" class="d-flex list-group-item border-0 list-group-item-action {selected === 'submissions' ? 'active' : ''}">
        Submissions
        <span class="icon icon-xs ml-auto">
          <span class="fas fa-chevron-right" />
        </span>
      </a>
      <a href="./form-settings/{form.id}/notifications" class="d-flex list-group-item border-0 list-group-item-action {selected === 'submission-notification' ? 'active' : ''}">
        Submission Notifications
        <span class="icon icon-xs ml-auto">
          <span class="fas fa-chevron-right" />
        </span>
      </a>
      <a href="./form-settings/{form.id}/workflows" class="d-flex list-group-item border-0 list-group-item-action {selected === 'workflows' ? 'active' : ''}">
        Workflows
        <span class="icon icon-xs ml-auto">
          <span class="fas fa-chevron-right" />
        </span>
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

  .h5 {
  }
</style>
