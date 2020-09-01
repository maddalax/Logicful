<script lang="typescript">
  import type { IField } from 'models/IField'
  import { subscribeFieldChange } from 'event/FieldEvent'
  import Label from './Label.svelte'
  import { onMount } from 'svelte'
  import formStore from 'store/FormStore'

  export let field: IField
  export let value: Set<string> = new Set<string>()

  onMount(() => {
    value = new Set(formStore.getValue(field.configTarget ?? field.id) ?? [])

    subscribeFieldChange((newField) => {
      if (newField.id === field.id) {
        value = new Set(newField.value ?? [])
      }
    })
  })

  function onChange(e: any, option: any) {
    e.stopPropagation()
    if(e.target.checked) {
      value.add(option)
    } else {
      value.delete(option)
    }
    console.log("VALUE", value);
    field.value = Array.from(value)
    formStore.set(field, {
      fromUser : true,
      field : 'value',
      value : field.value
    })
  }
</script>

{#if !field.hideLabel}
  <Label {field} />
{/if}
{#if field.options}
  {#each field.options as option}
    <div class="form-check">
      <input class="form-check-input" type="checkbox" on:click|stopPropagation on:change={(e) => onChange(e, option)} value="" checked={value?.has(option)} id={`${field.id}-${option}`} />
      <label class="form-check-label" for={`${field.id}-${option}`}>{option}</label>
    </div>
  {/each}
{/if}
