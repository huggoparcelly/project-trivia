import React, { Component } from 'react';
import fetchGravatarImage from '../services/fetchGravatarImage';
// teste
export default class Header extends Component {
  render() {
    const name = localStorage.getItem('name');
    return (
      <div>
        <header>
          <img
            src={ fetchGravatarImage() }
            alt="your avatar"
            data-testid="header-profile-picture"
          />
          <p data-testid="header-player-name">{name}</p>
          <p data-testid="header-score">0</p>
        </header>
      </div>
    );
  }
}
