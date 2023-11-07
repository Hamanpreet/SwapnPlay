/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API endpoints for managing user data
 */

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     description: Create a new user and add it to the database.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               sub:
 *                 type: string
 *     responses:
 *       200:
 *         description: The newly created user
 *       500:
 *         description: An internal server error occurred.
 */

/**
 * @swagger
 * /api/users/{subId}:
 *   get:
 *     summary: Get user data by subId
 *     description: Retrieve user data for a specific subId.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: subId
 *         required: true
 *         description: SubId of the user to retrieve data for.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User data for the specified subId
 *       404:
 *         description: User not found.
 *       500:
 *         description: An internal server error occurred.
 */

/**
 * @swagger
 * /api/users/{subId}:
 *   put:
 *     summary: Update user data by subId
 *     description: Update an existing user's information by its subId.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: subId
 *         required: true
 *         description: SubId of the user to update data for.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone_number:
 *                 type: integer
 *               city:
 *                 type: string
 *               profileimage:
 *                 type: string
 *     responses:
 *       200:
 *         description: User data updated successfully
 *       500:
 *         description: An internal server error occurred.
 */



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
