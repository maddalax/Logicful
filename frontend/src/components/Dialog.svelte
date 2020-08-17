<script lang="ts">
    import { onMount } from 'svelte';
    import { subscribe, dispatch } from 'event/EventBus';
    import CloseIcon from '@fortawesome/fontawesome-free/svgs/regular/window-close.svg';
    import type { DialogOptions } from './models/ComponentProps';
    import { subscribeFieldChange } from 'event/FieldEvent';

    let isOpen = false;
    let props: DialogOptions;
    let confirm = false;
    let dirty = false;
    let saving: boolean = false;

    subscribe('dialog_show', (p: DialogOptions) => {
        props = p;
        open();
    });

    subscribe('user_change', () => {
        if (isOpen && props.confirmCloseOnDirty) {
            dirty = true;
        }
    });

    onMount(() => {
        subscribeFieldChange((_, userChange) => {
            if (isOpen && props.confirmCloseOnDirty && userChange) {
                dirty = true;
            }
        });
        subscribe('document_click', (e) => {
            if (e.target?.id === 'dialog' && isOpen && !dirty) {
                close();
            }
        });
    });

    const FOCUSABLE_SELECTORS =
        'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]';

    function open() {
        const main = document.querySelector('main') as any;
        const modal = document.querySelector('.modal') as any;

        // show the modal
        modal.style.display = 'flex';

        // Trap the tab focus by disable tabbing on all elements outside of your modal.  Because the modal is a sibling of main, this is easier. Make sure to check if the element is visible, or already has a tabindex so you can restore it when you untrap.
        const focusableElements = main.querySelectorAll(FOCUSABLE_SELECTORS);
        focusableElements.forEach((el) => el.setAttribute('tabindex', '-1'));

        // Trap the screen reader focus as well with aria roles. This is much easier as our main and modal elements are siblings, otherwise you'd have to set aria-hidden on every screen reader focusable element not in the modal.
        modal.removeAttribute('aria-hidden');
        main.setAttribute('aria-hidden', 'true');
        isOpen = true;
    }

    async function save() {
        saving = true;
        await dispatch('dialog_save', {});
        saving = false;
        dirty = false;
        close();
    }

    function close() {
        if (props.confirmCloseOnDirty && !confirm && dirty) {
            confirm = true;
            return;
        }

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
        dispatch('dialog_close', {});
        props.child = null;
        isOpen = false;
        confirm = false;
        dirty = false;
    }
</script>

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
        width: 90%;
        max-width: 90%;
        background: white;
        padding-left: 3em;
        padding-right: 3em;
        padding-top: 2.5em;
        padding-bottom: 3em;
        position: relative;
        overflow: auto;
    }

    .modal-footer {
        width: 90%;
        height: 50px;
        max-width: 90%;
        background: white;
    }

    .close-icon {
        width: 1.5em;
        height: 1.5em;
        float: right;
        margin-bottom: 1em;
        cursor: pointer;
        position: absolute;
        right: 0;
        z-index: 100000;
        right: 1em;
        top: 1em;
    }

    .usa-alert {
        margin-top: 1em;
    }
</style>

<div
    class="modal"
    role="dialog"
    id="dialog"
    aria-labelledby="Modal_Title"
    aria-describedby="Modal_Description"
    aria-hidden="true"
    style="display: none;">

    <div class="modal-content">
        <div class="close-icon" on:click={close}>
            {@html CloseIcon}
        </div>
        <section class="usa-prose font-sans-sm" style="margin-bottom: 1em">
            <h2>{props?.title}</h2>
        </section>
        {#if props?.confirmCloseOnDirty && confirm}
            <div style="margin-top: 2em">
                <div class="usa-alert usa-alert--warning">
                    <div class="usa-alert__body">
                        <h3 class="usa-alert__heading">Unsaved Changes</h3>
                        <p class="usa-alert__text">
                            You have unsaved changes, click the X again to close this dialog and discard your changes.
                        </p>
                    </div>
                </div>
            </div>
        {/if}
        <svelte:component this={props?.child} {...props?.props} />
    </div>
    {#if props?.save} 
    <div class="modal-footer">
        <button disabled={saving} class="btn btn-primary dialog-action float-right" on:click={save}>
            {saving ? 'Saving...' : 'Save'}
        </button>
    </div>
    {/if}   
</div>
