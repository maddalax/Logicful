import registry, { Service } from "./Container";
import { Mediator } from "./infrastructure/event/Mediator";
import { NormalizeAddressCommand } from "./application/features/forms/fields/address/commands/NormalizeAddressCommand";

async function run() {
  const data = {
    "address1" : "8045 metcalf ave",
    "city" : "op",
    "state" : "KS",
    "zip" : "66204"
}
  const result = await registry
  .get<Mediator>(Service.Mediator).execute(new NormalizeAddressCommand(data));
  console.log(result);
}

run();