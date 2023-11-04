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