<script lang="typescript">
  import type { IForm } from '@app/models/IForm'

  import Field from './Field.svelte'
  import { randomString } from '@app/util/Generate'
  import { onMount } from 'svelte'
  import { subscribe, subscribeComponent } from '@app/event/EventBus'
  import formStore from '@app/store/FormStore'

  export let form: IForm

  subscribeComponent('form_loaded', (updatedForm) => {
    form = updatedForm
  })

  subscribeComponent('form_updated', (updatedForm) => {
    form = updatedForm
  })
</script>

<Field field={{ id: randomString(), required: true, label: 'Form Title', value: { type: 'local', value: form.title }, type: 'string', configFieldTarget: 'title', configTarget: 'form' }} />
<Field
  field={{ id: randomString(), required: true, label: 'Form Description', value: { type: 'local', value: form.description }, type: 'string', configFieldTarget: 'description', configTarget: 'form' }}
/>
