const express = require('express');
const router = express.Router();
const { insertNewToy } = require("../../src/db/queries/newToy");
//const bodyParser = require('body-parser');

// Use JSON and URL-encoded middleware to parse the request body
//router.use(express.json()); // For parsing application/json
//router.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// Set up a route to handle toy creation
router.post('/', (req, res) => {

  console.log("Routing is running")
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