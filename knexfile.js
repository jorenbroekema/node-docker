require('dotenv').config();
const path = require('path');

const BASE_PATH = path.join(__dirname, 'src', 'db');

module.exports = {
  development: {
    client: 'pg',
    connection: `postgres://${process.env.DB_USER}:${process.env.DB_PW}@localhost:5432/api`,
    migrations: {
      directory: path.join(BASE_PATH, 'migrations'),
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds'),
    },
  },
};
