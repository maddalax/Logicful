<script context="module">
  let types: { [key: string]: string } = {};

  export function formatSubmissionItem(column: string, value: any) {
    const type = types[column];
    if (type === "address" && isObject(value)) {
      const results = [
        value?.address1?.value,
        value?.address2?.value,
        value?.state?.value,
        value?.city?.value,
        value?.zip?.value,
      ];
      return results.filter((r) => r).join(" ");
    }
    if (type === "checkbox-group" && isObject(value)) {
      return Object.values(value)
        .filter((v) => v != null)
        .join(", ");
    }
    if (type === "radio-group" && isObject(value)) {
      return Object.values(value).find((v) => v != null);
    }
    if (type === "full-name" && isObject(value)) {
      const results = [
        value?.prefix?.value,
        value?.first?.value,
        value?.middle?.value,
        value?.last?.value,
      ];
      return results.filter((r) => r).join(" ");
    }
    if (type === "file" && isObject(value)) {
      if (!value) {
        return "No file submitted";
      }
      return `${value.name ?? value.id}, ${value.type}`;
    }
    return undefined;
  }
</script>

<script lang="typescript">
  import { onMount, tick } from "svelte";
  import { LoadState } from "@app/models/LoadState";
  import RemoteTable from "@app/components/RemoteTable.svelte";
  import type { TableRow } from "@app/components/models/RemoteTableProps";
  import type { IForm, ISubmission } from "@app/models/IForm";
  import { isObject } from "@app/guards/Guard";
  import { deleteApi, getApi, putApi } from "@app/services/ApiService";
  import { getUrlParameter } from "@app/util/Http";
  import Dialog from "@app/components/layout/Dialog.svelte";
  import FormPreview from "@app/features/form/live/FormPreview.svelte";
  import { fastClone } from "@app/util/Compare";
  import type { Dictionary } from "@app/models/Utility";
  import Shell from "@app/components/Shell.svelte";

  export let formId = "";
  export let form: IForm | undefined = undefined;

  let state: LoadState = LoadState.NotStarted;
  let hidden = new Set([
    "submission_id",
    "full_submission_data",
    "meta_unread",
  ]);
  let preview: ISubmission | undefined = undefined;

  async function getRows(): Promise<TableRow[]> {
    formId = getUrlParameter("formId") ?? "";
    if (!formId) {
      return [];
    }
    form = await getApi<IForm>(`form/${formId}`);

    if (!form) {
      return [];
    }

    const url: { message: string } = await getApi(`form/${formId}/submission`);
    const response = await fetch(url.message);
    let submissions: ISubmission[] = [];
    if (response.ok) {
      submissions = await response.json();
    } else {
      submissions = [];
    }

    const read = await getRead(form!);

    const labels: { [key: string]: string } = {};

    if (!form.fields || form.fields?.length === 0) {
      return [];
    }

    form.fields.forEach((f) => {
      if (f.name) {
        labels[f.name] = f.label ?? f.name;
      }
    });

    const deleted = JSON.parse(
      sessionStorage.getItem("deleted_submissions") || JSON.stringify({})
    );

    setTimeout(() => {
      clearUnreadSubmissions();
    }, 2000);

    return submissions
      .filter((d) => !deleted[d.id])
      .map((d) => {
        d.isUnread = read[d.id] === true ? false : true;
        Object.keys(d.details).forEach((key) => {
          if (labels[key]) {
            const label = labels[key];
            d.details[label] = d.details[key];
            types[label] =
              form!.fields.find((w) => w.label === label)?.type ?? "";
            delete d.details[key];
          } else {
            const fieldByName = form!.fields.find((w) => w.name === key)?.type;
            if (fieldByName) {
              types[key] = fieldByName;
            }
          }
        });
        d.details["Submission Date"] = new Date(
          d.creationDate
        ).toLocaleString();
        d.details["submission_id"] = d.id;
        d.details["full_submission_data"] = JSON.stringify(d);
        d.details["meta_unread"] = d.isUnread;
        return d.details;
      });
  }

  function sortColumns(columns: string[]) {
    return columns.sort((a, b) => {
      return (
        form!.fields.findIndex((f) => f.label === a) -
        form!.fields.findIndex((f) => f.label === b)
      );
    });
  }

  function onRowClick(row: any) {
    const submission: ISubmission = JSON.parse(row["full_submission_data"]);
    preview = fastClone(submission);
    markRead(submission.formId, [submission]);
  }

  async function onDelete(rows: any[]) {
    const ids = rows.map((r) => r["submission_id"]).filter((r) => r != null);
    await deleteApi(`form/${formId}/submission`, ids);
    const deleted = JSON.parse(
      sessionStorage.getItem("deleted_submissions") || JSON.stringify({})
    );
    ids.forEach((i) => {
      deleted[i] = true;
    });
    sessionStorage.setItem("deleted_submissions", JSON.stringify(deleted));
  }

  async function onMarkRead(rows: any[], value: boolean) {
    const result: Dictionary<boolean> = {};
    rows.forEach((r) => {
      console.log(r);
      const id = r["submission_id"];
      if (!id) {
        return;
      }
      const unread = Boolean(r["meta_unread"]);
      if (unread === !value) {
        return;
      }
      result[id] = value;
    });
    if (Object.keys(result).length === 0) {
      return;
    }
    await putApi(`form/${formId}/submission/mark/read`, result);
  }

  async function clearUnreadSubmissions() {
    if (form!.unreadSubmissions === 0) {
      return;
    }
    form!.unreadSubmissions = 0;
    putApi(`form/${form!.id}`, form);
  }

  async function markRead(formId: string, submissions: ISubmission[]) {
    submissions = submissions.filter((f) => f.isUnread);
    if (submissions.length === 0) {
      return;
    }
    const result: Dictionary<boolean> = {};
    submissions.forEach((s) => (result[s.id] = true));
    await putApi(`form/${formId}/submission/mark/read`, result);
  }

  async function getRead(form: IForm): Promise<Dictionary<boolean>> {
    return await getApi<Dictionary<boolean>>(`form/${form.id}/submission/read`);
  }
</script>

<Shell header="Form Submissions" sidebar={false}>
  <RemoteTable
    defaultSortColumn={'Submission Date'}
    searchPlaceHolder={'Search Anything...'}
    columnMeta={{ 'Submission Date': { type: 'date' } }}
    {getRows}
    {sortColumns}
    {onDelete}
    {onRowClick}
    onRead={onMarkRead}
    onFormat={formatSubmissionItem}
    {hidden} />
</Shell>

{#if preview && form}
  <Dialog
    isOpen={true}
    width={'960px'}
    title={`Viewing Submission Details`}
    onClose={async () => {
      console.log('closed');
      preview = undefined;
      await tick();
    }}>
    <div>
      <FormPreview submission={preview} {form} mode={'submission_preview'} />
    </div>
  </Dialog>
{/if}
