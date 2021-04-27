require('dotenv').config();
const pool = require('./connection');

pool.query(
  `
  CREATE TABLE todos (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
  );
`,
  (err, res) => {
    console.log(err, res);
    pool.end();
  },
);
