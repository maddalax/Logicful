<script lang="ts">
import ComboBox from "./ComboBox.svelte";
import type { FormValue } from "src/entities/IField";
import { afterUpdate } from "svelte";

export let label : string = "State"
export let value : FormValue = ""
export let name : string

afterUpdate(() => {
        console.log("STATE VAL", value);
    })

</script>
<ComboBox field={{
    name : name,
    label : label,
    type : "combobox",
    value : value,
    options : 'https://gist.githubusercontent.com/mshafrir/2646763/raw/8b0dbb93521f5d6889502305335104218454c2bf/states_hash.json'
}}/>