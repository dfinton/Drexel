const React = require('react');

const {DrexelLogin} = require('./login');
const {DrexelMainMenu} = require('./main-menu');
const {DrexelAdminScreen} = require('./admin');

class Drexel extends React.Component {
  render() {
    return (
      <div>
        <DrexelLogin />
        <DrexelMainMenu />
        <DrexelAdminScreen />
      </div>
    );
  }
}

module.exports.Drexel = Drexel;
