import { Command } from "../Commands";

class EventMediator {

    private handlers = {};

    async register<T>(command : Command, handler: (command: CommandRequest<T>) => Promise<T>) {
        this.handlers[command] = handler;
    }

    async execute<T>(command: CommandRequest<T>): Promise<T> {
        const handler = this.handlers[command.command];
        if (!handler) {
            throw new Error("No handler found for " + command.command);
        }
        return await handler(command);
    }
}

export abstract class CommandRequest<T> {
    public abstract command : Command;
}

export class UserRegisterCommand extends CommandRequest<string> {
    public command: Command = Command.UserRegister;
    
    constructor(public readonly email : string, 
        public readonly password : string, 
        public readonly username : string) {
        super();
    }
}

export abstract class Handler<T>  {

}

const mediator = new EventMediator();

async function test() {
    mediator.execute(new UserRegisterCommand("test", "test", "test"));
    mediator.register<string>(Command.UserRegister, async () => {
        return "hello";
    });
}

export default mediator;