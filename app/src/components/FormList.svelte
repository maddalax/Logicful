<script lang="typescript">
import type { IForm } from "models/IForm";
import { goto } from '@sapper/app';

export let forms : IForm[] = []

    	function onEdit(formId : string) {
        goto(`./builder/${formId}`);
    }

    function onDelete(formId : string) {
        
    }

    function onViewSubmissions(formId : string) {
        formId = 'maddox-maddox-maddox-maddox-maddox-maddox-e8bb5bcf-9751-48dc-91f3-e9fa0f4ff933'
        goto(`./submissions/${formId}`);
    }
</script>


    <div class="card-body px-0 pt-0">
        <ul class="list-group list-group-flush">
            {#each forms as form}
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
                        <button on:click={()=>{onViewSubmissions(form.id || '')}} class="btn btn-xs btn-outline-dark">
                            Submissions
                        </button>
                        <button on:click={()=>{onEdit(form.id || '')}} class="btn btn-xs btn-outline-dark">
                            Edit
                        </button>
                        <button class="btn btn-xs btn-outline-dark">
                            <span on:click={()=>{onDelete(form.id || '')}} class="fas fa-trash" />
                        </button>
                    </div>
                </div>
            </li>
            {/each}
        </ul>
    </div>
