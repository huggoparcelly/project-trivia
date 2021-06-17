import React, { Component } from 'react';
import fetchGravatarImage from '../services/fetchGravatarImage';

export default class Ranking extends Component {
  getPlayers() {
    const state = JSON.parse(localStorage.getItem('state'));
    const allPlayers = Object.values(state);
    return allPlayers;
  }

  renderInitialPage() {
    window.location.href = '/';
  }

  render() {
    const allPlayers = this.getPlayers();
    return (
      <div>
        <p data-testid="ranking-title">Ranking</p>
        <ul>
          {allPlayers.map((player, index) => (
            <li
              key={ index }
            >
              <img
                src={ fetchGravatarImage(player.gravatarEmail) }
                alt="your avatar"
              />
              <p data-testid={ `player-name-${index}` }>{player.name}</p>
              <p data-testid={ `player-score-${index}` }>{player.score}</p>
            </li>))}
        </ul>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.renderInitialPage }
        >
          Inicio
        </button>
      </div>
    );
  }
}
