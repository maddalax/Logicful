<script lang="ts">
  import type { IField, LabelValue } from "models/IField";
  import { afterUpdate, onMount, tick } from "svelte";
  import { LoadState } from "models/LoadState";
  import { stringEquals, shallowEquals } from "util/Compare";
  import { subscribeFieldChange } from "event/FieldEvent";
  import { isString } from "guards/Guard";
  import { randomString } from "../util/Generate";
  import { dispatchFieldChange } from "../event/FieldEvent";
  import { subscribe } from "../event/EventBus";
  import Fuse from "fuse.js";
  import formStore from "../store/FormStore";
  import {nullOrEmpty} from "util/Compare";
  import Label from "inputs/Label.svelte";

  let initialized = false;
  let dropdownId;
  let open = false;
  let fuse: Fuse<{}>;
  let query = "";
  export let search = true;

  export let field: IField;

  let prevOptions = null;

  onMount(async () => {
    subscribe("show_field_config", (props) => {
      value = "";
      options = [];
      setup();
    });

    dropdownId = `${field.name}-${randomString()}`;
    initialized = false;
    subscribe("option_set_modified", (set) => {
      if (set.value === field.options) {
        setup();
      }
      if (field.configTarget) {
        setup();
      }
    });

    subscribeFieldChange((newField) => {
      if (newField.id === field.id) {
        value = newField.value ?? "";
        normalizeValue();
      }
    });
    await setup();
  });

  $: {
    if (!shallowEquals(prevOptions, field.options)) {
      prevOptions = field.options;
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
        const result = await fetch(url);
        const data = await result.json();
        if (!data) {
          return;
        }
        const parsed = [];
        if (field.loadTransformer) {
          options = field.loadTransformer(data);
        } else {
          Object.keys(data).forEach((key) => {
            parsed.push({ value: data[key], label: key });
          });
          options = parsed;
        }
      } else {
        options = field.options?.value;
      }
      filtered = options ?? [];
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
  let options: LabelValue[] = [];
  let filtered: LabelValue[] = [];

  function normalizeValue() {
    const option = options?.find(
      (w) => stringEquals(w.label, value) || stringEquals(w.value, value)
    );
    if (option) {
      value = option.value ?? "";
    }
  }

  function select(option: LabelValue) {
    doClose();
    value = option.value;
    field.value = option.value;
    dispatchFieldChange(field, true);
    field.onChange?.(e.target.value);
  }

  function onBodyClick() {
    doClose();
  }

  function onSearch() {
    if (options.length === 0) {
      filtered = options;
    } else if (query == null || query === "") {
      filtered = options;
    } else {
      const result = fuse.search(query);
      filtered = result.map((r) => r.item);
    }
  }

  function onKeyDown(e) {
    if (e.key === "Escape") {
      doClose();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const option = document.getElementById(`${field.id}-option-0`);
      option.focus({
        preventScroll: true,
      });
    }
  }

  function inputOnKeyDown(e) {
    e.preventDefault();
    if (e.key === "Escape") {
      doClose();
    }
    if (e.key === "ArrowDown") {
      if (open) {
        const input = document.getElementById(`${field.id}-search-input`);
        if (!input) {
          return;
        }
        input.focus({
          preventScroll: true,
        });
      } else {
        doOpen();
      }
    }
  }

  function doOpen() {
    open = true;
  }

  function doClose() {
    open = false;
    query = "";
    filtered = options;
  }

  function optionOnKeyPress(e, option, index) {
    if (index === 0 && e.key === "ArrowUp") {
      const input = document.getElementById(`${field.id}-search-input`);
      if (!input) {
        return;
      }
      input.focus({
        preventScroll: true,
      });
    }
    if (e.key === "Escape") {
      open = false;
    }
    if (e.key === "Enter") {
      select(option);
    }
  }

  function optionOnKeyDown(e, option, index) {
    if (index === 0 && e.key === "ArrowUp") {
      const input = document.getElementById(`${field.id}-search-input`);
      if (!input) {
        return;
      }
      input.focus({
        preventScroll: true,
      });
    }
  }
</script>

<svelte:body
  on:click={onBodyClick}
  on:keydown={(e) => {
    if (e.key === 'Escape') {
      doClose();
    }
  }} />

<div>

  <Label {field} />

  {#if state === LoadState.Loading}
    <div>
      <div class="spinner-border" role="status" >
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  {:else if state === LoadState.Failed}
    <p>Failed to load.</p>
  {:else}
    <div class="form-group dropdown" on:keydown|stopPropagation>
      <div id="input_container">
        <input
                class="form-select"
                readonly
                on:click|stopPropagation={() => (open ? doClose() : doOpen())}
                on:keydown|stopPropagation={inputOnKeyDown}
                value={options?.find((w) => w.value === value)?.label ?? ''}
        />
        {#if !nullOrEmpty(options?.find((w) => w.value === value)?.label)}
          <i class="fas fa-times input-svg input-svg-2" on:click={() => {
            value = ''
            field.value = undefined;
            dispatchFieldChange(field, true);
          }}></i>
          <i class="fas fa-caret-down input-svg" on:click={doOpen}></i>
        {:else}
          <i class="fas fa-caret-down input-svg" on:click={doOpen}></i>
        {/if}
      </div>
      {#if filtered != null}
        <div class="dropdown-menu" class:show={open}>
          {#if search}
            <input
              class="form-control search dropdown-item"
              autocomplete="off"
              id={`${field.id}-search-input`}
              placeholder="Search..."
              value={query}
              on:input={(e) => {
                query = e.target.value;
                onSearch();
              }}
              on:keydown|stopPropagation|preventDefault={onKeyDown}
              on:click|stopPropagation
            />
          {/if}
          {#if filtered.length === 0}
            <a class="dropdown-item" href="javascript:void(0)">
              No options to display.
            </a>
          {/if}
          {#each filtered as option, i}
            <a
              class="dropdown-item"
              id={`${field.id}-option-${i}`}
              href="javascript:void(0)"
              on:keypress={(e) => optionOnKeyPress(e, option, i)}
              on:keydown={(e) => optionOnKeyDown(e, option, i)}
              on:click|stopPropagation={() => select(option)}
            >
              {option.label}
            </a>
          {/each}
        </div>
      {/if}
    </div>
  {/if}

</div>

<style>
  .search {
    border: 0.0625rem solid #e6e6e6;
    border-radius: 0;
    margin-top: -9px;
    color: #929292;
  }
  .logicful-dropdown {
    position: relative;
  }

  .padding {
    padding-left: 7em;
  }

  #input_container {
    position:relative;
  }

  .form-select {
    padding-right: 30px;
    width: 100%;
  }

  .input-svg {
    position:absolute;
    bottom: -3px;
    right: -5px;
    width: 32px;
    height: 32px;
    cursor: pointer;
  }

  .input-svg-2 {
    right: 11px;
  }

  .form-select {
    cursor: pointer;
    background-image: none;
  }
</style>
