<script lang="typescript">
  import { subscribeFieldChange } from 'event/FieldEvent'
  import LiveField from 'features/form/live/LiveField.svelte'

  import StateSelector from 'inputs/StateSelector.svelte'
  import TextInput from 'inputs/TextInput.svelte'
  import type { IField } from 'models/IField'
  import formStore from 'store/FormStore'
  import { afterUpdate, onMount } from 'svelte'
  import { randomString } from 'util/Generate'
  import ComboBox from './ComboBox.svelte'
  import Label from './Label.svelte'
  export let field: IField
  export let value: { [key: string]: any }

  let address1: IField
  let address2: IField
  let city: IField
  let state: IField
  let zip: IField

  subscribeFieldChange(onMount, (newField) => {
    if (newField.id === field.id) {
      value = newField.value
    }
  })

  onMount(() => {
    value = formStore.getValue(field.id) ?? {}
  })
</script>

<Label field={field} />
<div class="row" style="width: 100%;">
  <div class="col">
    <div class="row">
      <LiveField
        padding={false}
        field={{ required: true, name: `${field.name}.address1`, id: `${field.id}.value.address1`, helperText: 'Address Line 1', hideLabel: true, value: value?.address1?.value ?? '', type: 'string' }}
      />
    </div>
    <div class="row" style="padding-top: 0.8em;">
      <LiveField
        padding={false}
        field={{ required: true, name: `${field.name}.address2`, id: `${field.id}.value.address2`, helperText: 'Address Line 2', hideLabel: true, value: value?.address2?.value ?? '', type: 'string' }}
      />
    </div>
    <div class="row" style="padding-top: 0.8em;">
      <div class="col-5">
        <LiveField
          padding={false}
          field={{ required: true, name: `${field.name}.city`, id: `${field.id}.value.city`, helperText: 'City', hideLabel: true, value: value?.city?.value ?? '', type: 'string' }}
        />
      </div>
      <div class="col-3">
        <LiveField
          padding={false}
          field={{ name: `${field.name}.state`, id: `${field.id}.value.state`, label: 'State', value: value?.state?.value, hideLabel: true, required: true, type: 'combobox', options: { type: 'remote', value: 'https://gist.githubusercontent.com/mshafrir/2646763/raw/8b0dbb93521f5d6889502305335104218454c2bf/states_hash.json' } }}
        />
      </div>
      <div class="col-4">
        <LiveField
          padding={false}
          field={{ required: true, name: `${field.name}.zip`, id: `${field.id}.value.zip`, helperText: 'Zip Code', hideLabel: true, value: value?.zip?.value ?? '', type: 'string', properties: { pattern: '[d]{5}(-[d]{4})?' } }}
        />
      </div>
    </div>
  </div>
</div>
