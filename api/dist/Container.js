"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registry = exports.ServiceRegistry = exports.Service = void 0;
const bottlejs_1 = __importDefault(require("bottlejs"));
const ConfigProvider_1 = require("./config/ConfigProvider");
const Mediator_1 = require("./infrastructure/event/Mediator");
const Logger_1 = require("./infrastructure/logging/Logger");
const Database_1 = require("./infrastructure/persistence/Database");
const bottle = new bottlejs_1.default();
var Service;
(function (Service) {
    Service[Service["Database"] = 0] = "Database";
    Service[Service["Config"] = 1] = "Config";
    Service[Service["Mediator"] = 2] = "Mediator";
    Service[Service["Logger"] = 3] = "Logger";
})(Service = exports.Service || (exports.Service = {}));
class ServiceRegistry {
    get(service) {
        const key = Service[service].toString();
        return bottle.container[key];
    }
    register(service, implementation, ...dependencies) {
        const key = Service[service].toString();
        const names = dependencies.map(w => Service[w].toString());
        bottle.service(key, implementation, ...names);
    }
}
exports.ServiceRegistry = ServiceRegistry;
exports.registry = new ServiceRegistry();
exports.registry.register(Service.Config, ConfigProvider_1.ConfigProvider);
exports.registry.register(Service.Mediator, Mediator_1.Mediator);
exports.registry.register(Service.Logger, Logger_1.ConsoleLogger);
exports.registry.register(Service.Database, Database_1.Database, Service.Config);
exports.default = exports.registry;
