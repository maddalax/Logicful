const map = new Map<string, any[]>();

export function subscribe(event : string, subscriber : (payload : any) => any) {
  if (!map.has(event)) {
    map.set(event, [subscriber]);
  } else {
    const subscribers = map.get(event);
    subscribers.push(subscriber);
    map.set(event, subscribers);
  }
}

export function dispatch(event : string, payload : any) {
  console.trace("Event: ", event, payload);
  if (map.has(event)) {
    const subscribers = map.get(event);
    subscribers.forEach((subscriber) => {
      subscriber(payload);
    });
  }
}