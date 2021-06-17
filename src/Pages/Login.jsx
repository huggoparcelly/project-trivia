import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import fetchToken from '../services/fetchToken';

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.checkInput = this.checkInput.bind(this);
    this.fetchAndRedirect = this.fetchAndRedirect.bind(this);
    this.state = {
      name: '',
      email: '',
      shouldRedirect: false,
    };
  }

  settingsButton() {
    window.location.href = '/configuracoes';
  }

  fetchAndRedirect() {
    const shouldUpdate = fetchToken();
    if (shouldUpdate) {
      this.setState({ shouldRedirect: true });
    }
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
    if (localStorage.getItem('state') === null) {
      const initialLocalState = { player: {
        name: '',
        assertions: 0,
        score: 0,
        gravatarEmail: '',
      } };
      localStorage.setItem('state', JSON.stringify(initialLocalState));
    }
    const actualState = JSON.parse(localStorage.getItem('state'));
    const { player } = actualState;
    if (name === 'email') {
      player.gravatarEmail = value;
    }
    if (name === 'name') {
      player.name = value;
    }
    localStorage.setItem('state', JSON.stringify({ player }));
  }

  checkInput() {
    const { name, email } = this.state;

    const emailValidate = (
      /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/
    );
    return !(email.match(emailValidate) && name.length > 2);
  }

  render() {
    const { shouldRedirect } = this.state;
    if (shouldRedirect) return <Redirect to="/jogo" />;
    return (
      <div>

        <label htmlFor="input-text">
          <input
            type="text"
            name="name"
            className="input-field"
            placeholder="Name"
            onChange={ this.handleChange }
            data-testid="input-player-name"
          />
        </label>
        <label htmlFor="input-email">
          <input
            type="text"
            name="email"
            placeholder="Email"
            onChange={ this.handleChange }
            data-testid="input-gravatar-email"
          />
        </label>
        <button
          type="button"
          data-testid="btn-play"
          disabled={ this.checkInput() }
          onClick={ () => this.fetchAndRedirect() }
        >
          Jogar
        </button>
        <button
          type="button"
          className="btn-field"
          data-testid="btn-settings"
          onClick={ () => this.settingsButton() }
        >
          Configurações
        </button>
      </div>
    );
  }
}

export default Login;
