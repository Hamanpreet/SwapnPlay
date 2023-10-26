const express = require('express');
const router = express.Router();

const { requestMatch } = require("../../db/queries/matches");

// Set up a route to create a new match request
router.post('/', (req, res) => {
  const body = req.body;
  requestMatch(body)
    .then((matches) => {
      console.log("Match request created successfully")
      res.send(matches);
    })
    .catch((err) => {
      console.log(`An error occurred: ${err}`)
    });
});

module.exports = router;