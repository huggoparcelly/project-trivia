import React, { Component } from 'react';
import fetchGravatarImage from '../services/fetchGravatarImage';

export default class Ranking extends Component {
  componentDidMount() {
    this.savePlayerInRanking();
  }

  getPlayers() {
    return JSON.parse(localStorage.getItem('ranking'));
  }

  savePlayerInRanking() {
    const state = JSON.parse(localStorage.getItem('state'));
    const { player } = state;
    const rankingTest = localStorage.getItem('ranking');
    if (rankingTest === null) localStorage.setItem('ranking', JSON.stringify([]));
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const newPlayer = {
      name: player.name,
      score: player.score,
      picture: fetchGravatarImage(player.gravatarEmail),
    };
    ranking.push(newPlayer);
    localStorage.setItem('ranking', JSON.stringify(ranking));
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
                src={ player.picture }
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
