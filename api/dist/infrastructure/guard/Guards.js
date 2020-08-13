"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertNotNull = exports.assertNotEmpty = void 0;
function assertNotEmpty(value, item) {
    let isEmpty = !value;
    if (value == null) {
        isEmpty = true;
    }
    else if (Array.isArray(value)) {
        isEmpty = value.length === 0;
    }
    else if (typeof value === "object") {
        isEmpty = Object.keys(value).length === 0;
    }
    if (isEmpty) {
        throw new Error(`${item !== null && item !== void 0 ? item : 'value'} was empty. ` + JSON.stringify(value));
    }
}
exports.assertNotEmpty = assertNotEmpty;
function assertNotNull(...values) {
    for (const v of values) {
        if (v == null) {
            throw new Error("Value was null");
        }
    }
}
exports.assertNotNull = assertNotNull;
