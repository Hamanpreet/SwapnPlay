require("dotenv").config();

const express = require("express");
// To log details about incoming HTTP requests
const morgan = require("morgan");
const cors = require('cors');



const PORT = process.env.PORT || 8080;
const app = express();



app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
