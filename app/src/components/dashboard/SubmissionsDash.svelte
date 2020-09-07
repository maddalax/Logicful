<script lang="typescript">
  import FormList from 'components/FormList.svelte'
  import type { IForm } from 'models/IForm'

  import { onMount } from 'svelte'

  let recentSubmissions: string[] = []
  let forms: IForm[] = []

  onMount(() => {
    // forms = getRecentlyViewedSubmissions()
  })

  function getRecentlyViewedSubmissions() {
    return ['submission1']
  }

  function getRecentFroms() {
    let form1: IForm = { title: 'Form 1', id: 'yeet', changeTime: 'Oct 2 3:30 PM', fields: [] }
    let form2: IForm = { title: 'Form 2', id: 'yeet', changeTime: 'Oct 12 3:30 PM', fields: [] }
    let form3: IForm = { title: 'Form 3', id: 'yeet', changeTime: 'Oct 22 3:30 PM', fields: [] }

    return [form1, form2, form3]
  }
</script>

<div style="width: 100%">
  <h5 class="h5">Recently Viewed Form Submissions</h5>
  <div class="card-body px-0 pt-0">
    <ul class="list-group list-group-flush">
      {#each forms as form}
        <!-- <li class="list-group-item border-bottom py-3 radius-0">
              <div class="row align-items-center">
                <div class="col">
                  <h3 class="h6 mb-1">
                    <a href="./invoice.html">{form.title}</a>
                  </h3>
                  <small class="text-gray-700">{form.lastUpdated}</small>
                </div>
                <div class="col-auto">
                  <button
                    on:click={() => {
                      onViewSubmissions(form.id || '')
                    }}
                    class="btn btn-xs btn-outline-dark">
                    Submissions
                  </button>
                  <button
                    on:click={() => {
                      onEdit(form.id || '')
                    }}
                    class="btn btn-xs btn-outline-dark">
                    Edit
                  </button>
                  <button class="btn btn-xs btn-outline-dark">
                    <span
                      on:click={() => {
                        onDelete(form.id || '')
                      }}
                      class="fas fa-trash" />
                  </button>
                </div>
              </div>
            </li> -->
      {/each}
    </ul>
  </div>
</div>

<style type="text/scss">
  .h5 {
    padding-bottom: 0.2em;
  }
</style>
