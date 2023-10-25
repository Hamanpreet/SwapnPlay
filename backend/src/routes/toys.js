const express = require('express');
const router = express.Router();

const { getToys, insertNewToy } = require("../../db/queries/toys");
//const { insertNewToy } = require("../../db/queries/newToy");
/**
 * @swagger
 * /api/toys:
 *   get:
 *     summary: Get a list of toys
 *     description: Retrieve a list of all toys from the database.
 *     responses:
 *       '200':
 *         description: A list of toys.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 */
router.get('/',(req, res)=>{
  database.getToys()
  .then((toys) => {
    res.send(toys);
  })
  .catch((err)=>{
    console.log(`An error occurred: ${err}`)
  });
});

router.get('searchQuery', (req, res) => {
  const { name } = req.query.searchQuery;

  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }
 console.log(name);
  database.getToysByName(name)
    .then((toys) => {
      res.send(toys);
      console.log(toys);
    })
    .catch((err) => {
      console.log(`An error occurred: ${err}`);
    });
});


module.exports = router;
