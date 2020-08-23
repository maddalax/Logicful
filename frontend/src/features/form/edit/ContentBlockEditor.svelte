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

<h4 class="text-center">Content Editor</h4>
<Field
        editor={true}
        field={{
            id : randomString(),
            type : 'block-editor',
            value : field.value,
            configTarget: field.id,
            configFieldTarget : 'value'
        }}/>