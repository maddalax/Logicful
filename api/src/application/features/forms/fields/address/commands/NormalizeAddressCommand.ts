import { CommandRequest, Mediator } from "infrastructure/event/Mediator";
import { IAddress } from "../../models/Address";
import { Command } from "infrastructure/event/Commands";
import provider from "Container";
import fetch from 'node-fetch'
import { Logger } from "infrastructure/logging/Logger";
import { ConfigProvider } from "config/ConfigProvider";

provider.get(Mediator).register<IAddress>(Command.NormalizeAddress, async (command: NormalizeAddressCommand) => {

    const address = command.address;

    const config = provider.get(ConfigProvider);
    const url = config.get("smartystreets:url");
    const key = config.get("smartystreets:key");
    const token = config.get("smartystreets:token")

    const result = await fetch(`${url}?auth-id=${key}&auth-token=${token}`, {
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
        provider.get(Logger).logError({
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
        }
    } catch (ex) {
        provider.get(Logger).logError({
            message: "Failed to parse smartystreets response.",
            body,
            request: command.address
        });
    }

    return command.address;
})

export class NormalizeAddressCommand extends CommandRequest<IAddress> {
    public command: Command = Command.NormalizeAddress;

    constructor(public readonly address: IAddress) {
        super();
    }
}