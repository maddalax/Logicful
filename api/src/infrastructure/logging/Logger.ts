export interface Log {
    message: string,
    [key: string]: any
}

export abstract class Logger {
    abstract log(object: Log): void
    abstract logError(object: Log): void;
    abstract logWarning(object: Log): void
}

export class ConsoleLogger extends Logger {
    log(object: Log): void {
        console.log(JSON.stringify(object, null, 2));
    }
    logError(object: Log): void {
        console.error(JSON.stringify(object, null, 2));
    }
    logWarning(object: Log): void {
        console.warn(JSON.stringify(object, null, 2));
    }
}