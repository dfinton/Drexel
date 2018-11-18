const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.use('/public', express.static('public'));

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
});
