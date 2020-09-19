<script lang="typescript">
  import { onMount } from 'svelte'
  import Field from './Field.svelte'
  import type { OptionSet } from '@app/models/OptionSet'
  import Repeater from '@app/components/Repeater.svelte'
  import type { LabelValue } from '@app/models/IField'
  import { getUrlParameter } from '@app/util/Http'
  import DropdownButton from '@app/components/DropdownButton.svelte'
  import OptionSetsList from './OptionSetsList.svelte'
  import { dispatch } from '@app/event/EventBus'
  import { isString } from "@app/guards/Guard"
  import { getApi, postApi, putApi } from '@app/services/ApiService'

  let sets: OptionSet[] = []
  let loading = false
  let errored = false
  export let name: string
  export let isNew: boolean

  onMount(async () => {
    if (isNew) {
      sets = sets.concat([
        {
          value: [
            {
              label: '',
              value: '',
            },
          ],
          type: 'local',
        },
      ])
    } else {
      await load()
    }
  })

  async function load() {
    loading = true
    const data: OptionSet[] = await getApi('option-set', true)
    const result = data.find((w) => w.name === name)
    if (!result) {
      return
    }
    if (result.type === 'local') {
      result.localSaveId = result.value as string
      result.value = await convertUrlToLocal(result)
    }
    sets = [result]
    loading = false
  }

  async function loadLocalOptions(index: number) {
    sets[index].value = await convertUrlToLocal(sets[index])
  }

  async function convertUrlToLocal(set: OptionSet): Promise<LabelValue[]> {
    loading = true
    try {
      const url = (set.value as string) ?? set.localSaveId
      if (!url) {
        return [
          {
            label: '',
            value: '',
          },
        ]
      }
      const response = await fetch(url)
      const data = await response.json()
      const results: LabelValue[] = []
      Object.keys(data).forEach((key) => {
        results.push({ label: key, value: data[key] })
      })
      return results
    } catch (ex) {
      errored = true
      return []
    } finally {
      loading = false
    }
  }

  function onRepeaterChange(data: LabelValue[] | string[], index: number) {
    sets[index].value = data as LabelValue[]
  }

  async function save() {
    const promises = sets.map(async (s) => {
      if (s.type === 'local') {
        s.value = await generateInlineUrl(s)
      }
      return s
    })
    const toSave = await Promise.all(promises)
    await postApi('option-set', toSave[0])
    dispatch('option_set_modified', toSave[0])
    dispatch('dialog_show', {
      child: OptionSetsList,
      closeOnOutsideClick: false,
      confirmCloseOnDirty: true,
      title: 'Manage Option Sets',
    })
  }

  async function generateInlineUrl(set: OptionSet): Promise<string> {
    const body: any = {}
    const v = set.value as LabelValue[]
    v.forEach((s) => {
      body[s.label] = s.value
    })
    const saveId = getUrlParameter('id', set.localSaveId)
    const qs = saveId ? `?id=${saveId}` : ''
    const { message } = qs ? await putApi<any>(`s3/json?${qs}`, body) : await postApi<any>(`s3/json?${qs}`, body)
    return message
  }
</script>

<div>
  {#if sets.length > 0}

  {:else}
    <div style="text-align: center; padding-top: 1em; padding-bottom: 1em;">
      <div class="spinner-border text-secondary" role="status"><span class="sr-only">Loading...</span></div>
    </div>
  {/if}
  {#each sets as set, index}
    <div style="margin-top: 1em">
      <h2>{set.name ?? ''}</h2>
      <div id={set.name ?? ''}>
        <Field
          field={{ id: `${set.id}-name`, type: 'string', required: true, name: 'name', label: 'Name', placeholder: 'Name', value: set.name, onChange: (value) => {
              set.name = value
            } }}
        />
        <Field
          field={{ onChange: (value) => {
              if (value === 'local') {
                set.remoteUrl = set.value
                set.value = set.localOptions
                if (!isNew && set.localOptions?.length === 0) {
                  set.value = undefined
                  loadLocalOptions(index)
                }
              }
              if (value === 'remote') {
                set.localOptions = set.value ?? []
                set.value = set.remoteUrl
              }
              set.type = value
            }, id: `${set.id}-type`, type: 'combobox', value: set.type, options: { type: 'local', value: [{ label: 'Inline', value: 'local' }, { label: 'Remote', value: 'remote' }] }, name: 'type', label: 'Type', helperText: 'Choose whether you want to automatically load options in from a remote url or manually specify them here.' }}
        />

        {#if set.type === 'remote'}
          <Field
            field={{ helperText: 'See <a href="test" target="_blank">Remote Option Set Guide</a> for information on how to structure your endpoint response.', onChange: (value) => {
                set.value = value
              }, id: `${set.name}-url`, type: 'string', value: set.value, name: 'url', label: 'Url', required: true }}
          />
        {:else if loading}
          <div class="loader" />
        {:else if errored}
          Failed to load, please try re-opening this dialog.
        {:else}
          <Repeater
            options={isString(set.value) ? [] : set.value}
            onChange={(data) => {
              onRepeaterChange(data, index)
            }}
          />
        {/if}
      </div>
    </div>
  {/each}
  <div class="float-right">
    <DropdownButton
      label={'Save'}
      processingLabel={'Saving...'}
      actions={[{ label: 'Save as Draft', onClick: save }, { label: 'Save and Publish', onClick: save }]}
    />
  </div>
</div>
