<script lang="typescript">
  import Folders from "../../components/Folders.svelte";
  import FolderContent from "../../components/FolderContent.svelte";
import { afterUpdate } from "svelte";

  afterUpdate(() => {
    console.log('hereee')
  })

</script>

<div class="section section-lg pt-6 pt-md-6 bg-soft">
  <div class="container">
    <div class="row pt-3 pt-md-0">
      <div class="col-12 col-md-4 d-none d-lg-block">
        <Folders />
      </div>
      <div class="col-12 col-lg-8">
        <FolderContent />
      </div>
    </div>
  </div>
</div>
