const db = require('../connection');

// Function to insert new toy into the database
const insertNewToy = (data) => {
  console.log("Entering DB");
  
  // Using parameterized queries to prevent SQL injection
  const query = `
    INSERT INTO toy(title, description, age_group, value, address, longitude, latitude, condition, user_id, created_at) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
    RETURNING *;
    `;
    
    // Use db connection to execute insert toy query
    return db
    //.query(query, [title, description, age_group, value, address, longitude, latitude, condition, user_id, created_at])
    .query(query, [data.title, data.description, data.ageGroup, data.value, data.address, data.longitude, data.latitude, data.condition, 3, new Date()])
    .then((result) => {
      return result.rows[0];
    })
    .catch((error) => {
      console.error('Error in insertNewToy:', error);
      throw error;
    });
};

module.exports = { insertNewToy };