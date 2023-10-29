const db = require("../connection");


const getUserBySub = (sub) => {
  return db
    .query('SELECT * FROM users WHERE sub_id=$1;', [sub])
    .then((res) => {
      return res.rows || null;
    })
    .catch((err) => console.error(err.message));
}

// Insert new user into the database
const insertNewUser = (data) => {
  console.log("Entering DB");

  // Using parameterized queries to prevent SQL injection
  const query = `
    INSERT INTO users(first_name, last_name, email, phone_number, city, sub_id, created_at) 
    VALUES ($1, $2, $3, $4, $5, $6, $7) 
    RETURNING *;
    `;
  // Use db connection to execute insert user query
  return db
    .query(query, [data.first_name, data.last_name, data.email, data.phone_number, data.city, data.sub_id, new Date()])
    .then((result) => {
      return result.rows[0];
    })
    .catch((error) => {
      console.error('Error in insertNewUser:', error);
      throw error;
    });
};

module.exports = {
  getUserBySub,
  insertNewUser
};