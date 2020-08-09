import { CommandRequest, Mediator } from "../../../infrastructure/event/Mediator";
import { Client, Form } from "../forms/models/Form";
import { Command } from "../../../infrastructure/event/Commands";
import registry, { Service } from "../../../Container";
import { Database } from "../../../infrastructure/persistence/Database";

registry.get<Mediator>(Service.Mediator).register<Client>(Command.GetClient, async (command: GetClientCommand) => {
    const db = registry.get<Database>(Service.Database);
    return await db.clients.findOne({
        TableName: null,
        KeyConditionExpression: "#UserId = :UserId",
        ExpressionAttributeNames: {
            "#UserId": "name"
        },
        ExpressionAttributeValues: {
            ":UserId": command.name
        }
    });
});

export class GetClientCommand extends CommandRequest<Client> {
    public command: Command = Command.GetClient;

    constructor(public name : string) {
        super();
    }
}