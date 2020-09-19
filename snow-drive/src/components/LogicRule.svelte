<script lang="typescript">
  import type {
    LogicConditional,
    LogicRule,
    LogicRuleOptions,
  } from "@app/models/LogicBuilder";
  import type { IField } from "@app/models/IField";
  import type { LabelValue } from "@app/models/IField";
  import { dispatch } from "@app/event/EventBus";
  import { onMount } from "svelte";
  import { dispatchSingle } from "@app/event/EventBus";
  import Field from "@app/features/form/edit/Field.svelte";
  import { randomString } from "@app/util/Generate";
  import { subscribeFieldChange } from "@app/event/FieldEvent";
  import formStore from "@app/store/FormStore";
  import { isObject } from "@app/guards/Guard";
  import Label from "@app/inputs/Label.svelte";
  import { firstNotEmpty } from "@app/util/Format";
  import { assertExists } from "@app/util/Selection";
  import { fastClone, isEmptyOrNull } from "@app/util/Compare";

  export let helperText: string = "";
  export let field: IField;
  let options: LogicRuleOptions[] = [];

  subscribeFieldChange(onMount, (newField, change) => {
    if (change.field === "value") {
      return;
    }
    if (field.id === newField.id) {
      field = newField;
      if (field.logic?.action && isEmptyOrNull(field.logic?.rules)) {
        addNew();
      }
      if (field.logic?.rules) {
        field.logic.rules.forEach((f, i) => {
          options[i] = getOptions(i);
        });
      }
    }
  });

  function getFields(): IField[] {
    let fields = dispatchSingle<IField[]>("get_form_fields", {});
    fields = fields.filter((w) => w.id !== field.id && w.type !== "spacer");
    return fields;
  }

  function remove(option: number) {
    const temp = fastClone(field.logic!.rules);
    temp.splice(option, 1);
    field.logic!.rules = temp;
    formStore.set(field);
  }

  function addNew() {
    if (!field.logic?.rules) {
      field.logic = field.logic ?? { rules: [], action: "" };
      field.logic.rules = [];
    }
    field.logic!.rules = field.logic!.rules.concat([
      {
        field: "",
        value: "",
        condition: "",
      },
    ]);
    formStore.set(field);
  }

  function shouldShowValue(index: number) {
    const condition = field.logic?.rules?.[index]?.condition ?? "";
    const toNotShow = ["hasValue", "isTrue", "isFalse", "notHaveValue"];
    if (toNotShow.includes(condition)) {
      return false;
    }
    return true;
  }

  function getOptions(index: number): LogicRuleOptions {
    const value = field.logic?.rules?.[index]?.condition;
    const condition = conditions(index).find((w) => w.value === value);
    if (!condition) {
      return {
        valueType: "text",
        showValue: false,
        options: () => Promise.resolve([]),
        helperText: "",
        placeholder: "",
      };
    }
    return {
      valueType: condition.valueInput ?? "text",
      showValue: shouldShowValue(index),
      options: () => loadOptions(index),
      helperText: condition.helper ?? "",
      placeholder: condition.placeholder ?? "",
    };
  }

  function loadOptions(index: number): Promise<LabelValue[]> {
    const id = field.logic?.rules?.[index]?.field;
    if (!id) {
      return Promise.resolve([]);
    }
    return dispatchSingle("combobox_get_options", {
      id,
    });
  }

  function conditions(index: number): LogicConditional[] {
    const targetFieldId = field.logic?.rules?.[index]?.field;
    if (!targetFieldId) {
      return [];
    }
    const fields = getFields();
    const targetField = fields.find((w) => w.id === targetFieldId);
    if (!targetField) {
      return [];
    }
    if (targetField.type === "string") {
      return [
        {
          label: "Contains",
          value: "contains",
        },
        {
          label: "Starts With",
          value: "startsWith",
        },
        {
          label: "Ends With",
          value: "endsWith",
        },
        {
          label: "Equals",
          value: "eq",
        },
        {
          label: "Has Value",
          value: "hasValue",
        },
      ];
    }
    if (targetField.type === "combobox") {
      return [
        {
          label: "Equals",
          value: "eq",
          valueInput: "combobox",
          options: loadOptions,
        },
        {
          label: "Not Equals",
          value: "notEq",
          valueInput: "combobox",
          options: loadOptions,
        },
        {
          label: "Has Selected Option",
          value: "hasValue",
        },
      ];
    }
    if (targetField.type === "switch") {
      return [
        {
          label: "Is Toggled",
          value: "isTrue",
        },
        {
          label: "Is Not Toggled",
          value: "isFalse",
        },
      ];
    }
    if (targetField.type === "file") {
      return [
        {
          label: "Has Chosen File",
          value: "hasValue",
        },
        {
          label: "Has Not Chosen File",
          value: "notHaveValue",
        },
        {
          label: "Is File Extension",
          value: "isFileExtension",
          helper:
            "You can include multiple extensions by seperating with a comma.",
          placeholder: "pdf, txt, png",
        },
        {
          label: "Is Not File Extension",
          helper:
            "You can include multiple extensions by seperating with a comma.",
          value: "isNotFileExtension",
          placeholder: "pdf, txt, png",
        },
      ];
    }
    if (targetField.type === "number") {
      return [
        {
          label: "Greater Than",
          value: "gt",
        },
        {
          label: "Less Than",
          value: "lt",
        },
        {
          label: "Less Than or Equal To",
          value: "lte",
        },
        {
          label: "Greater Than or Equal To",
          value: "gte",
        },
        {
          label: "Equal To",
          value: "eq",
        },
        {
          label: "Has Value",
          value: "hasValue",
        },
      ];
    }

    return [];
  }

  function customCss() {
    return "padding-top: 0em; padding-left: 0.6em; padding-right: 0.6em; padding-bottom: 0.7em;";
  }

  function fieldsTransformer(fields: IField[]): LabelValue[] {
    return fields.map((f) => {
      return {
        label: `${firstNotEmpty(f.label, f.name)} - ${f.type}`,
        value: f.id,
      };
    });
  }
</script>

<div>
  {#each field.logic?.rules ?? [] as option, i}
    <div
      class="container"
      style="background-color: rgb(245 249 253); padding-left: 0.3em; padding-right: 0.3em;">
      <div class="row">
        <div class="col">
          <div
            class="float-right"
            style="position: relative; display: inline-flex; vertical-align: middle; top: 0.8em; right: 0.6em;">
            <button
              type="button"
              on:click={() => remove(i)}
              class="btn btn-secondary"
              style="font-size: 0.5rem; padding: 0.25rem 0.5rem;">
              <span class="icon-brand"> <span class="fas fa-trash" /> </span>
            </button>
          </div>
          <Field
            config={{ search: true }}
            field={{ id: randomString(), loadTransformer: fieldsTransformer, helperText: 'Select which field the conditional should be ran against.', label: 'Select Field', value: { type: 'local', value: field.logic?.rules?.[i]?.field }, type: 'combobox', required: true, configFieldTarget: `logic.rules[${i}].field`, configTarget: field.id, options: { type: 'local', value: getFields } }} />
        </div>
      </div>
      <div class="row">
        {#if field.logic?.rules?.[i]?.field}
          <Field
            config={{ search: true }}
            field={{ id: randomString(), customCss: customCss(), label: 'Select Your Condition', value: { type: 'local', value: field.logic?.rules?.[i]?.condition }, type: 'combobox', required: true, configFieldTarget: `logic.rules[${i}].condition`, configTarget: field.id, options: { type: 'local', value: conditions(i) } }} />
        {/if}
      </div>
      <div class="row">
        {#if field.logic?.rules?.[i]?.condition && options[i]?.showValue}
          {#if options[i].valueType === 'text'}
            <Field
              field={{ id: randomString(), customCss: customCss(), helperText: options[i].helperText, placeholder: options[i].placeholder, label: 'Provide Value For Conditional', value: { type: 'local', value: field.logic?.rules?.[i]?.value }, type: 'string', required: true, configFieldTarget: `logic.rules[${i}].value`, configTarget: field.id }} />
          {:else if options[i].valueType === 'combobox'}
            <Field
              field={{ id: randomString(), customCss: customCss(), helperText: options[i].helperText, placeholder: options[i].placeholder, label: 'Provide Value For Conditional', value: { type: 'local', value: field.logic?.rules?.[i]?.value }, type: 'combobox', required: true, configFieldTarget: `logic.rules[${i}].value`, configTarget: field.id, options: { type: 'local', value: options[i].options } }} />
          {/if}
        {/if}
      </div>
    </div>
    <br />
  {/each}
  {#if helperText}
    <div class="helper-text">
      {@html helperText ?? ''}
    </div>
  {/if}
  <button class="btn-primary btn" style="" on:click={addNew}>Add Rule</button>
</div>

<style>
  .what {
    display: inline-flex;
    vertical-align: middle;
  }
</style>
