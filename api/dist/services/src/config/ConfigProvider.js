"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigProvider = void 0;
const inversify_1 = require("inversify");
const Guards_1 = require("../infrastructure/guard/Guards");
const crypto_1 = __importDefault(require("crypto"));
const node_fetch_1 = __importDefault(require("node-fetch"));
let config = {};
let ConfigProvider = class ConfigProvider {
    async setup() {
        if (process.env.NODE_ENV === 'development') {
            config = {
                "mongodb:connection": "mongodb://localhost:27017",
                "mongodb:database": "LowCode",
                "smartystreets:url": "https://us-street.api.smartystreets.com/street-address",
                "smartystreets:key": "666b1a30-4f4a-735c-8c34-1f957916e7aa",
                "smartystreets:token": "63CwZKLIeojla8vjz43O"
            };
        }
        else {
            const response = await node_fetch_1.default(process.env.CONFIG_ENDPOINT);
            const { token } = await response.json();
            config = JSON.parse(this.decrypt(token));
        }
    }
    decrypt(text) {
        var decipher = crypto_1.default.createDecipher('aes-256-cbc', process.env.CONFIG_TOKEN);
        var dec = decipher.update(text, 'hex', 'utf8');
        dec += decipher.final('utf8');
        return dec;
    }
    get(key) {
        Guards_1.assertNotEmpty(config);
        return config[key];
    }
};
ConfigProvider = __decorate([
    inversify_1.injectable()
], ConfigProvider);
exports.ConfigProvider = ConfigProvider;
