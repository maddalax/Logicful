<script lang="typescript">
  import type { LabelValue } from 'models/IField'
  import { dispatch } from 'event/EventBus'
  import { onMount } from 'svelte'
  export let onChange: (data: LabelValue[] | string[]) => any
  export let helperText: string = ''
  export let onlyLabel: boolean = false
  export let label: string = 'Options'
  export let options: LabelValue[] = [
    {
      label: '',
      value: '',
    },
  ]

  onMount(() => [onRepeaterChange(false)])

  function onRepeaterChange(user: boolean = true) {
    if (onlyLabel) {
      const labels = options.map((m) => m.label)
      user && dispatch('user_change', labels)
      onChange?.(labels)
    } else {
      user && dispatch('user_change', options)
      onChange?.(options)
    }
  }

  function remove(option: number) {
    options.splice(option, 1)
    options = [...options]
    onRepeaterChange()
    if (options.length === 0) {
      options = [
        {
          label: '',
          value: '',
        },
      ]
    }
  }

  function addNew() {
    options = options.concat([
      {
        label: '',
        value: '',
      },
    ])
  }
</script>

<div>
  <label style="margin-left: .5em">{label}</label>
  {#each options as option, i}
    <div class="d-flex flex-row bd-highlight justify-end">
      {#if onlyLabel}
        <div class="p-1 bd-highlight" style="width: 100%;">
          <input class="form-control" name="display" type="text" on:blur={() => onRepeaterChange(true)} bind:value={option.label} placeholder={'Option'} />
        </div>
      {:else}
        <div class="p-1 bd-highlight" style="width: 100%;">
          <input class="form-control" name="display" type="text" on:blur={() => onRepeaterChange(true)} bind:value={option.label} placeholder={'Display'} />
        </div>
        <div class="p-1 bd-highlight" style="width: 100%;">
          <input class="form-control" name="value" type="text" on:blur={() => onRepeaterChange(true)} bind:value={option.value} placeholder={'Value'} />
        </div>
      {/if}
      <div class="bd-highlight"><span class="icon baseline" on:click={addNew}> <span class="fas fa-plus" /> </span></div>
      <div class="bd-highlight"><span class="icon baseline" on:click={() => remove(i)}> <span class="fas fa-trash" /> </span></div>
    </div>
  {/each}
  {#if helperText}
    <div class="helper-text">
      {@html helperText ?? ''}
    </div>
  {/if}
</div>

<style>
  .fa-trash {
    height: 0.5em;
    cursor: pointer;
    margin-top: 15px;
  }

  .fa-plus {
    height: 0.5em;
    cursor: pointer;
    margin-top: 15px;
  }
</style>
