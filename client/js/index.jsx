const {createStore} = require('redux');
const {sessionManager} = require('./session/store');

const sessionStore = createStore(sessionManager);

const {DrexelLoginForm} = require('./component/login/form');

let drexelLoginFormContainer = document.querySelector('#drexel-login-form');
ReactDOM.render(<DrexelLoginForm />, drexelLoginFormContainer);
