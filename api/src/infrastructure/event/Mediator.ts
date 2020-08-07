import { Command } from "./Commands";
import { injectable, inject } from "inversify";
import { Logger } from "../logging/Logger";
import { assertNotNull } from "../guard/Guards";

@injectable()
export class Mediator {

    private handlers = {};
    private listeners : {[key : number] : any[]} = {};

    constructor(@inject(Logger) private readonly logger : Logger) {
    }

    async register<T>(command : Command, handler: (command: CommandRequest<T>) => Promise<T>) {
        assertNotNull(command, handler);
        this.handlers[command] = handler;
    }

    async listen<T>(command : Command, handler : (command : CommandRequest<T>) => any) {
        assertNotNull(command, handler);
        if(!this.listeners[command]) {
            this.listeners[command] = [];
        }
        this.listeners[command].push(handler);
    }

    async notify<T>(command : CommandRequest<T>) {
        const listeners = this.listeners[command.command];
        if (!listeners) {
            throw new Error("No listener found for " + Command[command.command]);
        }
        this.logger.log({
            message : Command[command.command],
            ...command,
            listeners : listeners.length
        });
        listeners.forEach(l => {
            l(command);
        })
    }

    async execute<T>(command: CommandRequest<T>): Promise<T> {
        this.logger.log({
            message : Command[command.command],
            ...command
        });
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