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
  
    export let form: IForm
    let values: { [key: string]: any } = {}
  
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
  
    function onSubmit() {
      console.log('SUBMIT', values)
      //const validator = new AddressService();
      //validator.normalize(values.address);
    }
  </script>
  
  <div style="padding-left: 0.5em;">
    <h4>{form.title ?? 'Form Title'}</h4>
    <hr />
  </div>
  <form on:submit|preventDefault={onSubmit}>
    <div
      style="padding-bottom: 1em">      
      {#each form.fields as field (field.id)}
        {#if display(field)}
          <div>
            <LiveField field={fastClone(field)} />
          </div>
        {:else}
          <div>
            <LiveField field={fastClone(field)} hidden={true} />
          </div>
        {/if}
      {/each}
    </div>
    <button style="margin-left: 0.5em" class="btn btn-primary" type="submit">Submit</button>
  </form>
  
  <style>
  
  </style>
  