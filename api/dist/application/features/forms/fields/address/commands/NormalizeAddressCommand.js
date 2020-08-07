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
exports.NormalizeAddressCommand = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const Container_1 = require("../../../../../../Container");
const Mediator_1 = require("../../../../../../infrastructure/event/Mediator");
const Commands_1 = require("../../../../../../infrastructure/event/Commands");
const Container_2 = __importDefault(require("../../../../../../Container"));
Container_2.default
    .get(Container_1.Service.Mediator)
    .register(Commands_1.Command.NormalizeAddress, (command) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const address = command.address;
    const config = Container_2.default.get(Container_1.Service.Config);
    const url = config.get("smartystreets:url");
    const key = config.get("smartystreets:key");
    const token = config.get("smartystreets:token");
    const result = yield node_fetch_1.default(`${url}?auth-id=${key}&auth-token=${token}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify([
            {
                street: address.address1,
                city: address.city,
                state: address.state,
                zipcode: address.zip,
            },
        ]),
    });
    try {
        const body = yield result.json();
        if (!Array.isArray(body)) {
            Container_2.default.get(Container_1.Service.Logger).logError({
                message: "Invalid response from smartystreets. Response was not an array.",
                body,
                request: command.address,
            });
            return command.address;
        }
        if (body.length === 0) {
            return command.address;
        }
        const components = body[0].components;
        const meta = body[0].metadata;
        return {
            address1: `${components.primary_number} ${components.street_name} ${components.street_suffix}`,
            city: (_a = components.city_name) !== null && _a !== void 0 ? _a : components.default_city_name,
            address2: command.address.address2,
            zip: components.zipcode,
            state: components.state_abbreviation,
            lat: meta.latitude,
            long: meta.longitude,
            timezone: meta.time_zone,
        };
    }
    catch (ex) {
        Container_2.default.get(Container_1.Service.Logger).logError({
            message: "Failed to parse smartystreets response.",
            request: command.address,
        });
    }
    return command.address;
}));
class NormalizeAddressCommand extends Mediator_1.CommandRequest {
    constructor(address) {
        super();
        this.address = address;
        this.command = Commands_1.Command.NormalizeAddress;
    }
}
exports.NormalizeAddressCommand = NormalizeAddressCommand;
