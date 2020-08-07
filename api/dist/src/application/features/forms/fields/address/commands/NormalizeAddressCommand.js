"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NormalizeAddressCommand = void 0;
const Mediator_1 = require("infrastructure/event/Mediator");
const Commands_1 = require("infrastructure/event/Commands");
const Container_1 = __importDefault(require("Container"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const Logger_1 = require("infrastructure/logging/Logger");
const ConfigProvider_1 = require("config/ConfigProvider");
Container_1.default.get(Mediator_1.Mediator).register(Commands_1.Command.NormalizeAddress, async (command) => {
    const address = command.address;
    const config = Container_1.default.get(ConfigProvider_1.ConfigProvider);
    const url = config.get("smartystreets:url");
    const key = config.get("smartystreets:key");
    const token = config.get("smartystreets:token");
    const result = await node_fetch_1.default(`${url}?auth-id=${key}&auth-token=${token}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify([{
                street: address.address1,
                city: address.city,
                state: address.state,
                zipcode: address.zip
            }])
    });
    const body = await result.json();
    if (!Array.isArray(body)) {
        Container_1.default.get(Logger_1.Logger).logError({
            message: "Invalid response from smartystreets. Response was not an array.",
            body,
            request: command.address
        });
        return command.address;
    }
    if (body.length === 0) {
        return command.address;
    }
    try {
        const components = body[0].components;
        const meta = body[0].metadata;
        return {
            address1: `${components.primary_number} ${components.street_name} ${components.street_suffix}`,
            city: components.city_name ?? components.default_city_name,
            address2: command.address.address2,
            zip: components.zipcode,
            state: components.state_abbreviation,
            lat: meta.latitude,
            long: meta.longitude,
            timezone: meta.time_zone
        };
    }
    catch (ex) {
        Container_1.default.get(Logger_1.Logger).logError({
            message: "Failed to parse smartystreets response.",
            body,
            request: command.address
        });
    }
    return command.address;
});
class NormalizeAddressCommand extends Mediator_1.CommandRequest {
    constructor(address) {
        super();
        this.address = address;
        this.command = Commands_1.Command.NormalizeAddress;
    }
}
exports.NormalizeAddressCommand = NormalizeAddressCommand;
