<script lang="typescript">
  import StateSelector from 'inputs/StateSelector.svelte'
  import TextInput from 'inputs/TextInput.svelte'
  import type { IField } from 'models/IField'
  import Label from './Label.svelte'
  export let field: IField
  export let value: { [key: string]: string }
</script>

<div class="row">
<div class="col">
  <Label field={{label: 'Address'}} />
  <div class="row">
    <TextInput field={{ required: true, name: `${field.id}.address1`, id: `${field.id}.address1`, helperText: 'Address Line 1', hideLabel: true, value: value?.address1 ?? '', type: 'text' }} />
  </div>
  <div class="row" style="padding-top: 0.8em;">
    <TextInput field={{ required: true, name: `${field.id}.address2`, id: `${field.id}.address2`, helperText: 'Address Line 2', hideLabel: true, value: value?.address2 ?? '', type: 'text' }} />
  </div>
  <div class="row" style="padding-top: 0.8em;">
    <div class="col-5">
      <TextInput field={{ required: true, name: `${field.id}.city`, id: `${field.id}.city`, helperText: 'City', hideLabel: true, value: value?.city ?? '', type: 'text' }} />
    </div>
    <div class="col-3">
      <StateSelector value={value?.state ?? ''} id={`${field.id}.state`} name={`${field.id}.state`} helperText='State' hideLabel={true} />
    </div>
    <div class="col-4">
      <TextInput field={{ required: true, name: `${field.id}.zip`, id: `${field.id}.zip`, helperText: 'Zip Code', hideLabel: true, value: value?.zip ?? '', type: 'text', properties: { pattern: '[d]{5}(-[d]{4})?' } }} />
    </div>
  </div>
</div>
</div>
