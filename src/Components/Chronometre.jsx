import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { chronometre } from '../actions';

class Chronometre extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: 30,
    };
  }

  componentDidMount() {
    const ONE_SECOND = 1000;
    setInterval(() => {
      this.setState((prevState) => (
        {
          seconds: prevState.seconds - 1,
        }
      ));
      this.getTimer();
    }, ONE_SECOND);
  }

  getTimer() {
    const { seconds } = this.state;
    const { dispatchTimer } = this.props;
    if (seconds <= 0) {
      dispatchTimer();
    }
  }

  render() {
    const { seconds } = this.state;
    return (
      <div>
        <p>{ seconds > 0 ? seconds : '0' }</p>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchTimer: () => dispatch(chronometre(true)),
});

Chronometre.propTypes = {
  dispatchTimer: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Chronometre);
