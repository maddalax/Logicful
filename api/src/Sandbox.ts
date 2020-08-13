import registry, { Service } from "./Container";
import { Mediator } from "./infrastructure/event/Mediator";
import {SetOptionSetCommand} from "./application/features/option_sets/commands/SetOptionSetCommand";
import {v4} from 'uuid'
import {GetOptionSetsQuery} from "./application/features/option_sets/queries/GetOptionSetsQuery";

async function run() {
  const mediator = registry.get<Mediator>(Service.Mediator);
  const id = v4();
  console.log(id);
  const results = await mediator.execute(new GetOptionSetsQuery("maddox"));
  console.log(results);
}

run().catch(err => {
  console.error(err);
});
