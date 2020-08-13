import {CommandRequest, Mediator} from "../../../../infrastructure/event/Mediator";
import {Command} from "../../../../infrastructure/event/Commands";
import registry, {Service} from "../../../../Container";
import {Database} from "../../../../infrastructure/persistence/Database";
import {OptionSet} from "../models/OptionSet";

registry.get<Mediator>(Service.Mediator).register<void>(Command.SetOptionSet, async (command: SetOptionSetCommand) => {
    const db = registry.get<Database>(Service.Database);
    const request = {
        "TransactItems": [
            {
                "Update": {
                    "TableName": "clients",
                    "Key": {
                        "name": {
                            "S": command.client
                        }
                    },
                    "UpdateExpression": " ADD #20e30 :20e30",
                    "ExpressionAttributeValues": {
                        ":20e30": {
                            "SS": [
                                command.set.id
                            ]
                        }
                    },
                    "ExpressionAttributeNames": {
                        "#20e30": "option_sets"
                    }
                }
            },
            {
                "Update": {
                    "TableName": "option_sets",
                    "Key": {
                        "id": {
                            "S": command.set.id
                        }
                    },
                    "UpdateExpression": "SET #c1e70 = :c1e70, #c1e71 = :c1e71, #c1e72 = :c1e72, #c1e73 = if_not_exists(#c1e74,:c1e73)",
                    "ExpressionAttributeValues": {
                        ":c1e70": {
                            "S": command.set.name
                        },
                        ":c1e71": {
                            "N": Date.now().toString()
                        },
                        ":c1e72": {
                            "S": command.set.type
                        },
                        ":c1e73": {
                            "N": Date.now().toString()
                        }
                    },
                    "ExpressionAttributeNames": {
                        "#c1e70": "name",
                        "#c1e71": "lastModified",
                        "#c1e72": "type",
                        "#c1e73": "createdAt",
                        "#c1e74": "createdAt"
                    }
                }
            }
        ]
    }

    await db.optionSets.transactWrite(request);
});

export class SetOptionSetCommand extends CommandRequest<void> {
    command: Command = Command.SetOptionSet;

    constructor(public readonly client : string, public readonly set: OptionSet) {
        super();
    }
}