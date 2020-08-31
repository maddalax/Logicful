<script lang="typescript">
  // @ts-nocheck
  import Field from './Field.svelte'
  import type { IForm } from 'models/IForm'
  import type { IField } from 'models/IField'
  import { subscribeFieldChange } from 'event/FieldEvent'
  import { DynamicFormMode } from 'components/models/ComponentProps'
  import { dndzone } from 'svelte-dnd-action'
  import { dispatchSync, subscribe } from 'event/EventBus'
  import { transformDraggedElement } from './util/Draggable'
  import formStore from 'store/FormStore'
  import { LogicBuilder } from 'services/LogicBuilder'
  import { fastClone } from 'util/Compare'
  import { onMount } from 'svelte'
  import { goto } from '@sapper/app'

  export let form: IForm
  export let mode: DynamicFormMode = DynamicFormMode.Live
  let considering: boolean = false
  let values: { [key: string]: any } = {}
  let hasPlaceholder: boolean = false
  let fromSidebar = false

  function handler(e: any) {
    if (fromSidebar) {
      considering = e.type === 'consider'
      setDropZoneStyles()
    }
    dispatchSync('block_dropped', e)
  }

  function setDropZoneStyles() {
    const element = document.getElementById('form-preview').childNodes.item(0)
    element.style = dropzoneStyles()
  }

  onMount(() => {
    subscribe('form_placeholder_changed', (props) => {
      hasPlaceholder = props.added
      setDropZoneStyles()
    })
    subscribe('drag_event', (props) => {
      fromSidebar = props.type === 'consider'
      considering = props.type === 'consider'
      setDropZoneStyles()
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

  function onFormPreview(formId: string) {
    console.log(formId)
    goto(`./preview/${formId}`)
  }

  function onSubmit() {}

  function dropzoneStyles() {
    if (!considering) {
      return ''
    }
    if (form.fields.length === 1 && form.fields[0].type === 'placeholder') {
      return 'background-color: white'
    }
    if (hasPlaceholder) {
      return 'background-color: white'
    }
    if (considering) {
      return 'background-color: #f5f5f5; padding-top: 3em; padding-bottom: 3em;'
    }
    return 'background-color: #f5f5f5; padding-top: 3em; padding-bottom: 3em;'
  }
</script>

<div class="row" style="padding-left: 0.5em; display: flex">
  <div class="col">
    <h4>{form.title ?? 'Form Title'}</h4>
  </div>
  <div class="col-auto" style="text-align: right">
    <a href={`/preview/${form.id}`} target="_blank" class="btn btn-xs btn-outline-dark">Preview Form</a>
  </div>
</div>
<hr style="margin: 0.5rem;" />
<form on:submit|preventDefault={onSubmit} class="preview-padding" id="form-preview">
  <div
    style="padding-bottom: 1em"
    use:dndzone={{ items: form.fields, flipDurationMs: 300, transformDraggedElement, dropTargetStyle: { 'background-color': 'white' } }}
    on:consider={handler}
    on:finalize={handler}>
    {#each form.fields as field (field.id)}
      {#if display(field)}
        <div>
          <Field field={fastClone(field)} />
        </div>
      {:else}
        <div>
          <Field field={fastClone(field)} hidden={true} />
        </div>
      {/if}
    {/each}
  </div>
  <button style="margin-left: 0.5em" class="btn btn-primary" type="submit">Submit</button>
</form>

<style>

</style>
