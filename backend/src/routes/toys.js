const express = require('express');
const router = express.Router();

const { getToys, insertNewToy, getToysByName } = require("../../db/queries/toys");

/**
 * @swagger
 * /api/toys:
 *   get:
 *     summary: Get a list of toys
 *     description: Retrieve a list of toys from the database.
 *     responses:
 *       200:
 *         description: A list of toys
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Toy'
 *       500:
 *         description: An internal server error occurred.
 */

/**
 * @swagger
 * /api/toys/new:
 *   post:
 *     summary: Create a new toy
 *     description: Create a new toy and add it to the database.
 *     parameters:
 *       - in: body
 *         name: toy
 *         description: The toy object to create.
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Toy'
 *     responses:
 *       201:
 *         description: The newly created toy
 *         schema:
 *           $ref: '#/definitions/Toy'
 *       400:
 *         description: Bad request. Invalid input data.
 *       500:
 *         description: An internal server error occurred.
 */

/**
 * @swagger
 * definitions:
 *   Toy:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *       name:
 *         type: string
 *       description:
 *         type: string
 */

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
    .then((toy) => {
      console.log("Toy data added in the database.")
      res.status(201).send(toy);
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
