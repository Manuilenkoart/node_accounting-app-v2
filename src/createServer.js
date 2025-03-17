'use strict';

const express = require('express');
const { userRouter } = require('./routes');

function createServer() {
  // Use express to create a server
  // Add a routes to the server
  // Return the server (express app)
  const app = express();

  app.use('/users', express.json(), userRouter);

  return app;
}

module.exports = {
  createServer,
};
