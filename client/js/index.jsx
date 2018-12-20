const React = require('react');
const ReactDOM = require('react-dom');

// Create the session store in redux
const {Provider} = require('react-redux');
const store = require('./session/store');
const validateSession = require('./session/validate');

// Validate the stored token and load the site
// const token = store.getState().token;

validateSession(store, () => {
  // Import all the React components
  const {Drexel} = require('./component/drexel');

  // Render the page in full
  ReactDOM.render(
    <Provider store={store}>
      <Drexel />
    </Provider>,
    document.querySelector('#drexel')
  );
});
