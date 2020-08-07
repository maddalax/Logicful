import Koa from 'koa';
import Router from 'koa-router';
import "reflect-metadata";
import provider from './Container';
import { ConfigProvider } from './config/ConfigProvider';
import { MongoService } from './infrastructure/persistence/mongo/MongoService';
import { Mediator } from './infrastructure/event/Mediator';
import { ErrorCommand } from './infrastructure/error/commands/ErrorCommand';
import 'infrastructure/event/Listeners'
import { NormalizeAddressCommand } from 'application/features/forms/fields/address/commands/NormalizeAddressCommand';
import bodyParser from 'koa-bodyparser'

const app = new Koa();
const router = new Router({
    prefix: '/api/v1/'
});

app.use(bodyParser({
    enableTypes: ["json"],
    onerror(err, ctx) {
        ctx.throw({ error: err }, 422);
    }
}))

app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    console.info(`${ctx.method} ${ctx.url} - ${ms}ms`, ctx.request.body);
});

app.use(async (context, next) => {
    try {
        await next();
    } catch (err) {
        context.status = err.status || 500;
        context.body = err.message;
        context.app.emit('error', err, context);
    }
});

app.on('error', (error, context: Koa.Context) => {
    provider.get(Mediator).notify(new ErrorCommand(error, {
        method: context.method,
        url: context.url,
        ip: context.request.ip
    }))
});


router.post("form/field/address/normalize", async (context) => {
    context.body = await provider.get(Mediator).execute(new NormalizeAddressCommand(context.request.body));
})

async function bootstrap() {
    await provider.get(ConfigProvider).setup();
    await provider.get(MongoService).connect();
    app.use(router.routes()).use(router.allowedMethods());
    app.listen(3000, () => {
        console.log("Listening on port 3000.");
    });
}

bootstrap().then(() => {
    console.log("App has started.")
}).catch(err => {
    console.error(err);
});




