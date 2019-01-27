const React = require('react');

class DrexelAdminUniverseList extends React.Component {
  constructor(props) {
    super(props);

    this.mainAdminMenu = this.mainAdminMenu.bind(this);
  }

  mainAdminMenu(event) {
    this.props.resetAdminScreen();
  }

  visibleClass() {
    if (this.props.adminScreen === 'universe-list') {
      return 'd-block';
    }

    return 'd-none';
  }

  render() {
    return (
      <div className={this.visibleClass()}>
        <div className="btn-toolbar" role="toolbar" aria-label="Manage Game Universes">
          <div className="btn-group mr-2" role="group" aria-label="Create New Game Universe">
            <button type="button" className="btn btn-primary">Create New Game</button>
          </div>
          <div className="btn-group mr-2" role="group" aria-label="Second group">
            <button type="button" className="btn btn-danger">Delete Selected Games</button>
          </div>
          <div className="btn-group" role="group" aria-label="Return to The Main Admin Menu">
            <button onClick={this.mainAdminMenu} type="button" className="btn btn-secondary">Return to Previous Menu</button>
          </div>
        </div>
      </div>
    );
  }
}

module.exports.DrexelAdminUniverseList = DrexelAdminUniverseList;
