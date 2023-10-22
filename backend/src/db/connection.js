const pg = require("pg");

const client = new pg.Client({
  connectionString: "postgres://labber:labber@localhost:5432/final", // Temp Fix: Bypass labber password authentication by using connection string for PostgreSQL
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT
});

client
  .connect()
  .catch(e => console.log(`Error connecting to Postgres server:\n${e}`));

module.exports = client;
