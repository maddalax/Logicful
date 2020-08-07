"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NormalizeAddressCommand_1 = require("application/features/forms/fields/address/commands/NormalizeAddressCommand");
const Mediator_1 = require("infrastructure/event/Mediator");
const Container_1 = __importDefault(require("Container"));
module.exports.get = async (event, context) => {
    const data = JSON.parse(event.body);
    const result = await Container_1.default.get(Mediator_1.Mediator).execute(new NormalizeAddressCommand_1.NormalizeAddressCommand(data));
    return {
        statusCode: 200,
        body: result
    };
};
