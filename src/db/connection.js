require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: `localhost`,
  database: 'api',
  password: process.env.DB_PW,
  port: 5432,
});

module.exports = pool;

// const environment = process.env.NODE_ENV || 'development';
// const knex = require('../../knexfile.js');

// const config = knex[environment];
// module.exports = require('knex')(config);
