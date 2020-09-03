<script lang="typescript">
  import GettingStarted from './GettingStarted.svelte'
  import RecentForms from './RecentForms.svelte'
  import { goto } from '@sapper/app'
  import SubmissionsDash from './SubmissionsDash.svelte'

  function createForm() {}
</script>

<div>
  <div class="col-12 col-lg-12">
    <div class="row">
      <div class="col-12 col-lg-12 mb-4">
        <div class="card border-light">
          <div class="card-body d-block d-md-flex align-items-center">
            <div style="padding-right: 0.5em;"><a href="/form/builder" class="btn btn-sm btn-outline-dark"> <span class="fas fa-plus" /> Create Form </a></div>
            <div style="padding-right: 0.5em;"><a href="/folder" class="btn btn-sm btn-outline-dark"> <span class="far fa-folder" /> My Folders </a></div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-sm-6 mb-4">
        <div class="card border-light">
          <div class="card-body d-block d-md-flex align-items-center">
            <RecentForms />
          </div>
        </div>
      </div>
      <div class="col-12 col-sm-6 mb-4">
        <div class="card border-light">
          <div class="card-body d-block d-md-flex align-items-center">
            <SubmissionsDash />
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="row">
      <div class="col-12 col-sm-6 mb-4">
        <div class="card border-light">
          <div class="card-body d-block d-md-flex align-items-center" />
          <GettingStarted/>
        </div>
      </div>
      <div class="col-12 col-sm-6 mb-4">
        <div class="card border-light">
          <div class="card-body d-block d-md-flex align-items-center">
            <RecentForms />
          </div>
        </div>
      </div>
    </div> -->
  </div>
</div>

<style>
  .card {
    border-radius: 0.3em !important;
  }
</style>
