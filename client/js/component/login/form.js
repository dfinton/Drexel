import template from '../../util/template';

class LoginForm extends HTMLElement {
  constructor() {
    super();

    template('login/form', (templateHtml) => {
      this.innerHTML = templateHtml;
    });
  }
}

export default {
  element: 'login-form',
  component: LoginForm,
};
