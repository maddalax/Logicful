<script lang="typescript">
  import type { IField } from 'models/IField'

  export let field: IField
  import TextInput from 'inputs/TextInput.svelte'
  import { afterUpdate, onMount } from 'svelte'
  import ComboBox from 'inputs/ComboBox.svelte'
  import { LoadState } from 'models/LoadState'
  import { FieldValueLoader } from 'loader/FieldValueLoader'
  import Address from 'inputs/Address.svelte'
  import TextArea from 'inputs/TextArea.svelte'
  import Spacer from 'inputs/Spacer.svelte'
  import formStore from 'store/FormStore'
  import { fade } from 'svelte/transition'
  import RichTextDisplay from 'inputs/RichTextDisplay.svelte'
  import { dispatch } from 'event/EventBus'
  import { subscribeComponent } from 'event/EventBus'
  import Switch from 'inputs/Switch.svelte'
  import DatePicker from 'components/DatePicker.svelte'
  import { firstNotEmpty } from 'util/Format'
  import { subscribeFieldChange } from 'event/FieldEvent'
  import { fastClone, fastEquals } from 'util/Compare'
  import FileUpload from 'inputs/FileUpload.svelte'
  import FullName from 'inputs/FullName.svelte'
  import CheckboxGroup from 'inputs/CheckboxGroup.svelte'
  import RadioGroup from 'inputs/RadioGroup.svelte'

  let state = LoadState.NotStarted
  let value: any
  let lastValue: any
  export let config: any = {}
  export let hidden: boolean = false

  onMount(load)

  afterUpdate(async () => {
    if(field.value && !fastEquals(field.value, lastValue)) {
      await load();
    }
  })

  async function load() {
    lastValue = field.value
    if ((field.value ?? field.defaultValue) != null) {
      state = LoadState.Loading
      try {
        const loader = new FieldValueLoader()
        const result = await loader.load(field)
        value = result
        field.value = result
        lastValue = result
        formStore.set(field, {
          value: result,
          field: 'value',
          fromUser: false,
        })
        state = LoadState.Finished
      } catch (e) {
        console.error(e)
        state = LoadState.Failed
      }
    }
  }
</script>

<div class="spaced" class:hidden>
  <div style="border-radius: 1em;">
    {#if hidden}
      <span />
    {:else}
      <div transition:fade={{ duration: 300 }}>
        {#if field.type === 'address'}
          <Address {field} {value} />
        {:else if field.type === 'string'}
          <TextInput {field} />
        {:else if field.type === 'number'}
          <TextInput {field} type={'number'} />
        {:else if field.type === 'combobox'}
          <ComboBox {field} {...config} />
        {:else if field.type === 'block'}
          <RichTextDisplay {field} />
        {:else if field.type === 'block-editor'}
          <TextArea {field} {...config} />
        {:else if field.type === 'spacer'}
          <Spacer {field} />
        {:else if field.type === 'switch'}
          <Switch {field} {...config} />
        {:else if field.type === 'date'}
          <DatePicker {field} {...config} />
        {:else if field.type === 'file'}
          <FileUpload {field} />
        {:else if field.type === 'checkbox-group'}
          <CheckboxGroup {field} />
        {:else if field.type === 'radio-group'}
          <RadioGroup {field} />
        {:else if field.type === 'full-name'}
          <FullName {field} {value} />
        {/if}
      </div>
    {/if}
  </div>
</div>

<style type="text/scss">
  .hidden {
    display: none;
  }

  .spaced {
    margin-bottom: 1.3em
  }
</style>
