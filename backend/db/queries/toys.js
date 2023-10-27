const db = require("../connection");

// Return all toys
const getToys = () => {
  return db
    .query(`SELECT * FROM toy;`)
    .then((result) => {
      return result.rows || null;
    })
    .catch((err) => console.error(err.message));
};

const getToysByName = (name) => {
  return db
    .query('SELECT * FROM toy WHERE title=$1;', [name])
    .then((res) => {
      return res.rows || null;
    })
    .catch((err) => console.error(err.message));
}

// Insert new toy into the database
const insertNewToy = (data) => {
  console.log("Entering DB");

  // Using parameterized queries to prevent SQL injection
  const query = `
    INSERT INTO toy(title, description, age_group, value, address, longitude, latitude, condition, user_id, created_at) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
    RETURNING *;
    `;
  // Use db connection to execute insert toy query
  return db
    //.query(query, [title, description, age_group, value, address, longitude, latitude, condition, user_id, created_at])
    .query(query, [data.title, data.description, data.ageGroup, data.value, data.address, data.longitude, data.latitude, data.condition, 3, new Date()])
    .then((result) => {
      return result.rows[0];
    })
    .catch((error) => {
      console.error('Error in insertNewToy:', error);
      throw error;
    });
};

const getToysByAgeGroup = (ageGroup) => {
  return db
    .query('SELECT * FROM toy WHERE age_group=$1;', [ageGroup])
     .then((res) => {
      return res.rows || null;
     })
     .catch((err) => console.error(err.message));
}

const getToysByCondition = (condition) => {
  return db
    .query('SELECT * FROM toy WHERE condition=$1;', [condition])
     .then((res) => {
      return res.rows || null;
     })
     .catch((err) => console.error(err.message));
}

module.exports = {
  getToys, insertNewToy,
  getToysByName,
  getToysByAgeGroup,
  getToysByCondition
};