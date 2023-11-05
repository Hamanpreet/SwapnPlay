//const { useResolvedPath } = require("react-router-dom");
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


const getReceiverByMatch = (matchId, senderId) => {
  
  return db
    .query(
      `
      SELECT
      CASE
          WHEN m.requester_id = $2 THEN u_owner.first_name
          ELSE u_requester.first_name
      END AS receiver_first_name
  FROM
      match m
  JOIN
      users u_requester ON m.requester_id = u_requester.id
  JOIN
      users u_owner ON m.owner_id = u_owner.id
  WHERE
      m.id = $1;
  `, [matchId, senderId]) 
     .then((res) => {
      return res.rows[0] || null;
    })  
    .catch((err) => console.error(err.message));
}


module.exports = {
  getMessages,
  saveMessageToDatabase,
  getMessagesByUserId,
  getReceiverByMatch

};

