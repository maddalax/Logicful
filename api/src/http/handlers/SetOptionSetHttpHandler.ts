import registry, { Service } from "../../Container";
import { Mediator } from "../../infrastructure/event/Mediator";
import {SetOptionSetCommand} from "../../application/features/option_sets/commands/SetOptionSetCommand";

export async function setOptionSet(event, context) {
    const data = JSON.parse(event.body);
    const mediator = registry.get<Mediator>(Service.Mediator);
    await mediator.execute(new SetOptionSetCommand("maddox", data))
    return {
        statusCode : 204,
        body : JSON.stringify({}),
        headers: {
            'Access-Control-Allow-Origin': '*', // Required for CORS support to work
            'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
        },
    }
}