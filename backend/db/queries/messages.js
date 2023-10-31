//const { useResolvedPath } = require("react-router-dom");
const db = require("../connection");

// Return all messages
const getMessages = (senderId) => {
  return db
    .query(`SELECT
    message.*,
    sender.first_name AS sender_first_name,
    sender.last_name AS sender_last_name,
    requester.first_name AS requester_first_name,
    requester.last_name AS requester_last_name
  FROM
    message
  JOIN
    users AS sender ON message.sender_id = sender.id
  JOIN
    users AS requester ON message.requester_id = requester.id
  WHERE
    sender_id = $1;
  `, [senderId])
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
    INSERT INTO message(text, match_id, sender_id, requester_id, created_at) 
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

const getUserNamesByMatch = (userId) => {
  return db
    .query(
      `
      SELECT requester.first_name AS requester_first_name,
      owner.first_name AS owner_first_name
      FROM match
      JOIN users AS requester ON match.requester_id = requester.id
      JOIN users AS owner ON match.owner_id = owner.id
      WHERE match.id = (
  SELECT id
  FROM match
  WHERE (requester_id = $1 OR owner_id = $1) AND (status='Accepted')
  ORDER BY created_at DESC
  LIMIT 1
);
      `,
      [userId]
    )
    .then((res) => {
      return res.rows[0] || null;
    })
    .catch((err) => console.error(err.message));
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
  getUserNamesByMatch

};
