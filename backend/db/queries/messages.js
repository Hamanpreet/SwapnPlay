const { useResolvedPath } = require("react-router-dom");
const db = require("../connection");

// Return all messages
const getMessages = (matchId) => {

  return db
    .query(`SELECT message.*
    FROM message
    JOIN match ON message.match_id = match.id
    WHERE match_id = $1
    ORDER BY created_at;
    
  `, [matchId])
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
const saveMessageToDatabase = (data) => {
  console.log("Entering DB");

  // Using parameterized queries to prevent SQL injection
  const query = `
    INSERT INTO message(text, match_id, sender_id, receiver_id, created_at) 
    VALUES ($1, $2, $3, $4, $5) 
    RETURNING *;
    `;
  // Use db connection to execute insert toy query
  return db

    .query(query, [data.text, data.match_id, data.sender_id, data.requester_id, new Date()])
    .then((result) => {
      return result.rows[0];
    })
    .catch((error) => {
      console.error('Error in insertNewMessage:', error);
      throw error;
    });
};

const getReceiverNameById = (receiverId) => {
  return db
    .query(
      `
      SELECT users.first_name AS receiver_first_name
      FROM users
      JOIN message ON receiver_id = users.id
      WHERE receiver_id = 1;`, [receiverId])
    .then((res) => {
      return res.rows[0] || null;
    })
    .catch((err) => console.error(err.message));
};

const getReceiverByMatch = (matchId, senderId) => {
  return db
    .query(
      `
      SELECT receiver_id
      FROM message
      WHERE match_id = $1 
      AND sender_id = $2`, [matchId, senderId]) 
     .then((res) => {
      return res.rows[0] || null;
    })  
    .catch((err) => console.error(err.message));
}


module.exports = {
  getMessages,
  saveMessageToDatabase,
  getMessagesByUserId,
  getReceiverNameById,
  getReceiverByMatch

};
