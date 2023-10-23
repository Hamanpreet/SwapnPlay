const express = require('express');
const router = express.Router();

const database = require("../db/queries/toys");
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

module.exports = router;