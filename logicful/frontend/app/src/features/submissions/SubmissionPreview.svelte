<script lang="typescript">
  import { isObject, isString } from "@app/guards/Guard";
  import LiveField from "@app/features/form/live/LiveField.svelte";
  import type { IForm } from "@app/models/IForm";
  import type { IField } from "@app/models/IField";
  import { subscribeFieldChange } from "@app/event/FieldEvent";
  import { LogicBuilder } from "@app/services/LogicBuilder";
  import { fastClone } from "@app/util/Compare";
  import { afterUpdate, onMount } from "svelte";
  import { submitForm } from "@app/features/form/live/service/SubmitForm";
  import { LoadState } from "@app/models/LoadState";
  import { fade } from "svelte/transition";
  import { subscribeComponent } from "@app/event/EventBus";
  import type { ISubmission } from "@app/models/IForm";
  import { formatSubmissionItem } from "@app/pages/form/FormSubmissionsPage.svelte";
  import Loader from "@app/components/Loader.svelte";
  import { getApi, postApi } from "@app/services/ApiService";

  export let submission: ISubmission | undefined;
  let fieldPerSubmissionDetail: { [key: string]: IField } = {};
  export let form: IForm;
  export let mode: string = "";
  let state = LoadState.NotStarted;
  let downloading = false;
  let uploadingFiles = false;
  let error = "";

  let hidden = ["submission_id"];

  onMount(load);

  afterUpdate(load);

  function load() {
    fieldPerSubmissionDetail = {};
    state = LoadState.Loading;
    try {
      if (!submission) {
        return;
      }
      Object.keys(submission.details).forEach((d) => {
        let field = fieldBySubmissionDetail(d);
        if (field) {
          fieldPerSubmissionDetail[d] = field;
        }
      });
    } finally {
      state = LoadState.Finished;
    }
  }

  async function downloadFile(field: IField) {
    try {
      downloading = true;
      const id = field.value.id;
      const result = await postApi<{ message: string }>(
        `form/${form.id}/submission/file/${id}`,
        field.value
      );
      window.open(result.message);
    } catch (ex) {
      error = ex.message;
    } finally {
      downloading = false;
    }
  }

  function formatDetail(detail: string) {
    let value = submission?.details[detail];
    value = formatSubmissionItem(detail, value) ?? value;
    if (isObject(value) || Array.isArray(value)) {
      return JSON.stringify(value, null, 2);
    }
    return value ?? "";
  }

  function fieldBySubmissionDetail(detail: string): IField | undefined {
    return form.fields.find((w) => w.label === detail || w.name === detail);
  }

  function toRawJson() {
    if (!submission) {
      return JSON.stringify({});
    }
    const clone = fastClone(submission);
    Object.keys(clone.details).forEach((d) => {
      const field = fieldBySubmissionDetail(d);
      if (field) {
        const detail = fastClone(clone.details[d]);
        delete clone.details[d];
        clone.details[field.name!] = detail;
      }
    });
    delete clone.details["submission_id"];
    delete clone.details["Submission Date"];
    delete clone["newSubmissionKey"];
    return JSON.stringify(clone, null, 4);
  }

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
      await submitForm();
      state = LoadState.Finished;
    } catch (ex) {
      console.error(ex);
      state = LoadState.Failed;
    }
  }
</script>

{#if state === LoadState.Loading}
  <Loader />
{:else}
  {#if submission}
    <h4><strong>General</strong></h4>
    <p><strong>Submission Date: </strong> {formatDetail('Submission Date')}</p>
    <br />
    <h4><strong>Environment Information</strong></h4>
    <strong>Ip Address: </strong>{submission.meta?.ipAddress}
    <p>
      <strong>Browser: </strong>{submission.meta?.env?.browser?.name}
      {submission.meta?.env?.browser?.version}
    </p>
    <p>
      <strong>OS: </strong>
      {submission.meta?.env?.os?.name}
      {submission.meta?.env?.os?.versionName ?? submission.meta?.env?.os?.version}
    </p>
    <p>
      <strong>Platform: </strong>
      {submission.meta?.env?.platform?.vendor}
      {submission.meta?.env?.platform?.type}
    </p>
  {/if}

  <div style="margin-top: 1.5em">
    <h4>{form.title ?? 'Form Title'}</h4>
    <small class="text-gray-700">{form.description ?? ''}</small>
  </div>
  <form on:submit|preventDefault={onSubmit}>
    <div style="padding-bottom: 1em">
      {#each form.fields as field (field.id)}
        {#if display(field)}
          <div transition:fade>
            <LiveField field={fastClone(field)} />
          </div>
        {:else}
          <div>
            <LiveField field={fastClone(field)} hidden={true} />
          </div>
        {/if}
      {/each}
    </div>
  </form>

  <h4><strong>Raw Details</strong></h4>
  <hr />
  {#each Object.keys(submission?.details ?? []).filter((k) => !hidden.includes(k)) as d}
    <div style="margin-top: 1em">
      <p><strong>{d ?? ''}</strong></p>
      <p>{formatDetail(d)}</p>
      {#if fieldPerSubmissionDetail[d]?.type === 'file' && fieldPerSubmissionDetail[d].value}
        {#if !downloading}
          <button
            class="btn btn-primary btn-sm"
            on:click={() => downloadFile(fieldPerSubmissionDetail[d])}>Download
            File</button>
        {:else}
          <button class="btn btn-primary btn-sm" disabled>Processing... file
            will open in a new tab.</button>
        {/if}
      {/if}
    </div>
  {/each}
  <br />
  <h4><strong>Raw JSON</strong></h4>
  <hr />
  <div style="margin-top: 1em">
    <pre>
    <code>
      {toRawJson()}
  </code>
  </pre>
  </div>
{/if}
