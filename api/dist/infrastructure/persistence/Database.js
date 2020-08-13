"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const DynamoDb_1 = require("./DynamoDb");
class Database {
    constructor(config) {
        this.users = new DynamoDb_1.DynamoCollection("users", config, {
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
        });
        this.clients = new DynamoDb_1.DynamoCollection("clients", config, {
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
        });
        this.submissions = new DynamoDb_1.DynamoCollection("form_submissions", config, {
            TableName: "form_submissions",
            KeySchema: [{
                    AttributeName: 'id',
                    KeyType: "HASH"
                }, {
                    AttributeName: 'timestamp',
                    KeyType: 'RANGE'
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
        });
        this.forms = new DynamoDb_1.DynamoCollection("forms", config, {
            TableName: "forms",
            KeySchema: [{
                    AttributeName: 'id',
                    KeyType: "HASH"
                }, {
                    AttributeName: 'timestamp',
                    KeyType: 'RANGE'
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
        this.optionSets = new DynamoDb_1.DynamoCollection("option_sets", config, {
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
exports.Database = Database;
