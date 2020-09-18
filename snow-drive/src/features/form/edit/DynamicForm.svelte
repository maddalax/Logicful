<script lang="typescript">
  // @ts-nocheck
  import Field from './Field.svelte'
  import type { IForm } from '@app/models/IForm'
  import type { IField } from '@app/models/IField'
  import { subscribeFieldChange } from '@app/event/FieldEvent'
  import { DynamicFormMode } from '@app/components/models/ComponentProps'
  import { dispatch, subscribeComponent } from '@app/event/EventBus'
  import { LogicBuilder } from '@app/services/LogicBuilder'
  import { fastClone } from '@app/util/Compare'
  import { onMount } from 'svelte'
  import Dialog from '@app/components/layout/Dialog.svelte'

  export let form: IForm
  export let mode: DynamicFormMode = DynamicFormMode.Live
  let deleting = false

  subscribeComponent('confirm_field_deletion', () => {
    deleting = true
  })

  subscribeFieldChange(onMount, (updatedField: IField) => {
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
    if (!form.enableLogic) {
      return true
    }
    if (!field.logic) {
      return true
    }
    const builder = new LogicBuilder()
    return builder.evaluate(field)
  }

  function onDelete() {
    const selected = form.fields.find((w) => w.selected)
    if (selected) {
      dispatch('field_delete', {
        field: selected,
      })
    }
  }
</script>

{#if deleting}
  <Dialog
    title={'Confirm Deletion'}
    isOpen={true}
    actions={[{ label: `Delete Field`, type: 'danger', onClick: onDelete, focus: true }, { label: 'Cancel', type: 'secondary' }]}
    onClose={() => {
      deleting = false
    }}
  >
    <p>Are you sure you want to delete this field? Deletion is permanent and cannot be reversed.</p>
    <p>Changes will be applied after the form is saved.</p>
  </Dialog>
{/if}
<div class="row" style="padding-left: 0.5em; display: flex">
  <div class="col">
    <h4>{form.title || 'Form Title'}</h4>
    <small class="text-gray-700">{form.description ?? ''}</small>
  </div>
  <div class="col-auto" style="text-align: right">
    <a href={`/form/preview?formId=${form.id == null ? '' : form.id}&mode=local`} target="_blank" class="btn btn-xs btn-outline-dark">Preview Form</a>
  </div>
</div>
<hr style="margin-top: 0.5rem; margin-bottom: 0.7rem;" />
<form class="preview-padding" id="form-preview">
  <div style="padding-bottom: 1em" id="form-preview-fields">
    {#each form.fields as field (field.id)}
    <div id={`form-field-${field.id}`}>
      <Field field={fastClone(field)} hidden={!display(field)}/>
    </div>
    {/each}
  </div>
</form>

<style>
  :global(.ex-over) {
    background-color: #f5f5f5;
    height: 100%;
    min-height: 25vh;
    margin-top: 1em;
    margin-bottom: 1em;
  }
</style>
