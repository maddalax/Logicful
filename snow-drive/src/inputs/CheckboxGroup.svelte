<script lang="typescript">
  import type { IField } from '@app/models/IField'
  import { subscribeFieldChange } from '@app/event/FieldEvent'
  import Label from './Label.svelte'
  import { onMount } from 'svelte'
  import formStore from '@app/store/FormStore'
  import { isEmptyOrNull } from '@app/util/Compare'
  import { afterUpdate, object_without_properties } from 'svelte/internal'
  import { debounce } from '@app/util/Debounce'

  export let field: IField
  export let value: { [key: string]: string } = {}
  let otherText: string = ''
  let debouncedOnChange: any

  subscribeFieldChange(onMount, (newField) => {
    if (newField.id === field.id) {
      value = newField.value ?? {}
      otherText = value.other ?? ''
    }
  })

  onMount(() => {
    debouncedOnChange = debounce((field: IField) => {
      formStore.set(field, { fromUser: true, field: 'value', value: field.value })
    }, 500)

    value = formStore.getValue(field.configTarget ?? field.id) ?? {}
    otherText = value.other ?? ''
  })

  function onOtherChange(e: any) {
    otherText = e.target.value
    if (otherText === '' || otherText == null) {
      delete value.other
    } else {
      value.other = otherText ?? ''
    }
    field.value = value
    debouncedOnChange(field)
  }

  function onChange(e: any, option: any) {
    e.stopPropagation()
    if (e.target.checked) {
      value[option] = option
    } else {
      delete value[option]
    }
    field.value = value
    formStore.set(field, {
      fromUser: true,
      field: 'value',
      value: field.value,
    })
  }

  function isChecked(option: any) {
    return value[option] != null && value[option] != ''
  }
</script>

{#if !field.hideLabel}
  <Label {field} />
{/if}
{#if field.options}
  {#each field.options as option}
    <div class="form-check">
      <input class="form-check-input" type="checkbox" on:click|stopPropagation on:change={(e) => onChange(e, option)} value="" checked={isChecked(option)} id={`${field.id}-${option}`} />
      <label class="form-check-label" for={`${field.id}-${option}`}>{option}</label>
    </div>
  {/each}
  {#if field.includeOther}
    <input class="form-check-input" on:click|stopPropagation type="checkbox" value="" checked={otherText != ''} id={`${field.id}-other`} />
    <label class="form-check-label" for={`${field.id}-other`}>Other: </label>
    <input class="form-control" type="text" on:click|stopPropagation on:input={(e) => onOtherChange(e)} value={otherText} id={`${field.id}-other`} />
  {/if}
{/if}
