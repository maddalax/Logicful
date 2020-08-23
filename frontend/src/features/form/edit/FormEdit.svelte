<script lang="ts">
    import type {IForm} from "models/IForm";

    export let form : IForm;
    import Field from "./Field.svelte";
    import {randomString} from "util/Generate";


</script>

<Field
        field={{ id: randomString(), required : true, label: 'Form Title', value: { type: 'local', value: form.title }, type: 'string', configFieldTarget: 'title', configTarget: 'form'}}
/>