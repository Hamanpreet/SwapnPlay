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


const updateUserDetails = (first_name, last_name, email,phone_number, city, subId) => {
  // Input validation (you can customize this based on your requirements)
  if (!first_name || !last_name || !email || !subId || !phone_number || !city) {
    throw new Error('All fields must be provided');
  }

  // Update the user with the new data
  const updateUserQuery = `
    UPDATE users SET first_name=$1, last_name=$2, email=$3, phone_number=$4, city=$5 WHERE sub_Id=$6
    RETURNING *;
  `;
  
  return db.query(updateUserQuery, [first_name, last_name, email, phone_number, city, subId])
    .then((res) => {
      return res.rows[0] || null; // Assuming you expect one row to be updated
    })
    .catch((err) => {
      console.error(err.message);
      throw err; // Rethrow the error for higher-level error handling
    });
};

module.exports = {
  getUserBySub,
  insertNewUser,
  updateUserDetails
};