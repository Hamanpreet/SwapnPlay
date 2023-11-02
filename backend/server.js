const config = require('config');
const http = require('http');
const express = require("express");
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const PORT = config.get('APPPORT') || 8080;
const helmet = require('helmet');
const morgan = require("morgan");
const cors = require('cors');
const debug = require('debug')('app:startup');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./doc/swagger'); // Import your generated Swagger spec

const io = socketIo(server);



const toys = require('./src/routes/toys')
const reviews = require('./src/routes/reviews')
const matches = require('./src/routes/matches')
const users = require('./src/routes/users')
const messages = require('./src/routes/messages')

app.use(express.urlencoded({ extended: true }));


//Middlewares
// To log details about incoming HTTP requests
app.use(express.json()); //req.body
app.use(helmet());
app.use(cors());
// Serve Swagger UI at a specific route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Mount all resource routes
app.use('/api/toys', toys);
app.use('/api/reviews', reviews);
app.use('/api/matches', matches);
app.use('/api/users', users);
app.use('/api/messages', messages);

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  debug('Application started in development mode!'); //export DEBUG=app:startup in environment variable
}

// Configure Socket.io to listen for connections
io.on('connection', (socket) => {
  console.log('a user connected');

  // Handle chat messages and broadcasting
  socket.on('chat message', (message) => {
    // Broadcast the message to all connected clients
    io.emit('chat message', message); 
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

app.get('/', (req, res) => {
  res.send('Hello');
});

server.listen(PORT, () => {
  console.log('Server is running on port 8080');
});


// Export the 'io' object
module.exports.io = io;