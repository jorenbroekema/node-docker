const Router = require('koa-router');

const pool = require('../db/connection');

router = new Router();

router.get('/todos', async (ctx) => {
  const { rows } = await pool.query('SELECT * FROM todos;');

  ctx.status = 200;
  ctx.body = {
    status: 'success',
    data: rows,
  };
});

router.get('/todos/:id', async (ctx) => {
  const { id } = ctx.params;
  const { rows } = await pool.query(`SELECT * FROM todos WHERE id='${id}';`);

  ctx.status = 200;
  ctx.body = {
    status: 'success',
    data: rows[0],
  };
});

router.post('/todos', async (ctx) => {
  const { name } = ctx.request.body;
  console.log(ctx.request.body, name);
  await pool.query(`
    INSERT INTO todos (name)
    VALUES ('${name}');
  `);

  ctx.status = 201;
  ctx.body = {
    status: 'success',
  };
});

router.put('/todos/:id', async (ctx) => {
  const { id } = ctx.params;
  const { name } = ctx.request.body;
  await pool.query(`
    UPDATE todos
    SET name='${name}'
    WHERE id=${id};
  `);

  ctx.status = 200;
  ctx.body = {
    status: 'success',
  };
});

router.delete('/todos/:id', async (ctx) => {
  const { id } = ctx.params;
  await pool.query(`
    DELETE FROM todos WHERE id=${id};
  `);

  ctx.status = 200;
  ctx.body = {
    status: 'success',
  };
});

module.exports = router;
