<script lang="typescript">
  import type { LabelValue } from 'models/IField'
  import { dispatch } from 'event/EventBus'
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

  function onRepeaterChange() {
    if (onlyLabel) {
      const labels = options.map(m => m.label);
      dispatch('user_change', labels)
      onChange?.(labels)
    } else {
      dispatch('user_change', options)
      onChange?.(options)
    }
  }

  function remove(option: number) {
    options.splice(option, 1)
    options = [...options]
    onRepeaterChange();
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
        <div class="p-1 bd-highlight"><input class="form-control" name="display" type="text" on:blur={onRepeaterChange} bind:value={option.label} placeholder={'Option'} /></div>
      {:else}
        <div class="p-1 bd-highlight"><input class="form-control" name="display" type="text" on:blur={onRepeaterChange} bind:value={option.label} placeholder={'Display'} /></div>
        <div class="p-1 bd-highlight"><input class="form-control" name="value" type="text" on:blur={onRepeaterChange} bind:value={option.value} placeholder={'Value'} /></div>
      {/if}
      <div class="bd-highlight"><span class="icon baseline" on:click={addNew}><i class="fas fa-plus" /> </span></div>
      <div class="bd-highlight"><span class="icon baseline" on:click={() => remove(i)}><i class="fas fa-trash" /> </span></div>
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
