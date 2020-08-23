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
    import {dispatchFieldChange} from "event/FieldEvent";

    export let onChange: (data: LogicRule[]) => any;
    export let helperText: string | undefined;
    export let rules: LogicRule[] = [{
        field : undefined,
        value : undefined,
        condition : undefined
    }];
    export let field : IField

    let fields: IField[] = []

    onMount(async () => {

        subscribeFieldChange((newField) => {
            if(field.id === newField.id) {
                field = newField;
                rules = field.logic?.rules ?? [];
            }
        })

        fields = await dispatchSingle("get_form_fields", {});
        fields = fields.filter(w => w.id !== field.id);
        rules = field.logic?.rules ?? [];
    });

    function onRepeaterChange() {
        dispatch("user_change", rules);
        onChange?.(rules);
    }

    function remove(option: number) {
        rules.splice(option, 1);
        rules = [...rules];
        field.logic.rules = rules;
        dispatchFieldChange(field, true);
    }

    function addNew() {
        rules = rules.concat([
            {
                field : undefined,
                value : undefined,
                condition : undefined
            },
        ]);
    }

    function conditions(index : number) : LabelValue[] {
        const targetFieldId = field.logic?.rules?.[index]?.field;
        if(!targetFieldId) {
            return []
        }
        const targetField = fields.find(w => w.id === targetFieldId);
        if(!targetField) {
            return []
        }
        if(targetField.type === "string") {
            return [{
                label : 'Contains',
                value : 'contains'
            }, {
                label : 'Starts With',
                value : 'startsWith'
            }, {
                label : 'Ends With',
                value : 'endsWith'
            }, {
                label : 'Equals',
                value : 'eq'
            }]
        }
        if(targetField.type === "number") {
            return [{
                label : 'Greater Than',
                value : 'gt'
            }, {
                label : 'Less Than',
                value : 'lt'
            }, {
                label : 'Less Than or Equal To',
                value : 'lte'
            }, {
                label : 'Greater Than or Equal To',
                value : 'gte'
            }, {
                label : 'Equal To',
                value : 'eq'
            }]
        }

        return []
    }
</script>

<div>
    <div class="container">
        {#each rules as option, i}
            <div class="card" style="margin-bottom: 1em">
                <div class="card-body">
                    <div class="row">
                        <div class="col-11">
                            <Field
                                    config={{ search: false }}
                                    field={{ id: randomString(), label: 'Field', value: { type: 'local', value: field.logic?.rules?.[i]?.field }, type: 'combobox', required: true, configFieldTarget: `logic.rules[${i}].field`, configTarget: field.id, options: { type: 'local', value: fields.map(w => ({label : w.label, value : w.id})) } }}
                            />
                        </div>
                        <div class="col-1">
                        <span class="icon baseline trash-icon" on:click={() => remove(i)}>
                            {@html Trash}
                        </span>
                        </div>
                    </div>
                    {#if field.logic?.rules?.[i]?.field}
                        <div class="row">
                            <div class="col">
                                <Field
                                        config={{ search: false }}
                                        field={{ id: randomString(), label: 'Condition', value: { type: 'local', value: field.logic?.rules?.[i]?.condition }, type: 'combobox', required: true, configFieldTarget: `logic.rules[${i}].condition`, configTarget: field.id, options: { type: 'local', value: conditions(i) } }}
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
                </div>
            </div>
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
        margin-top: 3.3em;
        display: inline-block;
        cursor: pointer;
    }
</style>
