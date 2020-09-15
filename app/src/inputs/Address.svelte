<script lang="typescript">
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

  onMount(() => {
    address1 = { required: true, name: `${field.name}.address1`, id: `${field.id}.value.address1`, helperText: 'Address Line 1', hideLabel: true, value: value?.address1 ?? '', type: 'string' }
    address2 = { required: true, name: `${field.name}.address2`, id: `${field.id}.value.address2`, helperText: 'Address Line 2', hideLabel: true, value: value?.address2 ?? '', type: 'string' }
    city = { required: true, name: `${field.name}.city`, id: `${field.id}.value.city`, helperText: 'City', hideLabel: true, value: value?.city ?? '', type: 'string' }
    zip = {
      required: true,
      name: `${field.name}.zip`,
      id: `${field.id}.value.zip`,
      helperText: 'Zip Code',
      hideLabel: true,
      value: value?.zip ?? '',
      type: 'string',
      properties: { pattern: '[d]{5}(-[d]{4})?' },
    }
    state = {
      name: `${field.name}.state`,
      id: `${field.id}.value.state`,
      label: 'State',
      hideLabel: true,
      required: true,
      type: 'combobox',
      options: { type: 'remote', value: 'https://gist.githubusercontent.com/mshafrir/2646763/raw/8b0dbb93521f5d6889502305335104218454c2bf/states_hash.json' },
    }
  })

  afterUpdate(() => {
    if (!value) {
      return
    }
    address1.value = value.address1?.value ?? ''
    address2.value = value.address2?.value ?? ''
    state.value = value.state?.value ?? ''
    city.value = value.city?.value ?? ''
    zip.value = value.zip?.value ?? ''
    formStore.set(address1)
    formStore.set(address2)
    formStore.set(city)
    formStore.set(zip)
    formStore.set(state)
  })
</script>

{#if !address1}
  <span />
{:else}
  <Label field={{ label: 'Address', type: 'address', id: randomString() }} />
  <div class="row" style="width: 100%;">
    <div class="col">
      <div class="row">
        <TextInput field={address1} />
      </div>
      <div class="row" style="padding-top: 0.8em;">
        <TextInput field={address2} />
      </div>
      <div class="row" style="padding-top: 0.8em;">
        <div class="col-5">
          <TextInput field={city} />
        </div>
        <div class="col-3">
          <ComboBox
            field={state}
          />
        </div>
        <div class="col-4">
          <TextInput field={zip} />
        </div>
      </div>
    </div>
  </div>
{/if}
