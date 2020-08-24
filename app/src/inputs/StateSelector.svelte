<script lang="typescript">
  import ComboBox from 'inputs/ComboBox.svelte'
  import type { FormValue } from 'models/IField'

  export let label: string = 'State'
  export let value: FormValue = ''
  export let name: string
  export let id: string
</script>

<ComboBox
  field={{ id: id, name: name, label: label, required: true, type: 'combobox', value: value, options: { type: 'remote', value: 'https://gist.githubusercontent.com/mshafrir/2646763/raw/8b0dbb93521f5d6889502305335104218454c2bf/states_hash.json' } }} />
