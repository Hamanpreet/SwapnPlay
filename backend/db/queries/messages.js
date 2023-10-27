const db = require("../connection");

// Return all messages
const getMessages = () => {
  return db
    .query(`SELECT * FROM message;`)
    .then((result) => {
      return result.rows || null;
    })
    .catch((err) => console.error(err.message));
};

const getMessagesByUserId = (userid) => {
  return db
    .query('SELECT * FROM message WHERE sender_id=$1;', [userid])
    .then((res) => {
      return res.rows || null;
    })
    .catch((err) => console.error(err.message));
}

// Insert new message into the database
const insertNewMessage = (data) => {
  console.log("Entering DB");

  // Using parameterized queries to prevent SQL injection
  const query = `
    INSERT INTO message(text, match_id, sender_id, receiver_id, created_at) 
    VALUES ($1, $2, $3, $4, $5) 
    RETURNING *;
    `;
  // Use db connection to execute insert toy query
  return db

    .query(query, [data.text, data.match_id, data.sender_id, data.receiver_id, new Date()])
    .then((result) => {
      return result.rows[0];
    })
    .catch((error) => {
      console.error('Error in insertNewMessage:', error);
      throw error;
    });
};

// const getToysByAgeGroup = (ageGroup) => {
//   return db
//     .query('SELECT * FROM toy WHERE age_group=$1;', [ageGroup])
//     .then((res) => {
//       return res.rows || null;
//     })
//     .catch((err) => console.error(err.message));
// }

// const getToysByCondition = (condition) => {
//   return db
//     .query('SELECT * FROM toy WHERE condition=$1;', [condition])
//     .then((res) => {
//       return res.rows || null;
//     })
//     .catch((err) => console.error(err.message));
// }

module.exports = {
  getMessages, 
  insertNewMessage,
  getMessagesByUserId,

};