import { CommandRequest } from "../../event/Mediator";
import { Command } from "../../event/Commands";

export class ErrorCommand extends CommandRequest<void> {
    public command: Command = Command.ApplicationError;

    constructor(public readonly error : Error, public readonly data : any) {
        super();
    }
}