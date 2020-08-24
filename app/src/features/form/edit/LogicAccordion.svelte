<script lang="typescript">
    import LogicBuilder from "./LogicBuilder.svelte";
    import type {IField} from "models/IField";

    export let field: IField;
</script>


<div class="section section-md pt-0">
    <div class="row justify-content-center mt-4">
        <div class="accordion" id="accordionExample" style="padding-left: 1.45em; padding-right: 1.45em;">
            <div class="card border-light mb-0">
                    <div class="card-header accordionHeader" id="headingTwo">
                    <h2 class="mb-0">
                        <button class="btn btn-link btn-block d-flex justify-content-between text-left" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            <span class="h6 mb-0 font-weight-bold">Logic</span>
                            <span class="icon"><span class="fas fa-plus"></span></span>
                        </button>
                    </h2>
                </div>
                    <div id="collapseTwo" class="collapse accordionCollapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                    <div class="card-body">
                        <p class="mb-0">
                            <LogicBuilder field={field}/>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .accordionHeader{
        background-color: transparent;
        padding: 0.25em 0.1em;
    }
    /*border-bottom: 0rem solid rgba(23, 31, 56, 0.125);*/
    .accordionCollapse{
        background-color: transparent;
    }
    .card-body{
        padding-top: 0.75em;
        padding-bottom: 0.75em;
        padding-left: 1em;
        padding-left: 1em;
        padding-bottom: 1em;
    }

    .accordion .card:hover {
        background-color: white;
    }
</style>

