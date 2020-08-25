import type {LogicRule} from "../models/LogicBuilder";
import type {IField} from "../models/IField";
import formStore from "../store/FormStore";
import { nullOrEmpty } from "util/Compare";

export class LogicBuilder {

    evaluate(field : IField) : boolean {
        if(!field.logic) {
            return true;
        }
        if(!field.logic.rules) {
            return true;
        }

        const rules = field.logic.rules.filter(r => {
            if(nullOrEmpty(r.field) || nullOrEmpty(r.condition)) {
                return false;
            }
            return true;
        });

        if(rules.length === 0) {
            return true;
        }

        if (field.logic.action === "show-any-match") {
            for (let rule of rules) {
                const fieldTargetValue = formStore.getValue(rule.field);
                if(fieldTargetValue == null) {
                    continue;
                }
                if(this.evaluateCondition(rule, fieldTargetValue)) {
                    return true;
                }
            }
            return false;
        }

        if (field.logic.action === "show-all-match") {
            for (let rule of rules) {
                const fieldTargetValue = formStore.getValue(rule.field);
                if(fieldTargetValue == null) {
                    return false;
                }
                if(!this.evaluateCondition(rule, fieldTargetValue)) {
                    return false;
                }
            }
            return true;
        }

        if (field.logic.action === "hide-all-match") {
            for (let rule of rules) {
                const fieldTargetValue = formStore.getValue(rule.field);
                if(fieldTargetValue == null) {
                    return true;
                }
                if(!this.evaluateCondition(rule, fieldTargetValue)) {
                    return true;
                }
            }
            return false;
        }

        if (field.logic.action === "hide-any-match") {
            for (let rule of rules) {
                const fieldTargetValue = formStore.getValue(rule.field);
                if(fieldTargetValue == null) {
                    continue;
                }
                if(this.evaluateCondition(rule, fieldTargetValue)) {
                    return false;
                }
            }
            return true;
        }

        return false;
    }

    private evaluateCondition(rule : LogicRule, value : any) : boolean {
        switch (rule.condition) {
            case "contains":
                return value?.toString()?.includes(rule.value?.toString())
            case "startsWith":
                return value?.toString()?.startsWith(rule.value?.toString())
            case "endsWith":
                return value?.toString()?.endsWith(rule.value?.toString())
            case "eq":
                return value?.toString() == rule.value?.toString()
            case "gt":
                return parseFloat(value) > parseFloat(rule.value)
            case "lt":
                return parseFloat(value) < parseFloat(rule.value)
            case "lte":
                return parseFloat(value) <= parseFloat(rule.value)
            case "gte":
                return parseFloat(value) >= parseFloat(rule.value)
            case "hasValue":
                return value != null && value != ""
            case "isTrue":
                return value != null && value == true
            case "isFalse":
                return value != null && value == false
            default:
                return false;
        }
    }

}