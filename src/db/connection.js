require('dotenv').config();
const environment = process.env.NODE_ENV || 'development';
const knex = require('../../knexfile.js');

const config = knex[environment];
module.exports = require('knex')(config);
