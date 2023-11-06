// PG database client/connection setup
const config = require('../config/development');
const { Pool } = require('pg');

const dbParams = {
  host: config.PGHOST, //process.env.PGHOST,
  database: config.PGDATABASE, // application breaks when variable name is name
  user: config.PGUSER,
  password: config.PGPASSWORD,
  port: config.PGPORT,
  //ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
};
const db = new Pool(dbParams);

db.connect().catch(e => console.log(`Error connecting to Postgres server:\n${e}`));;

module.exports = db;