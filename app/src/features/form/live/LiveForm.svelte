<script lang="typescript">
  // @ts-nocheck
  import LiveField from 'features/form/live/LiveField.svelte'
  import type { IForm } from 'models/IForm'
  import type { IField } from 'models/IField'
  import { subscribeFieldChange } from 'event/FieldEvent'
  import formStore from 'store/FormStore'
  import { LogicBuilder } from 'services/LogicBuilder'
  import { fastClone } from 'util/Compare'
  import { onMount } from 'svelte'
  import { submitForm } from 'features/form/live/service/SubmitForm'
  import { LoadState } from 'models/LoadState'
  import { fade } from 'svelte/transition';

  export let form: IForm
  export let mode : 'local' | '' = ''
  let state = LoadState.NotStarted

  subscribeFieldChange((updatedField: IField) => {
    if (!form || !form.fields) {
      return
    }
    const index = form.fields.findIndex((w) => w.id === updatedField.id)
    if (index === -1) {
      return
    }
    form.fields[index].updated = !form.fields[index].updated
    const fieldsWithRules = form.fields.filter((w) => {
      if (!w.logic || !w.logic.rules) {
        return false
      }
      const hasRule = w.logic.rules.find((rule) => rule.field === updatedField.id)
      return hasRule != null
    })
    for (let fieldWithRule of fieldsWithRules) {
      let ruleIndex = form.fields.findIndex((w) => w.id === fieldWithRule.id)
      form.fields[ruleIndex].updated = !form.fields[ruleIndex].updated
    }
  })

  function display(field: IField): boolean {
    if (!field.logic) {
      return true
    }
    const builder = new LogicBuilder()
    return builder.evaluate(field)
  }

  async function onSubmit() {
    state = LoadState.Loading
    try {
      await submitForm()
      state = LoadState.Finished
    } catch (ex) {
      console.error(ex);
      state = LoadState.Failed
    }
  }
</script>

<div style="padding-left: 0.5em;">
  <h4>{form.title ?? 'Form Title'}</h4>
  <hr />
</div>
<form on:submit|preventDefault={onSubmit}>
  <div style="padding-bottom: 1em">
    {#each form.fields as field (field.id)}
      {#if display(field)}
        <div transition:fade>
          <LiveField field={fastClone(field)} />
        </div>
      {:else}
        <div>
          <LiveField field={fastClone(field)} hidden={true} />
        </div>
      {/if}
    {/each}
  </div>
  {#if state === LoadState.NotStarted}
    <button style="margin-left: 0.5em; margin-bottom: 2em" class="btn btn-primary" type="submit">Submit</button>
  {:else if state === LoadState.Failed}
    <button style="margin-left: 0.5em; margin-bottom: 2em" class="btn btn-primary" type="submit">Failed to Submit, Click To Try Again</button>
  {:else if state === LoadState.Loading}
    <button style="margin-left: 0.5em; margin-bottom: 2em" class="btn btn-primary" disabled>Submitting...</button>
  {:else if state === LoadState.Finished}
    <button style="margin-left: 0.5em; margin-bottom: 2em" class="btn btn-primary" disabled>Submitted Successfully.</button>
  {/if}
</form>

<style>

</style>
