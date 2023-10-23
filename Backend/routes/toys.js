const express = require('express');
const router = express.Router();

const database = require("../db/queries/toys");

router.get('/',(req, res)=>{
  database.getToys()
  .then((toys) => {
    res.send(toys);
  })
  .catch((err)=>{
    console.log(`An error occurred: ${err}`)
  });
});

module.exports = router;