class LoginForm extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({
      mode: 'open',
    });

    this.shadowRoot.innerHTML = `
      <h1>Woooooo!</h1>
    `;
  }
}

export default {
  element: 'login-form',
  component: LoginForm,
};
