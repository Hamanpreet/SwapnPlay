const db = require("../connection");

const getToys = () => {
  return db
    .query(`SELECT * FROM toy;`)
    .then((result) => {
      return result.rows || null;
    })
    .catch((err) => console.error(err.message));
};


module.exports = {
  getToys
};