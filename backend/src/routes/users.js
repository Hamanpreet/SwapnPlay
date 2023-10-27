const express = require('express');
const router = express.Router();

const { getUserBySub, insertNewUser } = require("../../db/queries/users");

router.post('/', async (req,res)  => {
  const { name, email, sub } = req.body;

  const user = {
    first_name: name,
    last_name: " ",
    email: email,
    phone_number: 0,
    city: " ",
    sub_id: sub
  }
  console.log(req.body);
  const checkUser = await getUserBySub(sub);
  console.log(checkUser);
  if (checkUser.length !== 0) {
    return res.send(checkUser);
  }
  
  insertNewUser(user);
})


module.exports = router;
