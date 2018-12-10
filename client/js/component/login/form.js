import DrexelElement from '../../util/drexel-element';

class LoginForm extends DrexelElement {
  constructor() {
    super('login/form');
  }

  initElement() {
    const $this = this.$this;
    const $button = $this.children();

    console.log($button);

    $button.click((event) => {
      console.log('Form submitted');
      event.preventDefault();
    });
  }
}

export default {
  element: 'login-form',
  component: LoginForm,
};
