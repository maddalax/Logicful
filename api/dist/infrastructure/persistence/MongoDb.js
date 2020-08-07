"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoCollection = void 0;
const Collection_1 = require("./Collection");
const mongodb_1 = require("mongodb");
let db;
class MongoCollection extends Collection_1.Collection {
    insert(item) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.setup();
            yield db.collection(this.table).insertOne(item);
        });
    }
    update(query, item) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.setup();
            yield db.collection(this.table).updateOne(query, item);
        });
    }
    upsert(query, item) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.setup();
            yield db.collection(this.table).updateOne(query, item, { upsert: true });
        });
    }
    find(query) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.setup();
            return yield db.collection(this.table).find(query).toArray();
        });
    }
    findOne(query) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.setup();
            return yield db.collection(this.table).findOne(query);
        });
    }
    setup() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!db) {
                const client = new mongodb_1.MongoClient(this.config.get("database:connection"));
                yield client.connect();
                db = client.db(this.config.get("database:database"));
            }
        });
    }
}
exports.MongoCollection = MongoCollection;
