"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigProvider = void 0;
const Guards_1 = require("../infrastructure/guard/Guards");
let config = {};
class ConfigProvider {
    get(key) {
        config = {
            "smartystreets:url": "https://us-street.api.smartystreets.com/street-address",
            "smartystreets:key": "666b1a30-4f4a-735c-8c34-1f957916e7aa",
            "smartystreets:token": "63CwZKLIeojla8vjz43O",
            "database:provider": "dynamodb",
            "database:database": "LowCode",
            "database:connection": "http://localhost:8000",
        };
        Guards_1.assertNotEmpty(config, 'config');
        return config[key];
    }
}
exports.ConfigProvider = ConfigProvider;
