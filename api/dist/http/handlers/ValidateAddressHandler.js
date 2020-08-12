"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAddress = void 0;
const Container_1 = require("../../Container");
const NormalizeAddressCommand_1 = require("../../application/features/forms/fields/address/commands/NormalizeAddressCommand");
const Container_2 = __importDefault(require("../../Container"));
function validateAddress(event, context) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = JSON.parse(event.body);
        const result = yield Container_2.default
            .get(Container_1.Service.Mediator).execute(new NormalizeAddressCommand_1.NormalizeAddressCommand(data));
        return {
            statusCode: 200,
            body: JSON.stringify(result),
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
        };
    });
}
exports.validateAddress = validateAddress;
