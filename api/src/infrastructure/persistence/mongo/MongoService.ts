import { injectable, inject } from "inversify";
import { MongoClient, Db, Collection } from 'mongodb';
import { User } from "../../../application/features/user/models/User";
import { ConfigProvider } from "../../../config/ConfigProvider";

@injectable()
export class MongoService {

    private client : MongoClient;
    private database : Db;

    public users : Collection<User>

    constructor(@inject(ConfigProvider) private readonly provider : ConfigProvider) {
        this.client = new MongoClient(provider.get("mongodb:connection"));
    }

    public async connect() {
        await this.client.connect();
        this.database = this.client.db(this.provider.get("mongodb:database"));
        this.users = this.database.collection("users");
    }
}