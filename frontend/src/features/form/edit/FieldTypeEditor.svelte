<script lang="ts">
  import type { IField } from "models/IField";
  import ComboBoxOptionsEditor from "./ComboBoxOptionsEditor.svelte";

  export let field: IField;
  export let editorId: string;
</script>

<div>
  {#if field.type === 'string'}
    <div class="dropdown" style="padding: .75em 0.6em;">
      <button
        class="btn btn-secondary dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-expanded="false"
      >
        Dropdown button
      </button>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <li>
          <a class="dropdown-item" href="#">Action</a>
        </li>
        <li>
          <a class="dropdown-item" href="#">Another action</a>
        </li>
        <li>
          <a class="dropdown-item" href="#">Something else here</a>
        </li>
      </ul>
    </div>
  {:else if field.type === 'combobox'}
    <ComboBoxOptionsEditor {field} {editorId} />
  {:else if field.type === 'address'}
    <p>Address</p>
  {/if}
</div>
