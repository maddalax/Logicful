<script lang="ts">
  import type { IField } from "models/IField";
  import { dispatchFieldChange, subscribeFieldChange } from "event/FieldEvent";
  import { onMount } from "svelte";
  import EditorJS from "@editorjs/editorjs";
  import Header from "@editorjs/header";
  import formStore from "store/FormStore";

  export let field: IField;
  export let value = { blocks: [] };
  export let onChange : (value : any) => any
  let editor: EditorJS;

  function onFieldChange(data) {
    console.log('on', onChange)
    onChange?.(data);
  }

  onMount(() => {
    value = formStore.get(field.configTarget ?? field.id);

    subscribeFieldChange((newField) => {
      if (newField.id === field.id) {
        value = newField.value ?? { blocks: [] };
      }
    });

    setTimeout(() => {
      editor = new EditorJS({
        onChange: () => {
          editor.save().then((data) => {
            field.value = data;
            dispatchFieldChange(field, true);
            onFieldChange(data);
          });
        },
        data: value,
        placeholder:
          "Click here and start typing your content. You will see the live preview of how it will be formatted on the right side.",
        holder: `${field.id}-content-block-editor`,
        tools: {
          header: {
            class: Header,
            inlineToolbar: true,
          },
        },
      });
    }, 200);
  });
</script>

<div>
  <div id={`${field.id}-content-block-editor`} />
</div>
