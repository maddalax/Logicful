<script lang="ts">
  import type { IField } from "models/IField";
  import type { ContentBlock } from "models/ContentBlock";

  import Field from "./Field.svelte";
  import { randomString } from "util/Generate";
  import {dispatch} from "../../../event/EventBus";
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

<Field
  field={{ id: randomString(), loadTransformer: loadTransformer, label: 'Content Block', value: { type: 'local', value: field.value }, type: 'combobox', configFieldTarget: 'value', configTarget: field.id, options: { type: 'remote', value: 'http://localhost:3000/content-block/list' } }}
/>
<div style="width: 90%; margin-left: 10px;">
    <button class="btn btn-primary" on:click={manageBlocks}>Manage Content Blocks</button>
</div>