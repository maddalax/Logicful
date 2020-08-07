"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleLogger = exports.Logger = void 0;
const inversify_1 = require("inversify");
let Logger = class Logger {
};
Logger = __decorate([
    inversify_1.injectable()
], Logger);
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
