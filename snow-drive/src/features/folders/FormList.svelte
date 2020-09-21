<script lang="typescript">
  import type { IForm } from "@app/models/IForm";
  import Link from "@app/components/Link.svelte";
  import MoveFormManager from "./MoveFormManager.svelte";
  import { dispatch } from "@app/event/EventBus";

  export let forms: IForm[] = [];
  let moving: IForm | undefined;

  function moveFolders(form: IForm) {
    moving = form;
  }

  function onMoveComplete() {
    dispatch("forms_moved", moving!.id);
    moving = undefined;
  }

  function onDelete(formId: string) {}
</script>

<style>
  .radius-0 {
    border-radius: 0rem !important;
    padding-left: 0.5em;
  }

  .form-list {
    max-height: 70vh;
    overflow: auto;
  }
</style>

{#if moving}
  <div>
    <MoveFormManager onClose={onMoveComplete} forms={[moving]} />
  </div>
{/if}

<div class="card-body px-0 pt-0">
  <ul class="list-group list-group-flush form-list">
    {#each forms as form}
      <li class="list-group-item border-bottom py-3 radius-0">
        <div class="row align-items-center">
          <div class="col">
            <h3 class="h6 mb-1">
              <Link
                href={`/form/builder?formId=${form.id}`}
                style="font-weight: 600;">
                {form.title}
              </Link>
            </h3>
            <!-- Text -->
            <small class="text-gray-700">
              <Link
                href={`/form/submissions?formId=${form.id}`}
                style="font-weight: 50; text-decoration: underline;">
                Unread ({form.submissionCount})
              </Link>
              <span> | </span>
              <Link
                href={`/form/submissions?formId=${form.id}`}
                style="font-weight: 50; text-decoration: underline;">
                All ({form.submissionCount})
              </Link>
              <span> | </span>
              <Link
                href={`/form/preview?formId=${form.id}`}
                target="_blank"
                style="font-weight: 50; text-decoration: underline;">
                Preview
              </Link>
            </small>
          </div>
          <div class="col-auto">
            <Link
              href={`/form/builder?formId=${form.id}`}
              style="font-weight: 400;"
              class="btn btn-xs btn-outline-dark">
              Edit
            </Link>
            <button
              class="btn btn-xs btn-outline-dark"
              on:click={() => moveFolders(form)}>
              Move
            </button>
            <button class="btn btn-xs btn-outline-dark">
              <span
                on:click={() => {
                  onDelete(form.id || '');
                }}
                class="fas fa-trash" />
            </button>
          </div>
        </div>
      </li>
    {/each}
  </ul>
</div>
