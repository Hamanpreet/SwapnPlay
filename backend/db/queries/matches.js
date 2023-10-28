const db = require("../connection");


// Insert new match into the database
const createtNewMatch = (data) => {
  const query = `
    INSERT INTO match (status, toy_id, toy_in_exchange_id, requester_id, owner_id, created_at)
    VALUES ($1, $2, $3, $4, $5, $6) 
    RETURNING *;
    `;
  
  return db
    .query(query, [data.status, data.toy_id, data.toy_in_exchange_id, data.requester_id, data.owner_id, new Date()])
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
