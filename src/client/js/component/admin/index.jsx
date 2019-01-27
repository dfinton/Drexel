const React = require('react');
const {connect} = require('react-redux');

const {DrexelAdminMenu} = require('./menu.jsx');
const {DrexelAdminUniverseList} = require('./universe-list.jsx');

const defaultAdminScreen = 'menu';

class DrexelAdminScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      adminScreen: defaultAdminScreen,
    };

    this.visibleClass = this.visibleClass.bind(this);
    this.setAdminScreen = this.setAdminScreen.bind(this);
  }

  visibleClass() {
    if (this.props.token !== '' && this.props.screen === 'admin-menu') {
      return 'd-block';
    }

    return 'd-none';
  }

  setAdminScreen(adminScreen) {
    const newState = {
      adminScreen,
    };

    this.setState(state => (newState));
  }

  resetAdminScreen() {
    this.setAdminScreen(defaultAdminScreen);
  }

  render() {
    return (
      <div className={this.visibleClass()}>
        <div className="container">
          <div className="row">
            <div className="col">
              <DrexelAdminMenu 
                adminScreen={this.state.adminScreen}
                setAdminScreen={this.setAdminScreen}
              />
              <DrexelAdminUniverseList
                adminScreen={this.state.adminScreen}
                resetAdminScreen={this.resetAdminScreen} 
                setAdminScreen={this.setAdminScreen}
              />
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
