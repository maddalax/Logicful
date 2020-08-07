import { assertNotEmpty } from "../infrastructure/guard/Guards";

let config = {};

export class ConfigProvider {

    public get(key : string) {
        config = {
            "smartystreets:url" : "https://us-street.api.smartystreets.com/street-address",
            "smartystreets:key" : "666b1a30-4f4a-735c-8c34-1f957916e7aa",
            "smartystreets:token" : "63CwZKLIeojla8vjz43O",
            "database:provider" : "dynamodb",
            "database:database" : "LowCode",
            "database:connection" : "http://localhost:8000",
            "database:region" : "localhost"
        };
        assertNotEmpty(config, 'config');
        return config[key];
    }

}