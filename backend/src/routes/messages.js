/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: API endpoints for managing messages in matches
 */

/**
 * @swagger
 * /api/messages/{matchId}:
 *   get:
 *     summary: Get messages for a specific match
 *     description: Retrieve messages for a specific match based on its matchId.
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: matchId
 *         required: true
 *         description: ID of the match to retrieve messages for.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of messages for the specified match
 *       500:
 *         description: An internal server error occurred.
 */

/**
 * @swagger
 * /api/messages/{matchId}/receiver:
 *   get:
 *     summary: Get receiver details for a specific match
 *     description: Retrieve receiver details for a specific match based on its matchId and senderId.
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: matchId
 *         required: true
 *         description: ID of the match to retrieve receiver details for.
 *         schema:
 *           type: integer
 *       - in: query
 *         name: senderId
 *         required: true
 *         description: ID of the sender to retrieve the receiver details for.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Receiver details for the specified match
 *       500:
 *         description: An internal server error occurred.
 */

/**
 * @swagger
 * /api/messages:
 *   post:
 *     summary: Send a new message
 *     description: Send a new message and save it to the database.
 *     tags: [Messages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Message'
 *     responses:
 *       200:
 *         description: Message sent successfully
 *       500:
 *         description: An internal server error occurred.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Message:
 *       type: object
 *       properties:
 *         // Define the properties of the Message object here
 */

const express = require('express');
const { getMessages, saveMessageToDatabase, getReceiverByMatch} = require('../../db/queries/messages');
const router = express.Router();


router.get('/:matchId',(req, res)=>{
  const matchId = req.params.matchId;

  getMessages(matchId)
    .then((messages) => {
      console.log("Messages data fetched from database.")
      res.send(messages);
    })
    .catch((err) => {
      console.log(`An error occurred: ${err}`)
    });
});

router.get('/:matchId/receiver', (req, res) => {
  const matchId = req.params.matchId;
  const senderId = req.query.senderId;


  // Add a query to retrieve receiver names based on matchId
  getReceiverByMatch(matchId, senderId)
    .then((receiver) => {
      console.log("Receiver data fetched from the database.", receiver);
       
      res.send(receiver);
    })
    .catch((err) => {
      console.log(`An error occurred: ${err}`);
    });
});



router.post('/', (req, res) => {
  const data = req.body;
  console.log(data);

  saveMessageToDatabase(data)
    .then((message) => {
      console.log("Message data saved to database.")
      const { io } = require('../../server');
      io.emit('chat message', message);
      res.status(200).send('Message sent successfully');
    
    })
    .catch((err) => {
      console.log(`An error occurred: ${err}`)
    });
})

module.exports = router;


