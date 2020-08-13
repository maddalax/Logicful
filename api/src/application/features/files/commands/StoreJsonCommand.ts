import { CommandRequest, Mediator } from "../../../../infrastructure/event/Mediator";
import { Command } from "../../../../infrastructure/event/Commands";
import registry, { Service } from "../../../../Container";
import { S3 } from 'aws-sdk';
import {randomString} from '../../../utility/Random'
import { Status } from "../../../models/Status";

const client = new S3({
    endpoint : 'nyc3.digitaloceanspaces.com',
    accessKeyId : '2RW3Y47LMJ7EYRBDSY7V',
    secretAccessKey : 'N0+EBLQwNe78QV8Swyj+oXbVuFsP7eOeh6uzgd5Xam0'
});

registry.get<Mediator>(Service.Mediator).register<string>(Command.StoreJson, async (command: StoreJsonCommand) => {
    const id = command.id ?? randomString();
    const name = `${command.clientId}-${id}-${command.status}.json`;
    return new Promise((resolve, reject) => {
        client.putObject({
            Body : JSON.stringify(command.json),
            Bucket : 'logicful',
            ACL : 'public-read',
            ContentType : 'application/json',
            Key : name
        }, (err, data) => {
            if(err) {
                return reject(err);
            }
            return resolve(`https://logicful.nyc3.digitaloceanspaces.com/${name}?id=${id}`);
        });
    })
});

export class StoreJsonCommand extends CommandRequest<string> {
    public command: Command = Command.StoreJson;
    constructor(public readonly json : any, public readonly clientId : string, public readonly status : Status,
        public readonly id? : string) {
        super()
    }
}