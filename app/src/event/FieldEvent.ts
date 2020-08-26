import type { IField } from '../models/IField';
import { subscribe, dispatchSync } from 'event/EventBus';

export function dispatchFieldChange(field : IField, change : {field : string, value : any, fromUser : boolean}) {
    dispatchSync("field_changed", {
        field,
        change
    })
}

export function subscribeFieldChange(callback : (field : IField, change : {field : string, value : any, fromUser : boolean}) => any) {
    subscribe("field_changed", (payload) => {       
        callback(payload.field, payload.change);
    });
}
