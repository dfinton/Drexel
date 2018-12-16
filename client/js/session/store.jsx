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

const sessionManager = (state = {}, action) => {
  return {
    token: token(state.token, action),
  };
};

const storedSession = localStorage.getItem('session') ? JSON.parse(localStorage.getItem('session')) : {};

const store = createStore(sessionManager, storedSession);

store.subscribe(() => {
  localStorage.setItem('session', JSON.stringify(store.getState()))
});

module.exports = store
