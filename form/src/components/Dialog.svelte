<script lang="ts">
    import { onMount } from 'svelte';
    import { subscribe } from 'event/EventBus';

    let child;

    subscribe('dialog_show', (component) => {
        child = component;
        openModal();
    });

    const FOCUSABLE_SELECTORS =
        'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]';

    function openModal() {
        const main = document.querySelector('main') as any;
        const modal = document.querySelector('.modal') as any;

        // show the modal
        modal.style.display = 'flex';

        // Focus the first element within the modal. Make sure the element is visible and doesnt have focus disabled (tabindex=-1);
        modal.querySelector(FOCUSABLE_SELECTORS).focus();

        // Trap the tab focus by disable tabbing on all elements outside of your modal.  Because the modal is a sibling of main, this is easier. Make sure to check if the element is visible, or already has a tabindex so you can restore it when you untrap.
        const focusableElements = main.querySelectorAll(FOCUSABLE_SELECTORS);
        focusableElements.forEach((el) => el.setAttribute('tabindex', '-1'));

        // Trap the screen reader focus as well with aria roles. This is much easier as our main and modal elements are siblings, otherwise you'd have to set aria-hidden on every screen reader focusable element not in the modal.
        modal.removeAttribute('aria-hidden');
        main.setAttribute('aria-hidden', 'true');
    }

    function closeModal() {
        const main = document.querySelector('main') as any;
        const modal = document.querySelector('.modal') as any;
        // hide the modal
        modal.style.display = 'none';

        // Untrap the tab focus by removing tabindex=-1. You should restore previous values if an element had them.
        const focusableElements = main.querySelectorAll(FOCUSABLE_SELECTORS);
        focusableElements.forEach((el) => el.removeAttribute('tabindex'));

        // Untrap screen reader focus
        modal.setAttribute('aria-hidden', 'true');
        main.removeAttribute('aria-hidden');
    }
</script>

<div
    class="modal"
    role="dialog"
    aria-labelledby="Modal_Title"
    aria-describedby="Modal_Description"
    aria-hidden="true"
    style="display: none">
    <div class="modal-content">
        <svelte:component this={child} />
    </div>
    <div class="modal-footer">
        <button class="usa-button usa-button--unstyled dialog-action float-right">Close</button>
    </div>
</div>

<style>
    .modal {
        position: fixed;
        background: rgba(0, 0, 0, 0.6);
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        padding: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

    .modal-content {
        width: 100%;
        height: 100%;
        max-width: 780px;
        background: white;
        padding: 20px;
        position: relative;
        overflow: auto;
    }

    .modal-footer {
        width: 100%;
        height: 50px;
        max-width: 780px;
        background: white;
        padding: 20px;
    }
</style>
