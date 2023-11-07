/**
 * @swagger
 * tags:
 *   name: Matches
 *   description: API endpoints for managing match requests and notifications
 */

/**
 * @swagger
 * /api/matches/new:
 *   post:
 *     summary: Create a new match request
 *     description: Create a new match request and add it to the database.
 *     tags: [Matches]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MatchRequest'
 *     responses:
 *       200:
 *         description: The newly created match request
 *       500:
 *         description: An internal server error occurred.
 */

/**
 * @swagger
 * /api/matches/requestsend/{subId}:
 *   get:
 *     summary: Get match requests sent by a user
 *     description: Retrieve match requests sent by a user based on their subId.
 *     tags: [Matches]
 *     parameters:
 *       - in: path
 *         name: subId
 *         required: true
 *         description: SubId of the user to retrieve sent match requests for.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of match requests sent by the user
 *       404:
 *         description: No match requests found for the user.
 *       500:
 *         description: An internal server error occurred.
 */

/**
 * @swagger
 * /api/matches/requestreceived/{subId}:
 *   get:
 *     summary: Get match requests received by a user
 *     description: Retrieve match requests received by a user based on their subId.
 *     tags: [Matches]
 *     parameters:
 *       - in: path
 *         name: subId
 *         required: true
 *         description: SubId of the user to retrieve received match requests for.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of match requests received by the user
 *       404:
 *         description: No match requests found for the user.
 *       500:
 *         description: An internal server error occurred.
 */

/**
 * @swagger
 * /api/matches/requestcancel/{matchId}:
 *   put:
 *     summary: Cancel a match request
 *     description: Cancel a match request by updating its status to "Cancelled."
 *     tags: [Matches]
 *     parameters:
 *       - in: path
 *         name: matchId
 *         required: true
 *         description: ID of the match request to cancel.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Match request cancelled successfully
 *       404:
 *         description: Match request not found.
 *       500:
 *         description: An internal server error occurred.
 */

/**
 * @swagger
 * /api/matches/requestdecline/{matchId}:
 *   put:
 *     summary: Decline a match request
 *     description: Decline a match request by updating its status to "Declined."
 *     tags: [Matches]
 *     parameters:
 *       - in: path
 *         name: matchId
 *         required: true
 *         description: ID of the match request to decline.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Match request declined successfully
 *       404:
 *         description: Match request not found.
 *       500:
 *         description: An internal server error occurred.
 */

/**
 * @swagger
 * /api/matches/requestaccept/{matchId}:
 *   put:
 *     summary: Accept a match request
 *     description: Accept a match request by updating its status to "Accepted."
 *     tags: [Matches]
 *     parameters:
 *       - in: path
 *         name: matchId
 *         required: true
 *         description: ID of the match request to accept.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Match request accepted successfully
 *       404:
 *         description: Match request not found.
 *       500:
 *         description: An internal server error occurred.
 */

/**
 * @swagger
 * /api/matches/notificationcount/{subId}:
 *   get:
 *     summary: Get notification count for a user
 *     description: Retrieve the notification count for a user based on their subId.
 *     tags: [Matches]
 *     parameters:
 *       - in: path
 *         name: subId
 *         required: true
 *         description: SubId of the user to retrieve the notification count for.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The notification count for the user
 *       404:
 *         description: No notifications found for the user.
 *       500:
 *         description: An internal server error occurred.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     MatchRequest:
 *       type: object
 *       properties:
 *         // Define the properties of the MatchRequest object here
 */

const express = require('express');
const router = express.Router();

const { createtNewMatch, getRequestSend, getRequestReceived, getMatchById, updateMatch, getNotificationCount } = require("../../db/queries/matches");

// Set up a route to create a new match request
router.post('/new', (req, res) => {
  const body = req.body;
  createtNewMatch(body)
    .then((matches) => {
      res.send(matches);
    })
    .catch((err) => {
      console.log(`An error occurred: ${err}`)
    });
});

// Request Send
router.get('/requestsend/:subId', async (req, res) => {
  try {
    const matches = await getRequestSend(req.params.subId);
    if (!matches) {
      return res.status(404).json({ error: 'No match found for user' });
    }
    res.json(matches);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Request Received
router.get('/requestreceived/:subId', async (req, res) => {
  try {
    const matches = await getRequestReceived(req.params.subId);
    if (!matches) {
      return res.status(404).json({ error: 'No match found for user' });
    }
    res.json(matches);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Request Cancelled
router.put('/requestcancel/:matchId', async (req, res) => {
  const { matchId } = req.params; 
  try {
    // Check if the match with the provided ID exists
    const checkMatchResult = await getMatchById(matchId);

    if (!checkMatchResult || checkMatchResult.length === 0) {
      return res.status(404).json({ error: 'Match not found' });
    }

    // Update the Match
    const updatedMatch = await updateMatch("Cancelled", matchId);

    if (!updatedMatch) {
      return res.status(500).json({ error: 'Failed to update match' });
    }

    res.json(updatedMatch); // Respond with the updated mactch data
  } catch (err) {
    console.error('Error updating status to cancel a request:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Request Declined
router.put('/requestdecline/:matchId', async (req, res) => {
  const { matchId } = req.params;
  try {
    const checkMatchResult = await getMatchById(matchId);

    if (!checkMatchResult || checkMatchResult.length === 0) {
      return res.status(404).json({ error: 'Match not found' });
    }

    const updatedMatch = await updateMatch("Declined", matchId);

    if (!updatedMatch) {
      return res.status(500).json({ error: 'Failed to update match' });
    }

    res.json(updatedMatch);
  } catch (err) {
    console.error('Error updating status to decline a request:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Request Accepted
router.put('/requestaccept/:matchId', async (req, res) => {
  const { matchId } = req.params;
  try {
    const checkMatchResult = await getMatchById(matchId);

    if (!checkMatchResult || checkMatchResult.length === 0) {
      return res.status(404).json({ error: 'Match not found' });
    }

    const updatedMatch = await updateMatch("Accepted", matchId);

    if (!updatedMatch) {
      return res.status(500).json({ error: 'Failed to update match' });
    }

    res.json(updatedMatch); 
  } catch (err) {
    console.error('Error updating status to cancel a request:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Request notification
router.get('/notificationcount/:subId', async (req, res) => {
  try {
    const notification = await getNotificationCount(req.params.subId);
    if (!notification) {
      return res.status(404).json({ error: 'No notification found for user' });
    }
    res.json(notification);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



module.exports = router;