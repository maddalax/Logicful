<script lang="typescript">
    import { goto } from '@sapper/app';
    import type { Folder } from "../models/Folder";

    export let folder : Folder

	function onEdit(formId : string) {
        goto(`./builder/${formId}`);
    }
    onViewSubmissions

    function onViewSubmissions(formId : string) {
        formId = 'maddox-maddox-maddox-maddox-maddox-maddox-e8bb5bcf-9751-48dc-91f3-e9fa0f4ff933'
        goto(`./submissions/${formId}`);
    }
    

</script>    

<style>
    .card{
    border-radius: .3em;
}
</style>

<div class="row mb-5">
    <div class="col-12 mb-4">
        <div class="card card-body bg-white border-light p-0 p-md-4">
            <div class="card-header bg-white border-0 p-3">
                <h3 class="h5">{folder.name}</h3>
                {#if folder.name === 'uncategorized'}
                                <p class="small pr-lg-10">Uncategorized forms have not been assigned a folder yet.</p>

                {/if}
            </div>
            <div class="card-body px-0 pt-0">
                <ul class="list-group list-group-flush">
                    {#each folder.forms as form, i}
                    <li class="list-group-item border-bottom py-3">
                        <div class="row align-items-center">
                            <div class="col">
                                <h3 class="h6 mb-1">
                                    <a href="./invoice.html">{form.title}</a>
                                </h3>
                                <!-- Text -->
                                <small class="text-gray-700">
                                    {form.lastUpdated}
                                </small>
                            </div>
                            <div class="col-auto">
                                <button on:click={()=>{onEdit(form.id || '')}} class="btn btn-xs btn-outline-dark">
                                    Edit
                                </button>
                                <button on:click={()=>{onViewSubmissions(form.id || '')}} class="btn btn-xs btn-outline-dark">
                                    Submissions
                                </button>
                                <button class="btn btn-xs btn-outline-dark">
                                    Delete
                                </button>
                            </div>
                        </div>
                    </li>
                    {/each}
                </ul>
            </div>
        </div>
    </div>
</div>