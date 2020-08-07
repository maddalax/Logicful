import { CommandRequest, Mediator } from "../../../../infrastructure/event/Mediator";
import { Command } from "../../../../infrastructure/event/Commands";
import registry, { Service } from '../../../../Container';

registry.get<Mediator>(Service.Mediator).register<string>(Command.UserRegister, async () => {
    return "";
});

export class UserRegisterCommand extends CommandRequest<string> {
    public command: Command = Command.UserRegister;

    constructor(public readonly email : string,
        public readonly password : string,
        public readonly username : string) {
        super();
    }
}