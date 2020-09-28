import {nullOrEmpty} from "./Compare.js";
export function firstNotEmpty(...values) {
  for (let v of values) {
    if (!nullOrEmpty(v)) {
      return v;
    }
  }
  return "";
}
