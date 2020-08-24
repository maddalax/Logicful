import _set from "lodash.set";
import _get from "lodash.get";

export function select(o: any, s: string) : any {
  return _get(o, s);
}

export function set(o: any, s: string, value: any) : any {
  _set(o, s, value);
}
