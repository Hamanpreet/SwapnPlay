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
  
  const checkUser = await getUserBySub(sub);
  
  if (checkUser.length !== 0) {
    return res.send(checkUser);
  }
  
  insertNewUser(user);
})


// Get user data by subId
router.get('/:subId', async (req, res) => {
  try {
    const user = await getUserBySub(req.params.subId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
