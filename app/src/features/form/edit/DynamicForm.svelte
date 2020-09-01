<script lang="typescript">
  // @ts-nocheck
  import Field from './Field.svelte'
  import type { IForm } from 'models/IForm'
  import type { IField } from 'models/IField'
  import { subscribeFieldChange } from 'event/FieldEvent'
  import { DynamicFormMode } from 'components/models/ComponentProps'
  import { dndzone } from 'svelte-dnd-action'
  import { dispatch, dispatchSync, subscribe } from 'event/EventBus'
  import { transformDraggedElement } from './util/Draggable'
  import formStore from 'store/FormStore'
  import { LogicBuilder } from 'services/LogicBuilder'
  import { fastClone } from 'util/Compare'
  import { onMount } from 'svelte'
  import { goto } from '@sapper/app'
  import Dialog from 'components/layout/Dialog.svelte'
import { randomString } from 'util/Generate';

  export let form: IForm
  export let mode: DynamicFormMode = DynamicFormMode.Live
  let considering: boolean = false
  let values: { [key: string]: any } = {}
  let hasPlaceholder: boolean = false
  let fromSidebar = false
  let deleting = false
  onMount(() => {
    subscribe('confirm_field_deletion', () => {
      deleting = true
    })
    subscribe('form_placeholder_changed', (props) => {
      hasPlaceholder = props.added
    })
  })

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
    if (!form.enableLogic) {
      //return true
    }
    if (!field.logic) {
      return true
    }
    const builder = new LogicBuilder()
    return builder.evaluate(field)
  }

  function onFormPreview() {
    const form = formStore.getForm()
    localStorage.setItem('form', JSON.stringify(form))
    if (form.id) {
      window.open(`./preview/${form.id}?mode=local`, '_blank')
    } else {
      window.open(`./preview/local?mode=local`, '_blank')
    }
  }

  function onDelete() {
    const selected = form.fields.find((w) => w.selected)
    if (selected) {
      dispatch('field_delete', {
        field: selected,
      })
    }
  }


  function dropzoneStyles() {
    if (!dragging) {
      return ''
    }
    if (form.fields.length === 1 && form.fields[0].type === 'placeholder') {
      return 'background-color: white'
    }
    if (hasPlaceholder) {
      return 'background-color: white'
    }
    if (dragging) {
      return 'background-color: #f5f5f5; padding-top: 3em; padding-bottom: 3em;'
    }
    return 'background-color: #f5f5f5; padding-top: 3em; padding-bottom: 3em;'
  }
</script>

{#if deleting}
  <Dialog
    title={'Confirm Deletion'}
    isOpen={true}
    actions={[{ label: `Delete Field`, type: 'danger', onClick: onDelete, focus: true }, { label: 'Cancel', type: 'secondary' }]}
    onClose={() => {
      deleting = false
    }}>
    <p>Are you sure you want to delete this field? Deletion is permanent and cannot be reversed.</p>
    <p>Changes will be applied after the form is saved.</p>
  </Dialog>
{/if}
<div class="row" style="padding-left: 0.5em; display: flex">
  <div class="col">
    <h4>{form.title ?? 'Form Title'}</h4>
  </div>
  <div class="col-auto" style="text-align: right"><button on:click={onFormPreview} target="_blank" class="btn btn-xs btn-outline-dark">Preview Form</button></div>
</div>
<hr style="margin-top: 0.5rem; margin-bottom: 0.7rem;" />
<form class="preview-padding" id="form-preview">
  <div style="padding-bottom: 1em" id="form-preview-fields">
    {#each form.fields as field (field.id)}
      {#if display(field)}
        <div id={`form-field-${field.id}`}>
          <Field field={fastClone(field)} />
        </div>
      {:else}
        <div id={`form-field-${field.id}`}>
          <Field field={fastClone(field)} hidden={true} />
        </div>
      {/if}
    {/each}
  </div>
  <button style="margin-left: 0.5em" class="btn btn-primary" type="submit">Submit</button>
</form>

<style>

</style>
