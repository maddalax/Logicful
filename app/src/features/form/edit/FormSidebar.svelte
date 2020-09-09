<script lang="typescript">
  // @ts-nocheck
  import { dispatch, subscribeComponent } from 'event/EventBus'
  import { flip } from 'svelte/animate'
  import { randomString } from 'util/Generate'
  import { onMount, tick } from 'svelte'
  import FieldEdit from './FieldEdit.svelte'
  import { slide } from 'svelte/transition'
  import { subscribeFieldChange } from 'event/FieldEvent'
  import { fastClone } from 'util/Compare'
  import { transformDraggedElement } from './util/Draggable'
  import { debounce } from 'util/Debounce'

  let saving = false
  let saved = false
  let loaded = false
  let drake: any = null
  let dragula: any

  function defaultBlocks() {
    return [
      { name: 'string' },
      { name: 'switch' },
      { name: 'spacer' },
      { name: 'date' },
      { name: 'block' },
      { name: 'file' },
      { name: 'address' },
      { name: 'checkbox-group' },
      { name: 'radio-group' },
      { name: 'full-name' },
    ]
  }

  let blocks = defaultBlocks()

  const loadDragula = debounce(async () => {
    if (!dragula) {
      dragula = (await import('dragula')).default
      await tick()
    }
    if (drake) {
      drake.destroy()
    }
    await tick()
    drake = dragula([document.querySelector('#block-container'), document.querySelector('#form-preview-fields')], {
      copy: function (el, source) {
        return source === document.getElementById('block-container')
      },
      accepts: function (el, target) {
        return target !== document.getElementById('block-container')
      },
    })
      .on('drag', function (el) {
        if (el.id && el.id.startsWith('form-field-')) {
          return
        }
        const container = document.getElementById('form-preview-fields')
        if (container && !container.className?.includes('ex-over')) {
          container.className += ' ex-over'
        }
      })
      .on('over', function (el, container) {
        if (el.id && el.id.startsWith('form-field-')) {
          return
        }
        if (container.id === 'form-preview-fields' && !container.className?.includes('ex-over')) {
          container.className += ' ex-over'
        }
        dispatch('drag_over', container)
      })
      .on('drop', function (el) {
        console.log('drop')
        const container = document.getElementById('form-preview-fields')
        if (container) {
          container.className = container.className.replace('ex-over', '')
        }
        const fields = Array.from(document.querySelector('#form-preview-fields').childNodes).filter((w) => w.id?.startsWith('sidebar-block') || w.id?.startsWith('form-field-'))
        dispatch('drag_finished', fields)
        el.remove()

        setTimeout(() => {
          drake.destroy()
        }, 100)
      })
  }, 500)

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

  subscribeComponent('form_saved', () => {
    saved = true
    setTimeout(() => {
      saved = false
    }, 1500)
  })

  subscribeComponent('form_loaded', () => {
    loaded = true
  })

  subscribeComponent('form_updated', () => {
    loadDragula()
  })

  onMount(async () => {
    import('dragula/dist/dragula.css')
  })
</script>

<div style="text-align:center;">
  {#if !loaded}
    <button class="btn save-button btn-primary" type="button" disabled>Loading...</button>
  {:else if saved}
    <button class="btn save-button btn-primary" type="button" disabled>Saved</button>
  {:else if saving}
    <button class="btn save-button btn-primary" type="button" disabled>Saving...</button>
  {:else}<button class="btn save-button btn-primary" type="button" on:click={saveDraft}>Save Form</button>{/if}
</div>
<div style="padding-left: 0.2em;">
  <h5 style="">Add Field</h5>
  <hr style="margin-right: 0.7em !important;" />
  <div id="block-container">
    {#each blocks as block}
      <div on:click={() => addField(block)} id={'sidebar-block-' + block.name}>
      {#if block.name === 'string'}
        <div class="d-flex px-2 block">
          <div>
            <div class="icon icon-sm icon-secondary"><span class="fas fas fa-i-cursor" /></div>
          </div>
          <div class="pl-3">
            <h6 class="h6">Text Input</h6>
          </div>
        </div>
      {:else if block.name === 'spacer'}
        <div class="d-flex px-2 block">
          <div>
            <div class="icon icon-sm icon-secondary"><span class="fas fa-rocket" /></div>
          </div>
          <div class="pl-3">
            <h6 class="h6">Spacer</h6>
          </div>
        </div>
      {:else if block.name === 'switch'}
        <div class="d-flex px-2 block">
          <div>
            <div class="icon icon-sm icon-secondary"><span class="fas fa-toggle-off" /></div>
          </div>
          <div class="pl-3">
            <h6 class="h6">Toggle</h6>
          </div>
        </div>
      {:else if block.name === 'combobox'}
        <div class="d-flex px-2 block">
          <div>
            <div class="icon icon-sm icon-secondary"><span class="far fa-caret-square-down" /></div>
          </div>
          <div class="pl-3">
            <h6 class="h6">Dropdown</h6>
          </div>
        </div>
      {:else if block.name === 'block'}
        <div class="d-flex px-2 block">
          <div>
            <div class="icon icon-sm icon-secondary"><span class="fas fa-indent" /></div>
          </div>
          <div class="pl-3">
            <h6 class="h6">Content</h6>
          </div>
        </div>
      {:else if block.name === 'date'}
        <div class="d-flex px-2 block">
          <div>
            <div class="icon icon-sm icon-secondary"><span class="fas fa-calendar-day" /></div>
          </div>
          <div class="pl-3">
            <h6 class="h6">Date</h6>
          </div>
        </div>
      {:else if block.name === 'file'}
        <div class="d-flex px-2 block">
          <div>
            <div class="icon icon-sm icon-secondary"><span class="fas fa-file-upload" /></div>
          </div>
          <div class="pl-3">
            <h6 class="h6">File Upload</h6>
          </div>
        </div>
      {:else if block.name === 'address'}
        <div class="d-flex px-2 block">
          <div>
            <div class="icon icon-sm icon-secondary"><span class="far fa-address-card" /></div>
          </div>
          <div class="pl-3">
            <h6 class="h6">Address Block</h6>
          </div>
        </div>
      {:else if block.name === 'full-name'}
        <div class="d-flex px-2 block">
          <div>
            <div class="icon icon-sm icon-secondary"><span class="far fa-address-card" /></div>
          </div>
          <div class="pl-3">
            <h6 class="h6">Full Name</h6>
          </div>
        </div>
      {:else if block.name === 'checkbox-group'}
        <div class="d-flex px-2 block">
          <div>
            <div class="icon icon-sm icon-secondary"><span class="far fa-check-square" /></div>
          </div>
          <div class="pl-3">
            <h6 class="h6">Checkboxes</h6>
          </div>
        </div>
      {:else if block.name === 'radio-group'}
        <div class="d-flex px-2 block">
          <div>
            <div class="icon icon-sm icon-secondary"><span class="fas fa-dot-circle" /></div>
          </div>
          <div class="pl-3">
            <h6 class="h6">Radio Buttons</h6>
          </div>
        </div>
      {/if}
    </div>
    {/each}
  </div>

  <div class="d-flex px-2 collapsed" href="#submenu-app" data-toggle="collapse" data-target="#submenu-app" aria-expanded="false">
    <div>
      <div class="icon icon-sm icon-secondary"><span class="fas fa-palette" /></div>
    </div>
    <div class="pl-3">
      <h6 class="h6">Styling</h6>
    </div>
    <div class="pl-3" />
    <div>
      <div class="icon icon-sm icon-secondary link-arrow"><span class="fas fa-chevron-right" style="font-size: 1em;" /></div>
    </div>
  </div>
  <div>
    <div class="multi-level collapse" role="list" id="submenu-app" aria-expanded="false" style="padding-top:0.5em; padding-left: 1em;">
      <ul class="flex-column nav">
        <li class="nav-item">
          <a class="nav-link" id="address" href="#" style="padding-left: 0em;">
            <div class="d-flex px-2 block">
              <div>
                <div class="icon icon-sm icon-secondary"><span class="fas fa-rocket" /></div>
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

<style type="text/scss">
  .block {
    margin-bottom: 1em;
    cursor: pointer;
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

  .h6 {
    font-weight: 400;
  }

  .pl-3 {
    padding-left: 0.7rem !important;
  }
</style>
