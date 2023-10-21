const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

app.post("/:id", (req, res) => {
  const toyData = req.body;

  pool.query(
    'INSERT INTO toys (name, age_group, value, address, condition, pickup_location) VALUES ($1, $2, $3, $4, $5, $6)',
    [toyData.name, toyData.ageGroup, toyData.value, toyData.address, toyData.condition, toyData.pickupLocation],
    (error, results) => {
      if (error) {
        console.error("Error creating toy:", error);
        res.status(500).json({ message: "Error creating toy" });
      } else {
        console.log("Toy created successfully");
        res.status(201).json({ message: "Toy created successfully" });
      }
    }
  );

  // Send a response back to the client
  res.status(201).json({ message: "Toy created successfully" });
});
