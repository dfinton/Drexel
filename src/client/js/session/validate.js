const axios = require('axios');
const jwt = require('jsonwebtoken');

const {
  destroySession,
  setPublicKey,
  clearPublicKey,
} = require('../session/action');

const clearToken = (store, callback) => {
  store.dispatch(destroySession());
  store.dispatch(clearPublicKey());

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

const validateSession = (store, token, callback) => {
  return (err, decoded) => {
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
};

const validateToken = (store, publicKey, callback) => {
  const token = store.getState().token;

  if (!token) {
    return clearToken(store, callback);
  }

  jwt.verify(token, publicKey, validateSession(store, token, callback));
};

const processPublicKeyResponse = (store, callback) => {
  return (response) => {
    if (response.data.status !== 'OK') {
      return clearToken(store, callback);
    }

    const publicKey = response.data.data.publicKey;

    store.dispatch(setPublicKey(publicKey));

    return validateToken(store, publicKey, callback);
  };
};

const processPublicKeyError = (store, callback) => {
  return (err) => {
    return clearToken(store, callback);
  };
};

const getPublicKey = (store, callback) => {
  const publicKey = store.getState().publicKey;

  if (publicKey) {
    return validateToken(store, publicKey, callback);
  }

  axios
    .get('/auth/key')
    .then(processPublicKeyResponse(store, callback))
    .catch(processPublicKeyError(store, callback));
};

module.exports = getPublicKey;
