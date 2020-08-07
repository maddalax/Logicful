"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleLogger = exports.Logger = void 0;
class Logger {
}
exports.Logger = Logger;
class ConsoleLogger extends Logger {
    log(object) {
        console.log(JSON.stringify(object, null, 2));
    }
    logError(object) {
        console.error(JSON.stringify(object, null, 2));
    }
    logWarning(object) {
        console.warn(JSON.stringify(object, null, 2));
    }
}
exports.ConsoleLogger = ConsoleLogger;
