const express = require('express');
const router = express.Router();

const { insertNewToy } = require("../../db/queries/newToy");

// Set up a route to handle toy creation
router.post('/', (req, res) => {
  const body = req.body;
  insertNewToy(body)
    .then((toys) => {
      console.log("Toy data added in the database.")
      res.send(toys);
    })
    .catch((err) => {
      console.log(`An error occurred: ${err}`)
    });
});

module.exports = router;