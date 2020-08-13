import { Collection } from "./Collection";
import { ConfigProvider } from "../../config/ConfigProvider";
import { DynamoCollection } from "./DynamoDb";

export class Database {

    public readonly users: Collection
    public readonly clients: Collection
    public readonly submissions: Collection
    public readonly forms: Collection
    public readonly optionSets: Collection

    constructor(config: ConfigProvider) {
        this.users = new DynamoCollection("users", config, {
            TableName: 'users',
            KeySchema: [{
                AttributeName: 'email',
                KeyType: "HASH"
            }],
            ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 2
            },
            AttributeDefinitions: [{
                AttributeName: "email",
                AttributeType: "S"
            }]
        })

        this.clients = new DynamoCollection("clients", config, {
            TableName: "clients",
            KeySchema: [{
                AttributeName: 'name',
                KeyType: "HASH"
            }],
            ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5
            },
            AttributeDefinitions: [{
                AttributeName: "name",
                AttributeType: "S"
            }]
        })

        this.submissions = new DynamoCollection("form_submissions", config, {
            TableName: "form_submissions",
            KeySchema: [{
                AttributeName: 'id',
                KeyType: "HASH"
            }, {
                AttributeName : 'timestamp',
                KeyType : 'RANGE'
            }],
            ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5
            },
            AttributeDefinitions: [{
                AttributeName: "id",
                AttributeType: "S"
            }, {
                AttributeName: "timestamp",
                AttributeType: "N"
            }]
        })

        this.forms = new DynamoCollection("forms", config, {
            TableName: "forms",
            KeySchema: [{
                AttributeName: 'id',
                KeyType: "HASH"
            }, {
                AttributeName : 'timestamp',
                KeyType : 'RANGE'
            }],
            ProvisionedThroughput: {
                ReadCapacityUnits: 2,
                WriteCapacityUnits: 2
            },
            AttributeDefinitions: [{
                AttributeName: "id",
                AttributeType: "S"
            }, {
                AttributeName: "timestamp",
                AttributeType: "N"
            }]
        });

        this.optionSets = new DynamoCollection("option_sets", config, {
            TableName: "option_sets",
            KeySchema: [{
                AttributeName: 'id',
                KeyType: "HASH"
            }],
            ProvisionedThroughput: {
                ReadCapacityUnits: 1,
                WriteCapacityUnits: 1
            },
            AttributeDefinitions: [{
                AttributeName: "id",
                AttributeType: "S"
            }]
        });
    }

}