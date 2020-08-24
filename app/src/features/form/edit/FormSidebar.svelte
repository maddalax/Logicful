<script>
  import { dispatch } from "event/EventBus";
  import { flip } from "svelte/animate";
  import { dndzone } from "svelte-dnd-action";
  import { randomString } from "util/Generate";
  import { onMount } from "svelte";

  function defaultBlocks() {
    return [
      { id: randomString(), name: "string", morph: true },
      { id: randomString(), name: "combobox", morph: true },
      { id: randomString(), name: "switch" },
      { id: randomString(), name: "spacer" },
      { id: randomString(), name: "date", morph: true },
      { id: randomString(), name: "block", morph: true },
    ];
  }

  let blocks = defaultBlocks();

  function handler(e: any) {
    if (e.type === "consider") {
      blocks = e.detail.items;
    } else {
      blocks = defaultBlocks();
    }
  }

  function addField(block: any) {
    dispatch("add_field", {
      type: block.name,
    });
  }

  function saveDraft() {
    dispatch("save_form", {
      status: "draft",
    });
  }

  function saveAndPublish() {}

  onMount(() => {
    window.onunhandledrejection = (e: any) => {
      console.log("we got exception, but the app has crashed", e);
      // here we should gracefully show some fallback error or previous good known state
      // this does not work though:
      // current = C1;

      // todo: This is unexpected error, send error to log server
      // only way to reload page so that users can try again until error is resolved
      // uncomment to reload page:
      // window.location = "/oi-oi-oi";
    };
  });

  const dndProps : any = {
    "use:dndzone" : { items: blocks, flipDurationMs: 300, dropFromOthersDisabled: true, dropTargetStyle: { outline: 'white solid 0px' } },
    "on:consider" : handler,
    "on:finalize" : handler
  }
</script>

<style>
  .block {
    margin-bottom: 1em;
  }

  .save-button {
    width: 94%;
    height: 40px;
    padding: 0 0;
    margin-bottom: 1.2em;
    margin-left: -6px;
  }

  .px-3 {
    padding-left: 1em;
  }
</style>

<div style="text-align:center;">
  <button class="save-button btn btn-light" type="button" on:click={saveDraft}>
    Save
  </button>
</div>
<h5 style="padding-bottom:0.5em">Add Field</h5>
<div
  use:dndzone={{ items: blocks, flipDurationMs: 300, dropFromOthersDisabled: true, dropTargetStyle: { outline: 'white solid 0px' } }}
  on:consider={handler}
  on:finalize={handler}>
  {#each blocks as block (block.id)}
    <div animate:flip={{ duration: 1000 }}>
      <div on:click={() => addField(block)}>
        {#if block.name === 'string'}
          <div class="d-flex px-3 block">
            <div>
              <div class="icon icon-sm icon-secondary">
                <span class="fas fas fa-i-cursor" />
              </div>
            </div>
            <div class="pl-3">
              <h6 class="h6">Add Text Input</h6>
            </div>
          </div>
        {:else if block.name === 'spacer'}
          <div class="d-flex px-2 block">
            <div>
              <div class="icon icon-sm icon-secondary">
                <span class="fas fa-rocket" />
              </div>
            </div>
            <div class="pl-3">
              <h6 class="h6">Add Spacer</h6>
            </div>
          </div>
        {:else if block.name === 'switch'}
          <div class="d-flex px-2 block">
            <div>
              <div class="icon icon-sm icon-secondary">
                <span class="fas fa-toggle-off" />
              </div>
            </div>
            <div class="pl-3">
              <h6 class="h6">Add Toggle</h6>
            </div>
          </div>
        {:else if block.name === 'combobox'}
          <div class="d-flex px-2 block">
            <div>
              <div class="icon icon-sm icon-secondary">
                <span class="far fa-caret-square-down" />
              </div>
            </div>
            <div class="pl-3">
              <h6 class="h6">Add Dropdown</h6>
            </div>
          </div>
        {:else if block.name === 'block'}
          <div class="d-flex px-2 block">
            <div>
              <div class="icon icon-sm icon-secondary">
                <span class="fas fa-indent" />
              </div>
            </div>
            <div class="pl-3">
              <h6 class="h6">Add Content</h6>
            </div>
          </div>
        {:else if block.name === 'date'}
          <div class="d-flex px-2 block">
            <div>
              <div class="icon icon-sm icon-secondary">
                <span class="fas fa-calendar-day" />
              </div>
            </div>
            <div class="pl-3">
              <h6 class="h6">Add Date</h6>
            </div>
          </div>
        {/if}
      </div>
    </div>
  {/each}
</div>

<div
  class="d-flex px-2 collapsed"
  href="#submenu-app"
  data-toggle="collapse"
  data-target="#submenu-app"
  aria-expanded="false">
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
