<script lang="typescript">
  import { onMount } from 'svelte'
  import type { IField } from 'models/IField'
  import Label from '../inputs/Label.svelte'

  export let field: IField
  let value: string = ''
  let picker: any

  onMount(async () => {
    const flatpickr = await import('flatpickr')
    //@ts-ignore
    import('flatpickr/dist/flatpickr.min.css')
    picker = flatpickr.default(document.getElementById(field.id!)!, {
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
<input id={field.id} type="text" class="form-control date-input-hidden" value={value ?? ''} placeholder="Select a date..." />

<style type="text/scss">
  .date-input-hidden {
    background-color: white !important;
    opacity: 1;
  }
</style>
