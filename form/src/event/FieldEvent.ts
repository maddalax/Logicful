import type { IField } from '../entities/IField';
import { subscribe, dispatch } from './EventBus';

export function dispatchFieldChange(field : IField, value : any) {
    dispatch("field_changed", {
        field,
        value : value === '' ? undefined : value
    })
}

export function subscribeFieldChange(callback : (field : IField, value : any) => any) {
    subscribe("field_changed", (payload) => {
        callback(payload.field, payload.value);
    });
}