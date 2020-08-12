<script lang="ts">
    import { onMount, afterUpdate } from 'svelte';
    import Field from 'Field.svelte';
    import { fields } from 'exampleForm';
    import type { OptionSet } from 'entities/OptionSet';
    import type { set } from 'util/Selection';
    import Repeater from 'components/Repeater.svelte';
    import type { LabelValue } from 'entities/IField';
    import { getUrlParameter } from 'util/Http';
    import { subscribe } from 'event/EventBus';

    let sets: OptionSet[] = [];

    onMount(() => {
        subscribe('dialog_save', async () => {
            await save();
        });
    });

    onMount(async () => {
        const response = await fetch('http://localhost:8080/option-sets.json');
        const data: OptionSet[] = await response.json();
        const promises: any[] = data.map(async (d) => {
            if (d.type === 'local') {
                d.value = await convertUrlToLocal(d);
            }
            return d;
        });
        const results = await Promise.all(promises);
        sets = results;
    });

    async function convertUrlToLocal(set: OptionSet): Promise<LabelValue[]> {
        set.localSaveId = set.value as string;
        const response = await fetch(set.value as string);
        const data = await response.json();
        const results: LabelValue[] = [];
        Object.keys(data).forEach((key) => {
            results.push({ label: key, value: data[key] });
        });
        return results;
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
        const finish = await Promise.all(promises);
        localStorage.setItem('option_sets', JSON.stringify(finish));
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
    {#each sets as set, index}
        <div style="margin-top: 1em">
            <h2 class="usa-accordion__heading">
                <button class="usa-accordion__button" aria-controls={set.name}>{set.name}</button>
            </h2>
            <div id={set.name} class="usa-accordion__content usa-prose">
                <Field
                    field={{ onChange: (value) => {
                            set.value = undefined;
                            set.type = value;
                        }, id: `${set.name}-type`, type: 'combobox', value: set.type, options: { type: 'local', value: [{ label: 'Inline', value: 'local' }, { label: 'Remote', value: 'remote' }] }, name: 'type', label: 'Type', helperText: 'Choose whether you want to automatically load options in from a remote url or manually specify them here. <strong>Changing your option will clear previous values.</strong>' }} />

                {#if set.type === 'remote'}
                    <Field
                        field={{ helperText: 'See <a href="test" target="_blank">Remote Option Set Guide</a> for information on how to structure your endpoint response.', onChange: (value) => {
                                set.value = value;
                            }, id: `${set.name}-url`, type: 'string', value: set.value, name: 'url', label: 'Url', required: true }} />
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
