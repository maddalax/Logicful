<script lang="ts">
    import { onMount } from 'svelte';
    import Field from 'Field.svelte';
    import type { OptionSet } from 'models/OptionSet';
    import Repeater from 'components/Repeater.svelte';
    import type { LabelValue } from 'models/IField';
    import { getUrlParameter } from 'util/Http';
    import DropdownButton from 'components/DropdownButton.svelte';
    import OptionSetsList from './OptionSetsList.svelte';
    import { dispatch } from 'event/EventBus';

    let sets: OptionSet[] = [];
    let loading = false;
    let errored = false;
    export let name: string;
    export let isNew: boolean;

    onMount(async () => {
        if (isNew) {
            sets = sets.concat([
                {
                    value: [
                        {
                            label: 'Label',
                            value: 'Value',
                        },
                    ],
                    type: 'local',
                    name: `Example Set`,
                },
            ]);
        } else {
            await load();
        }
    });

    async function load() {
        loading = true;
        const response = await fetch('https://gqe4ib85md.execute-api.us-east-1.amazonaws.com/dev/option_sets/list');
        const data: OptionSet[] = await response.json();
        const promises: any[] = data.map(async (d) => {
            if (d.type === 'local') {
                d.localSaveId = d.value as string;
                d.value = await convertUrlToLocal(d);
            }
            return d;
        });
        const results = await Promise.all(promises);
        sets = results.filter((w) => w.name === name);
        loading = false;
    }

    async function loadLocalOptions(index: number) {
        sets[index].value = await convertUrlToLocal(sets[index]);
    }

    async function convertUrlToLocal(set: OptionSet): Promise<LabelValue[]> {
        loading = true;
        try {
            const url = (set.value as string) ?? set.localSaveId;
            if(!url) {
                return [{
                    label : '',
                    value : ''
                }];
            }
            const response = await fetch(url);
            const data = await response.json();
            const results: LabelValue[] = [];
            Object.keys(data).forEach((key) => {
                results.push({ label: key, value: data[key] });
            });
            return results;
        } catch (ex) {
            errored = true;
            return [];
        } finally {
            loading = false;
        }
    }

    function onRepeaterChange(data: LabelValue[], index: number) {
        sets[index].value = data;
    }

    async function save() {
        const promises = sets.map(async (s) => {
            if (s.type === 'local') {
                s.value = await generateInlineUrl(s);
            }
            return s;
        });
        const toSave = await Promise.all(promises);
        await fetch("https://gqe4ib85md.execute-api.us-east-1.amazonaws.com/dev/option_sets/set", {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(toSave[0])
        })
        dispatch('dialog_show', {
            child: OptionSetsList,
            closeOnOutsideClick: false,
            confirmCloseOnDirty: true,
            title: 'Manage Option Sets',
        });
    }

    async function generateInlineUrl(set: OptionSet): Promise<string> {
        const body = {};
        const v = set.value as LabelValue[];
        v.forEach((s) => {
            body[s.label] = s.value;
        });
        const saveId = getUrlParameter('id', set.localSaveId);
        const saveUrl = `https://gqe4ib85md.execute-api.us-east-1.amazonaws.com/dev/file/json/store?status=0&id=${saveId}`;
        const response = await fetch(saveUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        const { url } = await response.json();
        return url;
    }
</script>

<div class="usa-accordion">
    {#if sets.length > 0}
        <DropdownButton
            label={'Save'}
            processingLabel={'Saving...'}
            actions={[{ label: 'Save as Draft', onClick: save }, { label: 'Save and Publish', onClick: save }]} />
    {:else}
        <div class="loader"/>
    {/if}
    {#each sets as set, index}
        <div style="margin-top: 1em">
            <h2 class="usa-accordion__heading">
                <button class="usa-accordion__button" style="background-image: none">{set.name}</button>
            </h2>
            <div id={set.name} class="usa-accordion__content usa-prose">
                <Field
                    field={{
                        type : 'string',
                        required : true,
                        name : 'name',
                        label : "Name",
                        value : set.name,
                        onChange : (value) => {
                            set.name = value;
                        }
                    }}
                />
                <Field
                    field={{ onChange: (value) => {
                            if (value === 'local') {
                                set.remoteUrl = set.value;
                                set.value = set.localOptions;
                                if(!isNew && set.localOptions?.length === 0) {
                                    set.value = undefined;
                                    loadLocalOptions(index);
                                }
                            }
                            if (value === 'remote') {
                                set.localOptions = set.value ?? [];
                                set.value = set.remoteUrl;
                            }
                            set.type = value;
                        }, id: `${set.name}-type`, type: 'combobox', value: set.type, options: { type: 'local', value: [{ label: 'Inline', value: 'local' }, { label: 'Remote', value: 'remote' }] }, name: 'type', label: 'Type', helperText: 'Choose whether you want to automatically load options in from a remote url or manually specify them here.' }} />

                {#if set.type === 'remote'}
                    <Field
                        field={{ helperText: 'See <a href="test" target="_blank">Remote Option Set Guide</a> for information on how to structure your endpoint response.', onChange: (value) => {
                                set.value = value;
                            }, id: `${set.name}-url`, type: 'string', value: set.value, name: 'url', label: 'Url', required: true }} />
                {:else if loading}
                    <div class="loader" />
                {:else if errored}
                    Failed to load, please try re-opening this dialog.
                {:else}
                    <Repeater
                        options={set.value}
                        onChange={(data) => {
                            onRepeaterChange(data, index);
                        }} />
                {/if}
            </div>

        </div>
    {/each}
</div>
