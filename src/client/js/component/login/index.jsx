const React = require('react');
const {connect} = require('react-redux');

const {DrexelLoginForm} = require('./form');

class DrexelLogin extends React.Component {
  constructor(props) {
    super(props);

    this.visibleClass = this.visibleClass.bind(this);
  }

  visibleClass() {
    if (this.props.token === '') {
      return 'd-block';
    }

    return 'd-none';
  }

  render() {
    return (
      <div className={this.visibleClass()}>
        <div className="container">
          <div className="row">
            <div className="col">
              <DrexelLoginForm />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    token,
  } = state;

  return {
    token,
  };
};

const connectMappings = connect(
  mapStateToProps,
);

module.exports.DrexelLogin = connectMappings(DrexelLogin);
