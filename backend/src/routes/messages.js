const express = require('express');
const { getMessages, getMessagesByUserId } = require('../../db/queries/messages');
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
  getMessagesByUserId()
    .then((messages) => {
      console.log("Messages data fetched from database.")
      res.send(messages);
    })
    .catch((err) => {
      console.log(`An error occurred: ${err}`)
    });
})

module.exports = router;