<script lang="typescript">
  import type { IForm, Integration } from "@app/models/IForm";
  import { randomString } from "@app/util/Generate";
  import { set } from "@app/util/Selection";
  import { onMount } from "svelte";
  import ConfigField from "../ConfigField.svelte";

  export let form: IForm;
  export let integration : Integration
  export let index : number

  onMount(() => {
    set(form, `workflow.integrations[${index}].name`, integration.name);
  });
</script>

<ConfigField
  field={{ id: randomString(), required: true, type: 'email', label: 'Email Address', value: form.workflow?.integrations?.[index]?.config?.email, helperText: 'Specify which email you would like to recieve submission info.', configTarget: 'form', configFieldTarget: `workflow.integrations[${index}].config.email` }} />

<ConfigField
  field={{ id: randomString(), required: true, type: 'switch', label: 'Enabled', value: form.workflow?.integrations?.[index].enabled, configTarget: 'form', configFieldTarget: `workflow.integrations[${index}].enabled` }} />
