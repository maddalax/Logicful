<script lang="typescript">
  import type { IForm } from '@app/models/IForm'
  import type { IFolder } from '@app/models/IFolder'
  import { onMount } from 'svelte'
  import { getApi } from '@app/services/ApiService'
import Link from './Link.svelte'

  export let forms: IForm[] = []
  // export let folder: IFolder

  onMount(async () => {
    // forms = await getApi('form?lean=true')
  })

  function onDelete(formId: string) {}
</script>

<div class="card-body px-0 pt-0">
  <ul class="list-group list-group-flush">
    {#each forms as form}
      <li class="list-group-item border-bottom py-3 radius-0">
        <div class="row align-items-center">
          <div class="col">
            <h3 class="h6 mb-1"><a href="./invoice.html" style="font-weight: 600;">{form.title}</a></h3>
            <!-- Text -->
            <small class="text-gray-700" >
              <Link href={`/form/submissions?formId=${form.id}`} style="font-weight: 50; text-decoration: underline;">Submissions</Link>
              <span>  |  </span>
              <Link href={`/form-settings?formId=${form.id}`} style="font-weight: 50; text-decoration: underline;">Form Settings</Link>
            </small>
          </div>
          <div class="col-auto">
            <Link href={`/form/builder?formId=${form.id}`} style="font-weight: 400;" class="btn btn-xs btn-outline-dark">Edit</Link>
            <button class="btn btn-xs btn-outline-dark">
              <span
                on:click={() => {
                  onDelete(form.id || '')
                }}
                class="fas fa-trash"
              />
            </button>
          </div>
        </div>
      </li>
    {/each}
  </ul>
</div>

<style>
  .radius-0 {
    border-radius: 0rem !important;
    padding-left: 0.5em;
  }
</style>
