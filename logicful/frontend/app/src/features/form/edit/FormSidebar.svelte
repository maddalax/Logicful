<script lang="typescript">
  // @ts-nocheck
  import { dispatch, subscribeComponent } from "@app/event/EventBus";
  import { flip } from "svelte/animate";
  import { randomString } from "@app/util/Generate";
  import { onMount, tick } from "svelte";
  import FieldEdit from "./FieldEdit.svelte";
  import { slide } from "svelte/transition";
  import { subscribeFieldChange } from "@app/event/FieldEvent";
  import { fastClone } from "@app/util/Compare";
  import { transformDraggedElement } from "./util/Draggable";
  import { debounce } from "@app/util/Debounce";

  let saving = false;
  let saved = false;
  let loaded = false;
  let drake: any = null;
  let dragula: any;
  let shouldReload = true;

  function defaultBlocks() {
    return [
      { name: "string" },
      { name: "switch" },
      { name: "spacer" },
      { name: "date" },
      { name: "block" },
      { name: "file" },
      { name: "address" },
      { name: "checkbox-group" },
      { name: "radio-group" },
      { name: "full-name" },
    ];
  }

  let blocks = defaultBlocks();

  const loadDragula = debounce(async () => {
    shouldReload = true;
    if (!dragula) {
      dragula = (await import("dragula")).default;
      await tick();
    }
    if (drake) {
      drake.destroy();
    }
    await tick();
    drake = dragula(
      [
        document.querySelector("#block-container"),
        document.querySelector("#form-preview-fields"),
      ],
      {
        copy: function (el, source) {
          return source === document.getElementById("block-container");
        },
        accepts: function (el, target) {
          return target !== document.getElementById("block-container");
        },
      }
    )
      .on("drag", function (el) {
        if (el.id && el.id.startsWith("form-field-")) {
          return;
        }
        const container = document.getElementById("form-preview-fields");
        if (container && !container.className?.includes("ex-over")) {
          container.className += " ex-over";
        }
      })
      .on("over", function (el, container) {
        if (el.id && el.id.startsWith("form-field-")) {
          return;
        }
        if (
          container.id === "form-preview-fields" &&
          !container.className?.includes("ex-over")
        ) {
          container.className += " ex-over";
        }
        dispatch("drag_over", container);
      })
      .on("drop", function (el) {
        console.log("drop");
        const container = document.getElementById("form-preview-fields");
        if (container) {
          container.className = container.className.replace("ex-over", "");
        }
        const fields = Array.from(
          document.querySelector("#form-preview-fields").childNodes
        ).filter(
          (w) =>
            w.id?.startsWith("sidebar-block") || w.id?.startsWith("form-field-")
        );
        el.remove();
        dispatch("drag_finished", fields);
      });
  }, 300);

  function addField(block: any) {
    dispatch("add_field", {
      type: block.name,
    });
  }

  async function saveDraft() {
    saving = true;
    await dispatch("save_form", {
      status: "draft",
    });
    saving = false;
  }

  function saveAndPublish() {}

  subscribeComponent("form_saved", () => {
    saved = true;
    setTimeout(() => {
      saved = false;
    }, 1500);
  });

  subscribeComponent("reload_dragula", () => {
    loadDragula();
  });

  subscribeComponent("destroy_dragula", () => {
    shouldReload = false;
    requestAnimationFrame(() => {
      console.log("DESTROYING")
      if (drake) {
        drake.destroy();
      }
    });
  });

  subscribeComponent("form_updated", () => {
    if (shouldReload) {
      loadDragula();
    }
  });

  subscribeComponent("form_loaded", () => {
    loaded = true;
    loadDragula();
  });

  onMount(async () => {
    import("dragula/dist/dragula.css");
  });
</script>

<!--
  Tailwind UI components require Tailwind CSS v1.8 and the @tailwindcss/ui plugin.
  Read the documentation to get started: https://tailwindui.com/documentation
-->
<div class="flex flex-col flex-grow border-r border-gray-200 pt-5 pb-4 bg-white overflow-y-auto">
  <div class="flex items-center flex-shrink-0 px-4">
    <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-logo-on-white.svg" alt="Workflow">
  </div>
  <div class="mt-5 flex-grow flex flex-col">
    <nav class="flex-1 bg-white space-y-1">
      <a href="#" class="group flex items-center px-3 py-2 text-sm leading-5 font-medium text-indigo-600 bg-indigo-50 border-l-4 border-indigo-600 focus:outline-none focus:bg-indigo-100 transition ease-in-out duration-150">
        <!-- Heroicon name: home -->
        <svg class="mr-3 h-6 w-6 text-indigo-500 transition ease-in-out duration-150" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        Dashboard
      </a>
      <a href="#" class="group flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-600 border-l-4 border-transparent hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition ease-in-out duration-150">
        <!-- Heroicon name: users -->
        <svg class="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-600 group-focus:text-gray-600 transition ease-in-out duration-150" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
        Team
      </a>
      <a href="#" class="group flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-600 border-l-4 border-transparent hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition ease-in-out duration-150">
        <!-- Heroicon name: folder -->
        <svg class="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-600 group-focus:text-gray-600 transition ease-in-out duration-150" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
        </svg>
        Projects
      </a>
      <a href="#" class="group flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-600 border-l-4 border-transparent hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition ease-in-out duration-150">
        <!-- Heroicon name: calendar -->
        <svg class="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-600 group-focus:text-gray-600 transition ease-in-out duration-150" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        Calendar
      </a>
      <a href="#" class="group flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-600 border-l-4 border-transparent hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition ease-in-out duration-150">
        <!-- Heroicon name: inbox -->
        <svg class="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-600 group-focus:text-gray-600 transition ease-in-out duration-150" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
        Documents
      </a>
      <a href="#" class="group flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-600 border-l-4 border-transparent hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition ease-in-out duration-150">
        <!-- Heroicon name: chart-bar -->
        <svg class="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-600 group-focus:text-gray-600 transition ease-in-out duration-150" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        Reports
      </a>
    </nav>
  </div>
</div>
