import registry, { Service } from "./Container";
import { Mediator } from "./infrastructure/event/Mediator";
import { NormalizeAddressCommand } from "./application/features/forms/fields/address/commands/NormalizeAddressCommand";
import { Database } from "./infrastructure/persistence/Database";

async function run() {
  const data = {
    "address1" : "8045 metcalf ave",
    "city" : "op",
    "state" : "KS",
    "zip" : "66204"
}
  const db = await registry
  .get<Database>(Service.Database);

  await db.users.insert({
    email : 'jm2@madev.me',
    username : 'test',
    id : 'my_id_2'
  })
}

run();