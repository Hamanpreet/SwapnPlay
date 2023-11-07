const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0', // Specify the OpenAPI version
    info: {
      title: 'SwapNplay API Documentation',
      version: '1.0.0',
    },
  },
  // Path to the API docs
  apis: ['./src/routes/toys.js',
  './src/routes/users.js',
  './src/routes/matches.js', 
  './src/routes/messages.js', 
  './src/routes/reviews.js', 
]
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
