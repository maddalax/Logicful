<script lang="typescript">
  import type { IForm } from "@app/models/IForm";

  import { randomString } from "@app/util/Generate";
  import { subscribeComponent } from "@app/event/EventBus";
  import ConfigField from "./ConfigField.svelte";
  import SectionHeader from "@app/inputs/SectionHeader.svelte";
  import Button from "@app/components/Button.svelte";
  import Dialog from "@app/components/layout/Dialog.svelte";
  import ManageIntegrations from "./ManageIntegrations.svelte";

  export let form: IForm;
  let dialog: "" | "integrations" = "";

  subscribeComponent("form_loaded", (updatedForm) => {
    form = updatedForm;
  });

  subscribeComponent("form_updated", (updatedForm) => {
    form = updatedForm;
  });
</script>

{#if dialog === 'integrations'}
  <Dialog
    isOpen={true}
    title="Manage Integrations"
    onClose={() => (dialog = '')}>
    <ManageIntegrations {form} />
  </Dialog>
{/if}

<ConfigField
  field={{ id: randomString(), required: true, label: 'Form Title', value: form.title, type: 'string', configFieldTarget: 'title', configTarget: 'form' }} />
<ConfigField
  field={{ id: randomString(), required: true, label: 'Form Description', value: form.description, type: 'string', configFieldTarget: 'description', configTarget: 'form' }} />

<div class="mt-3 pl-3 pr-3">
  <SectionHeader
    field={{ id: randomString(), type: 'section-header', header: 'Manage Integrations', helperText: 'Configure integrations to run upon form submission, such as sending an email or posting to a webhook.' }} />
  <div class="mt-3">
    <Button type="primary" onClick={() => (dialog = 'integrations')}>
      Manage Integrations
    </Button>
  </div>
</div>
