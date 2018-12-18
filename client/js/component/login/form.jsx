const axios = require('axios');
const React = require('react');
const {connect} = require('react-redux');
const {createSession} = require('../../session/action');

class DrexelLoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      login: '',
      password: '',
    };

    this.processAuthToken = this.processAuthToken.bind(this);
    this.processLoginError = this.processLoginError.bind(this);
    this.submitLoginForm = this.submitLoginForm.bind(this);
    this.updateLogin = this.updateLogin.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
  }

  processAuthToken(response) {
    if (response.data.status !== 'OK') {
      return this.processLoginError(new Error(response.data.message));
    }

    const {
      token,
    } = response.data.data;

    this.props.createSession(token);
  }

  processLoginError(error) {
    console.log(error);
  }

  submitLoginForm(event) {
    event.preventDefault();

    const {
      login,
      password,
    } = this.state;

    const options = {
      method: 'post',
      url: '/auth',
      data: {
        login,
        password,
      },
    };

    axios(options)
      .then(this.processAuthToken)
      .catch(this.processLoginError);
  }

  updateLogin(event) {
    this.setState({
      login: event.target.value,
    });
  }

  updatePassword(event) {
    this.setState({
      password: event.target.value,
    });
  }

  render() {
    return (
      <form onSubmit={this.submitLoginForm}>
        <div className="form-group">
          <label htmlFor="drexel-login">Login</label>
          <input
            value={this.state.login}
            onChange={this.updateLogin}
            type="text" className="form-control" id="drexel-login" name="login" placeholder="Enter login"
          />
        </div>
        <div className="form-group">
          <label htmlFor="drexel-password">Password</label>
          <input
            value={this.state.password}
            onChange={this.updatePassword}
            type="password" className="form-control" id="drexel-password" name="password" placeholder="Password"
          />
        </div>
        <button id="drexel-login-submit" type="submit" className="btn btn-primary">Enter</button>
      </form>
    );
  }
}

const mapDispatchToProps = {
  createSession,
};

const connectMappings = connect(
  state => {return {}},
  mapDispatchToProps,
);

module.exports.DrexelLoginForm = connectMappings(DrexelLoginForm);
