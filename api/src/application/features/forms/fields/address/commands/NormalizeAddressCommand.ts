import { IAddress } from "../../models/Address";
import fetch from "node-fetch";
import { ConfigProvider } from "../../../../../../config/ConfigProvider";
import { Service } from "../../../../../../Container";
import {
  Mediator,
  CommandRequest,
} from "../../../../../../infrastructure/event/Mediator";
import { Command } from "../../../../../../infrastructure/event/Commands";
import { Logger } from "../../../../../../infrastructure/logging/Logger";
import registry from "../../../../../../Container";

registry
  .get<Mediator>(Service.Mediator)
  .register<IAddress>(
    Command.NormalizeAddress,
    async (command: NormalizeAddressCommand) => {
      const address = command.address;

      const config = registry.get<ConfigProvider>(Service.Config);
      const url = config.get("smartystreets:url");
      const key = config.get("smartystreets:key");
      const token = config.get("smartystreets:token");

      const result = await fetch(`${url}?auth-id=${key}&auth-token=${token}`, {
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
        const body = await result.json();

        if (!Array.isArray(body)) {
          registry.get<Logger>(Service.Logger).logError({
            message:
              "Invalid response from smartystreets. Response was not an array.",
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
          city: components.city_name ?? components.default_city_name,
          address2: command.address.address2,
          zip: components.zipcode,
          state: components.state_abbreviation,
          lat: meta.latitude,
          long: meta.longitude,
          timezone: meta.time_zone,
        };
      } catch (ex) {
        registry.get<Logger>(Service.Logger).logError({
          message: "Failed to parse smartystreets response.",
          request: command.address,
        });
      }

      return command.address;
    }
  );

export class NormalizeAddressCommand extends CommandRequest<IAddress> {
  public command: Command = Command.NormalizeAddress;

  constructor(public readonly address: IAddress) {
    super();
  }
}
