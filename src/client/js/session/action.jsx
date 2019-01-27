const createSession = (token) => {
  return {
    token,
    type: 'CREATE_SESSION',
  };
};

const destroySession = () => {
  return {
    type: 'DESTROY_SESSION',
  };
};

const setScreen = (screen) => {
  return {
    screen,
    type: 'SET_SCREEN',
  };
};

const setPublicKey = (publicKey) => {
  return {
    publicKey,
    type: 'SET_PUBLIC_KEY',
  };
};

const clearPublicKey = () => {
  return {
    type: 'CLEAR_PUBLIC_KEY',
  };
};

module.exports.createSession = createSession;
module.exports.destroySession = destroySession;
module.exports.setScreen = setScreen;
module.exports.setPublicKey = setPublicKey;
module.exports.clearPublicKey = clearPublicKey;
