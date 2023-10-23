require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require('cors');
const PORT = process.env.APPPORT || 8080;
const app = express();

const newToy = require('./routes/toys/newToy')
const get = require('./routes/toys/get')

app.use(cors());
app.use('/toys/newToy', newToy);
//app.use('/toys/get', get);

app.listen(PORT, () => {
  console.log(`Swap n Play backend is listening at port ${PORT}`);
});
