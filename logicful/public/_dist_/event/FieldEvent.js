import {dispatchSync, subscribeComponent} from "./EventBus.js";
export function dispatchFieldChange(field, change) {
  dispatchSync("field_changed", {
    field,
    change
  });
}
export function subscribeFieldChange(onMount, callback) {
  subscribeComponent("field_changed", (payload) => {
    if (!payload.field) {
      console.error("Field change was undefined.", payload);
      return;
    }
    callback(payload.field, payload.change);
  });
}
