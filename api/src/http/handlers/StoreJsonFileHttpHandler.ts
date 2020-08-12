import registry, { Service } from "../../Container";
import { Mediator } from "../../infrastructure/event/Mediator";
import { StoreJsonCommand } from "../../application/features/files/commands/StoreJsonCommand";

export async function storeJsonFile(event, context) {
    const data = JSON.parse(event.body);
    const status = event.queryStringParameters?.status;
    const id = event.queryStringParameters?.id ?? undefined;
    console.log(status);
    const mediator = registry.get<Mediator>(Service.Mediator);
    const result = await mediator.execute(new StoreJsonCommand(data, "maddox", status, id))
    return {
        statusCode : 200,
        body : JSON.stringify({url : result}),
        headers: {
            'Access-Control-Allow-Origin': '*', // Required for CORS support to work
            'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
          },
      }
}