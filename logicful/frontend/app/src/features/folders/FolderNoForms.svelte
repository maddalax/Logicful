<script>
import Button from "@app/components/Button.svelte";
export let folderId : string
</script>

<div class="flex">
    <div>
      <h2 class="text-base leading-6 font-semibold text-indigo-600 uppercase tracking-wide">Dynamic Forms</h2>
      <p class="mt-2 text-2xl leading-7 font-extrabold text-gray-900">Create New Form</p>
      <p class="mt-4 text-lg leading-7 text-gray-500">You have no forms in this folder, click below to create one now.</p>
      <div class="mt-3">
          <Button type="primary" size="large" href={`/form/create?folder=${folderId}`}>Create New Form</Button>
      </div>
    </div>
  </div>
  