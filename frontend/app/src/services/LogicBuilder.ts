import type { LogicRule } from "../models/LogicBuilder";
import type { IField } from "../models/IField";
import formStore from "../store/FormStore";
import { nullOrEmpty } from "@app/util/Compare";
import { isLabelValue } from "@app/guards/Guard";
import type { Dictionary } from "@app/models/Utility";
import { DateTime } from "luxon";
import { dispatch } from "@app/event/EventBus";

export class LogicBuilder {
  evaluate(field: IField): boolean {
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

  private evaluateCondition(rule: LogicRule, value: any): boolean {
    if (isLabelValue(value)) {
      return (
        this.evaluateCondition(rule, value.value) ||
        this.evaluateCondition(rule, value.label)
      );
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
      case "hasValueChecked":
        return this.hasValueChecked(value, rule);
      case "notHasValueChecked":
        return !this.hasValueChecked(value, rule);
      case "noValuesChecked":
        return this.hasNoValuesChecked(value, rule);
      case "dateIsBetween":
        return this.dateIsBetween(value, rule);
      case "dateIsNotBetween":
        return !this.dateIsBetween(value, rule);
      case "dateIsBefore":
        return this.dateIsBefore(value, rule);
      case "dateIsAfter":
        return this.dateIsAfter(value, rule);
      case "isWithinXDays":
        return this.dateIsWithinXDays(value, rule);
      case "js":
        return this.javascriptExpression(value, rule);
      default:
        return false;
    }
  }

  private hasValue(value: any): boolean {
    return value != null && value != "";
  }

  private javascriptExpression(value: any, rule: LogicRule): boolean {
    try {
      dispatch("logic_rule_javascript_error", undefined);
      const body = `function( value ){ return ${rule.value} }`;
      const wrap = (s: string) => "{ return " + body + " };";
      const func = new Function(wrap(body));
      const result = func.call(null).call(null, value);
      return Boolean(result);
    } catch (ex) {
      dispatch("logic_rule_javascript_error", ex);
      return false;
    }
  }

  private dateIsBetween(value: any, rule: LogicRule): boolean {
    const min = rule.value.min;
    const max = rule.value.max;
    if (min && max) {
      return value >= min && value <= max;
    }
    if (min) {
      return value >= min;
    }
    if (max) {
      return value <= max;
    }
    return false;
  }

  private dateIsAfter(value: any, rule: LogicRule): boolean {
    return value > rule.value;
  }

  private dateIsWithinXDays(value: any, rule: LogicRule): boolean {
    try {
      const days = parseInt(rule.value, 10);
      const valueAsDate = DateTime.fromMillis(value);
      const diff = parseInt(valueAsDate.diffNow("days").days.toFixed(0), 10);
      return diff <= days && diff >= 0;
    } catch (ex) {
      return false;
    }
  }

  private dateIsBefore(value: any, rule: LogicRule): boolean {
    return value < rule.value;
  }

  private hasValueChecked(value: Dictionary<string>, rule: LogicRule): boolean {
    return Object.keys(value).includes(rule.value);
  }

  private hasNoValuesChecked(
    value: Dictionary<string>,
    rule: LogicRule
  ): boolean {
    return Object.keys(value).length === 0;
  }

  private isFileExtension(value: any, rule: LogicRule): boolean {
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
    const rules = rule.value.split(",").map((r: string) => {
      return r.replace(" ", "").replace(".", "");
    });
    for (let r of rules) {
      if (r === split[split.length - 1]) {
        return true;
      }
    }
    return false;
  }

  private toLowerCase(value: any) {
    if (!this.hasValue(value)) {
      return "";
    }
    return value.toString().toLowerCase();
  }
}
