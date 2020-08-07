"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamoCollection = void 0;
const aws_sdk_1 = require("aws-sdk");
const Collection_1 = require("./Collection");
const client = new aws_sdk_1.DynamoDB.DocumentClient({
    endpoint: 'http://localhost:8000',
    region: 'us-east-1'
});
let db;
class DynamoCollection extends Collection_1.Collection {
    insert(item) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.setup();
            return new Promise((resolve, reject) => {
                client.put({
                    TableName: this.table,
                    Item: item
                }, (err, data) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve();
                });
            });
        });
    }
    update(query, item) {
        throw new Error("Method not implemented.");
    }
    upsert(query, item) {
        throw new Error("Method not implemented.");
    }
    findOne(query) {
        throw new Error("Method not implemented.");
    }
    find(query) {
        throw new Error("Method not implemented.");
    }
    setup() {
        return __awaiter(this, void 0, void 0, function* () {
            if (db) {
                return db;
            }
            db = new aws_sdk_1.DynamoDB({
                endpoint: this.config.get("database:connection"),
                region: 'us-east-1'
            });
            return new Promise((resolve, reject) => {
                db.createTable(this.createTable, (err, data) => {
                    if (err) {
                        if (err.toString().includes('ResourceInUseException: Cannot create preexisting table')) {
                            return resolve();
                        }
                        return reject(err);
                    }
                    resolve();
                });
            });
        });
    }
}
exports.DynamoCollection = DynamoCollection;
