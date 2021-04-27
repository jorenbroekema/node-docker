const knex = require('../connection');

function getTodos() {
  return knex('todos').select('*');
}

function getTodo(id) {
  return knex('todos').select('*').where({ id });
}

async function updateTodo(id, changes) {
  return knex('todos').where({ id }).update(changes).returning('*');
}

async function addTodo(user) {
  return knex('todos').insert(user).returning('*');
}

async function deleteTodo(id) {
  return knex('todos').where({ id }).del().returning('*');
}

module.exports = {
  getTodos,
  getTodo,
  addTodo,
  updateTodo,
  deleteTodo,
};
