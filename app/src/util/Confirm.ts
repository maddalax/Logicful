import {dispatch} from "event/EventBus";
import type {DialogOptions} from "components/models/ComponentProps";
import Html from 'components/Html.svelte'

export function promptConfirm({title, message, confirmText, callback} : {title : string, message : string, confirmText : string, callback : () => any}) {
    dispatch("dialog_show", {
        child : Html,
        title : title,
        buttons : [{
            label : 'Cancel',
            type : 'btn-primary',
            onClick : () => {}
        }, {
           label : confirmText,
           type : 'btn-danger',
           onClick : callback
        }],
        props : {
            value : message
        }
    } as DialogOptions)
}