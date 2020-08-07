import { assertNotEmpty } from "../infrastructure/guard/Guards";

let config = {};

export class ConfigProvider {

    public get(key : string) {
        config = {
            "mongodb:connection" : "mongodb://localhost:27017",
            "mongodb:database" : "LowCode",
            "smartystreets:url" : "https://us-street.api.smartystreets.com/street-address",
            "smartystreets:key" : "666b1a30-4f4a-735c-8c34-1f957916e7aa",
            "smartystreets:token" : "63CwZKLIeojla8vjz43O"
        };
        assertNotEmpty(config, 'config');
        return config[key];
    }

}