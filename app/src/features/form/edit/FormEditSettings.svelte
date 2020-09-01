<script lang="typescript">
    import type { IForm } from 'models/IForm'
  
    import Field from './Field.svelte'
    import { randomString } from 'util/Generate'
    import { onMount } from 'svelte'
    import { subscribe } from 'event/EventBus'
    import formStore from 'store/FormStore'
  
    export let form: IForm

    onMount(()=>{
        subscribe('form_loaded',(updatedForm)=>{
            form = updatedForm;
        })
        subscribe('form_updated', (updatedForm)=>{
            form = updatedForm;
        })
    })
  </script>


<Field field={{ id: randomString(), required: true, label: 'Form Title', value: { type: 'local', value: form.title }, type: 'string', configFieldTarget: 'title', configTarget: 'form' }} />
