<script lang="typescript">
  import type { IField } from 'models/IField'
  import { subscribeFieldChange } from 'event/FieldEvent'
  import Label from './Label.svelte'
  import { onMount } from 'svelte'
  import formStore from 'store/FormStore'

  export let field: IField
  export let value = ''
  export let type = 'text'

  onMount(() => {
    value = formStore.getValue(field.configTarget ?? field.id) ?? ''

    subscribeFieldChange((newField) => {
      if (newField.id === field.id) {
        value = newField.value ?? ''
      }
    })
  })
</script>

<div class="form-group">
  {#if !field.hideLabel}
    <Label {field} />
  {/if}
  {#if field.rows && field.rows > 1}
    <textarea
      rows={field.rows}
      on:click|stopPropagation
      on:input={(e) => {
        field.value = e.target.value ?? ''
        formStore.set(field, { fromUser: true, field: 'value', value: field.value })
        field.onChange?.(e.target.value)
      }}
      class={field.properties?.className ?? 'form-control'}
      id={field.id}
      {value}
      placeholder={field.placeholder ?? ''}
      name={field.name}
      {type} />
  {:else}
    <input
      on:click|stopPropagation
      on:input={(e) => {
        field.value = e.target.value ?? ''
        formStore.set(field, { fromUser: true, field: 'value', value: field.value })
        field.onChange?.(e.target.value)
      }}
      class={field.properties?.className ?? 'form-control'}
      id={field.id}
      {value}
      placeholder={field.placeholder ?? ''}
      name={field.name}
      {type} />
  {/if}
  {#if field.helperText}
    <small class="form-text text-muted">
      {@html field.helperText ?? ''}
    </small>
  {/if}
</div>
