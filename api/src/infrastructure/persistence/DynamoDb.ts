import { DynamoDB } from 'aws-sdk';
import { Collection } from './Collection';
import { BatchGetItemInput } from 'aws-sdk/clients/dynamodb';

let client;
let db: DynamoDB;

export class DynamoCollection extends Collection {

    batchGet(query: DynamoDB.BatchGetItemInput): Promise<{[key : string] : any[]}> {
        return new Promise((resolve, reject) => {
            this.getDb().batchGetItem(query, (err, data) => {
                if(err) {
                    return reject(err);
                }
                const keys = Object.keys(data.Responses);
                const result = {};
                keys.forEach(k => {
                    result[k] = data.Responses[k];
                });
                return resolve(result);
            })
        })
    }

    async insert(item: any): Promise<void> {
        await this.setup();
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
        })
    }

    async update(update : DynamoDB.Types.UpdateItemInput): Promise<any> {
        await this.setup();
        update.TableName = this.table;
        return new Promise((resolve, reject) => {
            this.getDb().updateItem(update, (err, data) => {
                if (err) {
                    return reject(err);
                }
                resolve(data);
            });
        })
    }

    async findOne(query: DynamoDB.DocumentClient.QueryInput): Promise<any> {
        await this.setup();
        query.TableName = this.table;
        return new Promise((resolve, reject) => {
            this.getDb().query(query, (err, data) => {
                if (err) {
                    return reject(err);
                }
                resolve(data.Items?.[0] as any ?? undefined);
            });
        })
    }

    async find(query: DynamoDB.DocumentClient.QueryInput): Promise<any[]> {
        await this.setup();
        query.TableName = this.table;
        return new Promise((resolve, reject) => {
            this.getDb().query(query, (err, data) => {
                if (err) {
                    return reject(err);
                }
                resolve(data.Items as any ?? []);
            });
        })
    }

    getClient(): DynamoDB.DocumentClient {
        if (client) {
            return client;
        }
        client = new DynamoDB.DocumentClient({
            endpoint: this.config.get("database:connection"),
            region: this.config.get("database:region")
        });
        return client;
    }

    getDb(): DynamoDB {
        if (db) {
            return db;
        }
        db = new DynamoDB({
            region: this.config.get("database:region")
        });
        return db;
    }

    async setup() {
        if (!db) {
            db = new DynamoDB({
                region: this.config.get("database:region")
            });
        }
    }

    async transactWrite(params: DynamoDB.Types.TransactWriteItemsInput): Promise<any> {
        await this.setup();
        return await this.getDb().transactWriteItems(params).promise();
    }
}