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
                WriteCapacityUnits: 5
            },
            AttributeDefinitions: [{
                    AttributeName: "email",
                    AttributeType: "S"
                }]
        });
    }
}
exports.Database = Database;
