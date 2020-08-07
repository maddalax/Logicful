import { DynamoDB } from 'aws-sdk';
import { Collection } from './Collection';
import { BatchGetItemInput } from 'aws-sdk/clients/dynamodb';

let client;
let db: DynamoDB;

export class DynamoCollection<T> extends Collection<T> {

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

    async insert(item: T): Promise<void> {
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

    update(query: Partial<T>, item: T): Promise<void> {
        throw new Error("Method not implemented.");
    }
    upsert(query: Partial<T>, item: T): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async findOne(query: DynamoDB.DocumentClient.QueryInput): Promise<T> {
        await this.setup();
        query.TableName = this.table;
        return new Promise((resolve, reject) => {
            this.getClient().query(query, (err, data) => {
                if (err) {
                    return reject(err);
                }
                resolve(data.Items?.[0] as T ?? undefined);
            });
        })
    }
    find(query: DynamoDB.DocumentClient.QueryInput): Promise<T[]> {
        query.TableName = this.table;
        throw new Error("Method not implemented.");
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
            endpoint: this.config.get("database:connection"),
            region: this.config.get("database:region")
        });
        return db;
    }

    async setup() {
        if (!db) {
            db = new DynamoDB({
                endpoint: this.config.get("database:connection"),
                region: this.config.get("database:region")
            });
        }
        return new Promise((resolve, reject) => {
            db.createTable(this.createTable, (err, data) => {
                if (err) {
                    if (err.toString().includes('ResourceInUseException: Cannot create preexisting table')) {
                        return resolve();
                    }
                    return reject(err);
                }
                resolve();
            })
        });
    }
}