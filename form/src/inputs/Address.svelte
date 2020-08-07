<script lang="ts">
    import StateSelector from "./StateSelector.svelte"
    import { IField } from "src/entities/IField";
    import { afterUpdate } from "svelte";
import TextInput from "./TextInput.svelte";
    export let field : IField
    export let value : {[key : string] : string}

    afterUpdate(() => {
        console.log("ADDRESS VAL", value);
    })
    
</script>

<label class="usa-label" for="mailing-address-1">Street address 1</label>
<input
  class="usa-input"
  value={value?.address1 ?? ""}
  id="mailing-address-1"
  name="mailing-address-1"
  type="text" />

<label class="usa-label" for="mailing-address-2">
  Street address 2
  <span class="usa-hint">(optional)</span>
</label>
<input
  class="usa-input"
  value={value?.address2 ?? ""}
  id="mailing-address-2"
  name="mailing-address-2"
  type="text" />

<div class="grid-row grid-gap">
  <div class="mobile-lg:grid-col-8">
    <label class="usa-label" for="city">City</label>
    <input class="usa-input" id="city" name="city" type="text" value={value?.city ?? ""}    />
  </div>
  <div class="mobile-lg:grid-col-4">
    <StateSelector value={value?.state ?? ""} name={`${field.name}.state`}/>
  </div>
</div>

<TextInput field={{
    name : `${field.name}.zip`,
    label : "ZIP",
    value : value?.zip ?? "",
    type : "text",
    properties : {
        pattern : "[\d]{5}(-[\d]{4})?",
        className : "usa-input usa-input--medium"
    }
}}/>
