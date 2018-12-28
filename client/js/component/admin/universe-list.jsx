const React = require('react');

class DrexelAdminUniverseList extends React.Component {
  constructor(props) {
    super(props);
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
        <span>Hello</span>
      </div>
    );
  }
}

module.exports.DrexelAdminUniverseList = DrexelAdminUniverseList;
