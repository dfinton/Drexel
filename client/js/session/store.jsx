const {createStore} = require('redux');

const token = (state = '', action) => {
  switch (action.type) {
    case 'CREATE_SESSION':
      return action.token;
    case 'DESTROY_SESSION':
      return '';
    default:
      return state;
  }
};

const createSession = (token) => {
  return {
    token,
    type: 'CREATE_SESSION',
  }
}

const destroySession = () => {
  return {
    type: 'DESTROY_SESSION',
  }
}

const sessionManager = (state = {}, action) => {
  return {
    token: token(state.token, action),
  };
};

const store = createStore(sessionManager);

module.exports = store
