/**
 * @swagger
 * tags:
 *   name: Toys
 *   description: API endpoints for managing toys
 */

/**
 * @swagger
 * /api/toys:
 *   get:
 *     summary: Get a list of toys
 *     description: Retrieve a list of toys from the database.
 *     tags: [Toys]
 *     responses:
 *       200:
 *         description: A list of toys
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Toy'
 *       500:
 *         description: An internal server error occurred.
 */

/**
 * @swagger
 * /api/toys/new:
 *   post:
 *     summary: Create a new toy
 *     description: Create a new toy and add it to the database.
 *     tags: [Toys]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Toy'
 *     responses:
 *       201:
 *         description: The newly created toy
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Toy'
 *       400:
 *         description: Bad request. Invalid input data.
 *       500:
 *         description: An internal server error occurred.
 */

/**
 * @swagger
 * /api/toys/{id}:
 *   put:
 *     summary: Update a toy by ID
 *     description: Update an existing toy's information by its ID.
 *     tags: [Toys]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the toy to update.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Toy'
 *     responses:
 *       200:
 *         description: The updated toy
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Toy'
 *       400:
 *         description: Bad request. Invalid input data.
 *       404:
 *         description: Toy not found.
 *       500:
 *         description: An internal server error occurred.
 */

/**
 * @swagger
 * /api/toys/{id}:
 *   delete:
 *     summary: Delete a toy by ID
 *     description: Delete a toy from the database by its ID.
 *     tags: [Toys]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the toy to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Toy deleted successfully
 *       404:
 *         description: Toy not found.
 *       500:
 *         description: An internal server error occurred.
 */

/**
 * @swagger
 * /api/toys/others/{subId}:
 *   get:
 *     summary: Get toys by subId
 *     description: Retrieve toys for a specific subId.
 *     tags: [Toys]
 *     parameters:
 *       - in: path
 *         name: subId
 *         required: true
 *         description: SubId of the user to get toys for.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of toys for the specified subId
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Toy'
 *       404:
 *         description: No toys found for the specified subId.
 *       500:
 *         description: An internal server error occurred.
 */

/**
 * @swagger
 * /api/toys/searchQuery:
 *   post:
 *     summary: Search for toys by name
 *     description: Search for toys in the database by name.
 *     tags: [Toys]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               searchQuery:
 *                 type: string
 *     responses:
 *       200:
 *         description: A list of toys matching the search query
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Toy'
 *       400:
 *         description: Bad request. Name is required.
 *       500:
 *         description: An internal server error occurred.
 */

/**
 * @swagger
 * /api/toys/filter:
 *   post:
 *     summary: Filter toys by criteria
 *     description: Filter toys in the database by criteria (e.g., AgeGroup or Condition).
 *     tags: [Toys]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               filterType:
 *                 type: string
 *               filterValue:
 *                 type: string
 *     responses:
 *       200:
 *         description: A list of toys matching the filter criteria
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Toy'
 *       400:
 *         description: Bad request. Filter type and value are required.
 *       500:
 *         description: An internal server error occurred.
 */

/**
 * @swagger
 * /api/toys/generate-toy-description:
 *   post:
 *     summary: Generate AI toy description
 *     description: Generate an AI-generated toy description based on a prompt.
 *     tags: [Toys]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               prompt:
 *                 type: string
 *     responses:
 *       200:
 *         description: AI-generated toy description
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: string
 *       400:
 *         description: Bad request. There was an issue on the server.
 *       500:
 *         description: An internal server error occurred.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Toy:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         description:
 *           type: string
 */

const express = require('express');
const router = express.Router();
const { getToys, insertNewToy, getToysByName, getToysById, getToysBySubId, getToysByAgeGroup, getToysByCondition, updateToy, findToyByIdAndRemove, getOthersToys } = require("../../db/queries/toys");
const config = require('../../config/development');
const { Configuration, OpenAIApi } = require("openai");
const apiKey = config.OPEN_AI_KEY;

const configuration = new Configuration({apiKey});
const openai = new OpenAIApi(configuration);


//Get AI generated toy description
router.post('/generate-toy-description', async (req, res) => {
  try {
    const body = req.body;
    let prompt = `Please rewrite the description for the following toy to sell it online:\n${body.prompt}`

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 128,
      temperature: 0,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      stop: "{\n}",
    });

    let description = response.data.choices[0].text.replace(/(\r\n|\n|\r)/gm, "");
    return res.status(200).json({
      success: true,
      data: description,
    });
  } catch (error) {
    console.log("Error: ", error);
    return res.status(400).json({
      success: false,
      error: error.response
        ? error.response.data
        : "There was an issue on the server",
    });
  }
});


router.get('/', async (req, res) => {
  try {
    // Check if 'ownerId' query parameter exists in the request
    const queryString = req.query;

    if (queryString) {
      // Retrieve toys that match the query string
      const toys = await getToys({ queryString });
      res.json(toys);
    } else {
      // If queryString is not provided, return all toys
      const toys = await getToys();
      res.json(toys);
    }
  } catch (err) {
    console.error(`An error occurred: ${err}`);
    res.status(500).json({ error: 'An error occurred' });
  }
});

router.get('/others/:subId', async (req, res) => {
  try {
    // If queryString is not provided, return all toys
    const toy = await getOthersToys(req.params.subId);
    if (!toy) {
      return res.status(404).json({ error: 'No Toy found' });
    }
    res.json(toy);
  } catch (err) {
    console.error(`An error occurred: ${err}`);
    res.status(500).json({ error: 'An error occurred' });
  }
});


// Update a toy by its ID
router.put('/:id', async (req, res) => {
  const { id } = req.params; // Get the toy ID from the URL parameter
  const { title, description, age_group, value, address, condition, url } = req.body; // Get updated toy data from the request body

  try {
    // Check if the toy with the provided ID exists
    const checkToyResult = await getToysById(id);

    if (!checkToyResult || checkToyResult.length === 0) {
      return res.status(404).json({ error: 'Toy not found' });
    }

    // Update the toy
    const updatedToy = await updateToy(title, description, age_group, value, address, condition, url, id);


    if (!updatedToy) {
      return res.status(500).json({ error: 'Failed to update toy' });
    }

    res.json(updatedToy); // Respond with the updated toy data
  } catch (err) {
    console.error('Error updating toy:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Define a route for deleting a toy by its ID
router.delete('/:id', async (req, res) => {
  try {
    const toyId = req.params.id;

    // Check if the toy with the given ID exists in your data store
    const toy = await getToysById(toyId);

    if (!toy) {
      return res.status(404).json({ error: 'Toy not found' });
    }

    // Delete the toy
    await findToyByIdAndRemove(toyId);

    // Return a success message
    res.json({ message: 'Toy deleted successfully' });
  } catch (error) {
    console.error("Error deleting toy:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Set up a route to create a new toy
router.post('/new', (req, res) => {
  const body = req.body;
  insertNewToy(body)
    .then((toy) => {
      res.status(201).send(toy);
    })
    .catch((err) => {
      console.log(`An error occurred: ${err}`)
    });
});

router.post('/searchQuery', (req, res) => {
  const { searchQuery } = req.body;


  if (!searchQuery) {
    return res.status(400).json({ error: "Name is required" });
  }
  getToysByName(searchQuery)
    .then((toys) => {
      res.send(toys);
    })
    .catch((err) => {
      console.log(`An error occurred: ${err}`);
    });
});


// Get toys data by subId
router.get('/:subId', async (req, res) => {
  try {
    const toys = await getToysBySubId(req.params.subId);
    if (!toys) {
      return res.status(404).json({ error: 'No toys found for user' });
    }
    res.json(toys);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/filter', (req, res) => {
  const { filterType, filterValue } = req.body;

  if (!filterType) {
    return res.status(400).json({ error: "Filter type and value are required" });
  }

  if (filterType === "AgeGroup") {
    getToysByAgeGroup(filterValue)
      .then((toys) => {
        res.send(toys);

      })
      .catch((err) => {
        console.log(`An error occurred: ${err}`);
      });
  } else if (filterType === "Condition") {
    getToysByCondition(filterValue)
      .then((toys) => {
        res.send(toys);

      })
      .catch((err) => {
        console.log(`An error occurred: ${err}`);
      });
  }
});

module.exports = router;
