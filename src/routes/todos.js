const Router = require('koa-router');

const queries = require('../db/queries/todos');

router = new Router();

router.get('/todos', async (ctx) => {
  try {
    const todos = await queries.getTodos();
    ctx.status = 200;
    ctx.body = {
      status: 'success',
      data: todos,
    };
  } catch (e) {
    ctx.status = 404;
    ctx.body = {
      status: 'error',
    };
  }
});

router.get('/todos/:id', async (ctx) => {
  const { id } = ctx.params;

  const todos = await queries.getTodo(id);
  if (todos.length > 0) {
    ctx.status = 200;
    ctx.body = {
      status: 'success',
      data: todos[0],
    };
  } else {
    ctx.status = 404;
    ctx.body = {
      status: 'error',
    };
  }
});

router.post('/todos', async (ctx) => {
  const { name } = ctx.request.body;
  try {
    const todos = await queries.addTodo({ name });
    ctx.status = 201;
    ctx.body = {
      status: 'success',
      data: todos[0],
    };
  } catch (e) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
    };
  }
});

router.put('/todos/:id', async (ctx) => {
  const { id } = ctx.params;
  const { name } = ctx.request.body;

  try {
    const todos = await queries.updateTodo(id, { name });

    ctx.status = 200;
    ctx.body = {
      status: 'success',
      data: todos[0],
    };
  } catch (e) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
    };
  }
});

router.delete('/todos/:id', async (ctx) => {
  const { id } = ctx.params;

  try {
    const todos = await queries.deleteTodo(id);

    ctx.status = 200;
    ctx.body = {
      status: 'success',
      data: todos[0],
    };
  } catch (e) {
    ctx.status = 404;
    ctx.body = {
      status: 'error',
    };
  }
});

module.exports = router;
