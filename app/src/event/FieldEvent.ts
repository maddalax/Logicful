import type { IField } from '../models/IField';
import { subscribe, dispatchSync } from 'event/EventBus';

export function dispatchFieldChange(field : IField, userChange : boolean) {
    dispatchSync("field_changed", {
        field,
        userChange
    })
}

export function subscribeFieldChange(callback : (field : IField, userChange : boolean) => any) {
    subscribe("field_changed", (payload) => {       
        callback(payload.field, payload.userChange);
    });
}
