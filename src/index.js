require('dotenv').config();
const path = require('path');
const Koa = require('koa');
const serve = require('koa-static');
const bodyParser = require('koa-bodyparser');

const router = require('./routes/todos');

const app = new Koa();
app.use(bodyParser());
app.use(serve(path.resolve('src', 'public')));

app.use(router.routes());

module.exports = app.listen(3000, () => {
  console.log(`Server listening on port: 3000`);
});
