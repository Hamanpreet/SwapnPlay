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

const getUserNamesByMatch = (matchId) => {
  return db
    .query(
      `
      SELECT requester.first_name AS requester_first_name,
      owner.first_name AS owner_first_name
      FROM match
      JOIN users AS requester ON match.requester_id = requester.id
      JOIN users AS owner ON match.owner_id = owner.id
      WHERE match.id = $1`, [matchId])
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
  getUserNamesByMatch,
  getReceiverByMatch

};
