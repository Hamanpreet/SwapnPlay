require("dotenv").config();

// Importing the Pool object from PostgreSQL
const { Pool } = require('pg');

// Creating a new Pool instance with the database connection configuration
const pool = new Pool({
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT
});

pool
  .connect()
  .catch(e => console.log(`Error connecting to Postgres server:\n${e}`));

// Exporting the 'pool' object
module.exports = pool;
