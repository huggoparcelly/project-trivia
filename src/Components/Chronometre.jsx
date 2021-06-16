import React, { Component } from 'react';

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
    }, ONE_SECOND);
  }

  componentDidUpdate() {
  }

  render() {
    const { seconds } = this.state;
    return (
      <div>
        <p>{ seconds }</p>
      </div>
    );
  }
}

export default Chronometre;
