const express = require('express');
const router = express.Router();

const { getUserBySub, insertNewUser, updateUserDetails } = require("../../db/queries/users");

router.post('/', async (req,res)  => {
  const { name, email, sub } = req.body;

  const user = {
    first_name: name,
    last_name: " ",
    email: email,
    phone_number: 0,
    city: " ",
    sub_id: sub,
    profileImage : ""
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

// Route to handle PUT requests for /api/users/:subId
router.put('/:subId', async (req, res) => {
  const { subId } = req.params;
  const updatedUserData = req.body;

  try {
    // Update the user data in the database
    await updateUserDetails(updatedUserData.first_name,
      updatedUserData.last_name,
      updatedUserData.email,
      updatedUserData.phone_number,
      updatedUserData.city,
      updatedUserData.profileimage,
      subId);
    
    res.json({ message: 'User data updated successfully' });
  } catch (error) {
    console.error('Error updating user data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;
