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

module.exports.createSession = createSession;
module.exports.destroySession = destroySession;
module.exports.setScreen = setScreen;
