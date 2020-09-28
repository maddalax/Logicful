<script lang="typescript">
</script>

<nav
  class="d-md-block sidebar collapse"
  style="height: 100vh;"
  on:click|stopPropagation>
  <div style="margin-left: .5em; margin-right: 0.5em;">
    <ul class="nav flex-column" id="blocks" style="padding-top: 0.5em;">
      <slot />
    </ul>
  </div>
</nav>

