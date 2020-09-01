<script lang="typescript">
  // @ts-nocheck
  import { dispatch, subscribe } from 'event/EventBus'
  import { flip } from 'svelte/animate'
  import { dndzone } from 'svelte-dnd-action'
  import { randomString } from 'util/Generate'
  import { onMount } from 'svelte'
  import FieldEdit from './FieldEdit.svelte'
  import { slide } from 'svelte/transition'
  import { subscribeFieldChange } from 'event/FieldEvent'
  import { fastClone } from 'util/Compare'

  let saving = false

  function defaultBlocks() {
    return [
      { id: randomString(), name: 'string' },
      { id: randomString(), name: 'combobox',  },
      { id: randomString(), name: 'switch' },
      { id: randomString(), name: 'spacer' },
      { id: randomString(), name: 'date',  },
      { id: randomString(), name: 'block',  },
      { id: randomString(), name: 'file',  },
      { id: randomString(), name: 'address',  },
      { id: randomString(), name: 'checkbox-group' },
      { id: randomString(), name: 'radio-group' },
      { id: randomString(), name: 'full-name' }
    ]
  }

  let blocks = defaultBlocks()

  function handler(e: any) {
    dispatch('drag_event', {
      type: e.type,
    })
    if (e.type === 'consider') {
      blocks = e.detail.items
    } else {
      blocks = defaultBlocks()
    }
  }

  function addField(block: any) {
    dispatch('add_field', {
      type: block.name,
    })
  }

  async function saveDraft() {
    saving = true
    await dispatch('save_form', {
      status: 'draft',
    })
    saving = false
  }

  function saveAndPublish() {}

  onMount(() => {
    window.onunhandledrejection = (e: any) => {
      console.log('we got exception, but the app has crashed', e)
      // here we should gracefully show some fallback error or previous good known state
      // this does not work though:
      // current = C1;

      // todo: This is unexpected error, send error to log server
      // only way to reload page so that users can try again until error is resolved
      // uncomment to reload page:
      // window.location = "/oi-oi-oi";
    }
  })
</script>

<div style="text-align:center;">
  {#if saving}
    <button class="btn save-button btn-primary" type="button" disabled>Saving...</button>
  {:else}
    <button class="btn save-button btn-primary" type="button" on:click={saveDraft}>Save Form</button>
  {/if}
</div>
<div style="padding-left: 0.2em;">
  <h5 style="">Add Field</h5>
  <hr style="margin-right: 0.7em !important;"/>
  <div use:dndzone={{ items: blocks, flipDurationMs: 300, dropFromOthersDisabled: true, dropTargetStyle: { outline: 'white solid 0px' } }} on:consider={handler} on:finalize={handler}>
    {#each blocks as block (block.id)}
      <div animate:flip={{ duration: 1000 }}>
        <div on:click={() => addField(block)}>
          {#if block.name === 'string'}
            <div class="d-flex px-2 block">
              <div>
                <div class="icon icon-sm icon-secondary">
                  <span class="fas fas fa-i-cursor" />
                </div>
              </div>
              <div class="pl-3">
                <h6 class="h6">Text Input</h6>
              </div>
            </div>
          {:else if block.name === 'spacer'}
            <div class="d-flex px-2 block">
              <div>
                <div class="icon icon-sm icon-secondary">
                  <span class="fas fa-rocket" />
                </div>
              </div>
              <div class="pl-3">
                <h6 class="h6">Spacer</h6>
              </div>
            </div>
          {:else if block.name === 'switch'}
            <div class="d-flex px-2 block">
              <div>
                <div class="icon icon-sm icon-secondary">
                  <span class="fas fa-toggle-off" />
                </div>
              </div>
              <div class="pl-3">
                <h6 class="h6">Toggle</h6>
              </div>
            </div>
          {:else if block.name === 'combobox'}
            <div class="d-flex px-2 block">
              <div>
                <div class="icon icon-sm icon-secondary">
                  <span class="far fa-caret-square-down" />
                </div>
              </div>
              <div class="pl-3">
                <h6 class="h6">Dropdown</h6>
              </div>
            </div>
          {:else if block.name === 'block'}
            <div class="d-flex px-2 block">
              <div>
                <div class="icon icon-sm icon-secondary">
                  <span class="fas fa-indent" />
                </div>
              </div>
              <div class="pl-3">
                <h6 class="h6">Content</h6>
              </div>
            </div>
          {:else if block.name === 'date'}
            <div class="d-flex px-2 block">
              <div>
                <div class="icon icon-sm icon-secondary">
                  <span class="fas fa-calendar-day" />
                </div>
              </div>
              <div class="pl-3">
                <h6 class="h6">Date</h6>
              </div>
            </div>
          {:else if block.name === 'file'}
            <div class="d-flex px-2 block">
              <div>
                <div class="icon icon-sm icon-secondary">
                  <span class="fas fa-file-upload" />
                </div>
              </div>
              <div class="pl-3">
                <h6 class="h6">File Upload</h6>
              </div>
            </div>
          {:else if block.name === 'address'}
            <div class="d-flex px-2 block">
              <div>
                <div class="icon icon-sm icon-secondary">
                  <span class="far fa-address-card" />
                </div>
              </div>
              <div class="pl-3">
                <h6 class="h6">Address Block</h6>
              </div>
            </div>
          {:else if block.name === 'full-name'}
          <div class="d-flex px-2 block">
            <div>
              <div class="icon icon-sm icon-secondary">
                <span class="far fa-address-card" />
              </div>
            </div>
            <div class="pl-3">
              <h6 class="h6">Full Name</h6>
            </div>
          </div>
          {:else if block.name === 'checkbox-group'}
            <div class="d-flex px-2 block">
              <div>
                <div class="icon icon-sm icon-secondary">
                  <span class="far fa-check-square" />
                </div>
              </div>
              <div class="pl-3">
                <h6 class="h6">Checkboxes</h6>
              </div>
            </div>
          {:else if block.name === 'radio-group'}
            <div class="d-flex px-2 block">
              <div>
                <div class="icon icon-sm icon-secondary">
                  <span class="fas fa-dot-circle" />
                </div>
              </div>
              <div class="pl-3">
                <h6 class="h6">Radio Buttons</h6>
              </div>
            </div>
          {/if}
        </div>
      </div>
    {/each}
  </div>

  <div class="d-flex px-2 collapsed" href="#submenu-app" data-toggle="collapse" data-target="#submenu-app" aria-expanded="false">
    <div>
      <div class="icon icon-sm icon-secondary">
        <span class="fas fa-palette" />
      </div>
    </div>
    <div class="pl-3">
      <h6 class="h6">Styling</h6>
    </div>
    <div class="pl-3" />
    <div>
      <div class="icon icon-sm icon-secondary link-arrow">
        <span class="fas fa-chevron-right"  style="font-size: 1em;"/>
      </div>
    </div>
  </div>
  <div>
    <div class="multi-level collapse" role="list" id="submenu-app" aria-expanded="false" style="padding-top:0.5em; padding-left: 1em;">
      <ul class="flex-column nav">
        <li class="nav-item">
          <a class="nav-link" id="address" href="#" style="padding-left: 0em;">
            <div class="d-flex px-2 block">
              <div>
                <div class="icon icon-sm icon-secondary">
                  <span class="fas fa-rocket" />
                </div>
              </div>
              <div class="pl-3">
                <h6 class="h6">Spacer</h6>
              </div>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </div>
</div>

<style>
  .block {
    margin-bottom: 1em;
  }

  .save-button {
    width: 94%;
    height: 40px;
    padding: 0 0;
    margin-bottom: 1.2em;
    margin-left: -6px;
  }

  .px-3 {
    padding-left: 1em;
  }

  .h6{
    font-weight: 400;
  }

  .pl-3 {
    padding-left: 0.7rem !important;
}
</style>
