<script lang="typescript">
  import { onMount } from 'svelte'
  import type { IField } from '@app/models/IField'
  import Label from '../inputs/Label.svelte'
import FieldContainer from '@app/features/form/live/FieldContainer.svelte'

  export let field: IField
  let value: string = ''
  let picker: any
  let input: any

  onMount(async () => {
    const flatpickr = await import('flatpickr')
    //@ts-ignore
    import('flatpickr/dist/flatpickr.min.css')

    if(!input) {
      return;
    }

    picker = flatpickr.default(input, {
      onChange: (selectedDates: any, dateStr: any, instance: any) => {
        value = dateStr
      },
      altInput: true,
      altFormat: 'F j, Y h:i K',
      dateFormat: 'Y-m-d h:i K',
      enableTime: true,
    })
  })

  function clearDate() {
    picker.clear()
  }
</script>

<Label {field} />
<input id={field.id} bind:this={input} type="text" class="form-control date-input-hidden" value={value ?? ''} placeholder="Select a date..." />

<style>
  .date-input-hidden {
    background-color: white !important;
    opacity: 1;
  }
</style>
