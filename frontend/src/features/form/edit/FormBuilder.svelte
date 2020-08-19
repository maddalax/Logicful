<script lang="ts">
  import FieldEdit from "./FieldEdit.svelte";
  import type { IField } from "models/IField";
  import { randomStringSmall, randomString } from "util/Generate";
  import type { IForm } from "models/IForm";
  import { afterUpdate, onMount, tick } from "svelte";
  import { subscribeFieldChange, dispatchFieldChange } from "event/FieldEvent";
  import DropdownButton from "components/DropdownButton.svelte";
  import { DynamicFormMode } from "components/models/ComponentProps";
  import { fade, slide } from "svelte/transition";
  import { dispatch, subscribe } from "event/EventBus";
  import DynamicForm from "./DynamicForm.svelte";
  import { shiftArray } from "../../../util/Array";

  let form: IForm = null;
  let dropped = false;
  let active : number = -1;
  let loadingActive: boolean = false;
  let order = [];

  async function loadForm() {
    //const response = await fetch("http://127.0.0.1:3000/form/list");
    //const forms = await response.json();
    //const temp = forms.find(w => w.name === 'main');
    let temp = localStorage.getItem("form");
    if (!temp) {
      temp = JSON.stringify({ fields: [] });
    }
    form = JSON.parse(temp);
    form.fields = form.fields.map((w) => {
      w.selected = false;
      return w;
    });
    scrollToBottom();
  }

  onMount(async () => {
    loadForm();

    subscribe("save_form", (params) => {
      console.log(JSON.stringify(form, null, 2))
      localStorage.setItem("form", JSON.stringify(form));
    });

    subscribe("block_dropped", (e) => {
      let newActive = -1;
      const items = e.detail.items.map((i, index) => {
        if (!i.type) {
          newActive = index;
          i = {
            ...i,
            ...{
              name: "new-field-" + randomStringSmall(),
              label: "New Field " + randomStringSmall(),
              type: i.name,
              selected : true,
              value: undefined,
              expanded: true,
            },
          };
        } else {
          // Deselect all other fields and select the one that was dropped.
          if(e.type === 'finalize') {
            i.selected = false;
          }
        }
        return { ...i };
      });
      form.fields = items;
      if(e.type === 'finalize') {
        active = newActive;
        dispatch("edit_field", {
          form,
          active
        })
      }
      //addField(params.type, params.index);
    });

    subscribe("field_selected_change", (params) => {
      const field: IField = params.field;
      const index = form.fields.findIndex((w) => w.id === field.id);
      if (field.selected) {
        form.fields = form.fields.map((f, i) => {
          f.selected = i === index;
          return f;
        });
      }
      if (field.selected) {
        active = index;
      } else {
        active = -1;
      }
      dispatch("edit_field", {
        form,
        active
      })
    });

    subscribeFieldChange(async (field: IField) => {
      if (!form) {
        return;
      }

      if (field.configTarget) {
        const toUpdate = form.fields.findIndex(
          (w) => w.id === field.configTarget
        );
        form.fields[toUpdate][field.configFieldTarget] = field.value;
        dispatchFieldChange(form.fields[toUpdate], true);
      }

      const index = form.fields.findIndex((w) => w.id === field.id);

      form.fields[index] = field;
    });
  });

  function scrollToBottom() {}

  function addField(type: string = "string", index: number = -1) {}
</script>

<div>
  {#if form == null}
    <div class="loader" />
  {:else}
    <div class="container" style="padding-left: 0.4em; padding-top: 0.5em;">
      <div class="row">
        <div class={active != null ? 'col' : 'col-md no-gutters max-width'}>
          <DynamicForm {form} mode={DynamicFormMode.Preview} />
        </div>
        {#if loadingActive}
          <div class="col" transition:fade={{ duration: 200 }}>
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        {/if}
      </div>
    </div>
  {/if}
</div>

<style>
  .max-width {
    max-width: 60%;
  }

  .col {
    padding-left: 0.5em;
    padding-right: 0em;
  }
</style>
