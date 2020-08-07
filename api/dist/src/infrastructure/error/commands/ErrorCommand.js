"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorCommand = void 0;
const Mediator_1 = require("../../event/Mediator");
const Commands_1 = require("../../event/Commands");
class ErrorCommand extends Mediator_1.CommandRequest {
    constructor(error, data) {
        super();
        this.error = error;
        this.data = data;
        this.command = Commands_1.Command.ApplicationError;
    }
}
exports.ErrorCommand = ErrorCommand;
