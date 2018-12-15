class DrexelLoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <form id="drexel-login-form" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="drexel-login">Login</label>
          <input type="email" className="form-control" id="drexel-login" name="login" placeholder="Enter login" />
        </div>
        <div className="form-group">
          <label htmlFor="drexel-password">Password</label>
          <input type="password" className="form-control" id="drexel-password" name="password" placeholder="Password" />
        </div>
        <button id="drexel-login-submit" type="submit" className="btn btn-primary">Enter</button>
      </form>
    );
  }
}

let domContainer = document.querySelector('#drexel-login');
ReactDOM.render(<DrexelLoginForm />, domContainer);
