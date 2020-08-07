import { Service } from "../../Container";
import { Mediator } from "../../infrastructure/event/Mediator";
import { NormalizeAddressCommand } from "../../application/features/forms/fields/address/commands/NormalizeAddressCommand";
import registry from '../../Container';

export async function validateAddress(event, context) {
    const data = JSON.parse(event.body);
    const result = await registry
      .get<Mediator>(Service.Mediator).execute(new NormalizeAddressCommand(data));
    return {
      statusCode : 200,
      body : JSON.stringify(result)
    }
  }