const React = require('react');
const {connect} = require('react-redux');

const {
  setScreen
} = require('../../session/action');

class DrexelAdminMenu extends React.Component {
  constructor(props) {
    super(props);

    this.mainMenu = this.mainMenu.bind(this);
  }

  mainMenu(event) {
    this.props.setScreen('main-menu');
  }

  render() {
    return (
      <div>
        <button type="button" className="btn btn-primary btn-lg btn-block mt-2">Universe Management</button>
        <button type="button" className="btn btn-primary btn-lg btn-block mt-2">Player Management</button>
        <button onClick={this.mainMenu} type="button" className="btn btn-secondary btn-lg btn-block mt-4">Back to Main Menu</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {
  setScreen,
};

const connectMappings = connect(
  mapStateToProps,
  mapDispatchToProps,
);

module.exports.DrexelAdminMenu = connectMappings(DrexelAdminMenu);
