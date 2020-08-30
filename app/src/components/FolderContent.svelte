<script lang="typescript">
    import type { Folder } from "../models/Folder";
import FormList from './FormList.svelte';

    export let folder : Folder

    function onSettings(folderId : string) {
    }

    function onCreateForm() {
    }

    function onImportForm() {
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
            <div class="card-header bg-white border-0 p-2" style="display: flex">
                <div class="row">
                    <div class="col">
                        <span class="h5">{folder.name}</span>
                        {#if folder.name === 'uncategorized'}
                            <p class="small">Uncategorized forms have not been assigned a folder yet.</p>
                        {:else}
                        <p class="small">{folder.forms.length} form submissions</p>

                        {/if}
                 
                    </div>
                    <div class="col-auto">
                        <div class="align-items-center" style= "padding-bottom: 0.3em; text-align: right !important;">
                            <button on:click={()=>{onSettings(folder.id)}} class="btn btn-xs btn-outline-dark">
                                <span class="fas fa-cog"></span>
                            </button>
                        </div>  
                            <button on:click={onImportForm} class="btn btn-xs btn-outline-dark">
                                <span class="fas fa-file-import"/> <span>Import Form</span>
                            </button>
                            <button on:click={onCreateForm} class="btn btn-xs btn-outline-dark">
                                <span class="fas fa-plus"/> <span>Create Form</span>
                            </button>
</div>
                </div>
            </div>
            <FormList forms={folder.forms}/>
        </div>
    </div>
</div>