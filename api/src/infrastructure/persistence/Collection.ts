import { ConfigProvider } from "../../config/ConfigProvider";
import { DynamoDB } from 'aws-sdk';

export abstract class Collection {

    constructor(protected readonly table : string,
        protected readonly config : ConfigProvider,
        protected readonly createTable : DynamoDB.CreateTableInput) {}

    abstract async insert(item : any) : Promise<void>;
    abstract async batchGet(query : Partial<DynamoDB.BatchGetItemInput>) : Promise<{[key : string] : any[]}>;
    abstract async update(update : DynamoDB.Types.UpdateItemInput): Promise<any>;
    abstract async findOne(query : Partial<DynamoDB.DocumentClient.QueryInput>) : Promise<any>;
    abstract async find(query : DynamoDB.DocumentClient.QueryInput) : Promise<any[]>;
    abstract async setup(config : ConfigProvider);
    abstract async transactWrite(params: DynamoDB.Types.TransactWriteItemsInput) : Promise<any>
}
