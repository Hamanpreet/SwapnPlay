require("dotenv").config();

const express = require("express");
// To log details about incoming HTTP requests
const morgan = require("morgan");
const { Pool } = require('pg');
const cors = require('cors');



const PORT = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

// PostgreSQL database configuration
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});


app.post('/update-sub-id', (req, res) => {
  // Get the `sub` claim from the request body
  const { sub } = req.body;

  // Perform a database update to set the `sub_id` field for the logged-in user

  const updateQuery = {
    text: 'UPDATE users SET sub_id = $1 WHERE sub = $2',
    values: [sub, sub],
  };

  pool.query(updateQuery, (err, result) => {
    if (err) {
      console.error('Error updating sub_id:', err);
      res.status(500).send('Error updating sub_id');
    } else {
      console.log('Sub ID updated successfully');
      res.status(200).send('Sub ID updated successfully');
    }
  });

});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
