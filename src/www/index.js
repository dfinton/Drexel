const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const express = require('express');

const model = require('../model');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  throw new Error('MONGO_URI is not defined; please run "npm run init" before starting the server');
}

// JQuery JS library
app.use('/js/jquery', express.static('node_modules/jquery/dist'));

// Bootstrap framework with popper
app.use('/js/popper', express.static('node_modules/popper.js/dist/umd'));
app.use('/js/bootstrap', express.static('node_modules/bootstrap/dist/js'));

// Asset folders
app.use('/js', express.static('dist/js'));
app.use('/css', express.static('dist/css'));

// Layout where the root HTML document is located
app.use('/', express.static('src/layout'));

model.init(mongoUri, () => {
  console.log('Connected to database');

  // Initialize the app
  app.use(bodyParser.json());

  // Authentication end-point
  app.use('/auth', require('./auth'));

  // API endpoints
  app.use('/api', require('./api'));

  // Start up the server and listen for inbound requests
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
});
