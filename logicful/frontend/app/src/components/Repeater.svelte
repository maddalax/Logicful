<script lang="typescript">
  import type { LabelValue } from "@app/models/IField";
  import { dispatch } from "@app/event/EventBus";
  import { onMount } from "svelte";
  export let onChange: (data: LabelValue[] | string[]) => any;
  export let helperText: string = "";
  export let onlyLabel: boolean = false;
  export let label: string = "Options";
  export let options: LabelValue[] = [
    {
      label: "",
      value: "",
    },
  ];

  onMount(() => [onRepeaterChange(false)]);

  function onRepeaterChange(user: boolean = true) {
    if (onlyLabel) {
      const labels = options.map((m) => m.label);
      user && dispatch("user_change", labels);
      onChange?.(labels);
    } else {
      user && dispatch("user_change", options);
      onChange?.(options);
    }
  }

  function remove(option: number) {
    options.splice(option, 1);
    options = [...options];
    onRepeaterChange();
    if (options.length === 0) {
      options = [
        {
          label: "",
          value: "",
        },
      ];
    }
  }

  function addNew() {
    options = options.concat([
      {
        label: "",
        value: "",
      },
    ]);
  }
</script>

<label class="block text-sm font-medium leading-5 text-gray-700">{label}</label>
{#each options as option, i}
  {#if onlyLabel}
    <div class="flex pb-1">
      <div class="flex-initial pr-2 w-10/12">
        <div class="mt-1 relative rounded-md shadow-sm">
          <input
            class="form-input block w-full sm:text-sm sm:leading-5"
            name="display"
            type="text"
            on:blur={() => onRepeaterChange(true)}
            bind:value={option.label}
            placeholder={'Option'} />
        </div>
      </div>
      <div class="flex-initial py-2">
        <svg
          on:click={addNew}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          class="h-6 w-6"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <div class="flex-initial py-2">
        <svg
          on:click={() => remove(i)}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          class="h-6 w-6"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </div>
    </div>
  {:else}
    <div class="flex">
      <div class="flex-initial pr-1 w-auto">
        <div class="mt-1 relative rounded-md shadow-sm">
          <input
            class="form-input block w-full sm:text-sm sm:leading-5"
            name="display"
            type="text"
            on:blur={() => onRepeaterChange(true)}
            bind:value={option.label}
            placeholder={'Display'} />
        </div>
      </div>
      <div class="flex-initial pr-2 w-auto">
        <div class="mt-1 relative rounded-md shadow-sm">
          <input
            class="form-input block w-full sm:text-sm sm:leading-5"
            name="value"
            type="text"
            on:blur={() => onRepeaterChange(true)}
            bind:value={option.value}
            placeholder={'Value'} />
        </div>
      </div>
      <div class="flex-initial py-2">
        <svg
          on:click={addNew}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          class="h-6 w-6"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <div class="flex-initial py-2">
        <svg
          on:click={() => remove(i)}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          class="h-6 w-6"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </div>
    </div>
  {/if}
{/each}

<!-- <div>
  <label style="margin-left: .5em">{label}</label>
  {#each options as option, i}
    <div class="d-flex flex-row bd-highlight justify-end">
      {#if onlyLabel}
        <div class="p-1 bd-highlight" style="width: 100%;">
          <input
            class="form-control"
            name="display"
            type="text"
            on:blur={() => onRepeaterChange(true)}
            bind:value={option.label}
            placeholder={'Option'} />
        </div>
      {:else}
        <div class="p-1 bd-highlight" style="width: 100%;">
          <input
            class="form-control"
            name="display"
            type="text"
            on:blur={() => onRepeaterChange(true)}
            bind:value={option.label}
            placeholder={'Display'} />
        </div>
        <div class="p-1 bd-highlight" style="width: 100%;">
          <input
            class="form-control"
            name="value"
            type="text"
            on:blur={() => onRepeaterChange(true)}
            bind:value={option.value}
            placeholder={'Value'} />
        </div>
      {/if}
      <div class="bd-highlight">
        <span class="icon baseline" on:click={addNew}>
          <span class="fas fa-plus" />
        </span>
      </div>
      <div class="bd-highlight">
        <span class="icon baseline" on:click={() => remove(i)}>
          <span class="fas fa-trash" />
        </span>
      </div>
    </div>
  {/each}
  {#if helperText}
    <div class="helper-text">
      {@html helperText ?? ''}
    </div>
  {/if}
</div> -->
