<script lang="typescript">
  import type { IField } from 'models/IField'
  import { randomStringSmall, randomString } from 'util/Generate'
  import type { IForm } from 'models/IForm'
  import { onMount } from 'svelte'
  import { subscribeFieldChange } from 'event/FieldEvent'
  import { dispatch, subscribe } from 'event/EventBus'
  import DynamicForm from './DynamicForm.svelte'
  import formStore from 'store/FormStore'
  import { set } from 'util/Selection'
  import { DynamicFormMode } from 'components/models/ComponentProps'
  import { fastClone } from 'util/Compare'

  let dropped = false
  let loadingActive: boolean = false
  let order = []
  let form: IForm

  async function loadForm() {
    //const response = await fetch("http://127.0.0.1:3000/form/list");
    //const forms = await response.json();
    //const temp = forms.find(w => w.name === 'main');
    let temp = localStorage.getItem('form')
    if (!temp) {
      temp = JSON.stringify({ fields: [] })
    }
    form = JSON.parse(temp)
    form.fields = form.fields.map((w: IField) => {
      w.selected = false
      return w
    })

    addPlaceHolder()

    formStore.setForm(form)
    dispatch('form_loaded', {
      form,
    })
  }

  function removePlaceHolder() {
    const placeholder = form.fields.findIndex((w) => w.type === 'placeholder')
    if (placeholder !== -1) {
      const temp = fastClone(form.fields)
      temp.splice(placeholder, 1)
      form.fields = temp
      dispatch('form_placeholder_changed', {
        added: false,
      })
    }
  }

  function addPlaceHolder() {
    if (form.fields.length !== 0) {
      return
    }
    form.fields = form.fields.concat([
      {
        name: 'placeholder-field',
        label: 'You have no fields',
        type: 'placeholder',
        id: 'placeholder',
      },
    ])
    dispatch('form_placeholder_changed', {
      added: true,
    })
  }

  onMount(async () => {
    loadForm()

    subscribe('form_updated', (props) => {
      form = props.form
      addPlaceHolder()
    })

    subscribe('field_delete', (params) => {
      const index = form.fields.findIndex((w) => w.id === params.field.id)
      const temp = [...form.fields]
      temp.splice(index, 1)
      form.fields = temp
      formStore.setForm(form)
    })

    subscribe('right_sidebar_loaded', () => {
      form &&
        dispatch('form_loaded', {
          form,
        })
    })

    subscribe('add_field', (params) => {
      form.fields = form.fields.map((w) => {
        w.selected = false
        return w
      })
      const id = randomString()
      form.fields = form.fields.concat([
        {
          name: 'new-field-' + randomStringSmall(),
          label: 'New Field ' + randomStringSmall(),
          type: params.type,
          id,
          selected: true,
          value: undefined,
          expanded: true,
        },
      ])
      removePlaceHolder()
      formStore.setForm(form)
    })

    subscribe('field_clone', (params) => {
      const index = form.fields.findIndex((w) => w.id === params.field.id)
      const copy = fastClone(form.fields[index])
      copy.name = copy.name + '-' + randomStringSmall()
      copy.label = copy.label + ' Copy'
      copy.id = randomString()
      copy.selected = true
      const temp = fastClone(form.fields)
      temp.splice(index + 1, 0, copy)
      form.fields = temp
      formStore.set(copy)
    })

    subscribe('save_form', (params) => {
      const form = formStore.getForm()
      localStorage.setItem('form', JSON.stringify(form))
    })

    subscribe('get_form_fields', () => {
      return form.fields
    })

    subscribe('block_dropped', (e) => {
      removePlaceHolder()
      const items: IField[] = e.detail.items.map((i: any, index: number) => {
        if (!i.type) {
          i = {
            ...i,
            ...{
              name: 'new-field-' + randomStringSmall(),
              label: 'New Field ' + randomStringSmall(),
              type: i.name,
              selected: true,
              value: undefined,
              expanded: true,
            },
          }
        } else {
          // Deselect all other fields and select the one that was dropped.
          if (e.type === 'finalize' && i.selected) {
            i.selected = false
            formStore.set(i)
          }
        }
        return { ...i }
      })
      if (e.type === 'finalize') {
        const selected = items.find((w) => w.selected)
        if (selected) {
          formStore.set(selected)
        }
      }
      form.fields = items
      formStore.setForm(form)
    })

    subscribeFieldChange((newField: IField) => {
      if (!newField.selected) {
        return
      }
      form.fields = form.fields.map((f) => {
        if (f.id !== newField.id && f.selected) {
          f.selected = false
          formStore.set(f)
        }
        return f
      })
    })

    subscribe('form_updated', (params) => {
      form = params.form
    })

    subscribe("document_click", () => {
      form.fields = form.fields.map(f => {
        if(f.selected) {
          f.selected = false;
          formStore.set(f);
        }
        return f;
      });
    })

    subscribeFieldChange(async (field: IField) => {
      if (!form || !form.fields) {
        return
      }
      const index = form.fields.findIndex((w) => w.id === field.id)
      if (index !== -1) {
        form.fields[index] = field
      }
    })
  })
</script>

<div>
  {#if form == null}
    <div class="loader" />
  {:else}
    <div class="container" style="padding-left: 0.4em; padding-top: 0.5em;">
      <div class="row">
        <div class={'col-md no-gutters max-width'}>
          <DynamicForm {form} mode={DynamicFormMode.Preview} />
        </div>
        {#if loadingActive}
          <div class="col">
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        {/if}
      </div>
    </div>
  {/if}
</div>

<style>
  .col {
    padding-left: 0.5em;
    padding-right: 0em;
  }
</style>
