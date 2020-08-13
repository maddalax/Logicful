<script lang="ts">
    import Trash from '@fortawesome/fontawesome-free/svgs/regular/trash-alt.svg';
    import type { LabelValue } from 'models/IField';
    import { dispatch } from 'event/EventBus';
    export let onChange: (data: LabelValue[]) => any;
    export let helperText : string | undefined
    export let options : LabelValue[] = [
        {
            label: '',
            value: '',
        },
    ];

    function onRepeaterChange() {
        dispatch("user_change", options);
        onChange?.(options);
    }

    function remove(option: number) {
        options.splice(option, 1);
        options = [...options];
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
                    name="display"
                    type="text"
                    on:blur={onRepeaterChange}
                    bind:value={option.label}
                    placeholder={'Display'} />
            </div>
            <div class="mobile-lg:grid-col-5">
                <input
                    class="usa-input"
                    name="value"
                    type="text"
                    on:blur={onRepeaterChange}
                    bind:value={option.value}
                    placeholder={'Value'} />

            </div>
            <div class="mobile-lg:grid-col-1">
                <span class="icon baseline trash-icon" on:click={() => remove(i)}>
                    {@html Trash}
                </span>
            </div>
        </div>
    {/each}
    {#if helperText} 
    <div class="helper-text">
         {@html helperText ?? ""}
    </div>
 {/if}
    <button class="usa-button" style="margin-top: 1em" on:click={addNew}>Add New</button>
</div>
