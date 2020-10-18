<script lang="typescript">
  // @ts-nocheck
  import LiveField from "@app/features/form/live/LiveField.svelte";
  import type { IForm } from "@app/models/IForm";
  import type { IField } from "@app/models/IField";
  import { subscribeFieldChange } from "@app/event/FieldEvent";
  import { LogicBuilder } from "@app/services/LogicBuilder";
  import { fastClone } from "@app/util/Compare";
  import { onMount } from "svelte";
  import { submitForm } from "@app/features/form/live/service/SubmitForm";
  import { LoadState } from "@app/models/LoadState";
  import { subscribeComponent } from "@app/event/EventBus";
  import { loadScripts } from "@app/util/Script";
  import Button from "@app/components/Button.svelte";

  export let form: IForm;
  export let mode: string = "";
  let state = LoadState.NotStarted;
  let uploadingFiles = false;
  let message: string;
  let redirectUrl: string;

  subscribeFieldChange(onMount, (updatedField: IField) => {
    if (!form || !form.fields) {
      return;
    }
    const index = form.fields.findIndex((w) => w.id === updatedField.id);
    if (index === -1) {
      return;
    }
    form.fields[index].updated = !form.fields[index].updated;
    const fieldsWithRules = form.fields.filter((w) => {
      if (!w.logic || !w.logic.rules) {
        return false;
      }
      const hasRule = w.logic.rules.find(
        (rule) => rule.field === updatedField.id
      );
      return hasRule != null;
    });
    for (let fieldWithRule of fieldsWithRules) {
      let ruleIndex = form.fields.findIndex((w) => w.id === fieldWithRule.id);
      form.fields[ruleIndex].updated = !form.fields[ruleIndex].updated;
    }
  });

  function display(field: IField): boolean {
    if (!field.logic) {
      return true;
    }
    const builder = new LogicBuilder();
    return builder.evaluate(field);
  }

  subscribeComponent("submission_uploading_files", () => {
    uploadingFiles = true;
  });

  subscribeComponent("submission_uploading_files_finished", () => {
    uploadingFiles = false;
  });

  async function onSubmit() {
    state = LoadState.Loading;
    try {
      if (form.id !== "demo") {
        await submitForm();
      }
      state = LoadState.Finished;
      afterSubmission();
    } catch (ex) {
      console.error(ex);
      state = LoadState.Failed;
    }
  }

  function afterSubmission() {
    console.log(form.submissionConfig);
    if (form.submissionConfig?.afterSubmitAction?.["Redirect to URL"]) {
      const url = form.submissionConfig?.afterSubmitConfig?.url;
      if (url) {
        redirectUrl = url;
        message =
          "Thank you for your submission, you will be redirected in 5 seconds...";
        setTimeout(() => {
          window.location.replace(url);
        }, 5000);
      }
    }
    if (form.submissionConfig?.afterSubmitAction?.["Show Message"]) {
      message = form.submissionConfig?.afterSubmitConfig?.message ?? "";
    }
    if (!message) {
      message = `Thank you for your submission.`;
    }
  }
</script>

<div class="relative bg-white overflow-visible">
  <div class="relative px-4 sm:px-6 lg:px-8">
    <div class="text-lg max-w-prose mx-auto">
      <h2
        class="text-xl text-center font-bold leading-7 text-gray-900 sm:text-3xl
          sm:leading-9 sm:truncate">
        {form.title}
      </h2>
      {#if form.description}
        <p class="text-md text-center text-gray-500 leading-8">
          {form.description ?? ''}
        </p>
      {/if}
    </div>

    {#if message}
      <div class="mt-8">
        <p class="text-base text-center text-gray-900">
          {@html message}
        </p>
        {#if redirectUrl}
          <p class="text-base text-center text-gray-900">
            Not redirecting? <a href={redirectUrl} class="text-indigo underline">Click
              here.</a>
          </p>
        {/if}
      </div>
    {:else}
      <div class="text-gray-500 mx-auto max-w-prose">
        <form on:submit|preventDefault={onSubmit}>
          <div id="form-preview-fields">
            {#each form.fields as field (field.id)}
              {#if display(field)}
                <div id={`form-field-${field.id}`}>
                  <LiveField field={fastClone(field)} />
                </div>
              {:else}
                <div id={`form-field-${field.id}`}>
                  <LiveField field={fastClone(field)} hidden={true} />
                </div>
              {/if}
            {/each}
          </div>
          <div class="pt-2 pb-9">
            {#if state === LoadState.NotStarted}
              <Button submit={true} type="primary">Submit</Button>
            {:else if state === LoadState.Failed}
              <Button submit={true} type="primary">
                Failed to Submit, Click To Try Again
              </Button>
            {:else if state === LoadState.Loading}
              <Button type="primary" disabled>
                {#if uploadingFiles}Uploading Files...{:else}Submitting...{/if}
              </Button>
            {:else if state === LoadState.Finished}
              <Button type="primary" disabled>Submitted Successfully.</Button>
            {/if}
          </div>
        </form>
      </div>
    {/if}
  </div>
</div>
