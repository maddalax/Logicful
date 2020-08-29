<script lang="typescript">
    import type { IField } from "models/IField";
    import type { ContentBlock } from "models/ContentBlock";

    import Field from "./Field.svelte";
    import { randomString } from "util/Generate";
    import {dispatch} from "event/EventBus";
    import ContentBlockList from "./ContentBlockList.svelte";

    export let field: IField;
    export let expanded: boolean;

    function manageBlocks() {
        dispatch("dialog_show", {
            child: ContentBlockList,
            closeOnOutsideClick: false,
            confirmCloseOnDirty: true,
            title: "Manage Content Blocks",
            save: false,
        });
    }

    function loadTransformer(value: ContentBlock[]) {
        return value.map((v) => {
            return {
                label: v.name,
                value: v.value,
            };
        });
    }
</script>

<div>
    <div>
        <h5>Address Editor</h5>
    </div>
    <Field
            config={{ search: false }}
            field={{ id: randomString(), customCss: 'padding-bottom: 0em;', label: 'Required', value: { type: 'local', value: field.required }, type: 'switch', configFieldTarget: 'required', configTarget: field.id, options: { type: 'local', value: [{ label: 'Yes', value: true }, { label: 'No', value: false }] } }}
    />
    <Field
            field={{ id: randomString(), label: 'Name', required: true, value: field.name, type: 'string', configFieldTarget: 'name', configTarget: field.id }}
    />
    <Field
            field={{ id: randomString(), label: 'Label', value: field.label, type: 'string', configFieldTarget: 'label', configTarget: field.id }}
    />
</div>