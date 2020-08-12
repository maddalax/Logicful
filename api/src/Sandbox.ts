import registry, { Service } from "./Container";
import { Database } from "./infrastructure/persistence/Database";
import { v4 as uuidv4 } from 'uuid';
import { Form, Client, FormSubmission } from "./application/features/forms/models/Form";
import { Mediator } from "./infrastructure/event/Mediator";
import { StoreJsonCommand } from "./application/features/files/commands/StoreJsonCommand";
import { Status } from "./application/models/Status";

async function run() {
  const mediator = registry.get<Mediator>(Service.Mediator);
  const result = await mediator.execute(new StoreJsonCommand({
    hello : 'test3'
  }, "maddox", Status.Draft, 'k5kzuyq0jat2ytwc7mgf7toyg8zrjob'))
  console.log(result);
}

run().catch(err => {
  console.error(err);
});
