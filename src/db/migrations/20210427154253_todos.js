exports.up = (knex) =>
  knex.schema.createTable('todos', (table) => {
    table.increments();
    table.string('name').notNullable();
  });

exports.down = (knex) => knex.schema.dropTable('todos');
