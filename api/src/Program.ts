import Koa from 'koa';
const app = new Koa();

app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
  });

app.use(context => {
    context.body = {name : "test"};
})

app.listen(3000, () => {
    console.log("Listening on port 3000.");
});