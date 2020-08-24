<script lang="ts">
  import type { IField } from "models/IField";
  import { dispatchFieldChange, subscribeFieldChange } from "event/FieldEvent";
  import { onMount } from "svelte";

  import formStore from "store/FormStore";
  let element: any;

  export let field: IField;
  export let value = { blocks: [] };
  export let onChange: (value: any) => any;
  let editor: any;

  function onFieldChange(data : any) {
    console.log("on", onChange);
    onChange?.(data);
  }

  onMount(() => {

    if(!process.browser) {
      return;
    }

    const Quill = require('quill');
    require('quill/dist/quill.min');
    require('quill/dist/quill.snow.css')

    value = formStore.get(field.configTarget ?? field.id) ?? "";
    subscribeFieldChange((newField) => {
      if (newField.id === field.id) {
        value = newField.value ?? "";
      }
    });

    var toolbarOptions = [
      ["bold", "italic", "underline", "strike"],

      [{ list: "ordered" }, { list: "bullet" }],

      [{ header: [1, 2, 3, 4, 5, 6, false] }, { color: [] }, { align: [] }],
      ["clean"],
    ];
    let quill = new Quill(element, {
      theme: "snow",
      placeholder: "Start typing and see the preview on the left side.",
      modules: {
        toolbar: toolbarOptions,
      },
    });

    quill.container.firstChild.innerHTML = value;

    quill.on("text-change", function (delta : any, oldDelta : any, source : any) {
      field.value = quill.container.firstChild.innerHTML;
      dispatchFieldChange(field, true);
    });
  });
</script>

<div>
  <div bind:this={element} />
</div>
