import DrexelElement from '../../util/drexel-element';

class LoginForm extends DrexelElement {
  constructor() {
    super('login/form');
  }

  initElement() {
    const $this = this.$this;

    console.log($this);
  }
}

export default {
  element: 'login-form',
  component: LoginForm,
};
