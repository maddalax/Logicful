import { ConfigProvider } from "../../config/ConfigProvider";
import { DynamoDB } from 'aws-sdk';

export abstract class Collection<T> {

    constructor(protected readonly table : string,
        protected readonly config : ConfigProvider, protected readonly createTable : DynamoDB.CreateTableInput) {}

    abstract async insert(item : T) : Promise<void>;
    abstract async update(query : Partial<T>, item : T) : Promise<void>;
    abstract async upsert(query : Partial<T>, item : T) : Promise<void>;
    abstract async findOne(query : Partial<T>) : Promise<T>;
    abstract async find(query : Partial<T>) : Promise<T[]>;
    abstract async setup(config : ConfigProvider, );
}
