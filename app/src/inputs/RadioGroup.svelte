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

{#if !field.hideLabel}
  <Label {field} />
{/if}
<div class="form-check">
  <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked />
  <label class="form-check-label" for="exampleRadios1">Default radio</label>
</div>
<div class="form-check">
  <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2" />
  <label class="form-check-label" for="exampleRadios2">Second default radio</label>
</div>
<div class="form-check">
  <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value="option3" disabled />
  <label class="form-check-label" for="exampleRadios3">Disabled radio</label>
</div>
