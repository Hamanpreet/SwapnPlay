const express = require('express');
const router = express.Router();

const { getToys, insertNewToy, getToysByName } = require("../../db/queries/toys");
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


// Set up a route to show all toys
router.get('/', (req, res) => {
  getToys()
    .then((toys) => {
      console.log("Toys data fetched from database.")
      res.send(toys);
    })
    .catch((err) => {
      console.log(`An error occurred: ${err}`)
    });
});

// Set up a route to create a new toy
router.post('/new', (req, res) => {
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

router.post('/searchQuery', (req, res) => {
  const { searchQuery } = req.body;
  console.log(req.body)
  if (!searchQuery) {
    return res.status(400).json({ error: "Name is required" });
  }
 console.log(searchQuery);
  getToysByName(searchQuery)
    .then((toys) => {
      res.send(toys);
      console.log(req.body);
    })
    .catch((err) => {
      console.log(`An error occurred: ${err}`);
    });
});


module.exports = router;
