<script lang="typescript">
    import type {IField} from "models/IField";
    import Field from "./Field.svelte";
    import {randomString} from "util/Generate";
    import Repeater from "components/Repeater.svelte";
    import LogicRule from "components/LogicRule.svelte";

    export let field: IField;

    const actions = [{
        label: 'Show this field when all rule(s) match',
        value: 'show-all-match'
    }, {
        label: 'Show this field when any rule(s) match',
        value: 'show-any-match'
    }, {
        label: 'Hide this field when any rule(s) match',
        value: 'hide-any-match'
    }, {
        label: 'Hide this field when all rule(s) match',
        value: 'hide-all-match'
    }]
</script>

<Field
 field={{ id: randomString(), label: 'Select Action', helperText : 'What should happen when all or some of your rules are matched.', value: { type: 'local', value: field.logic?.action }, type: 'combobox', required: true, configFieldTarget: 'logic.action', configTarget: field.id, options: { type: 'local', value: actions } }}
 padding={false}
/>
<hr>
<LogicRule field={field}/>