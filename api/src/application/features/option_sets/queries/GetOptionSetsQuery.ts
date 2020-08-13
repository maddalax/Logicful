import {CommandRequest, Mediator} from "../../../../infrastructure/event/Mediator";
import {Command} from "../../../../infrastructure/event/Commands";
import registry, {Service} from "../../../../Container";
import {Database} from "../../../../infrastructure/persistence/Database";
import {OptionSet} from "../models/OptionSet";

registry.get<Mediator>(Service.Mediator).register<OptionSet[]>(Command.GetOptionSets, async (command: GetOptionSetsQuery) => {
    const db = registry.get<Database>(Service.Database);
    const request = {
        "TableName": "clients",
        "ScanIndexForward": false,
        "ConsistentRead": false,
        "KeyConditionExpression": "#20e31 = :20e31",
        "ProjectionExpression": "#20e30",
        "ExpressionAttributeValues": {
            ":20e31": {
                "S": command.client
            }
        },
        "ExpressionAttributeNames": {
            "#20e30": "option_sets",
            "#20e31": "name"
        }
    }
    const setIds : string[] = (await db.clients.findOne(request)).option_sets.SS;
    const results = await db.optionSets.batchGet({
        RequestItems: {
            ["option_sets"]: {
                "Keys": setIds.map(s => {
                    return {
                        "id": {"S": s }
                    }
                })
            }
        }
    });
    return results.option_sets.map(item => {
        return {
            name : item.name?.S,
            id : item.id?.S,
            value : item.value?.S,
            type : item.type?.S
        }
    });
});


export class GetOptionSetsQuery extends CommandRequest<OptionSet[]> {

    constructor(public readonly client: string) {
        super();
    }

    command: Command = Command.GetOptionSets;
}