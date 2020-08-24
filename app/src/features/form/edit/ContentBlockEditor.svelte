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
<div style="padding-left: 0.55em;">
    <h5>Block Editor</h5>
</div>
<Field
        editor={true}
        field={{
            id : randomString(),
            type : 'block-editor',
            value : field.value,
            configTarget: field.id,
            configFieldTarget : 'value'
        }}/>
    <div class="flex">
        <button class="blocks-button btn btn-light" type="button">
            Select Block
        </button>
        <button class="blocks-button btn btn-light" type="button">
            Save Block
        </button>
    </div>
</div>

<style>
    .blocks-button {
        margin-top: 0.5em;
        margin-left: 0.6em;
    }
</style>

