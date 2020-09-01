<script lang="typescript">
  import StateSelector from 'inputs/StateSelector.svelte'
  import TextInput from 'inputs/TextInput.svelte'
  import type { IField } from 'models/IField'
  import { randomString } from 'util/Generate';
  import Label from './Label.svelte'
  export let field: IField
  export let value: { [key: string]: string }
</script>

<Label field={{ label: 'Address', type : 'address', id : randomString() }} />
<div class="row" style="width: 100%;">
  <div class="col">
    <div class="row">
      <TextInput field={{ required: true, name: `${field.name}.address1`, id: `${field.id}.value.address1`, helperText: 'Address Line 1', hideLabel: true, value: value?.address1 ?? '', type: 'string' }} />
    </div>
    <div class="row" style="padding-top: 0.8em;">
      <TextInput field={{ required: true, name: `${field.name}.address2`, id: `${field.id}.value.address2`, helperText: 'Address Line 2', hideLabel: true, value: value?.address2 ?? '', type: 'string' }} />
    </div>
    <div class="row" style="padding-top: 0.8em;">
      <div class="col-5">
        <TextInput field={{ required: true, name: `${field.name}.city`, id: `${field.id}.value.city`, helperText: 'City', hideLabel: true, value: value?.city ?? '', type: 'string' }} />
      </div>
      <div class="col-3">
        <StateSelector value={value?.state ?? ''} id={`${field.id}.value.state`} name={`${field.id}.state`} helperText="State" hideLabel={true} />
      </div>
      <div class="col-4">
        <TextInput
          field={{ required: true, name: `${field.name}.zip`, id: `${field.id}.value.zip`, helperText: 'Zip Code', hideLabel: true, value: value?.zip ?? '', type: 'string', properties: { pattern: '[d]{5}(-[d]{4})?' } }} />
      </div>
    </div>
  </div>
</div>
