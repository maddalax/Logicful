<!-- <script context="module">
    // the (optional) preload function takes a
    // `{ path, params, query }` object and turns it into
    // the data we need to render the page
    export async function preload(page: any, session: any) {
        const { form } = page.params
        if (!form) {
            return ''
        }
        return { formId : form }
    }
</script> -->

<script lang="typescript">
    import { goto } from '@sapper/app';
import { onMount } from 'svelte';

onMount(() => {
    goto('./builder');
  })
</script>

