<script lang="typescript">
  //@ts-nocheck
  import type { IField, LabelValue } from "@app/models/IField";
  import { afterUpdate, onDestroy, onMount, tick } from "svelte";
  import { LoadState } from "@app/models/LoadState";
  import { stringEquals, fastEquals } from "@app/util/Compare";
  import { subscribeFieldChange } from "@app/event/FieldEvent";
  import { isFunction, isString } from "@app/guards/Guard";
  import { randomString } from "@app/util/Generate";
  import { dispatch, subscribeComponent } from "@app/event/EventBus";
  import Fuse from "fuse.js";
  import formStore from "@app/store/FormStore";
  import { nullOrEmpty } from "@app/util/Compare";
  import Label from "@app/inputs/Label.svelte";
  import Select from "@app/components/select/Select.svelte";
  import { getApi } from "@app/services/ApiService";

  let initialized = false;
  let dropdownId;
  let open = false;
  let fuse: Fuse<{}>;

  export let field: IField;

  let prevOptions: any = null;
  let activeToolTip: any;

  onDestroy(() => {
    disposeToolTip();
  });

  subscribeComponent("show_field_config", (props) => {
    value = "";
    options = [];
    setup();
  });

  subscribeComponent("combobox_get_options", (props) => {
    if (props.id === field.id) {
      return options;
    }
  });

  subscribeComponent("combobox_open", (props) => {
    if (props.id !== field.id) {
      doClose();
    }
  });

  subscribeComponent("option_set_modified", (set) => {
    if (set.value === field.options) {
      setup();
    }
    if (field.configTarget) {
      setup();
    }
  });

  subscribeFieldChange(onMount, (newField) => {
    if (newField.id === field.id) {
      value = newField.value ?? "";
      normalizeValue();
    }
  });

  onMount(async () => {
    dropdownId = `${field.name}-${randomString()}`;
    initialized = false;
    value = formStore.getValue(field.id);
    await setup();
  });

  $: {
    if (!fastEquals(prevOptions, field.options)) {
      prevOptions = field.options ?? [];
      setup();
    }
  }

  function createFuse(): Fuse<{}> {
    if (!options) {
      return new Fuse([]);
    }
    return new Fuse(options, {
      keys: ["label", "value"],
    });
  }

  async function setup() {
    state = LoadState.Loading;
    options = [];
    try {
      if (
        field.options?.type === "remote" ||
        isString(field.options) ||
        (field.options?.type === "local" && isString(field.options.value))
      ) {
        const url = field.options.value || field.options;
        let result;
        let data;
        if (field.options?.isOurApi) {
          data = await getApi(url);
        } else {
          result = await fetch(url);
          data = await result.json();
        }

        if (!data) {
          return;
        }
        const parsed: any[] = [];
        if (field.loadTransformer) {
          options = field.loadTransformer(data) ?? [];
        } else {
          Object.keys(data).forEach((key) => {
            parsed.push({ value: data[key], label: key });
          });
          options = parsed ?? [];
        }
      } else {
        const value = field.options?.value;
        const data = isFunction(value) ? await value() : await value;
        options =
          (field.loadTransformer ? field.loadTransformer(data) : data) ?? [];
      }
      fuse = createFuse();
      normalizeValue();
      state = LoadState.Finished;
    } catch (ex) {
      console.log(ex);
      options = [];
      state = LoadState.Failed;
    }
  }

  let state: LoadState = LoadState.Loading;
  let value = "";
  let selectedValue: LabelValue;
  let options: LabelValue[] = [];
  let filteredBy = "";
  let filtered: Set<string> = new Set<string>();

  function normalizeValue() {
    const option = options?.find(
      (w) => stringEquals(w.label, value) || stringEquals(w.value, value)
    );
    if (option) {
      value = option.label ?? "";
      selectedValue = option;
    }
  }

  function select(option: LabelValue) {
    doClose();
    value = option.value;
    field.value = option.value;
    formStore.set(field, {
      field: "value",
      value: option.value,
      fromUser: true,
    });
    field.onChange?.(field.value);
  }

  function onBodyClick() {
    doClose();
  }

  function onSearch(query: string) {
    if (options.length === 0) {
      filtered = new Set<string>();
    } else if (query == null || query === "") {
      filtered = new Set<string>();
    } else {
      const result = fuse.search(query);
      filteredBy = "";
      filtered = new Set(result.map((r) => (r.item as LabelValue).value));
      filteredBy = query;
    }
  }

  function onKeyDown(e: any) {
    if (e.key === "Escape") {
      doClose();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const option = document.getElementById(`${field.id}-option-0`);
      option?.focus({
        preventScroll: true,
      });
    }
  }

  function doOpen() {
    dispatch("combobox_open", {
      id: field.id,
    });
    open = true;
  }

  function doClose() {
    disposeToolTip();
    open = false;
    filtered.clear();
    filteredBy = "";
  }

  function disposeToolTip() {
    if (activeToolTip) {
      try {
        activeToolTip.dispose();
      } catch (ex) {}
    }
    activeToolTip = undefined;
  }

  function showTooltip(option: LabelValue, id: string) {
    //@ts-ignore
    activeToolTip = new bootstrap.Tooltip(document.getElementById(id), {
      title: option.label,
      placement: "top",
      trigger: "manual",
    });
    setTimeout(() => {
      activeToolTip.show();
    }, 600);
  }

  function itemFilter(label: string, filterText: string, option: any) {
    if (filteredBy != filterText) {
      onSearch(filterText);
    }
    return filtered.has(option.value);
  }

  function onSelect(e: any): any {
    e.stopPropagation();
    field.value = e.detail.value;
    formStore.set(field, {
      field: "value",
      value: field.value,
      fromUser: true,
    });
  }

  function onClear(): any {
    field.value = undefined;
    formStore.set(field, {
      field: "value",
      value: undefined,
      fromUser: true,
    });
  }

  function onMouseDown(option: LabelValue, id: string) {
    disposeToolTip();
    showTooltip(option, id);
  }
</script>

<style>
  :global(.item.active) {
    background: var(--itemIsActiveBG, #cddaec) !important;
    color: var(--itemIsActiveColor, #cddaec) !important;
  }

  .themed {
    --border: 1px solid #cddaec;
    --borderRadius: 0.3em;
    --placeholderColor: #515479;
    --itemIsActiveColor: #515479;
    --clearSelectColor: #cddaec;
    --clearSelectFocusColor: #cddaec;
    --clearSelectHoverColor: #515479;
    --indicatorColor: #cddaec;
    --inputColor: #cddaec;
    --itemColor: #424767;
    --listEmptyColor: #cddaec;
    --multiItemActiveColor: #cddaec;
    --spinnerColor: #cddaec;
    --borderFocusColor: #cddaec;
    --disabledColor: #cddaec;
    --disabledPlaceholderColor: #cddaec;
    --groupTitleColor: #cddaec;
  }
</style>

<div>
  {#if !field.hideLabel}
    <Label {field} />
  {/if}

  {#if state === LoadState.Loading}
    <div>
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  {:else if state === LoadState.Failed}
    <p>Failed to load.</p>
  {:else}
    {#if options}
      <div on:click|stopPropagation class="themed">
        <Select
          inputAttributes={{ autocomplete: 'off' }}
          items={options}
          on:select={onSelect}
          on:clear={onClear}
          isVirtualList={options.length > 25}
          {itemFilter}
          bind:selectedValue
          showChevron={true} />
      </div>
    {/if}
    {#if field.helperText}
      <div style="padding-top: 0.3em;">
        <small class="form-text text-muted">
          {@html field.helperText ?? ''}
        </small>
      </div>
    {/if}
  {/if}
</div>
