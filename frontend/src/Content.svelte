<script>
    import { fade } from 'svelte/transition';

    let editing = false;
</script>

<style>
    #input-test:hover {
        background-color: #f0f0f0;
        cursor: pointer;
    }

    .hovered {
        background-color: #f0f0f0;
        cursor: pointer;
    }
</style>

{#if editing}
    <div class="container">
        <div class="row">
            <div class="col">
                <div transition:fade={{duration : 300}} class="mb-3" on:click={() => editing = true}>
                    <h3>Field Configuration</h3>
                    <div style="padding: .85em 1em; border-radius: 1em">
                        <label for="formGroupExampleInput2" class="form-label">Name</label>
                        <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Another input placeholder">
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="mb-3 hovered" on:click={() => editing = true}>
                    <div style="padding: .85em 1em; border-radius: 1em">
                        <label for="formGroupExampleInput2" class="form-label">Another label</label>
                        <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Another input placeholder">
                    </div>
                </div>
                <div class="mb-3" on:click={() => editing = true}>
                    <div style="padding: .85em 1em; border-radius: 1em">
                        <label for="formGroupExampleInput2" class="form-label">Another input</label>
                        <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Another input placeholder">
                    </div>
                </div>
            </div>
        </div>
    </div>
{:else}
    <div class="mb-3" id="input-test" on:click={() => editing = true}>
        <div style="padding: .85em 1em; border-radius: 1em">
            <label for="formGroupExampleInput2" class="form-label">Another label</label>
            <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Another input placeholder">
        </div>
    </div>
    <div class="mb-3" id="input-test-2" on:click={() => editing = true}>
        <div style="padding: .85em 1em; border-radius: 1em">
            <label for="formGroupExampleInput2" class="form-label">Another label</label>
            <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Another input placeholder">
        </div>
    </div>
{/if}

