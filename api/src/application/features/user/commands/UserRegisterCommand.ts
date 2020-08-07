import { CommandRequest, Mediator } from "../../../../infrastructure/event/Mediator";
import { Command } from "../../../../infrastructure/event/Commands";
import provider from "../../../../Container";
import { MongoService } from "../../../../infrastructure/persistence/mongo/MongoService";

provider.get(Mediator).register<string>(Command.UserRegister, async () => {
    const db = provider.get(MongoService);
    const id = await db.users.insertOne({
        username : 'test',
        email : 'test@test.com'
    });
    throw new Error("Test");
});

export class UserRegisterCommand extends CommandRequest<string> {
    public command: Command = Command.UserRegister;

    constructor(public readonly email : string,
        public readonly password : string,
        public readonly username : string) {
        super();
    }
}