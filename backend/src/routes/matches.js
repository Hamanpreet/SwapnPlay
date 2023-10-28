const express = require('express');
const router = express.Router();

const { createtNewMatch } = require("../../db/queries/matches");

// Set up a route to create a new match request
router.post('/new', (req, res) => {
  const body = req.body;
  createtNewMatch(body)
    .then((matches) => {
      console.log("New match created", body)
      res.send(matches);
    })
    .catch((err) => {
      console.log(`An error occurred: ${err}`)
    });
});

module.exports = router;