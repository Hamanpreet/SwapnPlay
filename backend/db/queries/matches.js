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

// Get matches of requester
const getRequestSend = (sub) => {
  return db
    .query("SELECT m.id AS Match_Id, m.status AS Match_Status, m.created_at AS request_time, " +
      "o.id AS Owner_Toy_ID, o.user_id AS Toy_Owner_ID, o.title AS Owner_Toy_Title, o.description AS Owner_Toy_Description, o.age_group AS Owner_Toy_AgeGroup, o.value AS Owner_Toy_Value, o.address AS Owner_Toy_Location, o.Longitude AS Owner_Toy_Longitude, o.latitude AS Owner_Toy_Latitude, o.condition AS Owner_Toy_Condition, " +
      "r.id AS Requester_Toy_ID, r.user_id AS Toy_Requester_ID, r.title AS Requester_Toy_Title, r.description AS Requester_Toy_Description, r.age_group AS Requester_Toy_AgeGroup, r.value AS Requester_Toy_Value, r.address AS Requester_Toy_Location, r.Longitude AS Requester_Toy_Longitude, r.latitude AS Requester_Toy_Latitude, r.condition AS Requester_Toy_Condition " +
      "FROM match m INNER JOIN users u ON m.requester_id = u.id " +
      "INNER JOIN toy o ON m.toy_id = o.id INNER JOIN toy r ON m.toy_in_exchange_id = r.id " +
      "WHERE u.sub_id =$1;", [sub])
    .then((res) => {
      return res.rows || null;
    })
    .catch((err) => console.error(err.message));
};

// Get matches of owner
const getRequestReceived = (sub) => {
  return db
    .query("SELECT m.id AS Match_Id, m.status AS Match_Status, m.created_at AS request_time, " +
      "o.id AS Owner_Toy_ID, o.user_id AS Toy_Owner_ID, o.title AS Owner_Toy_Title, o.description AS Owner_Toy_Description, o.age_group AS Owner_Toy_AgeGroup, o.value AS Owner_Toy_Value, o.address AS Owner_Toy_Location, o.Longitude AS Owner_Toy_Longitude, o.latitude AS Owner_Toy_Latitude, o.condition AS Owner_Toy_Condition, " +
      "r.id AS Requester_Toy_ID, r.user_id AS Toy_Requester_ID, r.title AS Requester_Toy_Title, r.description AS Requester_Toy_Description, r.age_group AS Requester_Toy_AgeGroup, r.value AS Requester_Toy_Value, r.address AS Requester_Toy_Location, r.Longitude AS Requester_Toy_Longitude, r.latitude AS Requester_Toy_Latitude, r.condition AS Requester_Toy_Condition " +
      "FROM match m INNER JOIN users u ON m.owner_id  = u.id " +
      "INNER JOIN toy o ON m.toy_id = o.id INNER JOIN toy r ON m.toy_in_exchange_id = r.id " +
      "WHERE u.sub_id =$1;", [sub])
    .then((res) => {
      return res.rows || null;
    })
    .catch((err) => console.error(err.message));
};

// Get notification count
const getNotificationCount = (sub) => {
  return db
    .query("select count(*) from match m inner join users u on m.owner_id = u.id where m.status ='Pending' AND u.sub_id = $1;", [sub])
    .then((res) => {
      return res.rows || null;
    })
    .catch((err) => console.error(err.message));
};

const getMatchById = (matchId) => {
  return db
    .query('SELECT * FROM match WHERE id = $1', [matchId])
    .then((res) => {
      return res.rows || null;
    })
    .catch((err) => console.error(err.message));
}

const updateMatch = (status, matchId) => {
  const updateMatchQuery = `
    UPDATE match
    SET status = $1
    WHERE id = $2
    RETURNING *;
  `;

  return db.query(updateMatchQuery, [status, matchId])
    .then((res) => {
      return res.rows[0] || null;
    })
    .catch((err) => {
      console.error(err.message);
      throw err;
    });
};

module.exports = {
  createtNewMatch, getRequestReceived, getRequestSend, getMatchById, updateMatch, getNotificationCount
};
