<script lang="ts">
    import type {IField} from "models/IField";
    import Field from "./Field.svelte";
    import {randomString} from "util/Generate";
    import Repeater from "components/Repeater.svelte";
    import LogicRule from "components/LogicRule.svelte";

    export let field: IField;

    const actions = [{
        label: 'Show when all rule(s) match',
        value: 'show-all-match'
    }, {
        label: 'Show when any rule(s) match',
        value: 'show-any-match'
    }, {
        label: 'Hide when any rule(s) match',
        value: 'hide-any-match'
    }, {
        label: 'Hide when all rule(s) match',
        value: 'hide-all-match'
    }]
</script>

<Field
 field={{ id: randomString(), label: '', value: { type: 'local', value: field.logic?.action }, type: 'combobox', required: true, configFieldTarget: 'logic.action', configTarget: field.id, options: { type: 'local', value: actions } }}
/>
<LogicRule field={field}/>