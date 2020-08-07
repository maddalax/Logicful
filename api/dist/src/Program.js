"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const koa_router_1 = __importDefault(require("koa-router"));
require("reflect-metadata");
const Container_1 = __importDefault(require("./Container"));
const ConfigProvider_1 = require("./config/ConfigProvider");
const MongoService_1 = require("./infrastructure/persistence/mongo/MongoService");
const Mediator_1 = require("./infrastructure/event/Mediator");
const ErrorCommand_1 = require("./infrastructure/error/commands/ErrorCommand");
require("infrastructure/event/Listeners");
const NormalizeAddressCommand_1 = require("application/features/forms/fields/address/commands/NormalizeAddressCommand");
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = new koa_1.default();
const router = new koa_router_1.default({
    prefix: '/api/v1/'
});
app.use(koa_bodyparser_1.default({
    enableTypes: ["json"],
    onerror(err, ctx) {
        ctx.throw({ error: err }, 422);
    }
}));
app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    console.info(`${ctx.method} ${ctx.url} - ${ms}ms`, ctx.request.body);
});
app.use(async (context, next) => {
    try {
        await next();
    }
    catch (err) {
        context.status = err.status || 500;
        context.body = err.message;
        context.app.emit('error', err, context);
    }
});
app.on('error', (error, context) => {
    Container_1.default.get(Mediator_1.Mediator).notify(new ErrorCommand_1.ErrorCommand(error, {
        method: context.method,
        url: context.url,
        ip: context.request.ip
    }));
});
router.post("form/field/address/normalize", async (context) => {
    context.body = await Container_1.default.get(Mediator_1.Mediator).execute(new NormalizeAddressCommand_1.NormalizeAddressCommand(context.request.body));
});
async function bootstrap() {
    await Container_1.default.get(ConfigProvider_1.ConfigProvider).setup();
    await Container_1.default.get(MongoService_1.MongoService).connect();
    app.use(router.routes()).use(router.allowedMethods());
    app.listen(3000, () => {
        console.log("Listening on port 3000.");
    });
}
bootstrap().then(() => {
    console.log("App has started.");
}).catch(err => {
    console.error(err);
});
