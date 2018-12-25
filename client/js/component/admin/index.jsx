const React = require('react');
const {connect} = require('react-redux');

const {DrexelAdminMenu} = require('./menu.jsx');

class DrexelAdminScreen extends React.Component {
  constructor(props) {
    super(props);

    this.visibleClass = this.visibleClass.bind(this);
  }

  visibleClass() {
    if (this.props.token !== '' && this.props.screen === 'admin-menu') {
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
              <DrexelAdminMenu />
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
    screen,
  } = state;

  return {
    token,
    screen,
  };
};

const connectMappings = connect(
  mapStateToProps,
);

module.exports.DrexelAdminScreen = connectMappings(DrexelAdminScreen);
