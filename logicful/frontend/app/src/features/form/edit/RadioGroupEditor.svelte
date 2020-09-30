<script lang="typescript">
  import type { IField, LabelValue } from "@app/models/IField";
  import type { ContentBlock } from "@app/models/ContentBlock";
  import { randomString } from "@app/util/Generate";
  import Repeater from "@app/components/Repeater.svelte";
  import formStore from "@app/store/FormStore";
  import { isEmptyOrNull } from "@app/util/Compare";
  import ConfigField from "./ConfigField.svelte";

  export let field: IField;
  export let expanded: boolean;

  function onOptionsChange(options: string[] | LabelValue[]) {
    if (options.length === 0) {
      options = ["Radio Item 1"];
    }
    field.options = options;
    formStore.set(field, {
      fromUser: true,
      field: "options",
      value: options,
    });
  }

  function loadTransformer(value: ContentBlock[]) {
    return value.map((v) => {
      return {
        label: v.name,
        value: v.value,
      };
    });
  }

  function options(): LabelValue[] {
    if (isEmptyOrNull(field.options)) {
      return [{ label: "Radio Item 1", value: "Radio Item 1" }];
    }
    return field.options?.map((w: string) => {
      return { label: w, value: w };
    });
  }
</script>

<div>
  <Repeater
    options={options()}
    onlyLabel={true}
    label={'Radio Options'}
    onChange={onOptionsChange} />
  <ConfigField
    field={{ id: randomString(), type: 'switch', label: "Include 'Other' Option", value: { type: 'local', value: field.includeOther || false }, configFieldTarget: 'includeOther', configTarget: field.id }} />
</div>
