exports.seed = (knex) =>
  knex('todos')
    .del()
    .then(() =>
      knex('todos').insert({
        name: 'Do groceries',
      }),
    )
    .then(() =>
      knex('todos').insert({
        name: 'Make homework',
      }),
    );
