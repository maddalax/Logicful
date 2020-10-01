<script>
  import LiveForm from "@app/features/form/live/LiveForm.svelte";
  import type { IForm, ISubmission } from "@app/models/IForm";
  import { getApi } from "@app/services/ApiService";
  import formStore from "@app/store/FormStore";
  import { onDestroy, onMount, tick } from "svelte";
  import { getUrlParameter } from "@app/util/Http";
  import SubmissionPreview from "@app/features/submissions/SubmissionPreview.svelte";
  export let submission: ISubmission | undefined = undefined;
  export let form: IForm | undefined;

  let formId: string = "";
  export let mode: "local" | "submission_preview" | "" = "";

  onDestroy(() => {
    formStore.setForm({ fields: [] });
    form = { fields: [] };
  });

  async function loadForm() {
    formId = getUrlParameter("formId") ?? "";
    if (!formId) {
      return;
    }
    //@ts-ignore
    mode = getUrlParameter("mode") || mode;
    if (mode === "local") {
      const item = localStorage.getItem("form");
      if (!item) {
        return;
      }
      form = JSON.parse(item);
      window.onstorage = (e: any) => {
        if (e.key === "form" && e.newValue) {
          form = JSON.parse(e.newValue);
        }
      };
    } else {
      form = await getApi<IForm>(`form/${formId}`);
    }
  }

  onMount(async () => {
    formStore.setForm({ fields: [] });
    await tick();

    if (!form) {
      await loadForm();
    }

    if (submission) {
      Object.keys(submission.details).forEach((k) => {
        const index = form.fields.findIndex(
          (f) => f.label === k || f.name === k
        );
        if (index !== -1) {
          form.fields[index].value = submission!.details[k];
        }
      });
    }

    await tick();

    formStore.setForm(form);
  });
</script>

{#if mode === 'local'}
  <div class="rounded-md bg-indigo-50 p-4">
    <div class="flex">
      <div class="flex-shrink-0">
        <!-- Heroicon name: information-circle -->
        <svg
          class="h-5 w-5 text-indigo-400"
          viewBox="0 0 20 20"
          fill="currentColor">
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clip-rule="evenodd" />
        </svg>
      </div>
      <div class="ml-3 flex-1 md:flex md:justify-between">
        <p class="text-sm leading-5 text-indigo-700">
          You are viewing a live preview of how your form will display and act
          once it is published. This preview will <strong>live update</strong> when
          changes are made from the form builder, no save neeed.
        </p>
      </div>
    </div>
  </div>
{/if}
{#if form != null && form?.fields?.length > 0}
  {#if mode === 'submission_preview'}
    <SubmissionPreview {form} {submission} />
  {:else}
    <div class="mt-6">
      <LiveForm {form} {mode} />
    </div>
  {/if}
{:else}
  <div class="d-flex justify-content-center">
    <div
      class="spinner-border text-dark"
      style="width: 3rem; height: 3rem;"
      role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
{/if}
