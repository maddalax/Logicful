import {isString, isObject} from "../guards/Guard.js";
import {select} from "../util/Selection.js";
export class FieldValueLoader {
  async load(field) {
    return await this.loadValue(field.value ?? field.defaultValue);
  }
  async loadValue(value) {
    if (value == null) {
      return;
    }
    if (isString(value)) {
      return value;
    }
    if (value.type === "remote") {
      return await this.loadRemote(value);
    }
    if (value.type === "local") {
      const localValue = value.value;
      if (isObject(localValue) && localValue.type === "remote") {
        return await this.loadChildren(localValue);
      }
      return localValue;
    }
    return value;
  }
  async loadRemote(value) {
    if (isString(value)) {
      return value;
    }
    const response = await fetch(value.value);
    const result = await response.json();
    return value.selector ? select(result, value.selector) : result;
  }
  async loadChildren(value) {
    const keys = Object.keys(value);
    const promises = await keys.map((w) => {
      return this.loadValue(value[w]);
    });
    const results = await Promise.all(promises);
    const response = {};
    for (let i = 0; i < keys.length; i++) {
      response[keys[i]] = results[i];
    }
    return response;
  }
}
