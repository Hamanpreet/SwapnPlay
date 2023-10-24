const db = require("../connection");

const getToys = () => {
  return db
    .query(`SELECT * FROM toy;`)
    .then((res) => {
      return res.rows || null;
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


module.exports = {
  getToys,
  getToysByName
};