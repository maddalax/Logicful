<script lang="typescript">
    import { dispatch } from "@app/event/EventBus";
    import type { IField } from "@app/models/IField";
    import formStore from "@app/store/FormStore";
    import Field from "./Field.svelte";

    export let editor: boolean = false;
    export let hidden: boolean = false;
    export let field: IField;

    function onClone() {
        dispatch("field_clone", {
            field,
        });
    }

    function select() {
        if (field.configTarget || editor) {
            return;
        }
        field.selected = !field.selected;
        formStore.set(field, {
            field: "selected",
            value: field.selected,
            fromUser: false,
        });
    }

    let isConfigInput =
        field.configTarget || editor || field.type === "placeholder";
</script>

<div
    on:click|stopPropagation={select}
    class:bg-gray-100={!isConfigInput && field.selected}
    class={isConfigInput ? 'p-3' : `hover:bg-gray-100 p-3`}>
    {#if field.selected}
        <div class="btn-group float-right" role="group" aria-label="Selected">
            <button
                on:click|stopPropagation={onClone}
                type="button"
                class="btn btn-secondary">
                <span class="icon-brand"> <span class="far fa-clone" /> </span>
            </button>
            <button
                on:click|stopPropagation={() => dispatch('confirm_field_deletion', {})}
                type="button"
                class="btn btn-secondary">
                <span class="icon-brand"> <span class="fas fa-trash" /> </span>
            </button>
        </div>
    {/if}
    <Field {field} {hidden} mode="builder" />
</div>
