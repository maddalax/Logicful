<script lang="typescript">
  import type { IForm } from '@app/models/IForm'

  import { LoadState } from '@app/models/LoadState'
  import { postApi } from '@app/services/ApiService'
  import { me } from '@app/services/AuthService'
import { getUrlParameter } from '@app/util/Http';

  let state: LoadState = LoadState.NotStarted

  async function createNewForm() {
    state = LoadState.Loading
    const folder = getUrlParameter("folder")
    try {
      const user = me()
      const response: IForm = await postApi('form', {
        title: 'My New Form',
        fields: [],
        teamId: user.teamId,
        folder : folder
      })
      window.location.replace(`/form/builder?formId=${response.id}`)
      state = LoadState.Finished
    } catch (ex) {
      state = LoadState.Failed
    }
  }
</script>

<div class="container" style="padding-top: 6em">
  <div class="d-flex justify-content-center">
    <h1 class="display-3 font-weight-extreme mb-4">Create A Form</h1>
  </div>
  <div class="d-flex justify-content-center">
    <p class="lead mb-4 mb-lg-5 pr-lg-5">Create and share your custom form to collect data quickly and efficiently.</p>
  </div>
  <div class="d-flex justify-content-center">
    <div class="card" style="max-width: 16em; margin-right: 1em">
      <div class="card-body">
        <h5 class="card-title">Create From Scratch</h5>
        <p class="card-text">Create a new form with no prior template.</p>
        {#if state === LoadState.NotStarted}
          <div style="margin-top: 1em"><button href="#" class="btn btn-primary btn-large" on:click={createNewForm}>Create Now</button></div>
        {:else if state === LoadState.Loading}
          <div style="margin-top: 1em"><button href="#" class="btn btn-primary btn-large" disabled>Creating...</button></div>
        {:else if state === LoadState.Failed}
          <div style="margin-top: 1em"><button href="#" class="btn btn-primary btn-large" on:click={createNewForm}>Failed to create, click to try again.</button></div>
        {/if}
      </div>
    </div>
    <div class="card" style="max-width: 16em">
      <div class="card-body">
        <h5 class="card-title">Create From Template</h5>
        <p class="card-text">Create a new form using a premade template.</p>
        <div style="margin-top: 1em"><button href="#" class="btn btn-primary btn-large" disabled>Coming Soon</button></div>
      </div>
    </div>
  </div>
</div>
