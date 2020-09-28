<script lang="typescript">
    import { dispatch } from "@app/event/EventBus";

    function unselect() {
        dispatch("unselect_field", {});
    }
</script>

<div class="hidden md:flex md:flex-shrink-0">
    <div class="flex flex-col w-96">
        <div class="flex flex-col h-0 flex-1 border-l border-gray-200 bg-gray-50">
            <div class="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                <nav class="mt-5 flex-1 px-2 bg-gray-50 space-y-1">
                    <slot />
                </nav>
            </div>
        </div>
    </div>
</div>
