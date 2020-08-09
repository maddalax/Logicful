import { Command } from "../../../../infrastructure/event/Commands";
import { Form, Client } from "../models/Form";
import { CommandRequest, Mediator } from "../../../../infrastructure/event/Mediator";
import registry, { Service } from "../../../../Container";
import { Database } from "../../../../infrastructure/persistence/Database";

registry.get<Mediator>(Service.Mediator).register<Form[]>(Command.GetForms, async (command: GetFormsCommand) => {
    const request = {
        RequestItems: {
            'forms': {
                Keys: command.client.forms.map(c => {
                    return {
                        'id': { 'S': c.id },
                        'timestamp': { 'N': c.timestamp.toString() }
                    }
                })
            }
        }
    };
    const db = registry.get<Database>(Service.Database);
    return (await db.forms.batchGet(request)).forms;
});

export class GetFormsCommand extends CommandRequest<Form[]> {
    public command: Command = Command.GetForms;

    constructor(public readonly client: Client) {
        super();
    }
}