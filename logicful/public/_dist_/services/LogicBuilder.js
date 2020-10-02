import formStore from "../store/FormStore.js";
import {nullOrEmpty} from "../util/Compare.js";
import {isLabelValue} from "../guards/Guard.js";
export class LogicBuilder {
  evaluate(field) {
    if (!field.logic) {
      return true;
    }
    if (!field.logic.rules) {
      return true;
    }
    const rules = field.logic.rules.filter((r) => {
      if (nullOrEmpty(r.field) || nullOrEmpty(r.condition)) {
        return false;
      }
      return true;
    });
    if (rules.length === 0) {
      return true;
    }
    if (field.logic.action === "show-any-match") {
      for (let rule of rules) {
        const fieldTargetValue = formStore.getValue(rule.field);
        if (fieldTargetValue == null) {
          continue;
        }
        if (this.evaluateCondition(rule, fieldTargetValue)) {
          return true;
        }
      }
      return false;
    }
    if (field.logic.action === "show-all-match") {
      for (let rule of rules) {
        const fieldTargetValue = formStore.getValue(rule.field);
        if (fieldTargetValue == null) {
          return false;
        }
        if (!this.evaluateCondition(rule, fieldTargetValue)) {
          return false;
        }
      }
      return true;
    }
    if (field.logic.action === "hide-all-match") {
      for (let rule of rules) {
        const fieldTargetValue = formStore.getValue(rule.field);
        if (fieldTargetValue == null) {
          return true;
        }
        if (!this.evaluateCondition(rule, fieldTargetValue)) {
          return true;
        }
      }
      return false;
    }
    if (field.logic.action === "hide-any-match") {
      for (let rule of rules) {
        const fieldTargetValue = formStore.getValue(rule.field);
        if (fieldTargetValue == null) {
          continue;
        }
        if (this.evaluateCondition(rule, fieldTargetValue)) {
          return false;
        }
      }
      return true;
    }
    return false;
  }
  evaluateCondition(rule, value) {
    if (isLabelValue(value)) {
      return this.evaluateCondition(rule, value.value) || this.evaluateCondition(rule, value.label);
    }
    switch (rule.condition) {
      case "contains":
        return this.toLowerCase(value).includes(this.toLowerCase(rule.value));
      case "startsWith":
        return this.toLowerCase(value).startsWith(this.toLowerCase(rule.value));
      case "endsWith":
        return this.toLowerCase(value).endsWith(this.toLowerCase(rule.value));
      case "eq":
        return this.toLowerCase(value) == this.toLowerCase(rule.value);
      case "gt":
        return parseFloat(value) > parseFloat(rule.value);
      case "lt":
        return parseFloat(value) < parseFloat(rule.value);
      case "lte":
        return parseFloat(value) <= parseFloat(rule.value);
      case "gte":
        return parseFloat(value) >= parseFloat(rule.value);
      case "hasValue":
        return this.hasValue(value);
      case "notHaveValue":
        return !this.hasValue(value);
      case "isTrue":
        return value != null && value == true;
      case "isFalse":
        return value != null && value == false;
      case "isFileExtension":
        return this.isFileExtension(value, rule);
      case "isNotFileExtension":
        return !this.isFileExtension(value, rule);
      default:
        return false;
    }
  }
  hasValue(value) {
    return value != null && value != "";
  }
  isFileExtension(value, rule) {
    if (!this.hasValue(value)) {
      return false;
    }
    const file = formStore.getFile(value);
    if (!file) {
      return false;
    }
    const fileName = file.name;
    const split = fileName.split(".");
    if (split.length < 2) {
      return false;
    }
    const rules = rule.value.split(",").map((r) => {
      return r.replace(" ", "").replace(".", "");
    });
    for (let r of rules) {
      if (r === split[split.length - 1]) {
        return true;
      }
    }
    return false;
  }
  toLowerCase(value) {
    if (!this.hasValue(value)) {
      return "";
    }
    return value.toString().toLowerCase();
  }
}