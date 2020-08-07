"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandRequest = exports.Mediator = void 0;
const Commands_1 = require("./Commands");
const Guards_1 = require("../guard/Guards");
const Container_1 = __importStar(require("../../Container"));
class Mediator {
    constructor() {
        this.handlers = {};
        this.listeners = {};
    }
    register(command, handler) {
        return __awaiter(this, void 0, void 0, function* () {
            Guards_1.assertNotNull(command, handler);
            this.handlers[command] = handler;
        });
    }
    listen(command, handler) {
        return __awaiter(this, void 0, void 0, function* () {
            Guards_1.assertNotNull(command, handler);
            if (!this.listeners[command]) {
                this.listeners[command] = [];
            }
            this.listeners[command].push(handler);
        });
    }
    notify(command) {
        return __awaiter(this, void 0, void 0, function* () {
            const listeners = this.listeners[command.command];
            if (!listeners) {
                throw new Error("No listener found for " + Commands_1.Command[command.command]);
            }
            Container_1.default.get(Container_1.Service.Logger).log(Object.assign(Object.assign({ message: Commands_1.Command[command.command] }, command), { listeners: listeners.length }));
            listeners.forEach(l => {
                l(command);
            });
        });
    }
    execute(command) {
        return __awaiter(this, void 0, void 0, function* () {
            Container_1.default.get(Container_1.Service.Logger).log(Object.assign({ message: Commands_1.Command[command.command] }, command));
            const handler = this.handlers[command.command];
            if (!handler) {
                throw new Error("No handler found for " + command.command);
            }
            return yield handler(command);
        });
    }
}
exports.Mediator = Mediator;
class CommandRequest {
}
exports.CommandRequest = CommandRequest;
