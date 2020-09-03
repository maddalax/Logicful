<script lang="typescript">
  import type { IField } from 'models/IField'
  import { randomStringSmall, randomString } from 'util/Generate'
  import type { IForm } from 'models/IForm'
  import { afterUpdate, onDestroy, onMount, tick } from 'svelte'
  import { subscribeFieldChange } from 'event/FieldEvent'
  import { dispatch, subscribe, subscribeComponent } from 'event/EventBus'
  import DynamicForm from './DynamicForm.svelte'
  import formStore from 'store/FormStore'
  import { set } from 'util/Selection'
  import { DynamicFormMode } from 'components/models/ComponentProps'
  import { fastClone } from 'util/Compare'
  import { saveForm, saveToLocalStorage } from './services/SaveForm'
  import ToastManager from 'components/ToastManager.svelte'
  import { debounce } from 'util/Debounce'
  import { startPreviewSaver } from 'features/form/edit/services/PreviewSaver'
  import { setFieldDefaults } from 'features/form/edit/services/DefaultFieldValueFactory'
  import { getApi } from 'services/ApiService'
  import { getUrlParameter } from 'util/Http'

  let dropped = false
  let loadingActive: boolean = false
  let order = []
  let dragForm: IForm | undefined
  let lastLength = 0

  let form: IForm

  async function loadForm() {
    loadingActive = true
    const formId = getUrlParameter('formId') ?? 'new'
    try {
      if (formId === 'new') {
        form = { fields: [], title: 'My New Form' }
      } else {
        form = await getApi(`form/${formId}`)
      }

      if (!form) {
        return
      }

      if (!form.fields) {
        form.fields = []
      }

      form.fields = form.fields.map((w: IField) => {
        w.selected = false
        return w
      })
      // todo remove this, just for testing
      form.groups = [
        { value: '123', label: 'Personal Details' },
        { value: '456', label: 'Experience Questions' },
      ]
      addPlaceHolder()
      formStore.setForm(form)
      dispatch('form_loaded', {
        form,
      })
      startPreviewSaver()
    } finally {
      loadingActive = false
    }
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
    if (form.fields.filter((w) => w.type !== 'placeholder').length !== 0) {
      removePlaceHolder()
      return
    }
    if (form.fields.find((w) => w.type === 'placeholder')) {
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

  subscribeComponent('form_updated', (props) => {
    form = props
    addPlaceHolder()
  })

  subscribeComponent('field_delete', (params) => {
    const index = form.fields.findIndex((w) => w.id === params.field.id)
    const temp = [...form.fields]
    temp.splice(index, 1)
    form.fields = temp
    formStore.setForm(form)
  })

  subscribeComponent('right_sidebar_loaded', () => {
    form &&
      dispatch('form_loaded', {
        form,
      })
  })

  subscribeComponent('add_field', (params) => {
    form.fields = form.fields.map((w) => {
      w.selected = false
      return w
    })
    const id = randomString()
    let field: IField = {
      name: 'new-field-' + randomStringSmall(),
      label: 'New Field ' + randomStringSmall(),
      type: params.type,
      id,
      selected: true,
      value: undefined,
      expanded: true,
    }
    field = setFieldDefaults(field)
    form.fields = form.fields.concat(field)
    removePlaceHolder()
    formStore.setForm(form)
  })

  subscribeComponent('field_clone', (params) => {
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

  subscribeComponent('save_form', async (params) => {
    await saveForm()
  })

  subscribeComponent('get_form_fields', () => {
    return form.fields
  })

  subscribeComponent('drag_over', () => {
    removePlaceHolder()
  })

  subscribeComponent('drag_finished', async (elements) => {
    removePlaceHolder()
    console.log(elements)

    let fields: IField[] = elements
      .filter((w: any) => w)
      .map((e: Element) => {
        if (e.id === 'form-field-placeholder') {
          return undefined
        }
        if (e.id.startsWith('form-field-')) {
          const field = form.fields.find((w) => w.id === e.id.replace('form-field-', ''))
          if (field) {
            field.selected = false
          }
          return field
        }
        if (e.id.startsWith('sidebar-block-')) {
          const type = e.id.replace('sidebar-block-', '')
          let field: IField = {
            id: randomString(),
            type: type,
            name: 'new-field-' + randomStringSmall(),
            label: 'New Field ' + randomStringSmall(),
            selected: true,
            value: undefined,
          }
          field = setFieldDefaults(field)
          return field
        }
      })
    fields = fields.filter((w) => w != null)
    form.fields = fastClone(fields)
    dragForm = fastClone(form)
    await tick()
    dragForm = undefined
    if (form.fields.length === 0) {
      addPlaceHolder()
    }
    formStore.setForm(form)
  })

  subscribeFieldChange(onMount, (newField: IField) => {
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

  subscribeComponent('form_updated', (params) => {
    form = params
  })

  subscribeComponent('document_click', () => {
    form.fields = form.fields.map((f) => {
      if (f.selected) {
        f.selected = false
        formStore.set(f)
      }
      return f
    })
  })

  subscribeFieldChange(onMount, async (field: IField) => {
    if (!form || !form.fields) {
      return
    }
    const index = form.fields.findIndex((w) => w.id === field.id)
    if (index !== -1) {
      form.fields[index] = field
    }
  })

  onMount(async () => {
    loadForm()
  })
</script>

<div>
  <ToastManager />
  {#if form == null || loadingActive}
    <div class="flex-column justify-content-center align-items-center">
      <div class="d-flex justify-content-center">
        <div class="spinner-border" style="width: 3rem; height: 3rem; margin-top: 2em" role="status"><span class="sr-only">Loading...</span></div>
      </div>
    </div>
  {:else}
    <div class="container" style="padding-left: 0.4em; padding-top: 0.5em;">
      <div class="row">
        {#if dragForm}
          <div class={'col-md no-gutters max-width'}>
            <DynamicForm form={dragForm} mode={DynamicFormMode.Preview} />
          </div>
        {:else}
          <div class={'col-md no-gutters max-width'}>
            <DynamicForm {form} mode={DynamicFormMode.Preview} />
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
