const express = require('express');
const router = express.Router();

router.get('/',(req, res)=>{
  res.send('send all toys!');
});

module.exports = router;