import {randomString} from "../util/Generate.js";
import {onMount} from "../../web_modules/svelte.js";
const map = new Map();
export function subscribe(event, subscriber) {
  let id = randomString();
  if (!map.has(event)) {
    const subscribers = {
      [id]: subscriber
    };
    map.set(event, subscribers);
  } else {
    const subscribers = map.get(event);
    subscribers[id] = subscriber;
    map.set(event, subscribers);
  }
  console.log("subscribers", event, Object.keys(map.get(event)).length);
  return id;
}
export function unsubscribe(event, id) {
  if (!map.has(event) || !map.get(event)) {
    return;
  }
  const result = map.get(event);
  delete result[id];
  map.set(event, result);
}
export function subscribeComponent(event, subscriber) {
  onMount(() => {
    const id = subscribe(event, subscriber);
    return () => {
      unsubscribe(event, id);
    };
  });
}
export function subscribePrivateComponent(id, event, subscriber) {
  onMount(() => {
    const unsubscribeId = subscribePrivate(id, event, subscriber);
    return () => {
      unsubscribe(event, unsubscribeId);
    };
  });
}
export function subscribePrivate(id, event, subscriber) {
  const e = `${id}-${event}`;
  return subscribe(e, subscriber);
}
export async function dispatchPrivate(id, event, payload) {
  const e = `${id}-${event}`;
  console.debug("dispatch_event_private", e, payload);
  dispatch(e, payload);
}
export function dispatchSingle(event, payload) {
  const result = dispatchSync(event, payload)[0];
  console.debug("dispatch_event_single", event, payload, result);
  return result;
}
export async function dispatch(event, payload) {
  console.debug("dispatch_event", event, payload);
  if (map.has(event)) {
    const subscribers = map.get(event);
    if (!subscribers) {
      return;
    }
    const promises = Object.values(subscribers).map((s) => {
      return s(payload);
    });
    await Promise.all(promises);
  }
}
export function dispatchSync(event, payload) {
  console.debug("dispatch_event_sync", event, payload);
  if (map.has(event)) {
    const subscribers = map.get(event);
    if (!subscribers) {
      return [];
    }
    return Object.values(subscribers).map((subscriber) => {
      return subscriber(payload);
    });
  }
  return [];
}
