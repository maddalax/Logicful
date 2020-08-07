"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRegisterCommand = void 0;
const Mediator_1 = require("../../../../infrastructure/event/Mediator");
const Commands_1 = require("../../../../infrastructure/event/Commands");
const Container_1 = __importDefault(require("../../../../Container"));
const MongoService_1 = require("../../../../infrastructure/persistence/mongo/MongoService");
Container_1.default.get(Mediator_1.Mediator).register(Commands_1.Command.UserRegister, async () => {
    const db = Container_1.default.get(MongoService_1.MongoService);
    const id = await db.users.insertOne({
        username: 'test',
        email: 'test@test.com'
    });
    throw new Error("Test");
});
class UserRegisterCommand extends Mediator_1.CommandRequest {
    constructor(email, password, username) {
        super();
        this.email = email;
        this.password = password;
        this.username = username;
        this.command = Commands_1.Command.UserRegister;
    }
}
exports.UserRegisterCommand = UserRegisterCommand;
