// Create the session store in redux
const {store} = require('./session/store');

// Import all the React components
const {DrexelLoginForm} = require('./component/login/form');

let drexelLoginFormContainer = document.querySelector('#drexel-login-form');
ReactDOM.render(<DrexelLoginForm />, drexelLoginFormContainer);
