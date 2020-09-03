<script lang="typescript">
  import type { IForm } from 'models/IForm'

  import Field from './Field.svelte'
  import { randomString } from 'util/Generate'
  import { onMount } from 'svelte'
  import { subscribe, subscribeComponent } from 'event/EventBus'
  import formStore from 'store/FormStore'

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
  field={{ id: randomString(), required: true, label: 'Form Description', value: { type: 'local', value: form.description }, type: 'string', configFieldTarget: 'description', configTarget: 'form' }} />

<h2 class="h5" style="padding-top: 2em;">Form Availability</h2>
<Field
  field={{ id: randomString(), type: 'switch', label: 'Disable Summisions', value: { type: 'local', value: form.disableSubmissions ?? false }, configFieldTarget: 'disableSubmissions', configTarget: 'form' }} />
<Field
  field={{ id: randomString(), type: 'switch', label: 'Disable after a maximum number of submissions', value: { type: 'local', value: form.maxSubmissions ?? false }, configFieldTarget: 'maxSubmissions', configTarget: 'form' }} />
<Field
  field={{ id: randomString(), type: 'date', required: true, label: 'Submissions open after date/time', value: { type: 'local', value: form.openDateTime ?? '' }, configFieldTarget: 'openDateTime', configTarget: 'form' }} />

<Field
  field={{ id: randomString(), type: 'date', required: true, label: 'Submissions close after date/time ', value: { type: 'local', value: form.closeDateTime ?? '' }, configFieldTarget: 'closeDateTime', configTarget: 'form' }} />
