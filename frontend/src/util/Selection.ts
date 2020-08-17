import _set from "lodash.set";
import _get from "lodash.get";

export function select(o: any, s: string) {
  return _get(o, s);
}

export function set(o: any, s: string, value: any) {
  _set(o, s, value);
}
