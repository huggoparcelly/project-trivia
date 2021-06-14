import React, { Component } from 'react';
import fetchGravatarImage from '../services/fetchGravatarImage';

class Feedback extends Component {
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
          <p data-testid="header-score">Score</p>
        </header>
      </div>
    );
  }
}

export default Feedback;
