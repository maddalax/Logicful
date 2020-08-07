import { Collection } from "./Collection";
import { User } from "../../application/features/user/models/User";
import { ConfigProvider } from "../../config/ConfigProvider";
import { DynamoCollection } from "./DynamoDb";
import { Client, FormSubmission, Form } from "../../application/features/forms/models/Form";

export class Database {

    public readonly users: Collection<User>
    public readonly clients: Collection<Client>
    public readonly submissions: Collection<FormSubmission>
    public readonly forms: Collection<Form>


    constructor(config: ConfigProvider) {
        this.users = new DynamoCollection<User>("users", config, {
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

        this.clients = new DynamoCollection<Client>("clients", config, {
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

        this.submissions = new DynamoCollection<FormSubmission>("form_submissions", config, {
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

        this.forms = new DynamoCollection<Form>("forms", config, {
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
        })
    }

}