const bodyParser = require('body-parser');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

// Initialize the app
app.use(bodyParser.json());

// JQuery JS library
app.use('/js/jquery', express.static('node_modules/jquery/dist'));

// Bootstrap CSS/JS framework (bundled with Popper)
app.use('/js/bootstrap', express.static('node_modules/bootstrap/dist/js'));
app.use('/css/bootstrap', express.static('node_modules/bootstrap/dist/css'));

// Redux store library
app.use('/js/redux', express.static('node_modules/redux/dist'));

// Web components loader
app.use('/js/webcomponentsjs', express.static('node_modules/@webcomponents/webcomponentsjs'));

// Authentication end-point
app.use('/auth', require('./auth'));

// Static HTML content
app.use('/', express.static('public'));

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
});
