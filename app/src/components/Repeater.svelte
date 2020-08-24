<script lang="typescript">
  import type { LabelValue } from 'models/IField'
  import { dispatch } from 'event/EventBus'
  export let onChange: (data: LabelValue[]) => any
  export let helperText: string = ''
  export let options: LabelValue[] = [
    {
      label: '',
      value: '',
    },
  ]

  function onRepeaterChange() {
    dispatch('user_change', options)
    onChange?.(options)
  }

  function remove(option: number) {
    options.splice(option, 1)
    options = [...options]
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
  <label>Options</label>
  <div class="container">
    {#each options as option, i}
      <div class="row">
        <div class="col">
          <input class="form-control" name="display" type="text" on:blur={onRepeaterChange} bind:value={option.label} placeholder={'Display'} />
        </div>
        <div class="col">
          <input class="form-control" name="value" type="text" on:blur={onRepeaterChange} bind:value={option.value} placeholder={'Value'} />

        </div>
        <div class="col-1">
          <span class="icon baseline trash-icon" on:click={() => remove(i)}>
            <i class="fas fa-trash" />
          </span>
        </div>
      </div>
    {/each}
  </div>
  {#if helperText}
    <div class="helper-text">
      {@html helperText ?? ''}
    </div>
  {/if}
  <button class="btn-primary btn" style="margin-top: 1em" on:click={addNew}>Add New</button>
</div>

<style>
  .trash-icon {
    height: 1.1em;
    width: 1.1em;
    margin-top: 1em;
    display: inline-block;
    cursor: pointer;
  }
</style>
