const mongoose = require('mongoose');

const init = (mongoUri, callback) => {
  const options = require('../mongoose-connect-options');

  mongoose.connect(mongoUri, options, (err) => {
    if (err) {
      throw err;
    }

    require('./Session');
    require('./Universe');
    require('./User');

    callback();
  });
};

module.exports = {
  init,
};
