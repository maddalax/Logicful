<script lang="ts">
  import type { IField } from "models/IField";
  import Field from "./Field.svelte";
  import {randomString} from "util/Generate";


  export let field: IField;
  export let expanded: boolean;
</script>

<Field
        field={
{ id: randomString(), label: 'Content Block', value: { type: 'local', value: field.value }, type: 'combobox', configFieldTarget: 'value', configTarget: field.id, options: { type: 'remote', value: 'http://localhost:8080/contents.json' } }}
/>
