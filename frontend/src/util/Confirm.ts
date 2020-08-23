import {dispatch} from "event/EventBus";
import type {DialogOptions} from "components/models/ComponentProps";
import Html from 'components/Html.svelte'

export function promptConfirm(title : string, message : string, callback : () => any) {
    dispatch("dialog_show", {
        child : Html,
        title : title,
        buttons : [{
            label : 'Cancel',
            type : 'btn-primary',
            onClick : () => {}
        }, {
           label : 'Confirm',
           type : 'btn-danger',
           onClick : callback
        }],
        props : {
            value : message
        }
    } as DialogOptions)
}