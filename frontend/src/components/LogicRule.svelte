<script lang="ts">
    import Trash from "@fortawesome/fontawesome-free/svgs/regular/trash-alt.svg";
    import type {LogicRule} from "models/LogicBuilder";
    import type {IField} from "models/IField";
    import type {LabelValue} from "models/IField";
    import {dispatch} from "event/EventBus";
    import {onMount} from "svelte";
    import {dispatchSingle} from "event/EventBus";
    import Field from "features/form/edit/Field.svelte";
    import {randomString} from "../util/Generate";
    import {subscribeFieldChange} from "event/FieldEvent";

    export let onChange: (data: LogicRule[]) => any;
    export let helperText: string | undefined;
    export let rules: LogicRule[] = [
        {
            label: "",
            value: "",
        },
    ];
    export let field : IField

    let fields: IField[] = []

    onMount(async () => {

        subscribeFieldChange((newField) => {
            if(field.id === newField.id) {
                field = newField;
            }
        })

        fields = await dispatchSingle("get_form_fields", {})
    });

    function onRepeaterChange() {
        dispatch("user_change", rules);
        onChange?.(rules);
    }

    function remove(option: number) {
        rules.splice(option, 1);
        rules = [...rules];
    }

    function addNew() {
        rules = rules.concat([
            {
                label: "",
                value: "",
            },
        ]);
    }

    function conditions() : LabelValue[] {
        return [{
            label : 'Greater Than',
            value : 'gt'
        }]
    }
</script>

<div>
    <label>Rules</label>
    <div class="container">
        {#each rules as option, i}
            <div class="row">
                <div class="col">
                    <Field
                            config={{ search: false }}
                            field={{ id: randomString(), label: 'Field', value: { type: 'local', value: field.logic?.rules?.[i]?.field }, type: 'combobox', required: true, configFieldTarget: `logic.rules[${i}].field`, configTarget: field.id, options: { type: 'local', value: fields.map(w => ({label : w.label, value : w.id})) } }}
                    />
                </div>
            </div>
            {#if field.logic?.rules?.[i]?.field}
                <div class="row">
                    <div class="col">
                        <Field
                                config={{ search: false }}
                                field={{ id: randomString(), label: 'Condition', value: { type: 'local', value: field.logic?.rules?.[i]?.condition }, type: 'combobox', required: true, configFieldTarget: `logic.rules[${i}].condition`, configTarget: field.id, options: { type: 'local', value: conditions() } }}
                        />
                    </div>
                </div>
            {/if}
            {#if field.logic?.rules?.[i]?.condition}
                <div class="row">
                    <div class="col">
                        <Field
                                config={{ search: false }}
                                field={{ id: randomString(), label: 'Value', value: { type: 'local', value: field.logic?.rules?.[i]?.value }, type: 'string', required: true, configFieldTarget: `logic.rules[${i}].value`, configTarget: field.id }}
                        />
                    </div>
                </div>
            {/if}
        {/each}
    </div>
    {#if helperText}
        <div class="helper-text">
            {@html helperText ?? ''}
        </div>
    {/if}
    <button class="btn-primary btn" style="margin-top: 1em" on:click={addNew}>
        New Rule
    </button>
</div>

<style>
    .trash-icon {
        height: 1.1em;
        width: 1.1em;
        margin-top: 1em;
        display: inline-block;
        cursor: pointer;
    }
</style>
