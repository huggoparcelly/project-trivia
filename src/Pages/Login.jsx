import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.checkInput = this.checkInput.bind(this);
    this.state = {
      disabledButton: true,
      name: '',
      email: '',
    };
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  checkInput() {
    const { name, email } = this.state;

    const emailValidate = (
      /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/
    );
    if (email.match(emailValidate) && name.length > 2) {
      this.setState({ disabledButton: false });
    }
  }

  render() {
    const { disabledButton } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="name">
            <input type="text" id="name" name="name" onChange={ this.handleChange } />
          </label>
          <label htmlFor="email">
            <input type="email" id="email" name="email" onChange={ this.handleChange } />
          </label>
          <button type="button" disabled={ disabledButton }>Entrar</button>
        </form>
      </div>
    );
  }
}

export default Login;
