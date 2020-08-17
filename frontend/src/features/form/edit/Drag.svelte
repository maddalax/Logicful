<script>
    import { flip } from 'svelte/animate';
    import { dndzone } from 'svelte-dnd-action';
    let items = [
        {id: 1, name: "item1"},
        {id: 2, name: "item2"},
        {id: 3, name: "item3"},
        {id: 4, name: "item4"}
    ];

    function handler(e) {
        items = e.detail.items;
        console.log("DROPPED", items)
    }
</script>


<div use:dndzone="{{items}}" on:consider={handler} on:finalize={handler}>
    {#each items as item(item.id)}
        <div style="margin-top: 1em" animate:flip="{{duration: 300}}">
            {item.name}
        </div>
    {/each}
</div>