<script lang="ts">
    import Trash from '@fortawesome/fontawesome-free/svgs/regular/trash-alt.svg';
    import type { LabelValue } from 'entities/IField';
    export let onChange : (data : LabelValue[]) => any

    let options = [
        {
            label: '',
            value: '',
        },
    ];

    $: {
        onChange?.(options);
    }

    function remove(option : number) {
        options.splice(option, 1);
        options = [...options]
    }    

    function addNew() {
        options = options.concat([
            {
                label: '',
                value: '',
            },
        ]);
    }
</script>

<style>
    .trash-icon {
        height: 1.1em;
        width: 1.1em;
        margin-top: 1em;
        display: inline-block;
        cursor: pointer;
    }
</style>

<div>
    <label class="usa-label">Options</label>
    {#each options as option, i}
        <div class="grid-row grid-gap">
            <div class="mobile-lg:grid-col-5">
                <input
                    class="usa-input"
                    id="city"
                    name="city"
                    type="text"
                    bind:value={option.label}
                    placeholder={'Label'} />
            </div>
            <div class="mobile-lg:grid-col-5">
                <input
                    class="usa-input"
                    id="city"
                    name="city"
                    type="text"
                    bind:value={option.value}
                    placeholder={'Value'} />

            </div>
            <div class="mobile-lg:grid-col-1">
                <span class="icon baseline trash-icon" on:click="{() => remove(i)}">
                    {@html Trash}
                </span>
            </div>
        </div>
    {/each}
    <button class="usa-button" style="margin-top: 1em" on:click={addNew}>Add New</button>
</div>
