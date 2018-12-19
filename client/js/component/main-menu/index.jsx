const React = require('react');
const {connect} = require('react-redux');

class DrexelMainMenu extends React.Component {
  constructor(props) {
    super(props);

    this.visibleClass = this.visibleClass.bind(this);
  }

  visibleClass() {
    if (this.props.token !== '' && this.props.screen === 'main-menu') {
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
              This is the Main Menu
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

module.exports.DrexelMainMenu = connectMappings(DrexelMainMenu);
