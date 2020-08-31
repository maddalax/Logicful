const map = new Map<string, any[]>();

export function subscribe(event : string, subscriber : (((payload : any) => any) | ((payload : any) => Promise<any>))) {
  if (!map.has(event)) {
    map.set(event, [subscriber]);
  } else {
    const subscribers = map.get(event);
    subscribers!.push(subscriber);
    map.set(event, subscribers!);
  }
}

export function subscribePrivate(id : string, event : string, subscriber : (((payload : any) => any) | ((payload : any) => Promise<any>))) {
  const e = `${id}-${event}`;
  subscribe(e, subscriber);
}

export async function dispatchPrivate(id : string, event : string, payload : any) {
  const e = `${id}-${event}`;
  console.debug("dispatch_event_private", e, payload);
  dispatch(e, payload);
}

export function dispatchSingle<T>(event : string, payload : any) : T {
  const result = dispatchSync(event, payload)[0] as T;
  console.debug("dispatch_event_single", event, payload, result);
  return result;
}

export async function dispatch(event : string, payload : any) {
  console.debug("dispatch_event", event, payload);
  if (map.has(event)) {
    const subscribers = map.get(event); 
    const promises = subscribers!.map((subscriber) => {
      return subscriber(payload);
    });
    await Promise.all(promises);
  }
}

export function dispatchSync(event : string, payload : any) {
  console.debug("dispatch_event_sync", event, payload);
  if (map.has(event)) {
    const subscribers = map.get(event);
    return subscribers!.map((subscriber) => {
      return subscriber(payload);
    });
  }
  return [];
}