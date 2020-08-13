import { Command } from "./Commands";
import { assertNotNull } from "../guard/Guards";
import registry, { Service } from '../../Container';
import { Logger } from '../logging/Logger';

export class Mediator {

    private handlers = {};
    private listeners : {[key : number] : any[]} = {};

    register<T>(command : Command, handler: (command: CommandRequest<T>) => Promise<T>) {
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
        registry.get<Logger>(Service.Logger).log({
            message : Command[command.command],
            ...command,
            listeners : listeners.length
        });
        listeners.forEach(l => {
            l(command);
        })
    }

    async execute<T>(command: CommandRequest<T>): Promise<T> {
        registry.get<Logger>(Service.Logger).log({
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