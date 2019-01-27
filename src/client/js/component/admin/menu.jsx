const React = require('react');
const {connect} = require('react-redux');

const {
  setScreen
} = require('../../session/action');

class DrexelAdminMenu extends React.Component {
  constructor(props) {
    super(props);

    this.universeList = this.universeList.bind(this);
    this.playerList = this.playerList.bind(this);
    this.mainMenu = this.mainMenu.bind(this);
  }

  universeList(event) {
    this.props.setAdminScreen('universe-list');
  }

  playerList(event) {
    this.props.setAdminScreen('player-list');
  }

  mainMenu(event) {
    this.props.setScreen('main-menu');
  }

  visibleClass() {
    if (this.props.adminScreen === 'menu') {
      return 'd-block';
    }

    return 'd-none';
  }

  render() {
    return (
      <div className={this.visibleClass()}>
        <button onClick={this.universeList} type="button" className="btn btn-primary btn-lg btn-block mt-2">Universe Management</button>
        <button onClick={this.playerList} type="button" className="btn btn-primary btn-lg btn-block mt-2">Player Management</button>
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
