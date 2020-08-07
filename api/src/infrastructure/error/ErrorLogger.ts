import provider from "../../Container";
import { Mediator } from "../event/Mediator";
import { Command } from "../event/Commands";
import { ErrorCommand } from "./commands/ErrorCommand";
import { Logger } from "../logging/Logger";

provider.get(Mediator).listen(Command.ApplicationError, async (command : ErrorCommand) => {
    const error = command.error;
    provider.get(Logger).logError({
        message: error.stack,
        ...command.data
    });
})