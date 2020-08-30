<script lang="typescript">
    import LogicBuilder from "./LogicBuilder.svelte";
    import type {IField} from "models/IField";

    export let field: IField;
</script>


        <div class="accordion mt-4" id="accordionExample" style="margin-bottom: 3rem;">
            <div class="card border-light mb-0">
                <div class="card-header accordionHeader" id="headingTwo">
                    <h2 class="mb-0">
                        <button class="btn btn-link btn-block d-flex justify-content-between text-left" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            <span class="h6 mb-0 font-weight-bold">Logic</span>
                            <span class="icon"><span class="fas fa-plus" style="font-size: 1em;"></span></span>
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
    }

    .accordion > .card {
        overflow: visible;
    }

    .accordion .card:hover {
        background-color: white;
    }

    .card-body{
        padding-right: 0.8em;
        padding-left: 0.8em;
    }
</style>

