const React = require('react');

const {DrexelLogin} = require('./login');
const {DrexelMainMenu} = require('./main-menu');

class Drexel extends React.Component {
  render() {
    return (
      <div>
        <DrexelLogin />
        <DrexelMainMenu />
      </div>
    );
  }
}

module.exports.Drexel = Drexel;
