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
let client;
let db;
class DynamoCollection extends Collection_1.Collection {
    batchGet(query) {
        return new Promise((resolve, reject) => {
            this.getDb().batchGetItem(query, (err, data) => {
                if (err) {
                    return reject(err);
                }
                const keys = Object.keys(data.Responses);
                const result = {};
                keys.forEach(k => {
                    result[k] = data.Responses[k];
                });
                return resolve(result);
            });
        });
    }
    insert(item) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.setup();
            return new Promise((resolve, reject) => {
                this.getClient().put({
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
    update(update) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.setup();
            update.TableName = this.table;
            return new Promise((resolve, reject) => {
                this.getDb().updateItem(update, (err, data) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(data);
                });
            });
        });
    }
    findOne(query) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.setup();
            query.TableName = this.table;
            return new Promise((resolve, reject) => {
                this.getDb().query(query, (err, data) => {
                    var _a, _b;
                    if (err) {
                        return reject(err);
                    }
                    resolve((_b = (_a = data.Items) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : undefined);
                });
            });
        });
    }
    find(query) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.setup();
            query.TableName = this.table;
            return new Promise((resolve, reject) => {
                this.getDb().query(query, (err, data) => {
                    var _a;
                    if (err) {
                        return reject(err);
                    }
                    resolve((_a = data.Items) !== null && _a !== void 0 ? _a : []);
                });
            });
        });
    }
    getClient() {
        if (client) {
            return client;
        }
        client = new aws_sdk_1.DynamoDB.DocumentClient({
            endpoint: this.config.get("database:connection"),
            region: this.config.get("database:region")
        });
        return client;
    }
    getDb() {
        if (db) {
            return db;
        }
        db = new aws_sdk_1.DynamoDB({
            region: this.config.get("database:region")
        });
        return db;
    }
    setup() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!db) {
                db = new aws_sdk_1.DynamoDB({
                    region: this.config.get("database:region")
                });
            }
        });
    }
    transactWrite(params) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.setup();
            return yield this.getDb().transactWriteItems(params).promise();
        });
    }
}
exports.DynamoCollection = DynamoCollection;
