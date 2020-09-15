<script lang="typescript">
  import type { IField } from '@app/models/IField'

  export let field: IField
  import TextInput from '@app/inputs/TextInput.svelte'
  import { afterUpdate, onMount } from 'svelte'
  import ComboBox from '@app/inputs/ComboBox.svelte'
  import { LoadState } from '@app/models/LoadState'
  import { FieldValueLoader } from '@app/loader/FieldValueLoader'
  import Address from '@app/inputs/Address.svelte'
  import TextArea from '@app/inputs/TextArea.svelte'
  import Spacer from '@app/inputs/Spacer.svelte'
  import formStore from '@app/store/FormStore'
  import { fade } from 'svelte/transition'
  import RichTextDisplay from '@app/inputs/RichTextDisplay.svelte'
  import { dispatch } from '@app/event/EventBus'
  import { subscribeComponent } from '@app/event/EventBus'
  import Switch from '@app/inputs/Switch.svelte'
  import DatePicker from '@app/components/DatePicker.svelte'
  import { firstNotEmpty } from '@app/util/Format'
  import { subscribeFieldChange } from '@app/event/FieldEvent'
  import { fastClone, fastEquals } from '@app/util/Compare'
  import FileUpload from '@app/inputs/FileUpload.svelte'
  import FullName from '@app/inputs/FullName.svelte'
  import CheckboxGroup from '@app/inputs/CheckboxGroup.svelte'
  import RadioGroup from '@app/inputs/RadioGroup.svelte'

  let state = LoadState.NotStarted
  let value: any
  let lastValue: any
  export let padding : boolean = true
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

<div class:spaced={padding} class:hidden>
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

<style>
  .hidden {
    display: none;
  }

  .spaced {
    margin-bottom: 1.3em
  }
</style>
