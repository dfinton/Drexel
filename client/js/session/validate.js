const axios = require('axios');
const {destroySession} = require('../session/action');

const clearToken = (store, callback) => {
  store.dispatch(destroySession());

  return callback();
};

const saveToken = (token, callback) => {
  axios.defaults.headers.common.token = token;

  return callback();
};

const processValidationResponse = (store, token, callback) => {
  return (response) => {
    if (response.data.status !== 'OK') {
      return clearToken(store, callback);
    }

    return saveToken(token, callback);
  };
};

const processValidationError = (store, callback) => {
  return (err) => {
    return clearToken(store, callback);
  };
};

const validateSession = (store, callback) => {
  const token = store.getState().token;

  if (!token) {
    return clearToken(store, callback);
  }

  const config = {
    headers: {
      token,
    },
  };

  axios
    .get('/auth/validate', config)
    .then(processValidationResponse(store, token, callback))
    .catch(processValidationError(store, callback));
};

module.exports = validateSession;
