<script lang="typescript">
  import EditField from "./components/EditField.svelte";
  import TextInput from "./components/inputs/TextInput.svelte";
  import { stores } from "./store";

  let selected: string | null;

  stores.selectedField.subscribe((s) => {
    selected = s;
  });

  function selectField() {
    stores.selectedField.set("test");
  }
</script>

<form>
  <div onclick={() => stores.selectedField.set(null)}>
    <div>
      <div>
        <h3 class="text-lg leading-6 font-medium text-gray-900">Profile</h3>
        <p class="mt-1 text-sm leading-5 text-gray-500">
          This information will be displayed publicly so be careful what you
          share.
        </p>
      </div>
      <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        <EditField id="1">
          <TextInput onChange={() => {}} label={"Test"} />
        </EditField>
        <EditField id="2">
          <TextInput onChange={() => {}} label={"Test 2"} help={"Help"}/>
        </EditField>
      </div>
    </div>
  </div>
</form>
