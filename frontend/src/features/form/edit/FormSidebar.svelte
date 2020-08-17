<script>
  import { onMount } from "svelte";
  import Dragula from "dragula";
  import { dispatch } from "../../../event/EventBus";

  onMount(() => {
    Dragula(
      [
        document.querySelector("#blocks"),
        document.querySelector("#form-preview"),
        document.querySelector("#custom-block"),
      ],
      {
        copy: true,
      }
    ).on("drop", function (el) {
      dispatch("block_dropped", {
        type: el.id,
      });
      el.innerHTML = "";
      el.style.display = "none";
    });
  });

  function saveDraft() {
    localStorage.setItem("form", JSON.stringify(form));
  }

  function saveAndPublish() {}
</script>

<style>
  #sidebarMenu {
    padding-bottom: 3em;
    padding-top: 1em;
    height: 90vh;
    max-width: 20em;
    width: 20em;
  }

  .block {
    margin-bottom: 1em;
  }

  .save-button {
    width: 94%;
    height: 40px;
    padding: 0rem 0rem;
    margin-bottom: 1.2em;
  }

  .px-3 {
    padding-left: 1em;
  }
</style>

<nav
  id="sidebarMenu"
  class="col-md-3 col-lg-2 col-sm d-md-block sidebar collapse"
  style="background-color: #f5f9fe;">
  <div class="position-sticky">
    <ul class="nav flex-column" id="blocks">
      <div style="text-align:center;">
        <button
          class="save-button btn btn-light"
          type="button"
          on:click={saveDraft}>
          Save
        </button>
      </div>
      <div class="d-flex px-3 block" id="text-input">
        <div>
          <div class="icon icon-sm icon-secondary">
            <span class="fas fas fa-i-cursor" />
          </div>
        </div>
        <div class="pl-3">
          <h6 class="h6">Add Text Input</h6>
        </div>
      </div>
      <div class="d-flex px-2 block" id="dropdown">
        <div>
          <div class="icon icon-sm icon-secondary">
            <span class="far fa-caret-square-down" />
          </div>
        </div>
        <div class="pl-3">
          <h6 class="h6">Add Dropdown</h6>
        </div>
      </div>
      <div class="d-flex px-2 block" id="spacer">
        <div>
          <div class="icon icon-sm icon-secondary">
            <span class="fas fa-rocket" />
          </div>
        </div>
        <div class="pl-3">
          <h6 class="h6">Add Spacer</h6>
        </div>
      </div>

      <div class="d-flex px-2 collapsed" href="#submenu-app" data-toggle="collapse" data-target="#submenu-app" aria-expanded="false" >
        <div>
          <div class="icon icon-sm icon-secondary">
            <span class="fas fa-pager" />
        </div>
        </div>
        <div class="pl-3">
          <h6 class="h6">Custom Blocks</h6>
        </div>

        <div class="pl-3" />

        <div>
            <div class="icon icon-sm icon-secondary link-arrow">
              <span class="fas fa-chevron-right" />
          </div>
        </div>
      </div>
      <div>
        <div
        class="multi-level collapse"
        role="list"
        id="submenu-app"
        aria-expanded="false"
        style="padding-top:0.5em; padding-left: 1.9em;">
        <ul class="flex-column nav">
          <li class="nav-item">
            <a class="nav-link custom-block" id="address" href="#">
              <span>Address Block</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link custom-block" id="name" href="#">
              <span>Full Name Block</span>
            </a>
          </li>
        </ul>
      </div>
      </div>
    </ul>
  </div>
</nav>
