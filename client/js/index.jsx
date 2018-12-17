const axios = require('axios');
const React = require('react');
const ReactDOM = require('react-dom');

// Create the session store in redux
const {Provider} = require('react-redux');
const store = require('./session/store');
const validate = require('./session/validate');
const {destroySession} = require('./session/action');

// Validate the stored token and load the site
const token = store.getState().token;

validate(token, (result) => {
  // If the token is valid, keep it; otherwise we start a new session
  if (result) {
    axios.defaults.headers.common.token = token;
  } else {
    store.dispatch(destroySession());
  }

  // Import all the React components
  const {DrexelLoginForm} = require('./component/login/form');

  // Render the page in full
  ReactDOM.render(
    <Provider store={store}>
      <DrexelLoginForm />
    </Provider>,
    document.querySelector('#drexel-login-form')
  );
});
