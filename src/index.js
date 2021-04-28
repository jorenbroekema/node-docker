require('dotenv').config();
const path = require('path');
const Koa = require('koa');
const serve = require('koa-static');
const bodyParser = require('koa-bodyparser');

const router = require('./routes/todos');

const port = process.env.NODE_ENV === 'production' ? 80 : 3000;

const app = new Koa();
app.use(bodyParser());
app.use(serve(path.resolve('src', 'public')));

app.use(router.routes());

module.exports = app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
