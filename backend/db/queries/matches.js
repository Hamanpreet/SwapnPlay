const db = require("../connection");


// Insert new match into the database
const createtNewMatch = (data) => {
  console.log("Entering DB to create new match");

  const query = `
    INSERT INTO match (status, toy_id, toy_in_exchange_id, user1_id, user2_id, created_at)
    VALUES ($1, $2, $3, $4, $5, $6) 
    RETURNING *;
    `;
  return db
    .query(query, [data.status, data.toy_id, data.toy_in_exchange_id, data.user1_id, data.user2_id, new Date()])
    .then((result) => {
      return result.rows[0];
    })
    .catch((error) => {
      console.error('Error in creating new match:', error);
      throw error;
    });
};

module.exports = {
  createtNewMatch
};
