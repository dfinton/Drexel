import axios from 'axios';

class LoginForm extends HTMLElement {
  constructor() {
    super();

    axios({
      method: 'get',
      url: '/template/login/form.html',
    })
      .then((response) => {
        this.innerHTML = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

export default {
  element: 'login-form',
  component: LoginForm,
};
