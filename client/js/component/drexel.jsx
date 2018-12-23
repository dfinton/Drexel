const React = require('react');

const {DrexelLogin} = require('./login');
const {DrexelMainMenu} = require('./main-menu');
const {DrexelAdminMenu} = require('./admin-menu');

class Drexel extends React.Component {
  render() {
    return (
      <div>
        <DrexelLogin />
        <DrexelMainMenu />
        <DrexelAdminMenu />
      </div>
    );
  }
}

module.exports.Drexel = Drexel;
