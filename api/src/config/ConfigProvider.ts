import { injectable } from "inversify";
import { assertNotEmpty } from "../infrastructure/guard/Guards";

let config = {};

@injectable()
export class ConfigProvider {

    public async setup() {
        config = {
            "mongodb:connection" : "mongodb://localhost:27017",
            "mongodb:database" : "LowCode",
            "smartystreets:url" : "https://us-street.api.smartystreets.com/street-address",
            "smartystreets:key" : "666b1a30-4f4a-735c-8c34-1f957916e7aa",
            "smartystreets:token" : "63CwZKLIeojla8vjz43O"
        };
    }

    public get(key : string) {
        assertNotEmpty(config);
        return config[key];
    }

}