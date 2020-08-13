import registry, { Service } from "../../Container";
import { Mediator } from "../../infrastructure/event/Mediator";
import {GetOptionSetsQuery} from "../../application/features/option_sets/queries/GetOptionSetsQuery";

export async function getOptionSets(event, context) {
    const mediator = registry.get<Mediator>(Service.Mediator);
    const result = await mediator.execute(new GetOptionSetsQuery("maddox"))
    return {
        statusCode : 200,
        body : JSON.stringify(result),
        headers: {
            'Access-Control-Allow-Origin': '*', // Required for CORS support to work
            'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
        },
    }
}