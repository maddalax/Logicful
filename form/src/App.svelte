<script lang="ts">
    import FormBuilder from 'views/builder/FormBuilder.svelte';
    import Dialog from 'components/Dialog.svelte';
    import { onMount } from 'svelte';
    import { dispatch} from 'event/EventBus';
    import OptionSetsList from 'views/builder/OptionSetsList.svelte';

    onMount(() => {
    })

</script>

<div>
    <main>
        <a class="usa-skipnav" href="#main-content">Skip to main content</a>
        <div class="usa-overlay"></div>
        <header class="usa-header usa-header--basic">
            <div class="usa-nav-container">
                <div class="usa-navbar">
                    <div class="usa-logo" id="basic-logo">
                        <em class="usa-logo__text">
                            <a href="/" title="Home" aria-label="Home">Logicful</a>
                        </em>
                    </div>
                    <button class="usa-menu-btn">Menu</button>
                </div>
            </div>
        </header>
        <div style="margin-top: 1em">
            <FormBuilder />
        </div>
    </main>
    <Dialog />
</div>
