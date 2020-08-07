"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Collection = void 0;
class Collection {
    constructor(table, config, createTable) {
        this.table = table;
        this.config = config;
        this.createTable = createTable;
    }
}
exports.Collection = Collection;
