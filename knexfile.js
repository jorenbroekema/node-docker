require('dotenv').config();
const path = require('path');

const BASE_PATH = path.join(__dirname, 'src', 'db');

const base = {
  client: 'pg',
  connection: `postgres://${process.env.DB_USER}:${process.env.DB_PW}@psql:5432/api`,
  migrations: {
    directory: path.join(BASE_PATH, 'migrations'),
  },
  seeds: {
    directory: path.join(BASE_PATH, 'seeds'),
  },
};

module.exports = {
  development: {
    ...base,
  },
  production: {
    ...base,
  },
  test: {
    ...base,
    connection: `postgres://${process.env.DB_USER}:${process.env.DB_PW}@psql:5432/api_test`,
  },
};
