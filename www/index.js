const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.use('/js/bootstrap', express.static('node_modules/bootstrap/dist/js'));
app.use('/js/webcomponentsjs', express.static('node_modules/@webcomponents/webcomponentsjs'));
app.use('/', express.static('public'));

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
});
