"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandRequest = exports.Mediator = void 0;
const Commands_1 = require("./Commands");
const inversify_1 = require("inversify");
const Logger_1 = require("../logging/Logger");
const Guards_1 = require("../guard/Guards");
let Mediator = class Mediator {
    constructor(logger) {
        this.logger = logger;
        this.handlers = {};
        this.listeners = {};
    }
    async register(command, handler) {
        Guards_1.assertNotNull(command, handler);
        this.handlers[command] = handler;
    }
    async listen(command, handler) {
        Guards_1.assertNotNull(command, handler);
        if (!this.listeners[command]) {
            this.listeners[command] = [];
        }
        this.listeners[command].push(handler);
    }
    async notify(command) {
        const listeners = this.listeners[command.command];
        if (!listeners) {
            throw new Error("No listener found for " + Commands_1.Command[command.command]);
        }
        this.logger.log({
            message: Commands_1.Command[command.command],
            ...command,
            listeners: listeners.length
        });
        listeners.forEach(l => {
            l(command);
        });
    }
    async execute(command) {
        this.logger.log({
            message: Commands_1.Command[command.command],
            ...command
        });
        const handler = this.handlers[command.command];
        if (!handler) {
            throw new Error("No handler found for " + command.command);
        }
        return await handler(command);
    }
};
Mediator = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(Logger_1.Logger)),
    __metadata("design:paramtypes", [Logger_1.Logger])
], Mediator);
exports.Mediator = Mediator;
class CommandRequest {
}
exports.CommandRequest = CommandRequest;
