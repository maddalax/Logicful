<script lang="typescript">
  import { subscribe, subscribeComponent } from '@app/event/EventBus'
  import type { IForm } from '@app/models/IForm'
  import { onMount } from 'svelte'
import Link from '../Link.svelte'

  export let form: IForm
  export let selected: string

  subscribeComponent('form_loaded', (updatedForm) => {
    form = updatedForm
  })
  subscribeComponent('form_updated', (updatedForm) => {
    form = updatedForm
  })
</script>



