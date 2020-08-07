import { Collection } from "./Collection";
import { User } from "../../application/features/user/models/User";
import { ConfigProvider } from "../../config/ConfigProvider";
import { DynamoCollection } from "./DynamoDb";

export class Database {

    public readonly users : Collection<User>

    constructor(config : ConfigProvider) {
        this.users = new DynamoCollection<User>("users", config, {
            TableName : 'users',
            KeySchema : [{
                AttributeName : 'email',
                KeyType : "HASH"
            }],
            ProvisionedThroughput : {
                ReadCapacityUnits : 5,
                WriteCapacityUnits : 5
            },
            AttributeDefinitions : [{
                AttributeName: "email",
                AttributeType: "S"
            }]
        })
    }

}