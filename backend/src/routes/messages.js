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


