<script lang="typescript">
  import { subscribe, subscribeComponent } from '@app/event/EventBus'
  import type { IForm } from '@app/models/IForm'
  import { onMount } from 'svelte'
import Link from '../Link.svelte'

  export let form: IForm
  export let selected: string

  subscribeComponent('form_loaded', (updatedForm) => {
    form = updatedForm
  })
  subscribeComponent('form_updated', (updatedForm) => {
    form = updatedForm
  })
</script>

<div class="card border-light p-2">
  <div class="card-header bg-white border-0" style="padding-bottom: 0.5em;">
    <div style="display: flex;">
      <h2 class="h4 mt-3">Form Settings</h2>
      <div class="ml-auto" style="padding-top: 1.1em;"><span class="h4 fas fa-cogs" /></div>
    </div>
    <hr />
    <h2 class="h5">{form.title} Form</h2>
  </div>
  <div class="card-body p-2">
    <div class="list-group dashboard-menu list-group-sm">
      <Link href="./form-settings?formId={form.id}" class="d-flex list-group-item border-0 list-group-item-action {selected === 'general' ? 'active' : ''}">
        General <span class="icon icon-xs ml-auto"> <span class="fas fa-chevron-right" /> </span>
      </Link>
      <Link href="./form-settings/workflows?formId={form.id}" class="d-flex list-group-item border-0 list-group-item-action {selected === 'workflows' ? 'active' : ''}">
        Workflows <span class="icon icon-xs ml-auto"> <span class="fas fa-chevron-right" /> </span>
      </Link>
      <Link href="./form-settings/emails?formId={form.id}" class="d-flex list-group-item border-0 list-group-item-action {selected === 'emails' ? 'active' : ''}">
        Emails <span class="icon icon-xs ml-auto"> <span class="fas fa-chevron-right" /> </span>
      </Link>
      <Link href="./form-settings/scoring?formId={form.id}" class="d-flex list-group-item border-0 list-group-item-action {selected === 'scoring' ? 'active' : ''}">
        Scoring <span class="icon icon-xs ml-auto"> <span class="fas fa-chevron-right" /> </span>
      </Link>
    </div>
  </div>
</div>

