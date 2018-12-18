const React = require('react');

const {DrexelLogin} = require('./login');

class Drexel extends React.Component {
  render() {
    return (
      <div>
        <DrexelLogin />
      </div>
    );
  }
}

module.exports.Drexel = Drexel;
