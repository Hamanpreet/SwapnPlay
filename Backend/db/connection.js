// PG database client/connection setup
const config = require('config');
const { Pool } = require('pg');

const dbParams = {
  host: config.get('PGHOST'), //process.env.PGHOST,
  name: config.get('PGDATABASE'),
  user: config.get('PGUSER'), 
  password: config.get('PGPASSWORD'),
  port: config.get('PGPORT'), 
  //ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
};

const db = new Pool(dbParams);

db.connect().catch(e => console.log(`Error connecting to Postgres server:\n${e}`));;

module.exports = db;
