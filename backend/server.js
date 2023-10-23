// load .env data into process.env
require("dotenv").config();

const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const helmet = require('helmet');
const morgan = require("morgan");
const cors = require('cors');
//const config = require('config');
const debug = require('debug')('app:startup');

//configuration
// console.log(`PGUSER: ${config.get('PGUSER')}`)
// console.log(`Environment: ${process.env.NODE_ENV}`)

// Separated Routes for each Resource
const toys = require('./routes/toys')
const reviews = require('./routes/reviews')
const matches = require('./routes/matches')

//Middlewares
// To log details about incoming HTTP requests
app.use(express.json()); //req.body
app.use(helmet());
app.use(cors());

// Mount all resource routes
app.use('/api/toys',toys);
app.use('/api/reviews',reviews);
app.use('/api/matches',matches);

if (app.get('env') === 'development'){
  app.use(morgan('tiny'));
  debug('Application started in development mode!'); //export DEBUG=app:startup in environment variable
}


app.get('/', (req, res)=>{
  res.send('Hello');
});


app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
