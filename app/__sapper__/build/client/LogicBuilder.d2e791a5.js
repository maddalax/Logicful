import { ag as identity } from './client.a93cf518.js';
import { f as formStore } from './FileUpload.6e1eb6f3.js';
import { n as nullOrEmpty, g as isLabelValue } from './fuse.esm.4840cecb.js';

function cubicOut(t) {
    const f = t - 1.0;
    return f * f * f + 1.0;
}

function fade(node, { delay = 0, duration = 400, easing = identity }) {
    const o = +getComputedStyle(node).opacity;
    return {
        delay,
        duration,
        easing,
        css: t => `opacity: ${t * o}`
    };
}
function slide(node, { delay = 0, duration = 400, easing = cubicOut }) {
    const style = getComputedStyle(node);
    const opacity = +style.opacity;
    const height = parseFloat(style.height);
    const padding_top = parseFloat(style.paddingTop);
    const padding_bottom = parseFloat(style.paddingBottom);
    const margin_top = parseFloat(style.marginTop);
    const margin_bottom = parseFloat(style.marginBottom);
    const border_top_width = parseFloat(style.borderTopWidth);
    const border_bottom_width = parseFloat(style.borderBottomWidth);
    return {
        delay,
        duration,
        easing,
        css: t => `overflow: hidden;` +
            `opacity: ${Math.min(t * 20, 1) * opacity};` +
            `height: ${t * height}px;` +
            `padding-top: ${t * padding_top}px;` +
            `padding-bottom: ${t * padding_bottom}px;` +
            `margin-top: ${t * margin_top}px;` +
            `margin-bottom: ${t * margin_bottom}px;` +
            `border-top-width: ${t * border_top_width}px;` +
            `border-bottom-width: ${t * border_bottom_width}px;`
    };
}

class LogicBuilder {
    evaluate(field) {
        if (!field.logic) {
            return true;
        }
        if (!field.logic.rules) {
            return true;
        }
        const rules = field.logic.rules.filter(r => {
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
            return '';
        }
        return value.toString().toLowerCase();
    }
}

export { LogicBuilder as L, fade as f, slide as s };
