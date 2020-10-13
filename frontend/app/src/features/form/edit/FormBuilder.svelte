<script lang="typescript">
  import type { IField } from "@app/models/IField";
  import { randomStringSmall, randomString } from "@app/util/Generate";
  import type { IForm } from "@app/models/IForm";
  import { afterUpdate, onDestroy, onMount, tick } from "svelte";
  import { subscribeFieldChange } from "@app/event/FieldEvent";
  import DynamicForm from "./DynamicForm.svelte";
  import formStore from "@app/store/FormStore";
  import { set } from "@app/util/Selection";
  import { fastClone } from "@app/util/Compare";
  import { saveForm, saveToLocalStorage } from "./services/SaveForm";
  import ToastManager from "@app/components/ToastManager.svelte";
  import { debounce } from "@app/util/Debounce";
  import { setFieldDefaults } from "@app/features/form/edit/services/DefaultFieldValueFactory";
  import { getApi } from "@app/services/ApiService";
  import { getUrlParameter } from "@app/util/Http";
  import { startPreviewSaver } from "./services/PreviewSaver";
  import { DynamicFormMode } from "@app/components/models/ComponentProps";
  import { dispatch, subscribeComponent } from "@app/event/EventBus";
  import { navigate } from "svelte-routing";

  let dropped = false;
  let loadingActive: boolean = false;
  let order = [];
  let dragForm: IForm | undefined;
  let lastLength = 0;
  let dirty = false;

  let form: IForm;

  async function loadForm() {
    loadingActive = true;
    const formId = getUrlParameter("formId");
    if (!formId) {
      navigate("/form/create", { replace: true });
      return;
    }
    try {
      await loadFromApi(formId);

      if (!form) {
        return;
      }

      if (!form.fields) {
        form.fields = [];
      }

      form.fields = form.fields.map((w: IField) => {
        w.selected = false;
        return w;
      });

      form.loaded = true;
      formStore.setForm(form);
      dispatch("form_loaded", {
        form,
      });
      saveToLocalStorage(form);
      startPreviewSaver();
      //addPlaceHolder()
    } finally {
      loadingActive = false;
    }
  }

  async function loadFromApi(formId: string) {
    if (!formId) {
      return;
    }
    form = await getApi(`form/${formId}`);
  }

  function removePlaceHolder() {
    const placeholder = form.fields.findIndex((w) => w.type === "placeholder");
    if (placeholder !== -1) {
      const temp = fastClone(form.fields);
      temp.splice(placeholder, 1);
      form.fields = temp;
      dispatch("form_placeholder_changed", {
        added: false,
      });
    }
  }

  function addPlaceHolder() {
    if (form.fields.filter((w) => w.type !== "placeholder").length !== 0) {
      removePlaceHolder();
      return;
    }
    if (form.fields.find((w) => w.type === "placeholder")) {
      return;
    }
    form.fields = form.fields.concat([
      {
        name: "placeholder-field",
        label: "You have no fields",
        type: "placeholder",
        id: "placeholder",
      },
    ]);
    dispatch("form_placeholder_changed", {
      added: true,
    });
  }

  subscribeComponent("form_updated", (props) => {
    form = props;
    addPlaceHolder();
    dirty = true;
  });

  subscribeComponent("field_delete", (params) => {
    const index = form.fields.findIndex((w) => w.id === params.field.id);
    const temp = [...form.fields];
    temp.splice(index, 1);
    form.fields = temp;
    formStore.setForm(form);
    dispatch("unselect_field", {});
  });

  subscribeComponent("right_sidebar_loaded", () => {
    form &&
      dispatch("form_loaded", {
        form,
      });
  });

  subscribeComponent("add_field", (params) => {
    form.fields = form.fields.map((w) => {
      w.selected = false;
      return w;
    });
    const id = randomString();
    let field: IField = {
      name: "new-field-" + randomStringSmall(),
      label: "New Field " + randomStringSmall(),
      type: params.type,
      id,
      selected: true,
      value: undefined,
      expanded: true,
    };
    field = setFieldDefaults(field);
    form.fields = form.fields.concat(field);
    removePlaceHolder();
    formStore.setForm(form);
  });

  subscribeComponent("field_clone", (params) => {
    const index = form.fields.findIndex((w) => w.id === params.field.id);
    const copy = fastClone(form.fields[index]);
    copy.name = copy.name + "-" + randomStringSmall();
    copy.label = copy.label + " Copy";
    copy.id = randomString();
    copy.selected = true;
    const temp = fastClone(form.fields);
    temp.splice(index + 1, 0, copy);
    form.fields = temp;
    formStore.set(copy);
  });

  subscribeComponent("save_form", async (params) => {
    await saveForm();
  });

  subscribeComponent("get_form_fields", () => {
    return form.fields;
  });

  subscribeComponent("drag_over", () => {
    removePlaceHolder();
  });

  subscribeComponent("drag_finished", async (elements) => {
    removePlaceHolder();

    let fields: IField[] = elements
      .filter((w: any) => w)
      .map((e: Element) => {
        if (e.id === "form-field-placeholder") {
          return undefined;
        }
        if (e.id.startsWith("form-field-")) {
          const field = form.fields.find(
            (w) => w.id === e.id.replace("form-field-", "")
          );
          if (field) {
            field.selected = false;
          }
          return field;
        }
        if (e.id.startsWith("sidebar-block-")) {
          const type = e.id.replace("sidebar-block-", "");
          let field: IField = {
            id: randomString(),
            type: type,
            name: "new-field-" + randomStringSmall(),
            label: "New Field " + randomStringSmall(),
            selected: true,
            value: undefined,
          };
          field = setFieldDefaults(field);
          return field;
        }
      });
    fields = fields.filter((w) => w != null);
    form.fields = fastClone(fields);
    await dispatch("destroy_dragula", {});
    await tick();
    dragForm = fastClone(form);
    formStore.setForm(form);
    await tick();
    dragForm = undefined;
    if (form.fields.length === 0) {
      addPlaceHolder();
    }
    await tick();
    dispatch("reload_dragula", {});
  });

  subscribeFieldChange(onMount, (newField: IField) => {
    if (!newField.selected) {
      return;
    }
    form.fields = form.fields.map((f) => {
      if (f.id !== newField.id && f.selected) {
        f.selected = false;
        formStore.set(f);
      }
      return f;
    });
  });

  subscribeComponent("form_saved", (f) => {
    dirty = false;
  });

  subscribeComponent("form_updated", (params) => {
    form = params;
  });

  subscribeComponent("unselect_field", () => {
    form.fields = form.fields.map((f) => {
      if (f.selected) {
        f.selected = false;
        formStore.set(f);
      }
      return f;
    });
  });

  subscribeFieldChange(onMount, async (field: IField) => {
    if (!form || !form.fields) {
      return;
    }
    dirty = true;
    const index = form.fields.findIndex((w) => w.id === field.id);
    if (index !== -1) {
      form.fields[index] = field;
    }
  });

  onMount(async () => {
    loadForm();
  });
</script>


<div>
  <ToastManager />
  {#if form == null || loadingActive}
    <div class="flex-column justify-content-center align-items-center">
      <div class="d-flex justify-content-center">
        <div
          class="spinner-border"
          style="width: 3rem; height: 3rem; margin-top: 2em"
          role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  {:else}
    <div>
      <div>
        {#if dragForm}
          <div>
            <DynamicForm form={dragForm} mode={DynamicFormMode.Preview} />
          </div>
        {:else}
          <div >
            <DynamicForm {form} mode={DynamicFormMode.Preview} />
          </div>
        {/if}
      </div>
    </div>
  {/if}
</div>