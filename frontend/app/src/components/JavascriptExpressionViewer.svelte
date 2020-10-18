<script lang="typescript">
  import { subscribeComponent } from "@app/event/EventBus";

  import { subscribeFieldChange } from "@app/event/FieldEvent";
  import type { IField } from "@app/models/IField";
  import formStore from "@app/store/FormStore";
  import { onMount } from "svelte";
  let value: any;
  let error: any;
  export let fieldId: string | undefined;

  subscribeFieldChange(onMount, (newField: IField) => {
    if (newField.id === fieldId) {
      value = newField.value;
    }
  });

  subscribeComponent("logic_rule_javascript_error", (err) => {
    error = err;
  });

  onMount(() => {
    if (!fieldId) {
      return;
    }
    value = formStore.getValue(fieldId);
  });
</script>

{#if !value}
  <p>Enter a value on your selected input to see its value here.</p>
{:else}
  <p>Current value of input:</p>
  <strong><code>{JSON.stringify(value, null, 4)}</code></strong>
  <p>Your Javascript expression will be run against this value.</p>
  <p>
    To reference this value in your expression, type <code><strong>value</strong></code>
  </p>
  <p>Example: <code>value.includes('hello')</code></p>
{/if}

{#if error}
  <div class="rounded-md bg-red-50 p-4">
    <div class="flex">
      <div class="flex-shrink-0">
        <!-- Heroicon name: x-circle -->
        <svg
          class="h-5 w-5 text-red-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor">
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clip-rule="evenodd" />
        </svg>
      </div>
      <div class="ml-3">
        <h3 class="text-sm leading-5 font-medium text-red-800">
          Javascript Expression Error
        </h3>
        <p class="text-sm text-red-800">
          Your javascript expression has been evaluated against the selected
          input and returned this error:
        </p>
        <div class="mt-2 text-sm leading-5 text-red-700">
          <ul class="list-disc pl-5">
            <li class="mt-1">{error?.message ?? ''}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
{/if}
