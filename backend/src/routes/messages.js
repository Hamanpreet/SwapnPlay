const express = require('express');
const { getMessages, getUserNamesByMatch } = require('../../db/queries/messages');
const router = express.Router();


router.get('/',(req, res)=>{
  getMessages()
    .then((messages) => {
      console.log("Messages data fetched from database.")
      res.send(messages);
    })
    .catch((err) => {
      console.log(`An error occurred: ${err}`)
    });
});

router.get('/:userId',(req, res)=>{
  
  const userId = req.params.userId;
  console.log(userId)
  getUserNamesByMatch(userId)
    .then((messages) => {
      console.log("Users data fetched from database.")
      res.send(messages);
    })
    .catch((err) => {
      console.log(`An error occurred: ${err}`)
    });
})

router.post('/', (req, res) => {
  const { userId, message } = req.body;
  console.log(message);
  const { io } = require('../../server');
  io.emit('chat message', message);

  res.status(200).send('Message sent successfully');
})

module.exports = router;