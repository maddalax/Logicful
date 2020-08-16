<script lang="ts">
    export let id = ''
    export let buttonClass = '';
    export let buttonText = '';
    export let open = false;
    import { fade } from 'svelte/transition';
    import {dispatch} from "../event/EventBus";

</script>

<style>
    .closed {
        background-image: url(../img/plus.svg),linear-gradient(transparent,transparent);
    }

    .open {
        background-image: url(../img/minus.svg),linear-gradient(transparent,transparent);
    }

    .hide {
        display: none;
    }
</style>

<div class="usa-accordion">
    <h2 class="usa-accordion__heading">
        <button
                transition:fade={{duration: 500 }}
                on:click={() => {
                    open = !open;
                    dispatch("accordion_toggle", {
                        open,
                        id
                    });
                }}
                id={id}
                class={`${buttonClass} usa-accordion__button`} class:closed={!open} class:open={open} >
            {buttonText}
        </button>
    </h2>
    <div class="usa-accordion__content usa-prose" transition:fade={{duration: 300 }} class:hide={!open}>
        <slot></slot>
    </div>
</div>