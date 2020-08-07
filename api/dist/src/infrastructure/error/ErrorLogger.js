"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Container_1 = __importDefault(require("../../Container"));
const Mediator_1 = require("../event/Mediator");
const Commands_1 = require("../event/Commands");
const Logger_1 = require("../logging/Logger");
Container_1.default.get(Mediator_1.Mediator).listen(Commands_1.Command.ApplicationError, async (command) => {
    const error = command.error;
    Container_1.default.get(Logger_1.Logger).logError({
        message: error.stack,
        ...command.data
    });
});
