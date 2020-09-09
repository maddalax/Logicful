<script lang="typescript">

</script>

<nav class="d-md-block sidebar collapse" style="background-color: #f5f9fe; height: 100vh;" on:click|stopPropagation>
  <div style="margin-left: .5em; margin-right: 0.5em;">
    <ul class="nav flex-column" id="blocks" style="padding-top: 0.5em;">
      <slot />
    </ul>
  </div>
</nav>

<style type="text/scss">
  .sidebar {
    padding-top: 1em;
    min-height: 100vh;
  }
</style>
