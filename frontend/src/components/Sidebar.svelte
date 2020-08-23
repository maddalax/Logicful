<script lang="ts">

</script>

<nav class="d-md-block sidebar collapse" style="background-color: #f5f9fe;">
  <div style="margin-left: .5em">
    <ul class="nav flex-column" id="blocks">
      <slot />
    </ul>
  </div>
</nav>

<style>
  .sidebar {
    padding-bottom: 3em;
    padding-top: 1em;
    min-height: 100vh;
  }
</style>
