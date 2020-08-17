const map = new Map<string, any[]>();

export function subscribe(event : string, subscriber : (((payload : any) => any) | ((payload : any) => Promise<any>))) {
  if (!map.has(event)) {
    map.set(event, [subscriber]);
  } else {
    const subscribers = map.get(event);
    subscribers.push(subscriber);
    map.set(event, subscribers);
  }
}

export async function dispatch(event : string, payload : any) {
  console.log("dispatch_event", event, payload);
  if (map.has(event)) {
    const subscribers = map.get(event); 
    const promises = subscribers.map((subscriber) => {
      return subscriber(payload);
    });
    await Promise.all(promises);
  }
}