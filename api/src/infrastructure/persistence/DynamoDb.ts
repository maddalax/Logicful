import { DynamoDB } from 'aws-sdk';
import { Collection } from './Collection';

const client = new DynamoDB.DocumentClient({
    endpoint : 'http://localhost:8000',
    region : 'us-east-1'
});

let db;

export class DynamoCollection<T> extends Collection<T> {

    async insert(item: T): Promise<void> {
        await this.setup();
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
        })
    }
    update(query: Partial<T>, item: T): Promise<void> {
        throw new Error("Method not implemented.");
    }
    upsert(query: Partial<T>, item: T): Promise<void> {
        throw new Error("Method not implemented.");
    }
    findOne(query: Partial<T>): Promise<T> {
        throw new Error("Method not implemented.");
    }
    find(query: Partial<T>): Promise<T[]> {
        throw new Error("Method not implemented.");
    }

    async setup() {
        if(db) {
            return db;
        }
        db = new DynamoDB({
            endpoint : this.config.get("database:connection"),
            region : 'us-east-1'
        });
        return new Promise((resolve, reject) => {
            db.createTable(this.createTable, (err, data) => {
                if(err) {
                    if(err.toString().includes('ResourceInUseException: Cannot create preexisting table')) {
                        return resolve();
                    }
                    return reject(err);
                }
                resolve();
            })
        });
    }
}