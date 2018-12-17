const axios = require('axios');

const validate = (token, callback) => {
  if (!token) {
    return callback(false);
  }

  const config = {
    headers: {
      token,
    },
  };

  axios
    .get('/auth/validate', config)
    .then((response) => {
      if (response.data.status !== 'OK') {
        return callback(false);
      }

      return callback(true);
    })
    .catch((err) => {
      return callback(false);
    });
};

module.exports = validate;
