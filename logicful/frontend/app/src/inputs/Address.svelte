<script lang="typescript">
  import { subscribeFieldChange } from "@app/event/FieldEvent";
  import LiveField from "@app/features/form/live/LiveField.svelte";

  import StateSelector from "@app/inputs/StateSelector.svelte";
  import TextInput from "@app/inputs/TextInput.svelte";
  import type { IField } from "@app/models/IField";
  import formStore from "@app/store/FormStore";
  import { afterUpdate, onMount } from "svelte";
  import { randomString } from "@app/util/Generate";
  import ComboBox from "./ComboBox.svelte";
  import Label from "./Label.svelte";
  export let field: IField;
  export let value: { [key: string]: any };

  let address1: IField;
  let address2: IField;
  let city: IField;
  let state: IField;
  let zip: IField;

  subscribeFieldChange(onMount, (newField) => {
    if (newField.id === field.id) {
      value = newField.value;
    }
  });

  onMount(() => {
    value = formStore.getValue(field.id) ?? {};
  });
</script>

<div>
  <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
    <div class="sm:col-span-3">
      <label
        for="country"
        class="block text-sm font-medium leading-5 text-gray-700">
        Country / Region
      </label>
      <div class="mt-1 rounded-md shadow-sm">
        <select
          id="country"
          class="form-select block w-full transition duration-150 ease-in-out
            sm:text-sm sm:leading-5">
          <option>United States</option>
          <option>Canada</option>
          <option>Mexico</option>
        </select>
      </div>
    </div>

    <div class="sm:col-span-6">
      <label
        for="street_address"
        class="block text-sm font-medium leading-5 text-gray-700">
        Street address
      </label>
      <div class="mt-1 rounded-md shadow-sm">
        <textarea
          id="street_address"
          class="form-input block w-full transition duration-150 ease-in-out
            sm:text-sm sm:leading-5" />
      </div>
    </div>

    <div class="sm:col-span-2">
      <label
        for="city"
        class="block text-sm font-medium leading-5 text-gray-700">
        City
      </label>
      <div class="mt-1 rounded-md shadow-sm">
        <input
          id="city"
          class="form-input block w-full transition duration-150 ease-in-out
            sm:text-sm sm:leading-5" />
      </div>
    </div>

    <div class="sm:col-span-2">
      <label
        for="state"
        class="block text-sm font-medium leading-5 text-gray-700">
        State / Province
      </label>
      <div class="mt-1 rounded-md shadow-sm">
        <input
          id="state"
          class="form-input block w-full transition duration-150 ease-in-out
            sm:text-sm sm:leading-5" />
      </div>
    </div>

    <div class="sm:col-span-2">
      <label
        for="zip"
        class="block text-sm font-medium leading-5 text-gray-700">
        ZIP / Postal
      </label>
      <div class="mt-1 rounded-md shadow-sm">
        <input
          id="zip"
          class="form-input block w-full transition duration-150 ease-in-out
            sm:text-sm sm:leading-5" />
      </div>
    </div>
  </div>
</div>

<!-- <div>
  <div class="d-flex flex-row bd-highlight" style="padding-bottom: 0.75em">
    <div class="bd-highlight flex-grow-1 pr-2">
      <LiveField
        padding={false}
        field={{ required: true, name: `${field.name}.address1`, id: `${field.id}.value.address1`, helperText: 'Address Line 1', hideLabel: true, value: value?.address1?.value ?? '', type: 'string' }} />
    </div>
  </div>
  <div class="d-flex flex-row bd-highlight" style="padding-bottom: 0.75em">
    <div class="bd-highlight flex-grow-1 pr-2">
      <LiveField
        padding={false}
        field={{ required: true, name: `${field.name}.address2`, id: `${field.id}.value.address2`, helperText: 'Address Line 2', hideLabel: true, value: value?.address2?.value ?? '', type: 'string' }} />
    </div>
  </div>
  <div class="d-flex flex-row bd-highlight">
    <div class="bd-highlight flex-grow-1 pr-2">
      <LiveField
        padding={false}
        field={{ required: true, name: `${field.name}.city`, id: `${field.id}.value.city`, helperText: 'City', hideLabel: true, value: value?.city?.value ?? '', type: 'string' }} />
    </div>
    <div class="bd-highlight flex-grow-1 pr-2" style="width: 20%">
      <LiveField
        padding={false}
        field={{ name: `${field.name}.state`, id: `${field.id}.value.state`, helperText: 'State', label: 'State', value: value?.state?.value, hideLabel: true, required: true, type: 'combobox', options: { type: 'remote', value: 'https://gist.githubusercontent.com/mshafrir/2646763/raw/8b0dbb93521f5d6889502305335104218454c2bf/states_hash.json' } }} />
    </div>
    <div class="bd-highlight flex-grow-1 pr-2">
      <LiveField
        padding={false}
        field={{ required: true, name: `${field.name}.zip`, id: `${field.id}.value.zip`, helperText: 'Zip Code', hideLabel: true, value: value?.zip?.value ?? '', type: 'string', properties: { pattern: '[d]{5}(-[d]{4})?' } }} />
    </div>
  </div>
</div> -->
