<script lang="typescript">
  import type { IForm } from 'models/IForm'
  import { goto } from '@sapper/app'
  import type { IFolder } from 'models/IFolder'
  import { onMount } from 'svelte'

  let forms: IForm[] = []
  export let folder: IFolder

  onMount(async () => {
    const response = await fetch('http://localhost:3000/api/form?lean=true')
    forms = await response.json()
  })

  function onDelete(formId: string) {}

  function onViewSubmissions(formId: string) {
    goto(`./submissions/${formId}`)
  }
</script>

<div class="card-body px-0 pt-0">
  <ul class="list-group list-group-flush">
    {#each forms as form}
      <li class="list-group-item border-bottom py-3 radius-0">
        <div class="row align-items-center">
          <div class="col">
            <h3 class="h6 mb-1"><a href="./invoice.html">{form.title}</a></h3>
            <!-- Text -->
            <small class="text-gray-700">{form.changeTime}</small>
          </div>
          <div class="col-auto">
            <button
              on:click={() => {
                onViewSubmissions(form.id || '')
              }}
              class="btn btn-xs btn-outline-dark">
              Submissions
            </button>
            <a href={`/builder/${form.id}`} class="btn btn-xs btn-outline-dark">Edit</a>
            <button class="btn btn-xs btn-outline-dark">
              <span
                on:click={() => {
                  onDelete(form.id || '')
                }}
                class="fas fa-trash" />
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
