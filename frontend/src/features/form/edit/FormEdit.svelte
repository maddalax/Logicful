<script lang="ts">
    import type {IForm} from "models/IForm";

    export let form : IForm;
    import Field from "./Field.svelte";
    import {randomString} from "../../../util/Generate";

</script>

<div style="padding-left: 0.5em;">
    <h5 style="padding-bottom: 0.2em;">Form Configurations</h5>
    <hr>
</div>

<div style="padding-right: 1.5em;">
    <Field
        field={{ id: randomString(), required : true, label: 'Form Title', value: { type: 'local', value: form.title }, type: 'string', configFieldTarget: 'title', configTarget: 'form'}}
    />
</div>